const canvas = document.querySelector('canvas');
const canvasDrawer = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// Base object class
class Obj {
    constructor(velocity) {
        this._velocity = velocity

        this._opacity = 1;

        this._width = undefined;
        this._height = undefined;
        this._position = {
            x: undefined,
            y: undefined
        };
    }

    draw() {
        throw new Error("Don't use this!");
    }

    update() {
        throw new Error("Don't use this!");
    }

    get velocity() {
        return this._velocity;
    }

    set velocity(velocity) {
        this._velocity = velocity;
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
        this._position = position;    
    }
}

// Base image object class
class ImageObj extends Obj {
    constructor(velocity, image, scale, position) {
        super(velocity);

        const img = new Image();
        img.src = image;
        img.onload = () => {
            this._image = img;
            this.width = img.width * scale;
            this.height = img.height * scale;
            this.position = position;
        }
    }
    
    draw() {
        canvasDrawer.save();
        canvasDrawer.globalAlpha = this.opacity;
        canvasDrawer.drawImage(this._image, this.position.x, this.position.y, this.width, this.height);
        canvasDrawer.restore();
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    get image() {
        return this._image;
    }
}

// Player class
class Player extends ImageObj {
    constructor() {
        super({x: 0, y: 0}, 'Ship.png', 0.3, {x: canvas.width / 2 - 80, y: canvas.height - 80});
    }
}

// Invader class
class Invader extends ImageObj {
    constructor() {
        super({x: 0, y: 0}, 'Alien_frame1.png', 0.5, {x: 0, y: 0});
    }

    update() {
        super.update();
    }
}

// Projectile class
class Projectile extends Obj {
    constructor({velocity, position, color = 'red'}) {
        super({x: velocity.x, y: velocity.y});
        this.position = {x: position.x, y: position.y};
        this.width = 4;
        this.height = 10;
        this._color = color;
    }

    draw() {
        canvasDrawer.beginPath();
        canvasDrawer.fillStyle = this._color;
        canvasDrawer.fillRect(this.position.x, this.position.y, this.width, this.height);
        canvasDrawer.fill();
        canvasDrawer.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// Variables for animate function
const player = new Player();
const projectiles = [];
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

// Invader for testing purposes
const invader = new Invader();

// Animate function (game loop)
function animate() {
    // render background
    window.requestAnimationFrame(animate);
    canvasDrawer.fillStyle = 'black';
    canvasDrawer.fillRect(0, 0, canvas.width, canvas.height);

    // Render player
    player.update();

    // Render invader for testing
    invader.update();

    // Projectile movement and rendering
    if (projectiles.length > 0) {
        if (projectiles[0].position.y + projectiles[0].height <= 0) {
            setTimeout(() => {
                projectiles.splice(0, 1);
            }, 0);
        } else {
            projectiles[0].update()
        }
    };

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
        case ' ':
            if (projectiles.length < 1) {
                keys.space.pressed = true;
                projectiles.push(new Projectile({
                    position: {
                        x: player.position.x + (player.width / 2) - 2,
                        y: player.position.y - 10
                    },
                    velocity: {
                        x: 0,
                        y: -3
                    }
                }));
            }
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
        case ' ':
            keys.space.pressed = false;
            break;
    };
});