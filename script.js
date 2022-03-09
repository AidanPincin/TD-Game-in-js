var wave = 0
var base_hp = 100
var in_shop = false
var monsters = []
placing_tower = false
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
    length = monsters.length
    for (let i=0; i<length; i++){
        monsters[i].move()
        if (monsters[i].x == 25){
            monsters.splice(i, 1)
            length = monsters.length
        }
    }
    window.requestAnimationFrame(update)
    if (length > 0){
        window.requestAnimationFrame(draw)
    }
}
window.addEventListener("mousemove", function (e) {
    if (placing_tower == true){
        update()
        if (10<e.pageX && e.pageX<60 && 140<e.pageY && e.pageY<190){
            ctx.fillStyle = '#00ff00'
            ctx.fillRect(0, 130, 50, 50)
        }
    }
})
window.addEventListener("click", function (e) {
    if (placing_tower == true){

    }
    else if (in_shop == true){
        if (e.pageX<1020 && 920<e.pageX && e.pageY<1050 && 1010<e.pageY){
            update()
            in_shop = false
        }
        if (130<e.pageX && e.pageX<190 && 297.5<e.pageY && e.pageY<327.5){
            placing_tower = true
            in_shop = false
            update()
        }
        if (430<e.pageX && e.pageX<490 && 297.5<e.pageY && e.pageY<327.5){
            this.alert("Coming soon!")
        }
        if (730<e.pageX && e.pageX<790 && 297.5<e.pageY && e.pageY<327.5){
            this.alert("Coming soon!")
        }
    }
    else{
        if (e.pageX<115 && 15<e.pageX && 15<e.pageY && e.pageY<55){
            wave += 1
            if (wave == 1){
                let a=1
                while (a<=26){
                    monsters.push(new basic_monster(a*120))
                    a+=1
                }
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
            this.alert("Coming Soon!")
        }
    }
})
