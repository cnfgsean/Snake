var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
const dimension = 500;
const scale = dimension / 25;

canvas.width = canvas.height = dimension;


const rows = canvas.height / scale;
const cols = canvas.width / scale;

var snake;
var fruit;

window.addEventListener("keydown", function(event) {
    // console.log(event.keyCode);
    snake.changeDirection(event.keyCode);
});

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xv = 1;
    this.yv = 0;
    this.total = 0;
    this.tail = [];
    
    this.draw = function() {
        ctx.fillStyle = "#FFFFFF";

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        
        ctx.fillRect(this.x, this.y, scale, scale);
        
    }

    this.changeDirection = function(dir) {
        switch (dir) {
            case 38: // up
                this.xv = 0;
                this.yv = -1;
                break;
            case 40: // down
                this.xv = 0;
                this.yv = 1;
                break;
            case 37: // left
                this.xv = -1;
                this.yv = 0;
                break;
            case 39: // right
                this.xv = 1;
                this.yv = 0;
                break;
        }
    }    

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = {
            x: this.x,
            y: this.y
        };

        this.x += scale * this.xv;
        this.y += scale * this.yv;

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
    }

    this.eat = function(fruit) {
        if (this.x == fruit.x && this.y == fruit.y) {
            this.total++;
            return true;
        }
        return false;
    }
}

function Fruit() {
    this.x;
    this.y;

    this.newLocation = function() {
        // TODO: probably make it so it doesn't spawn in the snake???
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * cols - 1) + 1) * scale;
    }

    this.draw = function() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}

function init() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.newLocation();
}

function play() {
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.update();
        fruit.draw();
        snake.draw();

        if (snake.eat(fruit)) {
            // console.log("EAT");
            fruit.newLocation();
        }
    }, 250);
}

init();
play();