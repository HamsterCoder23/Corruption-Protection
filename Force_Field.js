 
class Force_Field extends Entity {
    constructor(x, y, level){
        if (level == 1) {
            super(x , y, 72, 72, 1500, 3, "Images/force_field_sprite_sheet.png");
            this.level = 1;
            this.damage = 2;
        } else {
            super(x , y, 72, 72, 2500, 3, "Images/force_field_upgrade_sprite_sheet.png");
            this.level = 2;
            this.damage = 3;
        }
        this.animationCount = 0;
    }

    draw() {
        if (this.animationCount <= 20) {
            context.drawImage(this.img, 0, 0, this.width , this.height , this.x * 24 - 24, this.y * 24 -24, this.width, this.height);
        } else if (this.animationCount <= 40) {
            context.drawImage(this.img, 72, 0, this.width , this.height , this.x * 24 - 24, this.y * 24 -24, this.width, this.height);
        } else if (this.animationCount <= 60) {
            context.drawImage(this.img, 144, 0, this.width , this.height , this.x * 24 - 24, this.y * 24 -24, this.width, this.height);                 
        } else {
            context.drawImage(this.img, 216, 0, this.width , this.height , this.x * 24 - 24, this.y * 24 -24, this.width, this.height);     
        }
    }

    update() {
        if (this.health <= 0) {
            this.die();
            //console.log("dead");
        }
        this.attack();
        this.animationCount++;
        if (this.animationCount >= 80) {
            this.animationCount = 0;
        }
    }

    //Attacks all enemies in radius
    attack() {
        enemies.forEach((value, key) => {
            var xPos = value.x+(value.width/2);
            var yPos = value.y+(value.height/2);
            if (xPos >= this.x*24-24 && xPos <= this.x*24+48 && yPos >= this.y*24-24 && yPos <= this.y*24+48) {
                value.health -= this.damage;
            }
        })
    }
}
