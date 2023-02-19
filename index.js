const canvas = document.querySelector('canvas');
const canvasDrawer = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

class Obj {
    constructor(velocity) {
        this._velocity = {
            x: velocity.x,
            y: velocity.y
        };

        this._opacity = 1;

        this._width = undefined;
        this._height = undefined;
        this._position = {
            x: undefined,
            y: undefined
        };
    }

    draw() {
        throw new Error("Don't use this!!!");
    }

    update() {
        throw new Error("Don't use this!!");
    }

    get velocity() {
        return this._velocity;
    }

    set velocity(velocity) {
        this._velocity = {
            x: velocity.x,
            y: velocity.y
        };
    }

    get opacity() {
        return this._opacity;
    }

    set opacity(opacity) {
        this._opacity = opacity;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    get position() {
        return this._position;
    }

    set position(position) {
        this._position = {
            x: position.x,
            y: position.y
        };        
    }
}

class ImageObj extends Obj {
    constructor(velocity, image) {
        super(velocity);

        const img = new Image();
        img.src = image;
        img.onload = () => {
            this._image = img;
            this.width = img.width * 0.3;
            this.height = img.height * 0.3;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 40
            };
        }
    }
    
    draw() {
        canvasDrawer.save();
        canvasDrawer.globalAlpha = this.opacity;
        canvasDrawer.drawImage(this._image, this.position.x, this.position.y, this.width, this.height);
        canvasDrawer.restore();
    }

    update() {
        throw new Error("Don't use this!!");
    }

    get image() {
        return this._image;
    }
}

class Player extends ImageObj {
    constructor() {
        super({x: 0, y: 0}, 'Ship.png');
    }

    update() {
        if (this.image) {
            super.draw();
            this.position.x += this.velocity.x;
        }
    }
}

// Variables for animate function
const player = new Player();
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
};

// Animate function (game loop)
function animate() {
    // Draw background
    window.requestAnimationFrame(animate);
    canvasDrawer.fillStyle = 'black';
    canvasDrawer.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    player.update();

    // Player movement
    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -1.5;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 1.5;
    } else {
        player.velocity.x = 0;
    }
}
animate();

// Key press down
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = true;
            break;
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = true;
            break;
    };
});

// Key Press up
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = false;
            break;
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = false;
            break;
    };
});