class Ranged_Tower extends Entity {
    constructor(x, y, level){
        if (level == 1) {
            super(x ,y, 24, 24, 1000, 2, "Images/ranged_tower.png"); 
        } else {
            super(x ,y, 24, 24, 1500, 2, "Images/ranged_tower_upgrade.png"); 
        }
        this.damage = 2;
        this.level = level;
    }

    //Renders tower
    draw(){
        context.drawImage(this.img, this.x*24, this.y*24, this.width, this.height);
    }

    //Renders attack
    drawAttack(x, y){
        context.beginPath();
        context.moveTo(this.x*24+12, this.y*24+6); 
        context.lineTo(x+12, y+12);
        context.strokeStyle = "#0385A4";
        context.stroke(); 
    }
    
    //Checks if the tower is dead then attacks
    update(){
        if (this.health <= 0) {
            this.die();
        }
        this.attack();
    }

    //Finds closest enemy and attacks it
    attack() {
        var distance = 100000;
        var target = "";
        enemies.forEach((value, key) => {

            var a = value.x - this.x*24;
            var b = value.y - this.y*24;

            var c = Math.sqrt(a*a + b*b);
            
            if (c < distance) {
                distance = c;
                target = value;
            }
        })

        if (distance <= 200 && target != "") {
            target.health -= this.damage;
            this.drawAttack(target.x, target.y);
        }

        if (this.level == 2) {
            var target2 = "";
            var distance2 = 100000;
            enemies.forEach((value, key) => {
                var a2 = value.x - this.x*24;
                var b2 = value.y - this.y*24;
                var c2 = Math.sqrt(a2*a2 + b2*b2);
                
                if (c2 < distance2 && value != target) {
                    distance2 = c2;
                    target2 = value;
                }
            })
            if (distance2 <= 200 && target2 != "") {
                target2.health -= this.damage;
                this.drawAttack(target2.x, target2.y);
            }

            var target3 = "";
            var distance3 = 100000;
            enemies.forEach((value, key) => {
                var a3 = value.x - this.x*24;
                var b3 = value.y - this.y*24;
                var c3 = Math.sqrt(a3*a3 + b3*b3);
                
                if (c3 < distance2 && value != target && value != target2) {
                    distance3 = c3;
                    target3 = value;
                }
            })
            if (distance2 <= 200 && target3 != "") {
                target3.health -= this.damage;
                this.drawAttack(target3.x, target3.y);
            }
        }

    }

}
