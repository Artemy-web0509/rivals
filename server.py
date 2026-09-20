#!/usr/bin/env python3
import json
import os
import re
import subprocess
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data.json")
PORT = int(os.environ.get("PORT", "8000"))

TUNNEL_LOG = os.path.join(BASE_DIR, "tunnel.log")
TUNNEL_PID_FILE = os.path.join(BASE_DIR, "tunnel.pid")

lock = threading.Lock()


def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        raw = f.read()
    if not raw.strip():
        return []
    return json.loads(raw)


def save_data(data):
    tmp = DATA_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    os.replace(tmp, DATA_FILE)


# --- Tunnel management ---
def stop_tunnel():
    if os.path.exists(TUNNEL_PID_FILE):
        try:
            pid = int(open(TUNNEL_PID_FILE).read().strip())
            subprocess.run(["kill", str(pid)], capture_output=True)
        except Exception:
            pass
    subprocess.run(["pkill", "-f", "localhost.run"], capture_output=True)


def start_tunnel():
    stop_tunnel()
    time.sleep(1)
    ssh_cmd = [
        "ssh",
        "-o", "StrictHostKeyChecking=no",
        "-o", "ConnectTimeout=20",
        "-o", "ServerAliveInterval=30",
        "-o", "ServerAliveCountMax=3",
        "-R", "80:localhost:%d" % PORT,
        "nokey@localhost.run",
    ]
    with open(TUNNEL_LOG, "w") as log:
        p = subprocess.Popen(ssh_cmd, stdout=log, stderr=subprocess.STDOUT)
    try:
        with open(TUNNEL_PID_FILE, "w") as f:
            f.write(str(p.pid))
    except Exception:
        pass
    return p.pid


def current_tunnel_url():
    try:
        with open(TUNNEL_LOG, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        m = re.search(r"https://[a-z0-9]+\.lhr\.life", content)
        return m.group(0) if m else None
    except Exception:
        return None


def wait_for_url(timeout=30):
    deadline = time.time() + timeout
    while time.time() < deadline:
        url = current_tunnel_url()
        if url:
            return url
        time.sleep(1)
    return None


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def _send(self, code, body, content_type="application/json; charset=utf-8"):
        if isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send(200, b"")

    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            with open(os.path.join(BASE_DIR, "index.html"), "rb") as f:
                self._send(200, f.read(), "text/html; charset=utf-8")
            return
        if self.path.startswith("/api/data"):
            with lock:
                data = load_data()
            self._send(200, json.dumps(data, ensure_ascii=False))
            return
        if self.path.startswith("/api/url"):
            url = current_tunnel_url()
            self._send(200, json.dumps({"url": url} if url else {"url": None}, ensure_ascii=False))
            return
        self._send(404, json.dumps({"error": "not found"}, ensure_ascii=False))

    def do_HEAD(self):
        if self.path == "/" or self.path == "/index.html":
            self._send(200, b"", "text/html; charset=utf-8")
            return
        self._send(404, b"", "application/json")

    def do_POST(self):
        if self.path.startswith("/api/data"):
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length)
            try:
                payload = json.loads(raw)
                if not isinstance(payload, list):
                    raise ValueError("expected list")
            except Exception:
                self._send(400, json.dumps({"error": "invalid data"}, ensure_ascii=False))
                return
            with lock:
                save_data(payload)
            self._send(200, json.dumps({"ok": True}, ensure_ascii=False))
            return
        if self.path.startswith("/api/restart-tunnel"):
            def worker():
                start_tunnel()
                wait_for_url()
            threading.Thread(target=worker, daemon=True).start()
            self._send(200, json.dumps({"starting": True}, ensure_ascii=False))
            return
        self._send(404, json.dumps({"error": "not found"}, ensure_ascii=False))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Server running on http://0.0.0.0:{PORT}")
    server.serve_forever()