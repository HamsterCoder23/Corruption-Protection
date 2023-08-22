class Tile {
    constructor(x, y, width, height, imgSrc) {
        this.x = x;
        this.y = y; 
        this.width = width; 
        this.height = height;
        this.img = new Image();1
        this.img.src = imgSrc;
    }

    //Renders tile
    draw(){
        context.drawImage(this.img, this.x*24, this.y*24, this.width, this.height);
    }

}