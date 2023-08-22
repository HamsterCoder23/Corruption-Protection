class Enemy {
    constructor(x, y, id, type) {
        this.x = x;
        this.y = y;
        if (type <= 3) {
            this.width = 24;
            this.height = 24;
        } else {
            this.width = 48;
            this.height = 48;
        }
        this.id = id;
        this.img = new Image();
        if (type == 1) {
            this.img.src = "Images/enemy_sprite_sheet.png";
        } else if (type == 2) {
            this.img.src = "Images/enemy2_sprite_sheet.png";
        } else {
            this.img.src = "Images/enemy3_sprite_sheet.png";
        }
        if (type == 1) {
            this.speed = 2;
            this.damage = 1;
            this.health = 400;
            this.target = 1;
        } else if (type == 2) {
            this.speed = 4;
            this.damage = 2;
            this.health = 200;
            this.target = 1;
        } else {
            this.speed = 1;
            this.damage = 1;
            this.health = 600;
            this.target = 2;
        }

        this.animationCount = 0;
    }

    //Makes enemy move, cause damage if possible, and check for death
    update() {
        var closeTarget = this.findClosestTarget();

        if (closeTarget[0] != -1 && closeTarget[1] != -1) {
            if (this.target == 1) {
                this.step(closeTarget[0] * 24 + 12, closeTarget[1] * 24 + 12);
            } else {
                this.step(closeTarget[0] * 24, closeTarget[1] * 24);
            } 
        } else {
            this.target = 1;
            let newTarget = this.findClosestTarget();
            this.step(newTarget[0] * 24, newTarget[1] * 24);
        }

        if (this.health <= 0) {
            this.die();
        }

        this.animationCount++;
        if (this.animationCount >= 100) {
            this.animationCount = 0;
        }

        if (this.type == 2) {
            this.target == 2;
        }
    }

    //Renders enemy
    draw() {
        if (this.animationCount <= 33) {
            context.drawImage(this.img, 0, 0, 24, 24, this.x, this.y, this.width, this.height);
        } else if (this.animationCount <= 66) {
            context.drawImage(this.img, 24, 0, 24, 24, this.x, this.y, this.width, this.height);
        } else {
            context.drawImage(this.img, 48, 0, 24, 24, this.x, this.y, this.width, this.height);
        }
    }

    //Moves enemy closer to its target according to speed if possible
    step(x, y) {

        var cantGoDown = false;
        for (let i = 0; i < this.width; i++) {
            if (this.wallCheck(this.x+i, this.y + this.height + this.speed)) {
                cantGoDown = true;
                break;
            }
        }

        var cantGoRight = false;
        for (let i = 0; i < this.height; i++) {
            if (this.wallCheck(this.x + this.width + this.speed, this.y+i)) {
                cantGoRight = true;
                break;
            }
        }

        var cantGoUp = false;
        for (let i = 0; i < this.width; i++) {
            if (this.wallCheck(this.x+i, this.y - this.speed)) {
                cantGoUp = true;
                break;
            }
        }

        var cantGoLeft = false;
        for (let i = this.width; i > 0; i--) {
            if (this.wallCheck(this.x - this.speed, this.y+i)) {
                cantGoLeft = true;
                break;
            }
        }

        if (this.y < y && !cantGoDown) {
            if (y - this.y > this.speed) {
                this.y += this.speed;
            } else {
                this.y = y;
            }
        } if (this.y > y && !cantGoUp) {
            if (this.y - y > this.speed) {
                this.y -= this.speed;
            } else {
                this.y = y;
            }
        }
        
        if (this.x < x && !cantGoRight) {
            if (x - this.x > this.speed) {
                this.x += this.speed;
            } else {
                this.x = x;
            }
        } if (this.x > x && !cantGoLeft) {
            if (this.x - x > this.speed) {
                this.x -= this.speed;
            } else {
                this.x = x;
            }
        }

    }


//Check if the gameMap has an entity on the pixel, if so, damage it
wallCheck(x, y) {

        var found = false;

        var xCell = Math.floor(x / 24);
        var yCell = yCell = Math.floor(y / 24);

        if (gameMap[xCell][yCell] != null) {
            gameMap[xCell][yCell].health -= this.damage;
            found = true;
        } else {
            found = false;
        }
    //}
    return found;
}



//Find the closest target and returns its x and y
findClosestTarget() {
    var dist = 10000000000;
    var xcoord = -1;
    var ycoord = -1;

    for (let i = 0; i < gameMap.length; i++) {
        for (let o = 0; o < gameMap[0].length; o++) {
            if (gameMap[i][o] != null) {
                if (gameMap[i][o].type == this.target && this.calcDistance(i * 24 + 12, o * 24 + 12) < dist) {
                    dist = this.calcDistance(i * 24 + 12, o * 24 + 12);
                    xcoord = i;
                    ycoord = o;
                }
            }
        }
    }
    return [xcoord, ycoord];
}


//Find how many pixels to travel between enemy center and target pixel
calcDistance(x, y) {
    var a = x - this.x + this.width / 2;
    var b = y - this.y + this.height / 2;
    var c = Math.sqrt(a * a + b * b);
    return c;
}

//deletes enemy and removes from enemies list
die() {
    var xcoord = Math.floor((this.x + 12) / 24);
    var ycoord = Math.floor((this.y + 12) / 24);

    if (gameMap[xcoord][ycoord] == null) {
        gameMap[xcoord][ycoord] = new Material(xcoord, ycoord, this.type);
    } else if (gameMap[xcoord + 1][ycoord] == null) {
        gameMap[xcoord + 1][ycoord] = new Material(xcoord + 1, ycoord, this.type);

    } else if (gameMap[xcoord + 1][ycoord + 1] == null) {
        gameMap[xcoord + 1][ycoord + 1] = new Material(xcoord + 1, ycoord + 1, this.type);

    } else if (gameMap[xcoord][ycoord + 1] == null) {
        gameMap[xcoord][ycoord + 1] = new Material(xcoord, ycoord + 1, this.type);

    } else if (gameMap[xcoord - 1][ycoord + 1] == null) {
        gameMap[xcoord - 1][ycoord + 1] = new Material(xcoord - 1, ycoord + 1, this.type);

    } else if (gameMap[xcoord - 1][ycoord] == null) {
        gameMap[xcoord - 1][ycoord] = new Material(xcoord - 1, ycoord, this.type);

    } else if (gameMap[xcoord - 1][ycoord - 1] == null) {
        gameMap[xcoord - 1][ycoord - 1] = new Material(xcoord - 1, ycoord - 1, this.type);

    } else if (gameMap[xcoord][ycoord - 1] == null) {
        gameMap[xcoord][ycoord - 1] = new Material(xcoord, ycoord - 1, this.type);

    } else if (gameMap[xcoord + 1][ycoord - 1] == null) {
        gameMap[xcoord + 1][ycoord - 1] = new Material(xcoord + 1, ycoord - 1, this.type);
    }

    score++;
    enemies.delete(this.id);
}
}

class Material extends Entity {
    constructor(x, y, type) {
        let materialDrop = Math.floor((Math.random() * 100) + 1);
        if (type == 1) {
            if (materialDrop >= 30) {
                materialDrop = "Images/plastic_drop.png";
            } else if (materialDrop > 20 && materialDrop < 30) {
                materialDrop = "Images/iron_drop.png";
            } else if (materialDrop > 0 && materialDrop <= 20) {
                materialDrop = "Images/bio_drop.png";
            }
            super(x, y, 24, 24, 100, 5, materialDrop);
        } else if (type == 2) {
            if (materialDrop >= 30) {
                materialDrop = "Images/plastic_drop.png";
            } else if (materialDrop > 10 && materialDrop < 30) {
                materialDrop = "Images/iron_drop.png";
            } else if (materialDrop > 0 && materialDrop <= 10) {
                materialDrop = "Images/bio_drop.png";
            }
            super(x, y, 24, 24, 100, 5, materialDrop);
        } else {
            if (materialDrop >= 50) {
                materialDrop = "Images/plastic_drop.png";
            } else if (materialDrop > 10 && materialDrop < 50) {
                materialDrop = "Images/iron_drop.png";
            } else if (materialDrop > 0 && materialDrop <= 10) {
                materialDrop = "Images/bio_drop.png";
            }
            super(x, y, 24, 24, 100, 5, materialDrop);
        }

        if (materialDrop == "Images/plastic_drop.png") {
            this.dropType = 1;
        } else if (materialDrop == "Images/iron_drop.png") {
            this.dropType = 2;
        } else {
            this.dropType = 3;
        }
    }
    update() {
        if (this.health <= 0) {
            gameMap[this.x][this.y] = null;
        }
    }
}