const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
function drawRect(color,x,y,w,h){ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}
class MonsterPath{
    constructor(list){
        this.map = list
    }
    draw(){
        for (let i=0; i<this.map.length; i++){
            drawRect('#7d7d7d',this.map[i][0],this.map[i][1],this.map[i][2],this.map[i][3])
        }
    }
}
class Base{
    constructor(x,y){
        this.hp = 100
        this.x = x
        this.y = y
    }
    draw(){
        drawRect('#00ff00',this.x,this.y,100,100)
    }
}
class Txt{
    constructor(x,y,text,color='#000000',fontSize=24,center=true){
        this.x = x
        this.y = y
        this.color = color
        this.font = fontSize+'px Arial'
        ctx.font = this.font
        if (center == true){this.width = ctx.measureText(text).width/2}
        else{this.width = 0}
        this.text = text
        this.height = fontSize/Math.PI
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.font = this.font
        ctx.fillText(this.text,this.x-this.width,this.y+this.height)
    }
}
let a = 0
class Monster{
    constructor(delay){
        this.delay = delay
        this.x = renderer.pathCoords[0][0]+5
        this.y = 900+delay
        this.path = 0
        this.moving = true
    }
    draw(){
        drawRect(this.color,this.x,this.y,40,40)
        drawRect('#ffffff',this.x,this.y-20,40,10)
        drawRect('#ff0000',this.x,this.y-20,(this.hp/this.max_hp)*40,10)
        const X = this.x
        const Y = this.y
        for (let i=0; i<renderer.pathCoords.length-1; i++){
            const { 0:x, 1:y, 2:w, 3:h } = renderer.pathCoords[i]
            if (this.x>=x && this.x<=x+w && this.y>=y && this.y<=y+h && this.moving == true){
                this.path = i
                if (w==50){
                    if(this.y<y+h && this.y>y+5){this.y-=this.speed}
                    else if(this.y<y+5-this.speed){this.y+=this.speed}
                }
                if (h==50){
                    if(this.x<x+w && this.x>x+5){this.x-=this.speed}
                    else if(this.x<x+5){this.x+=this.speed}
                }
            }
        }
        if (X == this.x && Y == this.y){
            this.moving = false
            const { 0:x, 1:y, 2:w, 3:h } = renderer.pathCoords[this.path+1]
            if (w==50){
                if(this.x<x+w*2 && this.x>x+5){this.x-=this.speed}
                else if(this.x<x+5){this.x+=this.speed}
                else{this.moving = true}
                if (this.x<x+5+this.speed*2 && this.x>x+5-this.speed*2){this.x = x+5}
            }
            if (h==50){
                if(this.y<y+h*2 && this.y>y+5){this.y-=this.speed}
                else if(this.y<y+5){this.y+=this.speed}
                else{this.moving = true}
                if (this.y<y+5+this.speed*2 && this.y>y+5-this.speed*2){this.y = y+5}
            }
        }
        if (X == this.x && Y == this.y){
            this.moving = false
            const { 0:x, 1:y, 2:w, 3:h } = renderer.pathCoords[this.path+1]
            if (h==50){
                if(this.x<x+w*2 && this.x>x+5){this.x-=this.speed}
                else if(this.x<x+5){this.x+=this.speed}
                else{this.moving = true}
                if (this.x<x+5+this.speed*2 && this.x>x+5-this.speed*2){this.x = x+5}
            }
            if (w==50){
                if(this.y<y+h*2 && this.y>y+5){this.y-=this.speed}
                else if(this.y<y+5){this.y+=this.speed}
                else{this.moving = true}
                if (this.y<y+5+this.speed*2 && this.y>y+5-this.speed*2){this.y = y+5}
            }
        }
        if (this.x>renderer.base.x && this.y<renderer.base.y+100 && this.x<renderer.base.x+100 && this.y>renderer.base.y){
            renderer.base.hp -= this.dmg
            renderer.monsters.splice(renderer.monsters.indexOf(this),1)
            if (renderer.base.hp<0){renderer.base.hp=0}
        }
    }
}
class BasicBoi extends Monster{
    constructor(delay){
        super(delay)
        this.dmg = 1
        this.max_hp = 30
        this.speed = 3
        this.hp = 30
        this.gold = 1
        this.xp = 0.1
        this.color = '#000000'
        this.armor = 0
    }
}
class TougherBoi extends Monster{
    constructor(delay){
        super(delay)
        this.dmg = 2
        this.max_hp = 120
        this.speed = 2.5
        this.hp = 120
        this.xp = 0.2
        this.gold = 3
        this.armor = 5
        this.color = '#005c00'
    }
}
class SpeedyBoi extends Monster{
    constructor(delay){
        super(delay)
        this.dmg = 3
        this.max_hp = 240
        this.speed = 5
        this.hp = 240
        this.armor = 0
        this.gold = 5
        this.xp = 0.3
        this.color = '#ffff00'
    }
}
class SlowBoi extends Monster{
    constructor(delay){
        super(delay)
        this.dmg = 5
        this.max_hp = 1000
        this.hp = 1000
        this.speed = 1.5
        this.gold = 10
        this.xp = 0.5
        this.color = '#910000'
        this.armor = 10
    }
}
class Button{
    constructor(x,y,text,fn,pageNum,center=false,fontSize=24,height=40){
        this.text = new Txt(x,y+height/2,text,'#000000',fontSize)
        this.height = height
        this.x = x
        this.y = y
        this.width = this.text.width*2+10
        this.text.x += this.width/2
        this.fn = fn
        this.pageNum = pageNum
        a = this.width+this.x+10
        if (center==true){this.x-=this.width/2; this.text.x-=this.width/2}
    }
    draw(){
        drawRect('#0000ff',this.x,this.y,this.width,this.height)
        this.text.draw()
    }
    wasClicked(e){
        const x = e.pageX-10
        const y = e.pageY-10
        if (x>=this.x && x<=this.x+this.width && y>=this.y && y<=this.y+this.height){
            if (this.fn != undefined){this.fn()}
            else if (this.pageNum != undefined){renderer.pageNum=this.pageNum}
        }
    }
}
class MonsterInfo{
    constructor(x,y,dmg,hp,armor,speed,color,wave,name){
        this.x = x
        this.y = y
        this.color = color
        this.wave = wave
        this.txt = [new Txt(x+50,y-30,name,'#000000',36),new Txt(x+50,y+115,'HP -- '+hp), new Txt(x+50,y+145,'Armor -- '+armor), 
        new Txt(x+50,y+175,'Speed -- '+speed), new Txt(x+50,y+205,'Damage -- '+dmg)]
    }
    draw(){
        if (renderer.wave>=this.wave){
            drawRect(this.color,this.x,this.y,100,100)
            for (let i=0; i<this.txt.length; i++){this.txt[i].draw()}
        }
    }
}
class Tower{
    constructor(dmg,fireRate,range,cost,color,name,bulletSpeed,x,y){
        this.dmg = dmg
        this.dmg1 = dmg
        this.fireRate1 = fireRate
        this.range1 = range
        this.fireRate = fireRate
        this.range = range
        this.bulletSpeed1 = bulletSpeed
        this.cost = cost*0.75
        this.cost1 = cost/2.5
        this.cost2 = cost/2.5
        this.cost3 = cost/2.5
        this.cost4 = cost/2.5
        this.color = color
        this.name = name
        this.x = x
        this.y = y
        this.bullets = []
        this.rotate = [30,0]
        this.time = 0
        this.bulletSpeed = bulletSpeed
        this.showUpgrades = false
    }
    draw(){
        drawRect(this.color,this.x+5,this.y+5,40,40)
        ctx.beginPath()
        ctx.moveTo(this.x+25,this.y+25)
        ctx.lineTo(this.x+this.rotate[0]+25,this.y+25+this.rotate[1])
        ctx.lineWidth = 7.5
        ctx.stroke()
        ctx.lineWidth = 1
        const closestMonster = renderer.monsters.find(monster => Math.sqrt(Math.pow((this.x+25)-(monster.x+20),2)+Math.pow((this.y+25)-(monster.y+20),2))<=this.range)
        if (closestMonster != undefined){
            const x_dif = (closestMonster.x+20)-(this.x+25)
            const y_dif = (closestMonster.y+20)-(this.y+25)
            const total_dist = Math.sqrt(Math.pow(x_dif,2)+Math.pow(y_dif,2))
            this.rotate = [(x_dif/total_dist)*30,(y_dif/total_dist)*30]
            if (this.time<60/this.fireRate){this.time+=1}
            else{this.time=0; this.bullets.push(new Bullet(this.x+25,this.y+25,this.rotate[0]/(30/this.bulletSpeed),this.rotate[1]/(30/this.bulletSpeed),this.dmg,this.range))}
        }
        for (let i=0; i<this.bullets.length; i++){
            const hit = this.bullets[i].draw()
            if (hit==true){this.bullets.splice(i,1)}
        }
        if (this.showUpgrades == true){
            let x = this.x
            let y = this.y
            if (this.x<150){}
            drawRect('#c9c9c9',this.x-125,this.y-200,300,200)
            const txt = [new Txt(this.x+25,this.y-190,this.name,'#000000',24),new Txt(this.x-125,this.y-160,'Damage -- '+this.dmg,'#000000',20,false),
            new Txt(this.x-125,this.y-130,'Fire Rate -- '+this.fireRate+'/s','#000000',19,false),new Txt(this.x-125,this.y-100,'Range -- '+this.range,'#000000',20,false),
            new Txt(this.x-125,this.y-70,'Bullet Speed -- '+this.bulletSpeed.toFixed(1),'#000000',17,false)]
            const buttons = [new Button(this.x+25,this.y-40,'Sell for '+this.cost.toFixed(0)+' gold',undefined,undefined,true,18,25),
            new Button(this.x+25,this.y-170,'Upgrade for '+this.cost1.toFixed(0)+' gold',undefined,undefined,false,14,20),new Button(this.x+25,this.y-140,'Upgrade for '+this.cost2.toFixed(0)+' gold',undefined,undefined,false,14,20),
            new Button(this.x+25,this.y-110,'Upgrade for '+this.cost3.toFixed(0)+' gold',undefined,undefined,false,14,20), new Button(this.x+25,this.y-80,'Upgrade for '+this.cost4.toFixed(0)+' gold',undefined,undefined,false,14,20)]
            for (let i=0; i<txt.length; i++){txt[i].draw()}
            for (let i=0; i<buttons.length; i++){buttons[i].draw()}
        }
    }
    wasClicked(e){
        console.log(this.dmg)
        const { pageX:x, pageY:y } = e
        const tower = renderer.towers.find(tower => tower === this)
        if (this.showUpgrades==true){
            const buttons = [new Button(this.x+25,this.y-40,'Sell for '+this.cost.toFixed(0)+' gold',function(){
                renderer.gold += Math.round(tower.cost)
                renderer.towers.splice(renderer.towers.indexOf(tower),1)
            },undefined,true,18,25),
            new Button(this.x+25,this.y-170,'Upgrade for '+this.cost1.toFixed(0)+' gold',function(){
                if (renderer.gold>=Math.floor(tower.cost1)){
                    tower.dmg+=tower.dmg1/2
                    tower.cost+=tower.cost1*0.75
                    renderer.gold-=tower.cost1.toFixed(0)
                    tower.cost1=Math.pow(tower.cost1,1.05)+2
                }
                else{
                    alert('Not enought gold!\nYou have '+renderer.gold+' gold')
                }
                setTimeout(() => {tower.showUpgrades=true},0)
            },undefined,false,14,20),
            new Button(this.x+25,this.y-140,'Upgrade for '+this.cost2.toFixed(0)+' gold',function(){
                if (renderer.gold>=Math.floor(tower.cost2)){
                    tower.fireRate+=tower.fireRate1/2
                    tower.cost+=tower.cost2*0.75
                    renderer.gold-=tower.cost2.toFixed(0)
                    tower.cost2=Math.pow(tower.cost2,1.05)+2
                }
                else{
                    alert('Not enought gold!\nYou have '+renderer.gold+' gold')
                }
                setTimeout(() => {tower.showUpgrades=true},0)
            },undefined,false,14,20),
            new Button(this.x+25,this.y-110,'Upgrade for '+this.cost3.toFixed(0)+' gold',function(){
                if (renderer.gold>=Math.floor(tower.cost3)){
                    tower.range+=tower.range1/4
                    tower.cost+=tower.cost3*0.75
                    renderer.gold-=tower.cost3.toFixed(0)
                    tower.cost3=Math.pow(tower.cost3,1.05)+2
                }
                else{
                    alert('Not enought gold!\nYou have '+renderer.gold+' gold')
                }
                setTimeout(() => {tower.showUpgrades=true},0)
            },undefined,false,14,20), 
            new Button(this.x+25,this.y-80,'Upgrade for '+this.cost4.toFixed(0)+' gold',function(){
                if (renderer.gold>=Math.floor(tower.cost4)){
                    tower.bulletSpeed+=tower.bulletSpeed1/2
                    tower.cost+=tower.cost4*0.75
                    renderer.gold-=tower.cost4.toFixed(0)
                    tower.cost4=Math.pow(tower.cost4,1.05)+2
                }
                else{
                    alert('Not enought gold!\nYou have '+renderer.gold+' gold')
                }
                setTimeout(() => {tower.showUpgrades=true},0)
            },undefined,false,14,20)]
            buttons.find(b => b.wasClicked(e))
            this.showUpgrades=false
        }
        else{
            if (x>=this.x+15 && x<=this.x+55 && y>=this.y+15 && y<=this.y+55){this.showUpgrades = true}
            else{this.showUpgrades = false}
        }
    }
}
class Bullet{
    constructor(x,y,x_speed,y_speed,dmg,range){
        this.x = x
        this.dmg = dmg
        this.y = y
        this.x_speed = x_speed
        this.y_speed = y_speed
        this.x1 = x
        this.y1 = y
        this.range = range
    }
    draw(){
        this.x += this.x_speed
        this.y += this.y_speed
        drawRect('#000000',this.x,this.y,10,10)
        const s = Math.sqrt(Math.pow(this.x_speed,2)+Math.pow(this.y_speed,2))
        const hitMonster = renderer.monsters.find(monster => monster.x<=this.x+10+s && monster.x+40+s>=this.x && monster.y<=this.y+10+s && monster.y+40+s>=this.y)
        if (hitMonster != undefined){
            let dmg = this.dmg-hitMonster.armor
            if(dmg<0){dmg=0}
            hitMonster.hp -= dmg
            if(hitMonster.hp<=0){renderer.gold+=hitMonster.gold;renderer.xp+=hitMonster.xp;renderer.monsters.splice(renderer.monsters.indexOf(hitMonster),1)}
            return true
        }
        const dist = Math.sqrt(Math.pow(this.x-this.x1,2)+Math.pow(this.y-this.y1,2))
        if (dist>this.range){return true}

    }
}
class ShopTower{
    constructor(dmg,fireRate,range,cost,color,name,x,y,bulletSpeed){
        this.color = color
        this.x = x
        this.y = y
        this.fireRate = fireRate
        this.txt = [new Txt(x+50,y-40,name,'#000000',36), new Txt(x+50,y+115,'Damage -- '+dmg), new Txt(x+50,y+140,'Fire Rate -- '+fireRate+'/s'),
         new Txt(x+50,y+165,'Range -- '+range),new Txt(x+50,y+190,'Bullet Speed -- '+bulletSpeed),new Txt(x+50,y+215,'Cost -- '+cost)]
        this.button = new Button(x+50,y+230,'Buy',function(){
            if (renderer.gold>=cost){
                renderer.towerInfo = [dmg,fireRate,range,cost,color,name,bulletSpeed]
                renderer.pageNum=5
            }
            else{
                alert('Not enough gold!\nYou have '+renderer.gold+' gold')
            }
        },undefined,true)
    }
    draw(){
        drawRect(this.color,this.x,this.y,100,100)
        drawRect('#000000',this.x+50,this.y+42.5,75,15)
        for (let i=0; i<this.txt.length; i++){this.txt[i].draw()}
    }
}
let speed = 1
class CanvasRenderer{
    constructor(){
        this.wave = 0
        setTimeout(() => {renderer.waves = [[[BasicBoi,25,360,0]],[[BasicBoi,25,240,0]],[[BasicBoi,25,120,0]],[[BasicBoi,25,60,0]],[[BasicBoi,15,60,0],[TougherBoi,5,480,600]], //5
        [[BasicBoi,5,60,0],[TougherBoi,10,360,300]],[[BasicBoi,25,60,0],[TougherBoi,25,360,1200]],[[TougherBoi,25,240,0]],[[BasicBoi,50,60,0],[TougherBoi,50,120,2750]], //9
        [[SlowBoi,1,0,0]],[[BasicBoi,25,60,0],[TougherBoi,25,60,1500],[SlowBoi,5,600,2000]],[[TougherBoi,25,60,0],[SlowBoi,5,480,2000]],[[TougherBoi,25,60,0],[SlowBoi,10,360,2000]],[[SlowBoi,25,240,0]], //14
        [[SpeedyBoi,5,600,0]],[[SpeedyBoi,10,480,0],[SlowBoi,25,360,1500]],[[SpeedyBoi,25,360,0]],[[SpeedyBoi,50,240,0]],[[SpeedyBoi,50,240,0],[SlowBoi,50,240,1500]]]},0) //19
        this.base = new Base(1050,300)
        this.towerInfo = undefined
        this.pathCoords = [[1300,700,50,1000000],[100,650,1250,50],[100,150,50,500],[150,150,1200,50],[1300,200,50,350],[250,500,1050,50],[250,300,50,200],[300,300,750,50],[this.base.x,this.base.y,100,50]]
        this.mainButtons = [new Button(5,5,'Next Wave',function(){
            if (renderer.monsters.length==0){
                for(let i=0;i<renderer.waves[renderer.wave].length;i++){
                    for (let g=0;g<renderer.waves[renderer.wave][i][1];g++){
                        renderer.monsters.push(new renderer.waves[renderer.wave][i][0](g*renderer.waves[renderer.wave][i][2]+renderer.waves[renderer.wave][i][3]))
                    }
                }
                renderer.wave += 1
            }
        }),
        new Button(a,5,'Shop',undefined,1),new Button(a,5,'Monster Info',undefined,2),
        new Button(a,5,'Research',undefined,3),new Button(a,5,'Stats',undefined,4),new Button(a,5,'Speed up',function(){
            if (speed < 10){speed += 1}
            else{speed = 1}
        })]
        this.backButton = [new Button(712.5,750,'Back',undefined,0,true)]
        this.shopTowers = [new ShopTower(10,1,250,25,'#ff0000','Basic Boi',100,100,7.5),new ShopTower(5,5,200,50,'#ffff00','Fast Boi',400,100,5),
        new ShopTower(50,0.5,1000,100,'#0000ff','Sniper Boi',700,100,10)]
        this.shopButtons = [this.backButton[0], this.shopTowers[0].button, this.shopTowers[1].button, this.shopTowers[2].button]
        this.researchButtons = [this.backButton[0]]
        this.placingTower = [new Button(712.5,5,'Back',undefined,0,true)]
        this.monsterPath = new MonsterPath(this.pathCoords)
        this.pageNum = 0
        this.mouseX = 0
        this.mouseY = 0
        this.clickList = [this.mainButtons,this.shopButtons,this.backButton,this.researchButtons,this.backButton,this.placingTower]
        this.renderList = ['drawMainScreen','drawShop','drawMonsterInfo','drawResearch','drawStats','placeTower']
        this.towers = []
        this.monstersSlain = 0
        this.dmgDone = 0
        this.goldEarned = 100
        this.goldSpent = 0
        this.goldSpentOnTowers = 0
        this.goldSpentOnUpgrades = 0
        this.towersBought = 0
        this.towersSold = 0
        this.upgradesBought = 0
        this.hitsTaken = 0
        this.bulletsFired = 0
        this.monsters = []
        this.gold = 100
        this.xp = 0
        this.xpEarned = 0
        this.xpSpent = 0
    }
    draw(){
        if (this.pageNum != 0 && this.pageNum != 5){
            this.monsterPath.draw()
            for (let i=0; i<this.towers.length; i++){this.towers[i].draw()}
            for (let i=0; i<this.monsters.length; i++){this.monsters[i].draw()}
        }
        drawRect('#007d00',0,0,1450,800)
        this[this.renderList[this.pageNum]]()
    }
    drawMainScreen(){
        drawRect('#7d7d7d',0,0,1450,50)
        for (let i=0; i<this.mainButtons.length; i++){this.mainButtons[i].draw()}
        this.monsterPath.draw()
        for (let i=0; i<this.towers.length; i++){this.towers[i].draw()}
        for (let i=0; i<this.monsters.length; i++){this.monsters[i].draw()}
        this.base.draw()
        drawRect('#ffffff',1225,10,200,30)
        drawRect('#ff0000',1225,10,(this.base.hp/100)*200,30)
        new Txt(1175,25,this.base.hp+'/100').draw()
        new Txt(1050,25,'Gold -- '+this.gold,'#000000',18).draw()
        new Txt(950,25,'XP -- '+Math.floor(this.xp),'#000000',18).draw()
        new Txt(850,25,'Wave -- '+this.wave,'#000000',18).draw()
        new Txt(750,25,'Speed -- x'+speed,'#000000',18).draw()
    }
    drawShop(){
        for (let i=0; i<this.shopButtons.length; i++){this.shopButtons[i].draw()}
        for (let i=0; i<this.shopTowers.length; i++){this.shopTowers[i].draw()}
        new Txt(1250,25,'Gold -- '+this.gold).draw()
    }
    drawMonsterInfo(){
        if (this.wave == 0){new Txt(725,30,'You have not discovered any monsters yet!','#ff0000',48).draw()}
        new MonsterInfo(100,100,1,30,0,3,'#000000',1,'Weak Boi').draw()
        new MonsterInfo(400,100,2,120,5,2.5,'#005c00',5,'Tougher Boi').draw()
        new MonsterInfo(700,100,3,1000,10,1.5,'#910000',10,'Slow Boi').draw()
        new MonsterInfo(1000,100,3,240,0,5,'#ffff00',15,'Speedy Boi').draw()
        this.backButton[0].draw()
    }
    drawResearch(){
        new Txt(725,50,'Coming Soon!','#000000',36).draw()
        for (let i=0; i<this.researchButtons.length; i++){this.researchButtons[i].draw()}
    }
    drawStats(){
        this.backButton[0].draw()
        new Txt(725,50,'Coming Soon!','#000000',36).draw()
    }
    placeTower(){
        drawRect('#7d7d7d',0,0,1450,50)
        this.monsterPath.draw()
        this.base.draw()
        const mouseX = Math.round(this.mouseX/50)*50
        const mouseY = Math.round(this.mouseY/50)*50
        for (let i=0; i<this.towers.length; i++){this.towers[i].draw()}
        for (let i=0; i<this.monsters.length; i++){this.monsters[i].draw()}
        let inPath = false
        this.placingTower[0].draw()
        for (let i=0; i<29; i++){
            for (let g=0; g<16; g++){
                for (let k=0; k<this.monsterPath.map.length; k++){
                    const { 0:x, 1:y, 2:w, 3:h } = this.monsterPath.map[k]
                    if (i*50+10>x && i*50+10<x+w && g*50+10>y && g*50+10<y+h){inPath = true}
                }
                if (g*50+10<50){inPath = true}
                if (i*50+10>this.base.x && i*50+10<this.base.x+100 && g*50+10>this.base.y && g*50+10<this.base.y+100){inPath = true}
                for (let h=0; h<this.towers.length; h++){
                    const { x:x, y:y } = this.towers[h]
                    if(i*50+15<x+40 && i*50+15>x && g*50+15<y+40 && g*50+15>y){inPath=true}
                }
                if (inPath == false){ctx.strokeRect(i*50,g*50,50,50)}
                inPath = false
            }
        }
        for (let i=0; i<this.monsterPath.map.length; i++){
            const { 0:x, 1:y, 2:w, 3:h } = this.monsterPath.map[i]
            if (mouseX<x+w && mouseX>=x && mouseY<y+h && mouseY>=y){inPath = true}
        }
        if (mouseX<this.base.x+100 && mouseX>=this.base.x && mouseY<this.base.y+100 && mouseY>=this.base.y){inPath = true}
        if (mouseY<50){inPath=true}
        for (let i=0; i<this.towers.length; i++){
            const { x:x, y:y } = this.towers[i]
            if(mouseX<x+40 && mouseX>=x && mouseY<y+40 && mouseY>=y){inPath=true}
        }
        if (inPath == false){drawRect('#00ff00',mouseX,mouseY,50,50)}
        for (let i=0; i<this.towers.length; i++){this.towers[i].draw()}
    }
    clicked(e){
        if (this.pageNum == 5){
            let inPath = false
            const mouseX = Math.round(this.mouseX/50)*50
            const mouseY = Math.round(this.mouseY/50)*50
            for (let i=0; i<this.monsterPath.map.length; i++){
                const { 0:x, 1:y, 2:w, 3:h } = this.monsterPath.map[i]
                if (mouseX<x+w && mouseX>=x && mouseY<y+h && mouseY>=y){inPath = true}
            }
            if (mouseX<this.base.x+100 && mouseX>=this.base.x && mouseY<this.base.y+100 && mouseY>=this.base.y){inPath = true}
            if (mouseY<50){inPath=true}
            for (let i=0; i<this.towers.length; i++){
                const { x:x, y:y } = this.towers[i]
                if(mouseX<x+40 && mouseX>=x && mouseY<y+40 && mouseY>=y){inPath=true}
            }
            if (inPath == false){
                this.pageNum = 0
                const { 0:d, 1:f, 2:r, 3:ct, 4:cr, 5:n, 6:bs } = this.towerInfo
                this.towers.push(new Tower(d,f,r,ct,cr,n,bs,mouseX,mouseY))
                this.gold -= ct
            }
            else if (this.clickList[this.pageNum].find(b => b.wasClicked(e))!=undefined){alert("Can't place that here!\nYou can only place towers in squares outlined in black\n and highlight green when you hover over them")}
        }
        if (this.pageNum == 0){
            for (let i=0; i<this.towers.length; i++){
                this.towers[i].wasClicked(e)
            }
        }
        this.clickList[this.pageNum].find(b => b.wasClicked(e))
    }
}
const renderer = new CanvasRenderer()
function mainLoop(){
    for (let i=0; i<speed; i++){renderer.draw()}
    requestAnimationFrame(mainLoop)
}
mainLoop()
window.addEventListener('click',function(e){renderer.clicked(e)})
window.addEventListener('touchend',function(e){renderer.clicked(e)})
window.addEventListener('mousemove',function(e){renderer.mouseX = e.pageX-35;renderer.mouseY = e.pageY-35})
