#!/usr/bin/env python3
import os
import math
import random

MC = os.path.expanduser("~/Library/Application Support/minecraft")
DP = os.path.join(MC, "datapack-farses", "data", "farses", "function")
os.makedirs(DP, exist_ok=True)

OUT = []  # буфер команд текущей зоны
CITY = []  # буфер команд города
ROAD = []  # буфер команд дороги к городу

def fill(x1,y1,z1,x2,y2,z2,block):
    OUT.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace air")
    OUT.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:grass_block")
    OUT.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:dirt")
    OUT.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:stone")

def force(x1,y1,z1,x2,y2,z2,block):
    return f"fill {x1} {y1} {z1} {x2} {y2} {z2} {block}"

def setb(x,y,z,block):
    OUT.append(f"setblock {BX+x} {BY+y} {BZ+z} {block} replace")

def cfill(x1,y1,z1,x2,y2,z2,block):
    CITY.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace air")
    CITY.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:grass_block")
    CITY.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:dirt")
    CITY.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:stone")

def csetb(x,y,z,block):
    CITY.append(f"setblock {BX+x} {BY+y} {BZ+z} {block} replace")

def rfill(x1,y1,z1,x2,y2,z2,block):
    ROAD.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace air")
    ROAD.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:grass_block")
    ROAD.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:dirt")
    ROAD.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:stone")

def rsetb(x,y,z,block):
    ROAD.append(f"setblock {BX+x} {BY+y} {BZ+z} {block} replace")

# ================= ПЛАТО =================
BX, BY, BZ = 544, 65, 1072
G=52
fill(-G,-6,-G,G,-2,G,"minecraft:dirt")
fill(-G,-1,-G,G,-1,G,"minecraft:grass_block")

GRASS = 64
BOT = 43
AIR_TOP = 65
AIR_HI = 125
HALF = 500

CZZ = list(range((BZ-HALF)//16, (BZ+HALF)//16+1))
CXX = list(range((BX-HALF)//16, (BX+HALF)//16+1))
BATCH = 8
GENW = 5
waves = []
for iz,cz in enumerate(CZZ):
    for g0 in range(0, len(CXX), BATCH):
        chunkz = CZZ[iz]
        batch = CXX[g0:g0+BATCH]
        x1 = max(batch[0]*16, BX-HALF)
        x2 = min(batch[-1]*16+15, BX+HALF)
        z1,z2 = max(chunkz*16, BZ-HALF), min(chunkz*16+15, BZ+HALF)
        lo_name = f"build_ground_{len(waves)}"
        fi_name = f"build_fill_{len(waves)}"
        waves.append((lo_name,fi_name,x1,x2,z1,z2))
        open(os.path.join(DP,lo_name+".mcfunction"),"w").write(
            f"forceload add {x1} {z1} {x2} {z2}\n"
            f"schedule function farses:{fi_name} {GENW}t\n")
        lines = []
        for cx in batch:
            x1,x2 = max(cx*16, BX-HALF), min(cx*16+15, BX+HALF)
            lines.append(force(x1,BOT,z1,x2,GRASS-1,z2,"minecraft:dirt"))
            lines.append(force(x1,GRASS,z1,x2,GRASS,z2,"minecraft:grass_block"))
            lines.append(force(x1,AIR_TOP,z1,x2,AIR_HI,z2,"minecraft:air"))
        lines.append(f"forceload remove {x1} {z1} {x2} {z2}")
        open(os.path.join(DP,fi_name+".mcfunction"),"w").write("\n".join(lines)+"\n")
for i,(lo,fi,x1,x2,z1,z2) in enumerate(waves[:-1]):
    with open(os.path.join(DP,fi+".mcfunction"),"a") as f:
        f.write(f"schedule function farses:{waves[i+1][0]} 2t\n")
with open(os.path.join(DP, waves[-1][1]+".mcfunction"),"a") as f:
    f.write("schedule function farses:build_village_load 3t\n")
open(os.path.join(DP,"build_ground_begin.mcfunction"),"w").write("schedule function farses:build_ground_0 1t\n")
open(os.path.join(DP,"build_village.mcfunction"),"w").write(
    "scoreboard objectives add farses_flags dummy\n"
    "scoreboard players add farses_built farses_flags 0\n"
    "execute if score farses_built farses_flags matches 0 run schedule function farses:build_ground_0 1t\n"
)
open(os.path.join(DP,"village_force.mcfunction"),"w").write(
    "scoreboard players set farses_built farses_flags 0\n"
    "schedule function farses:build_ground_0 1t\n"
)

# ================= ДЕРЕВНЯ ОЛИВА =================
VX1,VZ1,VX2,VZ2 = 400,976,719,1151  # блочные границы чанкового прямоугольника (<256 чанков)
open(os.path.join(DP,"build_village_load.mcfunction"),"w").write(
    f"forceload add {VX1} {VZ1} {VX2} {VZ2}\n"
    "schedule function farses:build_village_fill 4t\n")

# --- главная грунтовая дорога (x -135..148, z=0, ширина 3) ---
fill(-135,0,-1,148,0,1,"minecraft:dirt_path")
fill(-135,-1,-1,148,-1,1,"minecraft:dirt")

# --- указатель на входе ---
setb(-136,0,0,"minecraft:oak_log")
setb(-136,1,0,"minecraft:oak_log")
setb(-135,1,1,"minecraft:oak_wall_sign[facing=east,waterlogged=false]")
setb(-134,0,-2,"minecraft:oak_stairs[facing=east,waterlogged=false]")

# --- конторка при входе (писарь) ---
setb(-130,0,3,"minecraft:barrel")
setb(-129,0,3,"minecraft:oak_stairs[facing=north,waterlogged=false]")
setb(-130,0,2,"minecraft:lantern")

# --- изба ---
def izba(x1,z1,sx,sz,h,wall,floor,roof,sxr=-1,szr=-1,shut_color="oak_trapdoor"):
    x2=x1+sx-1; z2=z1+sz-1
    fill(x1,-1,z1,x2,-1,z2,floor)                          # каменный/дощатый пол
    fill(x1,-2,z1,x2,-2,z2,"minecraft:cobblestone")         # фундамент
    fill(x1,0,z1,x2,h-1,z1,wall)                            # 4 стены
    fill(x1,0,z2,x2,h-1,z2,wall)
    fill(x1,0,z1+1,x1,h-1,z2,wall)
    fill(x2,0,z1+1,x2,h-1,z2,wall)
    for (cx,cz) in [(x1,z1),(x2,z1),(x1,z2),(x2,z2)]:
        fill(cx,0,cz,cx,h-1,cz,"minecraft:oak_log")
    # крыша — скатная из slabs
    roof2 = x2 if sxr<0 else sxr
    roof3 = z2 if szr<0 else szr
    apex = h
    span = max(sx,1)
    for i in range(span):
        scale = i if i<=(span-1)//2 else span-1-i
        if scale==0: continue
        fill(x1+i,apex+0,z1, x1+i,apex+1,roof3,roof)
        fill(x2-i,apex+0,z1, x2-i,apex+1,roof3,roof)
    # дверь (юг, по центру)
    dz=(z1+z2)//2
    setb((x1+x2)//2,0,z2,"minecraft:oak_door[hinge=right,facing=north,open=false,half=lower]")
    setb((x1+x2)//2,1,z2,"minecraft:oak_door[hinge=left,facing=north,open=false,half=upper]")
    # окна со ставнями
    for (wx,wz,dx,dz2) in [(x1,dz,0,1),(x2,dz,0,1),( (x1+x2)//2, z1, 1,0),( (x1+x2)//2, z2, 1,0)]:
        pass
    # ставни-люки
    setb(x1-0,1,(z1+z2)//2,f"minecraft:{shut_color}[half=top,facing=west,open=false]")
    setb(x2+0,1,(z1+z2)//2,f"minecraft:{shut_color}[half=top,facing=east,open=false]")
    return x1,z1,x2,z2

def izba_basic(x1,z1,h=4):
    izba(x1,z1,9,7,h,"minecraft:oak_planks","minecraft:oak_planks","minecraft:spruce_slab",
         shut_color="spruce_trapdoor")

# дома вдоль дороги (север и юг)
izba_basic(-105,-16)   # Жанна
izba_basic(-59,12)     # Дарья
izba_basic(-12,-16)    # «чувак»
izba_basic(34,12)      # сосед
izba_basic(88,-16)     # сосед

# двор Жанны — свежеокрашенный забор (новая ель vs старый дуб)
for i in range(-114,-106):
    setb(i,0,-12,"minecraft:spruce_fence")
for i in range(-109,-100):
    setb(-112,0,i,"minecraft:oak_fence")

# --- дом Шкифа (отец Лео, инженер) — крупнее, с подвалом ---
SX1,SZ1,SX2,SZ2 = 96,-24, 109,-10
fill(SX1,-1,SZ1,SX2,-1,SZ2,"minecraft:oak_planks")
fill(SX1,-2,SZ1,SX2,-2,SZ2,"minecraft:stone_bricks")
fill(SX1,0,SZ1,SX2,0,SZ1,"minecraft:oak_log")
fill(SX1,0,SZ2,SX2,0,SZ2,"minecraft:oak_log")
fill(SX1,0,SZ1+1,SX1,0,SZ2,"minecraft:oak_log")
fill(SX2,0,SZ1+1,SX2,0,SZ2,"minecraft:oak_log")
fill(SX1,1,SZ1,SX2,1,SZ1,"minecraft:spruce_planks")
fill(SX1,1,SZ2,SX2,1,SZ2,"minecraft:spruce_planks")
fill(SX1,1,SZ1+1,SX1,1,SZ2,"minecraft:spruce_planks")
fill(SX2,1,SZ1+1,SX2,1,SZ2,"minecraft:spruce_planks")
# второй этаж (мастерская): пол, стены выше
fill(SX1,2,SZ1,SX2,2,SZ2,"minecraft:oak_planks")
fill(SX1,3,SZ1,SX2,3,SZ1,"minecraft:spruce_planks")
fill(SX1,3,SZ2,SX2,3,SZ2,"minecraft:spruce_planks")
fill(SX1,3,SZ1+1,SX1,3,SZ2,"minecraft:spruce_planks")
fill(SX2,3,SZ1+1,SX2,3,SZ2,"minecraft:spruce_planks")
# крыша из досок/брёвен
fill(SX1-1,4,SZ1, SX2+1,4,SZ2,"minecraft:spruce_slab")
# механизмы Create: верстак, печки, пресс-андезит
setb(SX1+1,1,SZ1+1,"minecraft:crafting_table")
setb(SX1+3,1,SZ1+1,"minecraft:furnace")
setb(SX1+5,1,SZ1+1,"minecraft:furnace")
for i in range(SX1+1,SX2):
    for j in range(SZ1+1,SZ2):
        if (i+j)%7==0:
            setb(i,2,j,"minecraft:polished_andesite")
# подвал (выемка под мастерскую) с секретным выходом
fill(SX1, -3, SZ1, SX2, -2, SZ2,"minecraft:air")
fill(SX1, -2, SZ1, SX2, -2, SZ2,"minecraft:polished_andesite")
setb(SX1, -1, SZ1+1,"minecraft:lantern")
setb(SX1, -1, SZ1+2,"minecraft:crafting_table")
# вход в подвал (люк сзади)
setb((SX1+SX2)//2,0,SZ2,"minecraft:oak_door[hinge=right,facing=north,open=false,half=lower]")
setb((SX1+SX2)//2,1,SZ2,"minecraft:oak_door[hinge=left,facing=north,open=false,half=upper]")
# тайный выход: туннель на север (дыра)
for i in range(0,8):
    setb(SX1+3,-2,SZ1-1-i,"minecraft:cave_air")
    setb(SX1+3,-3,SZ1-1-i,"minecraft:cobblestone")
# фонарь у дома Шкифа
setb(SX1-1,0,SZ1-1,"minecraft:dark_oak_fence")
setb(SX1-1,1,SZ1-1,"minecraft:lantern")

# --- дом бабушки Марии (двухэтажный, в конце дороги) ---
MX1,MZ1,MX2,MZ2 = 124,-12, 145,12
fill(MX1,-1,MZ1,MX2,-1,MZ2,"minecraft:oak_planks")   # пол 1
fill(MX1,-2,MZ1,MX2,-2,MZ2,"minecraft:cobblestone")  # фундамент
# стены 1 этажа (кладовая)
fill(MX1,0,MZ1,MX2,2,MZ1,"minecraft:oak_log")
fill(MX1,0,MZ2,MX2,2,MZ2,"minecraft:oak_log")
fill(MX1,0,MZ1+1,MX1,2,MZ2,"minecraft:oak_log")
fill(MX2,0,MZ1+1,MX2,2,MZ2,"minecraft:oak_log")
# перекрытие -> пол 2
fill(MX1,3,MZ1,MX2,3,MZ2,"minecraft:oak_planks")
# стены 2 этажа (жилая комната)
fill(MX1,4,MZ1,MX2,6,MZ1,"minecraft:oak_planks")
fill(MX1,4,MZ2,MX2,6,MZ2,"minecraft:oak_planks")
fill(MX1,4,MZ1+1,MX1,6,MZ2,"minecraft:oak_planks")
fill(MX2,4,MZ1+1,MX2,6,MZ2,"minecraft:oak_planks")
# крыша + закрытый чердак
fill(MX1-1,7,MZ1,MX2+1,7,MZ2,"minecraft:spruce_planks")
for i in range(9):
    fill(MX1+i,7,MZ1, MX2-i,8,MZ2,"minecraft:spruce_slab")
# мебель: большая кровать, диван, шкаф с люком
setb(MX1+2,4,MZ1+1,"minecraft:white_bed[part=head,facing=north]")
setb(MX1+2,4,MZ1+0,"minecraft:white_bed[part=foot,facing=north]")
setb(MX1+5,4,MZ1+1,"minecraft:red_carpet")
setb(MX1+5,4,MZ1+2,"minecraft:red_carpet")
setb(MX1+5,4,MZ1+3,"minecraft:red_wool")
setb(MX1+5,4,MZ1+4,"minecraft:white_wool")
setb(MX1+9,4,MZ1+3,"minecraft:oak_planks")  # шкаф
setb(MX1+8,4,MZ1+3,"minecraft:oak_planks")
setb(MX1+9,5,MZ1+3,"minecraft:oak_trapdoor[half=top,facing=south,open=false]")
# кладовая: бочки, припасы
setb(MX1+2,0,MZ1+1,"minecraft:barrel")
setb(MX1+3,0,MZ1+1,"minecraft:barrel")
setb(MX1+2,0,MZ1+2,"minecraft:wheat")
# задний двор: куры, огород
setb(146,0, -4,"minecraft:grass_block")
setb(146,1, -4,"minecraft:short_grass")
for (ccx,ccz) in [(146,-6),(147,-7),(147,-8)]:
    setb(ccx,0,ccz,"minecraft:grass_block")
setb(147,0,-9,"minecraft:lantern")
# фонарь у крыльца
setb(142,0,14,"minecraft:dark_oak_fence")
setb(142,1,14,"minecraft:lantern")
# собаки Нави и Ксе
OUT.append(f"summon minecraft:wolf {BX+139} {BY} {BZ+5} {{CustomName:'\"Нави\"',Sitting:1b,Awake:1b,FieldAware:0b,CollarColor:0,CanPickUpLoot:0,Tame:0b}}")
OUT.append(f"summon minecraft:wolf {BX+141} {BY} {BZ+6} {{CustomName:'\"Ксе\"',Sitting:1b,Awake:1b,FieldAware:0b,CollarColor:0,CanPickUpLoot:0,Tame:0b}}")
# куры
for (ckx,ckz) in [(146,-5),(147,-5),(148,-6)]:
    OUT.append(f"summon minecraft:chicken {BX+ckx} {BY} {BZ+ckz} {{Age:0}}")

# --- дом деда Терракота (баррикадированный, на отшибе) ---
TX1,TZ1,TX2,TZ2 = -40,-58, -24,-44
fill(TX1,-1,TZ1,TX2,-1,TZ2,"minecraft:spruce_planks")
fill(TX1,-2,TZ1,TX2,-2,TZ2,"minecraft:mossy_cobblestone")
fill(TX1,0,TZ1,TX2,0,TZ1,"minecraft:spruce_log")
fill(TX1,0,TZ2,TX2,0,TZ2,"minecraft:spruce_log")
fill(TX1,0,TZ1+1,TX1,0,TZ2,"minecraft:spruce_log")
fill(TX2,0,TZ1+1,TX2,0,TZ2,"minecraft:spruce_log")
fill(TX1,1,TZ1,TX2,1,TZ1,"minecraft:dark_oak_planks")
fill(TX1,1,TZ2,TX2,1,TZ2,"minecraft:dark_oak_planks")
fill(TX1,1,TZ1+1,TX1,1,TZ2,"minecraft:dark_oak_planks")
fill(TX2,1,TZ1+1,TX2,1,TZ2,"minecraft:dark_oak_planks")
# крыша глухая, тёмная
fill(TX1-1,2,TZ1-1,TX2+1,2,TZ2+1,"minecraft:deepslate_tiles")
# дверь заколочена досками, окна заперты
fill((TX1+TX2)//2,0,TZ2,(TX1+TX2)//2,1,TZ2,"minecraft:oak_planks")
setb((TX1+TX2)//2,0,TZ2,"minecraft:oak_trapdoor[half=bottom,facing=south,open=false]")
for i in range(TX1+2,TX2,3):
    setb(i,1,TZ1,"minecraft:spruce_trapdoor[half=top,facing=south,open=false]")
# кресло внутри (видно в щёлки)
setb((TX1+TX2)//2,0,(TZ1+TZ2)//2,"minecraft:oak_stairs[facing=west]")
# яма с барьером рядом
fill(TX1-4,-2,TZ1-2,TX1-2,1,TZ2+2,"minecraft:cave_air")
fill(TX1-4,-1,TZ1-2,TX1-2,-1,TZ2+2,"minecraft:deepslate_tiles")
setb(TX1-3,0,(TZ1+TZ2)//2,"minecraft:lantern")

# --- церковь с колокольней (юг деревни) ---
CHX1,CHZ1 = 24, 26
CHW, CHD = 13, 11
fill(CHX1,-1,CHZ1,CHX1+CHW-1,-1,CHZ1+CHD-1,"minecraft:cobblestone")
fill(CHX1,-2,CHZ1,CHX1+CHW-1,-2,CHZ1+CHD-1,"minecraft:stone_bricks")
# стены
for i in range(0,4):
    fill(CHX1+i,0,CHZ1,CHX1+i,0,CHZ1+CHD-1,"minecraft:cobblestone")
    fill(CHX1+i,1,CHZ1,CHX1+i,1,CHZ1+CHD-1,"minecraft:cobblestone")
# высокий неф (каменные стены выше, окна-луки)
fill(CHX1,2,CHZ1, CHX1+CHW-1,2,CHZ1,"minecraft:stone_bricks")
fill(CHX1,2,CHZ1+CHD-1, CHX1+CHW-1,2,CHZ1+CHD-1,"minecraft:stone_bricks")
fill(CHX1,2,CHZ1, CHX1,2,CHZ1+CHD-1,"minecraft:stone_bricks")
fill(CHX1+CHW-1,2,CHZ1, CHX1+CHW-1,2,CHZ1+CHD-1,"minecraft:stone_bricks")
# алтарь и свечи
setb((CHX1+CHW)//2,0,(CHZ1+CHD)//2,"minecraft:stone_bricks")
setb((CHX1+CHW)//2,1,(CHZ1+CHD)//2,"minecraft:candle")
setb((CHX1+CHW)//2,2,(CHZ1+CHD)//2,"minecraft:candle")
setb((CHX1+CHW)//2-1,1,(CHZ1+CHD)//2,"minecraft:candle")
setb((CHX1+CHW)//2+1,1,(CHZ1+CHD)//2,"minecraft:candle")
# тёмный полумрак — факелы по углам
for (cx,cz) in [(CHX1+1,CHZ1+2),(CHX1+CHW-2,CHZ1+2),(CHX1+1,CHZ1+CHD-3),(CHX1+CHW-2,CHZ1+CHD-3)]:
    setb(cx,2,cz,"minecraft:torch")
# колокольня (башня с юго-востока)
BX2,BZ2 = CHX1+CHW, CHZ1+CHD-4
for yy in range(0,9):
    fill(BX2,yy,BZ2, BX2+2,yy,BZ2+2,"minecraft:stone_bricks")
    if yy in (1,2,3,4):
        fill(BX2+1,yy,BZ2+1, BX2+1,yy,BZ2+1,"minecraft:air")
    if yy==8:
        fill(BX2,yy+1,BZ2, BX2+2,yy+1,BZ2+2,"minecraft:stone_brick_wall")
setb(BX2+1,9,BZ2+1,"minecraft:lantern")
# дверь церкви
setb((CHX1+CHW)//2,0,CHZ1+CHD-1,"minecraft:oak_door[hinge=right,facing=north,open=false,half=lower]")
setb((CHX1+CHW)//2,1,CHZ1+CHD-1,"minecraft:oak_door[hinge=left,facing=north,open=false,half=upper]")

# --- ветряная мельница (уже существует в деревне) ---
WMX,WMZ = -108, -44
for yy in range(0,8):
    fill(WMX,yy,WMZ, WMX+3,yy,WMZ+3,"minecraft:oak_log")
    fill(WMX+1,yy,WMZ+1, WMX+2,yy,WMZ+2,"minecraft:air")
fill(WMX,7,WMZ, WMX+3,7,WMZ+3,"minecraft:oak_planks")
# лопасти
setb(WMX+1,8,WMZ+1,"minecraft:oak_log")
setb(WMX-3,8,WMZ+1,"minecraft:oak_fence")
setb(WMX-4,8,WMZ+1,"minecraft:oak_planks")
setb(WMX+5,8,WMZ+1,"minecraft:oak_fence")
setb(WMX+6,8,WMZ+1,"minecraft:oak_planks")
setb(WMX+1,8,WMZ-3,"minecraft:oak_fence")
setb(WMX+1,8,WMZ-4,"minecraft:oak_planks")
setb(WMX+1,8,WMZ+5,"minecraft:oak_fence")
setb(WMX+1,8,WMZ+6,"minecraft:oak_planks")
# лестница и дверь
setb(WMX+1,0,WMZ,"minecraft:oak_door[hinge=right,facing=south,open=false,half=lower]")
setb(WMX+1,1,WMZ,"minecraft:oak_door[hinge=left,facing=south,open=false,half=upper]")
for yy in range(1,6):
    setb(WMX+1,yy,WMZ+1,"minecraft:ladder[facing=north]")

# --- участок главного героя (заросший пустырь со старым забором) ---
FX1,FZ1,FX2,FZ2 = -70, 18, -30, 44
fill(FX1,0,FZ1,FX2,0,FZ2,"minecraft:short_grass")
fill(FX1,-1,FZ1,FX2,-1,FZ2,"minecraft:dirt")
for i in range(FX1,FX2+1,2):
    setb(i,1,FZ1,"minecraft:fern")
    setb(i,1,FZ2,"minecraft:short_grass")
for i in range(FZ1,FZ2+1,2):
    setb(FX1,1,i,"minecraft:short_grass")
    setb(FX2,1,i,"minecraft:fern")
# старый полуразрушенный забор (часть столбов выпала)
for i in range(FX1,FX2+1,3):
    if (i+FX1)%4!=0:
        setb(i,0,FZ1-1,"minecraft:oak_fence")
        setb(i,0,FZ2+1,"minecraft:oak_fence")
for i in range(FZ1,FZ2+1,3):
    if (i+FX1)%5!=0:
        setb(FX1-1,0,i,"minecraft:oak_fence")
        setb(FX2+1,0,i,"minecraft:oak_fence")
# лес рядом (деревья у юго-запада участка)
for (tx,tz) in [(FX1-3,FZ2+3),(FX1-2,FZ2+5),(FX2+2,FZ2+2),(FX2-2,FZ2+5)]:
    setb(tx,0,tz,"minecraft:oak_sapling")
# дорожка к участку
fill(FX2+1,0,-2, FX2+6,0,-1,"minecraft:dirt_path")

# --- подсолнухи/кусты вдоль дороги ---
for i in range(-20,140,4):
    if i%3!=0:
        setb(i,1,-3,"minecraft:fern")
for i in range(-10,120,5):
    if i%2==0:
        setb(i,1,3,"minecraft:sunflower")

# --- жители деревни ---
village_names = [
    ("minecraft:librarian", -105, -15, "Жанна"),
    ("minecraft:shepherd", -59, 13, "Дарья"),
    ("minecraft:armorer", -12, -15, "Чувак"),
    ("minecraft:toolsmith", 96, -22, "Шкиф"),
    ("minecraft:fisherman", 90, -12, "Лео"),
    ("minecraft:farmer", 124, -11, "Бабушка Мария"),
    ("minecraft:cleric", -32, -46, "Дед Терракот"),
    ("minecraft:nitwit", -130, 3, "Писарь"),
]
for prof,dx,dz,voicer in village_names:
    OUT.append(f"summon minecraft:villager {BX+dx} {BY-0} {BZ+dz} {{CustomName:'\"{voicer}\"',VillagerData:{{level:1,profession:\"{prof}\",type:\"minecraft:plains\"}},DespawnDelay:99999}}")

OUT.append(f"setworldspawn {BX} {BY} {BZ}")
OUT.append("scoreboard players set farses_built farses_flags 1")

open(os.path.join(DP,"build_village_fill.mcfunction"),"w").write(
    "\n".join(OUT) + "\n"
    "forceload remove " + f"{VX1} {VZ1} {VX2} {VZ2}" + "\n"
    "schedule function farses:build_road_load 2t\n")

# ================= ГОРОД АЛЛАГАН (юг) =================
# Дорога от деревни на юг к городу: z от 0 (деревня) до 340 (городская граница)
# Город: центр ~(0, 330..470), x от -100..150, z от 300..500 (южная часть плато, BZ+HALF=1572)
CITYROAD_LEN = 330
rfill(-2,0,-60, 2,0,CITYROAD_LEN, "minecraft:dirt_path")
rfill(-2,-1,-60, 2,-1,CITYROAD_LEN, "minecraft:dirt")
# фонари вдоль дороги
for j in range(20, CITYROAD_LEN, 60):
    rsetb(-3,0,j,"minecraft:stone_brick_wall")
    rsetb(-3,1,j,"minecraft:lantern")

# --- городская стена (периметр) ---
GX1,GZ1,GX2,GZ2 = -100, 330, 140, 470
# основание стены
cfill(GX1-1,-1,GZ1-1, GX2+1, 2, GZ2+1,"minecraft:cobblestone")
# периметр стены высотой 3
for zz in range(GZ1-1, GZ2+2):
    if (zz-GZ1) % 4 != 0:
        for hh in range(3,8):
            csetb(GX1-1,hh,zz,"minecraft:stone_bricks")
            csetb(GX2+1,hh,zz,"minecraft:stone_bricks")
        csetb(GX1-1,3,zz,"minecraft:stone_brick_wall")
        csetb(GX2+1,3,zz,"minecraft:stone_brick_wall")
for xx in range(GX1-1, GX2+2):
    if (xx-GX1) % 4 != 0:
        for hh in range(3,8):
            csetb(xx,hh,GZ1-1,"minecraft:stone_bricks")
            csetb(xx,hh,GZ2+1,"minecraft:stone_bricks")
        csetb(xx,3,GZ1-1,"minecraft:stone_brick_wall")
        csetb(xx,3,GZ2+1,"minecraft:stone_brick_wall")
# углы-башни
for (tx,tz) in [(GX1-1,GZ1-1),(GX1-1,GZ2+1),(GX2+1,GZ1-1),(GX2+1,GZ2+1)]:
    for hh in range(3,11):
        for dx in (0,1):
            for dz in (0,1):
                csetb(tx+dx,hh,tz+dz,"minecraft:stone_bricks")
    csetb(tx,10,tz,"minecraft:lantern")
# очистка внутренней площадки
cfill(GX1,0,GZ1, GX2,0,GZ2,"minecraft:cobblestone")
cfill(GX1,-1,GZ1, GX2,-1,GZ2,"minecraft:stone")

# --- главная улица и канал ---
for x in range(GX1, GX2+1):
    csetb(x,0,414,"minecraft:stone")
    csetb(x,0,415,"minecraft:stone")
# канал (водный путь для лодки, с востока на запад, углублённый)
cfill(GX1+1,-2,392, GX2-1,0,404,"minecraft:air")       # выемка (обычный воздух, чтобы вода заменилась)
cfill(GX1+1,-3,392, GX2-1,-3,404,"minecraft:gravel")     # дно
cfill(GX1+1,-2,392, GX2-1,-2,404,"minecraft:water")      # вода
cfill(GX1+1,-2,392, GX2-1,-2,392,"minecraft:cobblestone")
cfill(GX1+1,-2,404, GX2-1,-2,404,"minecraft:cobblestone")

# --- улицы (мощёные) ---
for z in range(GZ1, GZ2+1):
    if z % 16 in (0,1,2):
        for x in range(GX1, GX2+1):
            csetb(x,0,z,"minecraft:stone")
# продольная главная артерия
for x in range(GX1, int((GX1+GX2)/2)+1, 1):
    csetb(x,0,430,"minecraft:stone_bricks")
    csetb(x,0,431,"minecraft:stone_bricks")

# --- дома города (плотная каменная застройка) ---
def ghouse(x1,z1,sx,sz,wall="minecraft:stone_bricks",roof="minecraft:cobblestone",floors=2):
    x2=x1+sx-1; z2=z1+sz-1
    cfill(x1,0,z1,x2,0,z2,wall)
    # этажи
    for f in range(0,floors*2,2):
        cfill(x1,f,z1,x2,f,z2,wall)
    cfill(x1,1,z1,x2+1,1,z2,"minecraft:oak_planks")
    # outer walls
    for dx in range(x1,x2+1):
        csetb(dx,1,z1,wall)
        csetb(dx,1,z2,wall)
    for dz in range(z1,z2+1):
        csetb(x1,1,dz,wall)
        csetb(x2,1,dz,wall)
    # внутренняя перегородка
    cfill(x1,1,int((z1+z2)/2),x2,1,int((z1+z2)/2),wall)
    # крыша — тёмная плоская с парапетом
    cfill(x1-1,2,z1-1,x2+1,2,z2+1,roof)
    cfill(x1,2,z1,x2,2,z2,"minecraft:deepslate_tiles")
    # окна-бойницы (стены глухие, дыры)
    csetb(int((x1+x2)/2),1,z1,"minecraft:air")
    csetb(int((x1+x2)/2)+1,1,z1,"minecraft:air")
    csetb(int((x1+x2)/2),1,z2,"minecraft:air")
    # дверь
    csetb(int((x1+x2)/2)+1,0,z2,"minecraft:dark_oak_door[hinge=right,facing=north,open=false,half=lower]" if floors else "")
    return x1,z1,x2,z2

# жилые кварталы вокруг канала
ghouse(-95,342,11,9)     # западный квартал
ghouse(-80,352,10,8)
ghouse(-66,342,11,9)
ghouse(-95,358,11,9)
ghouse(-80,368,10,8)
ghouse(-66,358,11,9)
# восточные кварталы
ghouse(120,342,11,9)
ghouse(134,352,10,8)
ghouse(148,342,11,9)
ghouse(120,358,11,9)
ghouse(134,368,10,8)
ghouse(148,358,11,9)
# северные дома
ghouse(-95,412,11,9)
ghouse(-80,424,10,8)
ghouse(120,412,11,9)
ghouse(134,424,10,8)

# --- таверна (справа у ворот) ---
ghouse(30,336,22,14,wall="minecraft:cobblestone",roof="minecraft:spruce_slab")
csetb(41,0,350,"minecraft:barrel")
csetb(42,0,350,"minecraft:barrel")

# --- казарма стражи "гуси" ---
ghouse(80,336,34,14,wall="minecraft:stone_bricks",roof="minecraft:deepslate_tiles")
for i in range(80,114,2):
    csetb(i,1,337,"minecraft:iron_bars")
# стражники-гуси (големы-стражи у ворот)
CITY.append("summon minecraft:iron_golem 544 66 1418 {CustomName:'\"Гусь\"',Glowing:0b}")
CITY.append("summon minecraft:iron_golem 546 66 1418 {CustomName:'\"Гусак\"',Glowing:0b}")

# --- торговые ряды на главной артерии ---
for off in range(0,3):
    csetb(-20+off*8,0,432,"minecraft:oak_planks")
    csetb(-20+off*8,0,433,"minecraft:barrel")
    csetb(20+off*8,0,432,"minecraft:oak_planks")
    csetb(20+off*8,0,433,"minecraft:barrel")

# --- фонари в городе (редкие, тусклые) ---
for (lx,lz) in [(-45,414),(0,414),(45,414),(78,380),(-78,380),(0,342),(0,470)]:
    csetb(lx,0,lz,"minecraft:stone_brick_wall")
    csetb(lx,1,lz,"minecraft:lantern")

# --- гранита/мрачность: узкие проходы между кварталами ---
csetb(-105,0,346,"minecraft:stone_brick_wall")
csetb(-105,0,364,"minecraft:stone_brick_wall")
csetb(155,0,346,"minecraft:stone_brick_wall")
csetb(155,0,364,"minecraft:stone_brick_wall")

# --- мостики через канал ---
for mx in range(-95,145,22):
    csetb(mx,0,400,"minecraft:cobblestone")
    csetb(mx,0,399,"minecraft:cobblestone")
    csetb(mx+1,0,400,"minecraft:stone_bricks")
    csetb(mx+1,0,399,"minecraft:stone_bricks")
    csetb(mx,1,400,"minecraft:cobblestone")

# --- городской флаг (scoreboard) ---
CITY.append("scoreboard objectives add farses_city dummy")
CITY.append("scoreboard players set farses_city flags 1")

# файлы волн города и дороги
open(os.path.join(DP,"build_road_load.mcfunction"),"w").write(
    "forceload add 510 960 579 1512\n"       # полоса дороги (блочные координаты)
    "schedule function farses:build_road_fill 4t\n")
open(os.path.join(DP,"build_road_fill.mcfunction"),"w").write(
    "\n".join(ROAD) + "\n"
    "forceload remove 510 960 579 1512\n"
    "schedule function farses:build_city_load 2t\n")
open(os.path.join(DP,"build_city_load.mcfunction"),"w").write(
    "forceload add 444 1390 685 1543\n"
    "schedule function farses:build_city_fill_0 4t\n")
# город разбит на несколько функций (лимит команд за тик)
CITY_CHUNK = 1500
for ci in range(0, (len(CITY)+CITY_CHUNK-1)//CITY_CHUNK):
    chunk = CITY[ci*CITY_CHUNK:(ci+1)*CITY_CHUNK]
    nxt = f"build_city_fill_{ci+1}" if (ci+1)*CITY_CHUNK < len(CITY) else "build_city_done"
    open(os.path.join(DP,f"build_city_fill_{ci}.mcfunction"),"w").write(
        "\n".join(chunk) + "\n"
        "schedule function farses:"+nxt+" 2t\n")
open(os.path.join(DP,"build_city_fill.mcfunction"),"w").write(
    "schedule function farses:build_city_fill_0 1t\n")
open(os.path.join(DP,"build_city_done.mcfunction"),"w").write(
    "forceload remove 444 1390 685 1543\n"
    "schedule function farses:build_mountains_load 2t\n")

print("village commands:", len(OUT), "road:", len(ROAD), "city:", len(CITY))

# ================= ГОРНОЕ КОЛЬЦО (32 пика по периметру плато) =================
MTL = []  # горный буфер
def mtfill(x1,y1,z1,x2,y2,z2,block):
    MTL.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace air")
    MTL.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:grass_block")
    MTL.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:dirt")
    MTL.append(f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:stone")

def mtset(x,y,z,block):
    MTL.append(f"setblock {BX+x} {BY+y} {BZ+z} {block} replace")

import random
random.seed(21)
PEAKS = []
EDGE = 460              # расстояние от центра до хребта (край плато HALF=500)
NPEAKS = 32
_gx1,_gz1,_gx2,_gz2 = GX1,GZ1,GX2,GZ2
def _city_conflict(px,pz,radius=26):
    # город: x -100..140, z 330..471 (с запасом на стену/башни)
    if GZ1-24 <= pz <= GZ2+24 and GX1-24 <= px <= GX2+24:
        return True
    return False
for k in range(NPEAKS):
    for _try in range(60):
        ang = 2*math.pi*k/NPEAKS + random.uniform(-0.08,0.08)
        r = EDGE + random.randint(-12,12)
        px = int(r * math.cos(ang))
        pz = int(r * math.sin(ang))
        hgt = random.randint(8,16)
        half = random.randint(14,22)
        if _city_conflict(px,pz,half):
            continue
        break
    else:
        # южный сектор перекрыт городом: ставим по бокам
        px = random.choice((-472, 472))
        pz = random.randint(GZ1+10, GZ2-10)
        hgt = random.randint(8,14)
        half = random.randint(14,18)
    PEAKS.append((px,pz,hgt,half,ang))

# основание: заливаем горы каменным основанием + вершины конусом
# разбивка на группы для forceload (лимит 256 чанков за вызов)
def _mt_fill_chunk(x1,y1,z1,x2,y2,z2,block):
    return (f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace air",
            f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:grass_block",
            f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:dirt",
            f"fill {BX+x1} {BY+y1} {BZ+z1} {BX+x2} {BY+y2} {BZ+z2} {block} replace minecraft:stone")

NGROUPS = 16
groups = []
for g in range(NGROUPS):
    grp = PEAKS[g*2:(g+1)*2]
    grp_lines = []
    for (px,pz,hgt,half,ang) in grp:
        lines = []
        minx=10**9; maxx=-10**9; minz=10**9; maxz=-10**9
        minx=min(minx,px-half); maxx=max(maxx,px+half)
        minz=min(minz,pz-half); maxz=max(maxz,pz+half)
        lines += list(_mt_fill_chunk(px-half,0,pz-half, px+half,0,pz+half,"minecraft:stone"))
        lines += list(_mt_fill_chunk(px-half,-1,pz-half, px+half,-1,pz+half,"minecraft:stone"))
        for e in range(0,hgt):
            r = max(half - int(half*e/max(hgt,1)),0)
            if r<=0:
                lines.append(f"setblock {BX+px} {BY+e} {BZ+pz} minecraft:stone replace")
            else:
                lines += list(_mt_fill_chunk(px-r,e,pz-r, px+r,e,pz+r,"minecraft:stone"))
                lines += list(_mt_fill_chunk(px-r,e,pz-r, px+r,e,pz+r,"minecraft:cobblestone"))
        lines += list(_mt_fill_chunk(px-int(half*0.7),hgt,pz-int(half*0.7), px+int(half*0.7),hgt,pz+int(half*0.7),"minecraft:grass_block"))
        top = "minecraft:snow_block" if hgt>10 else "minecraft:gravel"
        lines += list(_mt_fill_chunk(px-int(half*0.35),hgt+1,pz-int(half*0.35), px+int(half*0.35),hgt+1,pz+int(half*0.35),top))
        lines.append(f"setblock {BX+px} {BY+hgt+2} {BZ+pz} {'minecraft:snow_block' if hgt>10 else 'minecraft:stone'} replace")
        for _ in range(4):
            lines.append(f"setblock {BX+px+random.randint(-half//2,half//2)} {BY+hgt} {BZ+pz+random.randint(-half//2,half//2)} minecraft:cobblestone replace")
        # чанковый прямоугольник с запасом, кратный 16
        cx1 = ((BX+minx-16)//16)*16; cx2 = ((BX+maxx+16)//16)*16+15
        cz1 = ((BZ+minz-16)//16)*16; cz2 = ((BZ+maxz+16)//16)*16+15
        nch = ((cx2-cx1+1)//16) * ((cz2-cz1+1)//16)
        groups.append((lines, cx1,cz1,cx2,cz2, nch))
    # если группа из двух пиков всё ещё >256 чанков, держим их отдельно (уже разбили)

# функции гор: загрузка + заливка сектора за сектором
for g,(lines,cx1,cz1,cx2,cz2,nch) in enumerate(groups):
    nxt = f"build_mtn_{g+1}_load" if g+1 < len(groups) else "build_mtn_done"
    open(os.path.join(DP,f"build_mtn_{g}_load.mcfunction"),"w").write(
        f"forceload add {cx1} {cz1} {cx2} {cz2}\n"
        f"schedule function farses:build_mtn_{g}_fill 4t\n")
    open(os.path.join(DP,f"build_mtn_{g}_fill.mcfunction"),"w").write(
        "\n".join(lines) + "\n"
        f"forceload remove {cx1} {cz1} {cx2} {cz2}\n"
        f"schedule function farses:{nxt} 2t\n")
open(os.path.join(DP,"build_mountains_load.mcfunction"),"w").write(
    "schedule function farses:build_mtn_0_load 1t\n")
open(os.path.join(DP,"build_mtn_done.mcfunction"),"w").write(
    "scoreboard players set farses_built farses_flags 1\n"
    "scoreboard players set farses_mountains farses_flags 1\n")
print("mountain groups:", len(groups), "chunks:", [g[5] for g in groups])