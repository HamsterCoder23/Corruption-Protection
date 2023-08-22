class Generator extends Entity {
    constructor(x, y) {
        super(x, y, 48, 48, 3600, 1, "Images/generator_sprite_sheet.png");
        this.genCount = 0;
        this.metalCount = 0;
        this.plasCount = 0;
    }

    //Renders generator
    draw() {
        
        if (this.health >= 3200) {
            context.drawImage(this.img, 0, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        } else if(this.health >= 2800){
            context.drawImage(this.img, 48, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }else if(this.health >= 2400){
            context.drawImage(this.img, 96, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }else if(this.health >= 2000){
            context.drawImage(this.img, 144, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }else if(this.health >= 1600){
            context.drawImage(this.img, 192, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }else if(this.health >= 1200){
            context.drawImage(this.img, 240, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }else if(this.health >= 800){
            context.drawImage(this.img, 288, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }else if(this.health >= 400){
            context.drawImage(this.img, 336, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }else if(this.health >= 0){
            context.drawImage(this.img, 384, 0, this.width, this.height, this.x * 24, this.y * 24, this.width , this.height);
        }
       
    }

    //Checks for death then progress mnaking materials
    update() {
        if (this.health <= 0) {
            this.die();
        }
        this.genCount++;
        if (this.genCount == 1000) {
            bioCount += 1;
            this.genCount = 0;
        }
        this.metalCount++;
        if (this.metalCount == 2500) {
            ironCount += 1;
            this.metalCount = 0;
        }
        this.plasCount++;
        if (this.plasCount == 5000) {
            plasticCount += 1;
            this.plasCount = 0;
        }
    }

    //Clears gameMap of this generator
    die() {
        gameMap[this.x][this.y] = null;
        gameMap[this.x+1][this.y] = null;
        gameMap[this.x][this.y+1] = null;
        gameMap[this.x+1][this.y+1] = null;
        generatorCount--;
    }
}