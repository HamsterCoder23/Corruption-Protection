class Wall extends Entity {
    constructor(x, y, level){
        if (level == 1) {
            super(x, y, 24, 24, 1500, 4, "Images/wall.png");
            this.level = 1
        } else {
            super(x, y, 24, 24, 3500, 4, "Images/wall_upgrade.png");
            this.level = 2
        }
    }

    
    //Checks if wall is dead
    update() {
        if (this.health <= 0) {
            this.die();
        }
    }
}