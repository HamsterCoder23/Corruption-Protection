class Grabber_Bot{
    constructor(x, y, width, height, speed, id){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.id = id;
        this.hasMaterial = "";
        this.img = new Image();
        this.img.src = "Images/grabber_bot_empty.png";
    }

    //Updates grabber bot pathfinding and status
    update() {       
        if (this.hasMaterial == "") {
            var closeTarget = this.findClosestTarget(5);       
            this.step(closeTarget[0]*24, closeTarget[1]*24);
            this.isOnMaterial();
        } else {
            var closeTarget = this.findClosestTarget(1);   
            this.step(closeTarget[0]*24, closeTarget[1]*24);  
            this.isOnGenerator();
        }
    }

    //Renders grabber bot
    draw(){
        context.drawImage(this.img, this.x , this.y, this.width, this.height);
    }

    //Moves grabber bot to target pixel
    step(x,y) {
        if (this.x < x) {
            if (x - this.x > this.speed) {
                this.x += this.speed;
            } else {
                this.x = x;
            }
        } else if (this.x > x)  {
            if (this.x - x > this.speed) {
                this.x -= this.speed;
            } else {
                this.x = x;
            }
        } 

        if (this.y < y) {
            if (y - this.y > this.speed) {
                this.y += this.speed;
            } else {
                this.y = y;
            }

        } else if (this.y > y) {
            if (this.y - y > this.speed) {
                this.y -= this.speed;
            } else {
                this.y = y;
            }
        } 
    }
    
    //checks for material on it and picks it up if it is there
    isOnMaterial() {
        var xCell = Math.floor((this.x+12)/24);
        var yCell = Math.floor((this.y+12)/24);
        if (gameMap[xCell][yCell] != null) {
            if (gameMap[xCell][yCell].type == 5) {
                if (gameMap[xCell][yCell].dropType == 1) {
                    this.img.src = "Images/grabber_bot_plastic.png"
                    this.hasMaterial = "plastic";
                }
                if (gameMap[xCell][yCell].dropType == 2) {
                    this.img.src = "Images/grabber_bot_iron.png"
                    this.hasMaterial = "iron";
                }
                if (gameMap[xCell][yCell].dropType == 3) {
                    this.img.src = "Images/grabber_bot_bio.png"
                    this.hasMaterial = "bio";
                }
                gameMap[xCell][yCell] = null;
            }
        }
    }
    
    //checks for material on it and picks it up if it is there
    isOnGenerator() {
        var xCell = Math.floor((this.x+12)/24);
        var yCell = Math.floor((this.y+12)/24);
        if (gameMap[xCell][yCell] != null && this.hasMaterial != "") {
            if (gameMap[xCell][yCell].type == 1) {
                if (this.hasMaterial == "plastic") {
                    plasticCount++;
                    this.die();
                }
                if (this.hasMaterial == "iron") {
                    ironCount++;
                    this.die();
                }
                if (this.hasMaterial == "bio") {
                    bioCount++;
                    this.die();
                }
            }
        }
    }

    //Find the closest target and returns its x and y
    findClosestTarget(type) {
        var dist = 10000;
        var xcoord = Math.floor(this.x/24);
        var ycoord = Math.floor(this.y/24);
        for (let i = 0; i < gameMap.length; i++) {
            for (let o = 0; o < gameMap[0].length; o++) {
                if (gameMap[i][o] != null) {
                    if (gameMap[i][o].type == type && this.calcDistance(i*24,o*24) < dist) {
                        dist = this.calcDistance(i*24,o*24);
                        xcoord = i;
                        ycoord = o;
                    }
                }
            }
        }
        return [xcoord,ycoord];
    }

     //Find how many pixels to travel between enemy center and target pixel
     calcDistance(x, y) {
        var xdist = Math.abs(x-this.x+(this.width/2));
        var ydist = Math.abs(y-this.y+(this.height/2));
        if (xdist >= ydist) {
            return xdist;
        } else {
            return ydist;
        }
    }

    //Removes entry from grabbers and decrements grabber count
    die() {
        grabbers.delete(this.id);
        grabberCount--;
    }
}