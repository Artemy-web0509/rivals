#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Управление интернет-туннелем (localtunnel) для игры.

Использование:
    python3 tunnel.py restart   — перезапустить туннель и вернуть новую ссылку
    python3 tunnel.py status    — показать текущую ссылку (или NO_TUNNEL)
"""
import os
import re
import signal
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.abspath(__file__))
NODE = os.path.join(ROOT, 'node')
LT = os.path.join(ROOT, 'node_modules', 'localtunnel', 'bin', 'lt.js')
PORT = os.environ.get('PORT', '8000')
PID_FILE = os.path.join(ROOT, '.tunnel_pid')
URL_FILE = os.path.join(ROOT, '.tunnel_url')
LOG = os.path.join(ROOT, 'tunnel.log')

URL_RE = re.compile(r'https://[a-z0-9-]+\.loca\.lt')


def read(f):
    try:
        with open(f) as fh:
            return fh.read().strip()
    except Exception:
        return ''


def write(f, s):
    try:
        with open(f, 'w') as fh:
            fh.write(s)
    except Exception:
        pass


def pid_alive(pid):
    try:
        os.kill(pid, 0)
        return True
    except Exception:
        return False


def kill_existing():
    pid = read(PID_FILE)
    if pid.isdigit() and pid_alive(int(pid)):
        try:
            os.kill(int(pid), signal.SIGTERM)
        except Exception:
            pass
        time.sleep(1)
    try:
        subprocess.run(['pkill', '-f', 'localtunnel/bin/lt.js'],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass


def restart():
    kill_existing()
    write(URL_FILE, '')
    env = dict(os.environ)
    env['PORT'] = PORT
    with open(LOG, 'w') as log:
        p = subprocess.Popen([NODE, LT, '--port', PORT],
                             stdout=log, stderr=subprocess.STDOUT,
                             cwd=ROOT, env=env, start_new_session=True)
    write(PID_FILE, str(p.pid))
    for _ in range(35):
        time.sleep(1)
        m = URL_RE.search(read(LOG))
        if m:
            write(URL_FILE, m.group(0))
            return m.group(0)
    return ''


def status():
    pid = read(PID_FILE)
    url = read(URL_FILE)
    if url and pid.isdigit() and pid_alive(int(pid)):
        return url
    return ''


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'status'
    if cmd == 'restart':
        u = restart()
        print(u or 'ERROR')
    elif cmd == 'status':
        u = status()
        print(u or 'NO_TUNNEL')
    else:
        print('usage: tunnel.py restart|status')
