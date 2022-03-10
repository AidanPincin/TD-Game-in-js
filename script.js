var wave = 0
var base_hp = 100
var in_shop = false
var monsters = []
var towers = []
var placing_tower = false
var defend = false
var bought_basic = false
var bought_fast = false
var bought_sniper = false
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
class Monster{
    constructor(delay) {
        this.height = 40
        this.width = 40
        this.x = 1725
        this.y = 1080+delay
    }

    move(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(this.x,this.y-20,40,10)
        ctx.fillStyle = '#ff0000'
        if (this.hp<0){
            this.hp=0
        }
        ctx.fillRect(this.x,this.y-20,(this.hp/this.max_hp)*40,10)
        if (this.y>885){
            this.y -= this.speed
            if (this.y<885){
                this.y = 885
            }
    
        }

        else if (this.x>155 && this.y == 885){
            this.x -= this.speed
            if (this.x < 155){
                this.x = 155
            }
        }
    
        else if(this.x == 155 && this.y > 685){
            this.y -= this.speed
            if (this.y<685){
                this.y = 685
            }
        }
    
        else if(this.y == 685 && this.x < 1725){
            this.x += this.speed
            if (this.x>1725){
                this.x = 1725
            }
        }
    
        else if(this.x == 1725 && this.y > 485){
            this.y -= this.speed
            if (this.y<485){
                this.y = 485
            }
        }
    
        else if (this.x>155 && this.y == 485){
            this.x -= this.speed
            if (this.x < 155){
                this.x = 155
            }
        }
    
        else if(this.x == 155 && this.y > 285){
            this.y -= this.speed
            if (this.y<285){
                this.y = 285
            }
        }
    
        else if(this.y == 285 && this.x < 1725){
            this.x += this.speed
            if (this.x>1725){
                this.x = 1725
            }
        }
    
        else if(this.x == 1725 && this.y > 85){
            this.y -= this.speed
            if (this.y<85){
                this.y = 85
            }
        }
    
        else if (this.x>25 && this.y == 85){
            this.x -= this.speed
            if (this.x < 25){
                this.x = 25
                base_hp -= this.damage
            }
        }
    }
}
class basic_monster extends Monster{
    constructor(delay){
        super(delay)
        this.damage = 1
        this.speed = 3
        this.color = '#000000'
        this.hp = 5
        this.max_hp = 5
    }
}
class shop_item{
    constructor(color, name, x, y, damage, attack_speed, range, cost){
        this.x = x
        this.y = y
        this.name = name + ":"
        this.color = color
        this.damage = "Damage -- " + damage
        this.attack_speed = "Attack Speed -- " + attack_speed
        this.range = "Range -- " + range
        this.cost = "Cost -- " + cost

    }
    display_in_shop(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, 100, 100)
        ctx.fillStyle = '#000000'
        ctx.font = "24px Arial"
        var width = ctx.measureText(this.name).width
        ctx.fillText(this.name, this.x+50-width/2, this.y+125)
        var width = ctx.measureText(this.damage).width
        ctx.fillText(this.damage, this.x+50-width/2,this.y+150)
        var width = ctx.measureText(this.attack_speed).width
        ctx.fillText(this.attack_speed, this.x+50-width/2, this.y+175)
        var width = ctx.measureText(this.range).width
        ctx.fillText(this.range, this.x+50-width/2, this.y+200)
        var width = ctx.measureText(this.cost).width
        ctx.fillText(this.cost, this.x+50-width/2, this.y+225)
        ctx.fillStyle = '#323232'
        ctx.fillRect(this.x+20,this.y+237.5,60,30)
        var txt = "Buy"
        var width = ctx.measureText(txt).width
        ctx.fillStyle = '#c8c8c8'
        ctx.fillText(txt, this.x+50-width/2, this.y+260)
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.x+50, this.y+50-100/15, 60, 100/7.5)
    }
}
class Bullet{
    constructor(x,y,damage,l,bullet_speed){
        this.x = x
        this.y = y
        this.damage = damage
        this.l = l
        this.bullet_speed = bullet_speed
    }

    Shoot(){
        try {
            var dist_x = monsters[this.l].x - this.x
            var dist_y = monsters[this.l].y - this.y
            var sum = Math.pow(dist_x, 2)+Math.pow(dist_y, 2)
            var dist = Math.sqrt(sum)
            ctx.fillStyle = '#000000'
            this.x += (dist_x/dist)*this.bullet_speed
            this.y += (dist_y/dist)*this.bullet_speed
            ctx.fillRect(this.x+25,this.y+25-50/15,10,10)
            if (monsters[this.l].x-this.bullet_speed<this.x && this.x<monsters[this.l].x+monsters[this.l].width+this.bullet_speed){
                if (monsters[this.l].y-this.bullet_speed<this.y && this.y<monsters[this.l].y+monsters[this.l].height+this.bullet_speed){
                    monsters[this.l].hp -= this.damage
                    return true
                }
            }
            return false
        }
        catch(error) {
            console.error(error)
        }
    }
}
class Tower{
    constructor(x, y){
        this.x = x
        this.y = y
        this.time = 0
        this.bullets = []
    }

    blit(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x+5,this.y+5,40,40)
        var dists = []
        for (let i=0; i<monsters.length; i++){
            var dist_x = monsters[i].x - this.x
            var dist_y = monsters[i].y - this.y
            var sum = Math.pow(dist_x,2)+Math.pow(dist_y,2)
            var dist = Math.sqrt(sum)
            if (dist<this.range){
                dists.push(i)
            }
        }
        if (dists.length>0){
            var dist_x = monsters[dists[0]].x - this.x
            var dist_y = monsters[dists[0]].y - this.y
            var sum = Math.pow(dist_x,2)+Math.pow(dist_y,2)
            var dist = Math.sqrt(sum)
            var x_dist = (dist_x/dist)*30
            var y_dist = (dist_y/dist)*30
            ctx.fillStyle = '#000000'
            ctx.beginPath()
            ctx.moveTo(this.x+25,this.y+25-50/15)
            ctx.lineTo(this.x+25+x_dist,this.y+25+y_dist-50/15)
            ctx.lineWidth = 50/7.5
            ctx.stroke()
        }
        else{
            ctx.fillStyle = '#000000'
            ctx.fillRect(this.x+25,this.y+25-50/15,30,50/7.5)
        }
    }

    shoot(){
        var dists = []
        for (let i=0; i<monsters.length; i++){
            var dist_x = monsters[i].x - this.x
            var dist_y = monsters[i].y - this.y
            var sum = Math.pow(dist_x,2)+Math.pow(dist_y,2)
            var dist = Math.sqrt(sum)
            if (dist<this.range){
                dists.push(i)
            }
        }
        if (dists.length>0){
            if (this.time<60/this.attack_speed){
                this.time+=1
            }
            if (this.time>=60/this.attack_speed){
                this.bullets.push(new Bullet(this.x,this.y,this.damage,dists[0],this.bullet_speed))
                this.time = 0
            }
        }

        for (let i=0;i<this.bullets.length;i++){
            var hit = this.bullets[i].Shoot()
            if (hit==true){
                this.bullets.splice(i,1)
                hit=false
            }
        }
    }
}

class basic_tower extends Tower{
    constructor(x, y){
        super(x, y)
        this.color = '#ff0000'
        this.range = 250
        this.attack_speed = 1
        this.damage = 3
        this.bullet_speed = 20
    }
}

class fast_tower extends Tower{
    constructor(x, y){
        super(x, y)
        this.color = '#ffff00'
        this.range = 300
        this.attack_speed = 5
        this.damage = 1.5
        this.bullet_speed = 20
    }
}

class sniper_tower extends Tower{
    constructor(x,y){
        super(x,y)
        this.color = '#0000ff'
        this.range = 2225
        this.damage = 15
        this.bullet_speed = 40
        this.attack_speed = 0.5
    }
}

const basic_tower_shop = new shop_item('#ff0000', "Basic Tower", 100, 50, 3, 1, 250, 25)
const fast_tower_shop = new shop_item('#ffff00', "Fast Tower", 400, 50, 1.5, 5, 300, 50)
const sniper_tower_shop = new shop_item('#0000ff', "Sniper Tower", 700, 50, 15, 0.5, "Infinite", 100)
function update(){
    ctx.fillStyle = '#007d00'
    ctx.fillRect(0,0,1920,1080)
    ctx.fillStyle = '#4b4b4b'
    ctx.fillRect(1720,880,50,200)
    ctx.fillRect(1720,480,50,250)
    ctx.fillRect(1720,80,50,250)
    ctx.fillRect(150,680,50,200)
    ctx.fillRect(150,280,50,200)
    ctx.fillRect(150,880,1570,50)
    ctx.fillRect(150,680,1570,50)
    ctx.fillRect(150,480,1570,50)
    ctx.fillRect(150,280,1570,50)
    ctx.fillRect(50,80,1670,50)
    ctx.fillStyle = '#00ff00'
    ctx.fillRect(0,50,50,80)
    ctx.fillStyle = '#969696'
    ctx.fillRect(0,0,1920,50)
    ctx.fillStyle = '#323232'
    ctx.fillRect(5,5,100,40)
    ctx.fillRect(130,5,100,40)
    ctx.fillRect(255,5,100,40)
    ctx.fillRect(380,5,100,40)
    ctx.fillRect(505,5,100,40)
    ctx.font = "20px Arial"
    ctx.fillStyle = '#c8c8c8'
    ctx.fillText("Next Wave", 6,30)
    ctx.fillText("Shop", 155,30)
    ctx.fillText("Research", 386,30)
    ctx.fillText("Settings", 517.5,30)
    ctx.font = "17px Arial"
    ctx.fillText("Monster Info", 256,30)
    length = towers.length
    for (let i=0; i<length; i++){
        towers[i].blit()
        if (monsters.length == 0){
            defend = false
        }
        if (defend==true){
            towers[i].shoot()
        }
    }
}
update()

function shop(){
    ctx.fillStyle = '#007d00'
    ctx.fillRect(0,0,1920,1080)
    ctx.fillStyle = '#323232'
    ctx.fillRect(910, 1000, 100, 40)
    ctx.font = "24px Arial"
    ctx.fillStyle = '#c8c8c8'
    ctx.fillText("Back", 935, 1027.5)
    basic_tower_shop.display_in_shop()
    fast_tower_shop.display_in_shop()
    sniper_tower_shop.display_in_shop()
}
function draw(){
    var length = monsters.length
    for (let i=0; i<length; i++){
        monsters[i].move()
        if (monsters[i].hp <= 0){
            monsters.splice(i,1)
            length = monsters.length
        }
        else if (monsters.length>0){
            if (monsters[i].x == 25){
                monsters.splice(i, 1)
                length = monsters.length
            }
        }
    }
    window.requestAnimationFrame(update)
    if (length > 0){
        window.requestAnimationFrame(draw)
    }
}
function place(x, y, rows, cols, e){
    for (let i=0; i<rows; i++){
        for (let g=0; g<cols; g++){
            if (x+i*50.6<e.pageX && e.pageX<x+50+i*50.6 && y+g*50<e.pageY && e.pageY<y+50+g*50){
                if (bought_basic == true){
                    towers.push(new basic_tower(x-10+i*50.6, y-10+g*50))
                    placing_tower = false
                    update()
                    bought_basic = false
                }
                if (bought_fast == true){
                    towers.push(new fast_tower(x-10+i*50.6, y-10+g*50))
                    placing_tower = false
                    update()
                    bought_fast = false
                }
                if (bought_sniper == true){
                    towers.push(new sniper_tower(x-10+i*50.6, y-10+g*50))
                    placing_tower = false
                    update()
                    bought_sniper = false
                }
            }
        }
    }
}
function light_up(x, y, rows, cols, e){
    for (let i=0; i<rows; i++){
        for (let g=0; g<cols; g++){
            if (x+i*50.6<e.pageX && e.pageX<x+50+i*50.6 && y+g*50<e.pageY && e.pageY<y+50+g*50){
                ctx.fillStyle = '#00ff00'
                ctx.fillRect(x-10+i*50.6, y-10+g*50, 50.6, 50)
            }
        }
    }
}
window.addEventListener("mousemove", function (e) {
    if (placing_tower == true){
        update()
        light_up(10,140,34,3,e)
        light_up(50.6*35+10,140,3,3,e)
        light_up(50.6*35+10,540,3,3,e)
        light_up(50.6*35+10,940,3,3,e)
        light_up(10,540,34,3,e)
        light_up(10,940,34,3,e)
        light_up(210,340,34,3,e)
        light_up(10,340,3,3,e)
        light_up(10,740,3,3,e)
        light_up(210,740,34,3,e)
        light_up(50.6*35+10,90,3,1,e)
        light_up(50.6*35+10,290,3,1,e)
        light_up(50.6*35+10,490,3,1,e)
        light_up(50.6*35+10,690,3,1,e)
        light_up(50.6*35+10,890,3,1,e)
        light_up(10,290,3,1,e)
        light_up(10,490,3,1,e)
        light_up(10,690,3,1,e)
        light_up(10,890,3,1,e)
    }
})
window.addEventListener("click", function (e) {
    if (placing_tower == true){
        place(10, 140, 34, 3,e)
        place(50.6*35+10,140,3,3,e)
        place(50.6*35+10,540,3,3,e)
        place(50.6*35+10,940,3,3,e)
        place(10,540,34,3,e)
        place(10,940,34,3,e)
        place(210,340,34,3,e)
        place(210,740,34,3,e)
        place(10,340,3,3,e)
        place(10,740,3,3,e)
        place(50.6*35+10,90,3,1,e)
        place(50.6*35+10,290,3,1,e)
        place(50.6*35+10,490,3,1,e)
        place(50.6*35+10,690,3,1,e)
        place(50.6*35+10,890,3,1,e)
        place(10,290,3,1,e)
        place(10,490,3,1,e)
        place(10,690,3,1,e)
        place(10,890,3,1,e)
    }
    else if (in_shop == true){
        if (e.pageX<1020 && 920<e.pageX && e.pageY<1050 && 1010<e.pageY){
            update()
            in_shop = false
        }
        if (130<e.pageX && e.pageX<190 && 297.5<e.pageY && e.pageY<327.5){
            placing_tower = true
            in_shop = false
            bought_basic = true
            update()
        }
        if (430<e.pageX && e.pageX<490 && 297.5<e.pageY && e.pageY<327.5){
            placing_tower = true
            in_shop = false
            bought_fast = true
            update()
        }
        if (730<e.pageX && e.pageX<790 && 297.5<e.pageY && e.pageY<327.5){
            placing_tower = true
            in_shop = false
            bought_sniper = true
            update()
        }
    }
    else{
        if (e.pageX<115 && 15<e.pageX && 15<e.pageY && e.pageY<55 && defend == false){
            wave += 1
            if (wave == 1){
                let a=1
                while (a<=25){
                    monsters.push(new basic_monster(a*120))
                    a+=1
                }
                defend = true
                draw()
            }
            if (wave == 2){
                let a=1
                while (a<=50){
                    monsters.push(new basic_monster(a*90))
                    a+=1
                }
                defend = true
                draw()
            }
            if (wave == 3){
                let a=1
                while (a<=75){
                    monsters.push(new basic_monster(a*60))
                    a+=1
                }
                defend = true
                draw()
            }
        }
        if (e.pageX<240 && 140<e.pageX && 15<e.pageY && e.pageY<55){
            in_shop = true
            shop()
        }

        if (e.pageX<365 && 265<e.pageX && 15<e.pageY && e.pageY<55){
            this.alert("Coming Soon!")
        }

        if (e.pageX<490 && 390<e.pageX && 15<e.pageY && e.pageY<55){
            this.alert("Coming Soon!")
        }

        if (e.pageX<615 && 515<e.pageX && 15<e.pageY && e.pageY<55){
            this.alert("Coming soon!")
        }
    }
})
