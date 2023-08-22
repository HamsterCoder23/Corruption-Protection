class Entity {
    constructor(x ,y , width, height, health, type, imgSrc){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health; 
        this.type = type;
            //TYPE 1: Generator
            //TYPE 2: Turret
            //TYPE 3: Force Field
            //TYPE 4: Wall
            //TYPE 5: Material
        this.img = new Image();
        this.img.src = imgSrc;
    }
    
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getImg() {
        return this.img;
    }

    update(){

    }

    draw() {
        context.drawImage(this.img, this.x * 24, this.y * 24, this.width, this.height);
    }

    die() {
        gameMap[this.x][this.y] = null;
    }
}