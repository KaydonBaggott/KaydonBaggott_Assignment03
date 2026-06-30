// Get references to the player and game area elements
const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('scoreText');
const liveDisplay = document.getElementById('liveText');
const gameOverDisplay = document.getElementById('gameOverText');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');

// Initialize player position,set initial score, player speed, lives and game state variables
let playerX = 750;
let playerSpeed = 0;
let score = 0;
let lives = 3;
let gameStarted = false;
let gameOver = false;

// Update the score and lives display
scoreDisplay.textContent = "Score: " + score;
liveDisplay.textContent = "Lives: " + lives;


// Detect key presses to move the player left and right, shoot bullets, start game and change difficulty
document.addEventListener("keydown", function(event) {
    if(gameStarted === false){
    return;
    }

    if (gameOver === true){
        return;
    }

    if ((event.key === "a" || event.key === "ArrowLeft" || event.key === "A" ) && score >= 1000) {
        playerSpeed = -20;
                console.log(playerSpeed);

    }

    if ((event.key === "d" || event.key === "ArrowRight" || event.key === "D") && score >= 1000) {
        playerSpeed = 20;
                console.log(playerSpeed);

    }

    if ((event.key === "a" || event.key === "ArrowLeft" || event.key === "A") && score >= 500) {
        playerSpeed = -15;
                console.log(playerSpeed);

    }

    if ((event.key === "d" || event.key === "ArrowRight" || event.key === "D") && score >= 500) {
        playerSpeed = 15;
                console.log(playerSpeed);

    }

    if ((event.key === "a" || event.key === "ArrowLeft" || event.key === "A") && playerX > 0) {
        playerSpeed = -10;
                console.log(playerSpeed);
    }

    if ((event.key === "d" || event.key === "ArrowRight" || event.key === "D") && playerX < innerWidth - 60) {
        playerSpeed = 10;
                console.log(playerSpeed);
    }
    player.style.left = playerX + "px";

    if (event.key === " "){
        shootBullet();
    }
});

// Detect key releases to stop the player from moving
document.addEventListener("keyup", function(event) {
    if (event.key === "a" || 
        event.key === "ArrowLeft" || 
        event.key === "d" || 
        event.key === "ArrowRight" || 
        event.key === "A" || 
        event.key === "D") 
    {
        playerSpeed = 0;
    }
});

// Function to create an enemy and make it fall down the screen
function createEnemy() {
    const enemy = document.createElement('div');

    enemy.classList.add('enemy');

    enemy.destroyed = false;

    enemy.style.left = Math.random() * 1500 + "px";

    let enemyX = Math.random() * (innerWidth - 150);
    let enemyY = -150;

    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";

    gameArea.appendChild(enemy);

    // Make the enemy fall down the screen
    let enemyFall = setInterval(function() {

        enemyY += 5;

        enemy.style.top = enemyY + "px";

        if (enemy.destroyed === true) {

            clearInterval(enemyFall);
            return;
        }

        if (gameOver === true){

            clearInterval(enemyFall);
            return;
        }

        // Check if the enemy has reached the bottom of the screen and update lives and game over state accordingly
        if (enemyY > window.innerHeight && enemy.destroyed === false) {
            enemy.remove();
            clearInterval(enemyFall);

            lives -= 1;
            liveDisplay.textContent = "Lives: " + lives;


        // Change live display color based on remaining lives
        if (lives === 2){
            liveDisplay.style.color = "orange";
            liveDisplay.style.textShadow = "0 0 10px orange, 0 0 20px orange, 0 0 30px orange";
        }

        if (lives === 1){
            liveDisplay.style.color = "red";
            liveDisplay.style.textShadow = "0 0 10px red, 0 0 20px red, 0 0 30px red";
        }

        if (lives <= 0) {
            gameOver = true;

            gameOverDisplay.style.display = "block";
            restartButton.style.display = "block";
            liveDisplay.style.color = "red";
            liveDisplay.style.textShadow = "0 0 10px red, 0 0 20px red, 0 0 30px red";

            clearInterval(enemySpawner);
        }
}         
},30);}

// Variable to store the enemy spawner interval so it can be cleared when the game is over or when the difficulty increases
let enemySpawner;

// Function to shoot a bullet and check for collisions with enemies
function shootBullet() {

    const bullet = document.createElement('div');

    bullet.classList.add('bullet');

    let bulletX = playerX + 45;
    let bulletY = 550;

    bullet.style.left = bulletX + "px";
    bullet.style.top = bulletY + "px";

    gameArea.appendChild(bullet);

    // Move the bullet up the screen and check for collisions with enemies
    let bulletMove = setInterval(function() {

        bulletY -= 10;
        bullet.style.top = bulletY + "px";

        const enemies = document.querySelectorAll('.enemy');

        enemies.forEach(function(enemy) {

            const enemyRect = enemy.getBoundingClientRect();
            const bulletRect = bullet.getBoundingClientRect();

            if (enemyRect.left < bulletRect.right &&
                enemyRect.right > bulletRect.left &&
                enemyRect.top < bulletRect.bottom &&
                enemyRect.bottom > bulletRect.top ) 

            {
                enemy.destroyed = true;
                enemy.remove();
                bullet.remove();

                score += 10;
                scoreDisplay.textContent = "Score: " + score;

                clearInterval(bulletMove);
                difficultyIncrease();
            }
        });

        if (bulletY < 0) {
            bullet.remove();
            clearInterval(bulletMove);
        }
    }, 20);
}

// Event listener for the restart button to reload the page and start a new game
restartButton.addEventListener("click", function() {
    location.reload();
});

// Event listener for the start button to hide the start screen and start spawning enemies
startButton.addEventListener("click", function(){

    gameStarted = true;
    startScreen.style.display = "none";
    enemySpawner = setInterval(createEnemy, 1500);

});

// Function to increase the difficulty of the game by increasing the speed of enemy spawns based on the player's score
function difficultyIncrease(){
    if (score >= 200){
        clearInterval(enemySpawner);
        enemySpawner = setInterval(createEnemy, 1000);
    }

    if (score >= 500){
        clearInterval(enemySpawner);
        enemySpawner = setInterval(createEnemy, 500);
    }

    if (score >= 1000){
        clearInterval(enemySpawner);
        enemySpawner = setInterval(createEnemy, 250)
        ;
    }
}

// Function to move the player left and right based on key presses and prevent the player from moving off the screen
function movePlayer(){

    if (gameStarted === true && gameOver === false){
        playerX += playerSpeed;
    }

    if (playerX < 0){
        playerX = 0;
    }

    if (playerX > 1440){
        playerX = 1440;
    }

    player.style.left = playerX + "px";
    requestAnimationFrame(movePlayer);
}

movePlayer();