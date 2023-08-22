const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const mapWidth = 40;
const mapHeight = 30;
var gameMap;
var tileMap;
var placementMode = 1;

var enemies;
var enemyCount = 0;

var grabbers;
var grabberCount = 0;

canvas.width = 24 * mapWidth;
canvas.height = 24 * mapHeight;

var bioCount = 15;
var ironCount = 15;
var plasticCount = 15;

var grabSpawn = 0;

var score = 0;
var startPhase = true;
var background = new Image();
background.src = "Images/backgroundF.png";

var generatorCount = 0;
var waveTimer = 0;

var backgroundMusic = new Audio("Audio/background.mp3");
backgroundMusic.volume = 0.1;
backgroundMusic.loop = true;

var interval;


//Startup function
function start() {
    
    placementMode = 0;

    enemies = [];
    enemyCount = 0;

    grabbers = [];
    grabberCount = 0;

    bioCount = 15;
    ironCount = 15;
    plasticCount = 15;

    grabSpawn = 0;

    score = 0;
    
    generatorCount = 0;
    waveTimer = 0;

    startPhase = true;

    gameMap = new Array(mapWidth);
    for (let i = 0; i < mapWidth; i++) {
        gameMap[i] = new Array(mapHeight);
    }

    tileMap = new Array(mapWidth);
    for (let i = 0; i < mapWidth; i++) {
        tileMap[i] = new Array(mapHeight);
    }

    backgroundMusic.play();

    enemies = new Map();
    grabbers = new Map();

    context.fillStyle = "white";

    interval = setInterval(gameLoop, 10);
   
}

//Game loop
function gameLoop() {
    render();
    if(generatorCount <= 0 && !startPhase){
        document.getElementById("start").disabled = false;
        document.getElementById("start").innerText = "Replay?";
        clearInterval(interval);
    }
    if (generatorCount > 0) {
        document.getElementById("start").disabled = true;
        startPhase = false;
        update();
    }
    
}


//Renders everything on the board
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    renderGrabberBot();
    renderEntities();
    renderEnemies();
    renderMaterials();

    context.font = "30px Times New Roman";
    context.fillText("SCORE:", 410, 30);
    context.fillText(score, 530, 30);
}

//Updates eveything on the board
function update() {
    spawnEnemies();
    updateEntities();
    updateEnemies();
    updateGrabberBots();
    bonusMaterials();
}

//Spawns enemies on a cycle, amount scales with score
function spawnEnemies() {
    waveTimer++;
    if (waveTimer >= 200) {
        var amount = Math.floor((Math.random() * 3) + 1 + Math.floor(score/10));
        for (let i = 0; i < amount; i++) {
            let spawn = randomSpawn();
            var newEnemy = new Enemy(spawn[0], spawn[1], enemyCount, Math.floor((Math.random() * 3) + 1));
            enemies.set(enemyCount, newEnemy);
            enemyCount++;
        }
        waveTimer = 0;
    }
}

//Returns a random spawn location for enemies
function randomSpawn() {
    let side = Math.floor((Math.random() * 4) + 1);
    if (side == 1) {
        let height = Math.floor((Math.random() * 685) + 1);
        return [5, height + 5];
    } else if (side == 2) {
        let width = Math.floor((Math.random() * 910) + 1);
        return [width + 5, 5];
    } else if (side == 3) {
        let height = Math.floor((Math.random() * 685) + 1);
        return [930, height + 5];
    } else {
        let width = Math.floor((Math.random() * 910) + 1);
        return [width + 5, 690];
    }
}

//Creates new grabber bots on a cycle and updates all existing ones
function updateGrabberBots() {
    grabSpawn++;
    if (grabSpawn >= 400) {
        for (let i = 0; i < gameMap.length; i++) {
            for (let o = 0; o < gameMap[0].length; o++) {
                if (gameMap[i][o] != null && gameMap[i][o].type == 1) {
                    var grabber = new Grabber_Bot(i * 24 + 12, o * 24 + 12, 24, 24, 2, grabberCount);
                    grabbers.set(grabberCount, grabber);
                    grabberCount++;

                }
            }
        }
        grabSpawn = 0;
    }
    grabbers.forEach((value, key) => { value.update() })
}

function bonusMaterials(){
    if (score % 100 == 0) {
        bioCount += score/100;
        ironCount += score/100;
        plasticCount += score/100;
    }
}

//Renders all grabber bots
function renderGrabberBot() {
    grabbers.forEach((value, key) => { value.draw() })
}

//Updates all entities registered on the board
function updateEntities() {
    for (let i = 0; i < gameMap.length; i++) {
        for (let o = 0; o < gameMap[0].length; o++) {
            if (gameMap[i][o] != null) {
                gameMap[i][o].update();
            }
        }
    }
}

//Renders all entities registered on the board and a placement tile if there is one
function renderEntities() {
    for (let i = 0; i < gameMap.length; i++) {
        for (let o = 0; o < gameMap[0].length; o++) {

            if (gameMap[i][o] != null) {
                gameMap[i][o].draw();
            }

            if (tileMap[i][o] != null) {
                tileMap[i][o].draw();
            }

        }
    }
}

//Makes all enemies update
function updateEnemies() {
    enemies.forEach((value, key) => { value.update() })
}

//Renders all enemies 
function renderEnemies() {
    enemies.forEach((value, key) => { value.draw() })
}

//Renders material count
function renderMaterials() {
    context.font = "20px Arial";
    context.fillText("Bio:", 10, 650);
    context.fillText(bioCount, 50, 651);
    context.fillText("Metal:", 10, 680);
    context.fillText(ironCount, 70, 681);
    context.fillText("Plastic:", 10, 710);
    context.fillText(plasticCount, 80, 711);
}


//CODE FOR PLACEMENT OF BUILDINGS

//Reports selected building 
addEventListener("keypress", function (event) {
    deleteTiles();
    switch (Number(event.key)) {
        case 1:
            placementMode = 1;
            break;
        case 2:
            placementMode = 2;
            break;
        case 3:
            placementMode = 3;
            break;
        case 4:
            placementMode = 4;
            break;
        case 5:
            placementMode = 5;
            break;
        default:
            placementMode = 0;
            break;
    }
});


//Places a tile or a building if a tile is already there
canvas.addEventListener("click", function (event) {
    var mousePos = getMousePos(canvas, event);
    var xPos = Math.floor(mousePos[0] / 24);
    var yPos = Math.floor(mousePos[1] / 24);

    if (!checkEnemies(xPos, yPos)) {

        //Upgrade
        if (placementMode != 5) {
            if (tileMap[xPos][yPos] != null && gameMap[xPos][yPos] != null && gameMap[xPos][yPos].type == 2 && gameMap[xPos][yPos].level == 1) {
                if (bioCount >= 2 && ironCount >= 2 && plasticCount >= 2) {
                    gameMap[xPos][yPos].die();
                    gameMap[xPos][yPos] = new Ranged_Tower(xPos, yPos, 2);
                    bioCount -= 2;
                    ironCount -= 2;
                    plasticCount -= 2;
                }
            } else if (tileMap[xPos][yPos] != null && gameMap[xPos][yPos] != null && gameMap[xPos][yPos].type == 3 && gameMap[xPos][yPos].level == 1) {
                if (bioCount >= 2 && ironCount >= 2 && plasticCount >= 2) {
                    gameMap[xPos][yPos].die();
                    gameMap[xPos][yPos] = new Force_Field(xPos, yPos, 2);
                    bioCount -= 2;
                    ironCount -= 2;
                    plasticCount -= 2;
                }
            } else if (tileMap[xPos][yPos] != null && gameMap[xPos][yPos] != null && gameMap[xPos][yPos].type == 4 && gameMap[xPos][yPos].level == 1) {
                if (bioCount >= 2 && ironCount >= 2 && plasticCount >= 2) {
                    gameMap[xPos][yPos].die();
                    gameMap[xPos][yPos] = new Wall(xPos, yPos, 2);
                    bioCount -= 2;
                    ironCount -= 2;
                    plasticCount -= 2;
                }
            }
        }

        //Place building
        if (tileMap[xPos][yPos] != null && gameMap[xPos][yPos] == null) {
            switch (placementMode) {
                case 1:
                    if (plasticCount >= 5 && ironCount >= 5 && bioCount >= 5) {
                        if (gameMap[xPos + 1][yPos] == null && gameMap[xPos][yPos + 1] == null && gameMap[xPos + 1][yPos + 1] == null) {
                            var generator = new Generator(xPos, yPos);
                            gameMap[xPos][yPos] = generator;
                            gameMap[xPos + 1][yPos] = generator;
                            gameMap[xPos][yPos + 1] = generator;
                            gameMap[xPos + 1][yPos + 1] = generator;
                            plasticCount -= 5;
                            ironCount -= 5;
                            bioCount -= 5;
                            generatorCount++;
                        }
                    }
                    break;
                case 2:
                    if (bioCount >= 3 && ironCount >= 1) {
                        gameMap[xPos][yPos] = new Ranged_Tower(xPos, yPos, 1);
                        bioCount -= 3;
                        ironCount -= 1;
                    }
                    break;
                case 3:
                    if (bioCount >= 2 && ironCount >= 2) {
                        gameMap[xPos][yPos] = new Force_Field(xPos, yPos, 1);
                        bioCount -= 2;
                        ironCount -= 2;
                    }
                    break;
                case 4:
                    if (plasticCount >= 1) {
                        gameMap[xPos][yPos] = new Wall(xPos, yPos, 1);
                        plasticCount--;
                    }
                    break;
                default:
                    console.log("Invalid key");
                    break;
            }
            deleteTiles();

            //Delete building
        } else if (placementMode == 5 && tileMap[xPos][yPos] != null) {
            gameMap[xPos][yPos].die();
            deleteTiles();  
            //Place tile
        } else {
            deleteTiles();
            switch (placementMode) {
                case 1:
                    if (gameMap[xPos + 1][yPos] == null && gameMap[xPos][yPos + 1] == null && gameMap[xPos + 1][yPos + 1] == null) {
                        var tile = new Tile(xPos, yPos, 48, 48, "Images/green_select.png");
                        tileMap[xPos][yPos] = tile;
                    }
                    break;

                case 2:
                    if (gameMap[xPos][yPos] == null) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/purple_select.png");
                    } else if (gameMap[xPos][yPos].type != 1) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/purple_select.png");
                    }
                    break;

                case 3:
                    if (gameMap[xPos][yPos] == null) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/blue_select.png");
                    } else if (gameMap[xPos][yPos].type != 1) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/blue_select.png");
                    }
                    break;

                case 4:
                    if (gameMap[xPos][yPos] == null) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/grey_select.png");
                    } else if (gameMap[xPos][yPos].type != 1) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/grey_select.png");
                    }
                    break;
                case 5:
                    if (gameMap[xPos][yPos] == null) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/cross_select.png");
                    } else if (gameMap[xPos][yPos].type != 1) {
                        tileMap[xPos][yPos] = new Tile(xPos, yPos, 24, 24, "Images/cross_select.png");
                    }
                    break;
                default:
                    console.log("No building type selected");
                    break;
            }
        }
    }
});

//Checks for any enemies on the given tile;
function checkEnemies(x, y) {
    var found = false;
    enemies.forEach((value, key) => {
        if ((value.x + value.width / 2) < x * 24 + 24 && (value.x + value.width / 2) > x * 24
            && (value.y + value.height / 2) < y * 24 + 24 && (value.y + value.height / 2) > y * 24) {
            found = true;
        }
    })
    return found;
}

//Removes all tiles;
function deleteTiles() {
    for (let i = 0; i < tileMap.length; i++) {
        for (let o = 0; o < tileMap[0].length; o++) {
            if (tileMap[i][o] != null) {
                tileMap[i][o] = null;
            }
        }
    }
}

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return [evt.clientX - rect.left, evt.clientY - rect.top];
}

