const scoreEl = document.querySelector('#scoreEl');
const livesEl = document.querySelector('#livesEl');
const canvas = document.querySelector('canvas');
const canvasDrawer = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const AlienHit = new Audio('AlienHit.wav');
const laserShoot = new Audio('laserShoot.wav');
const PlayerLoseLife = new Audio('PlayerLoseLife.wav');

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
        super({ x: 0, y: 0 }, 'Ship.png', 0.3, { x: canvas.width / 2 - 80, y: canvas.height - 80 });
    }
}

// Invader class
class Invader extends ImageObj {
    constructor(position) {
        super({ x: 0, y: 0 }, 'Alien_frame1.png', 0.5, position);
    }

    update() {
        super.update();

        // If invader makes it to bottom of screen
        if (this.position.y + this.height >= player.position.y) {
            setTimeout(() => {
                game.over = true;
                player.opacity = 0;
            }, 0);
            setTimeout(() => {
                game.active = false;
                localStorage.setItem('score', score);
                location.href = '/save'
            }, 2000);
            lives = 0;
            livesEl.innerHTML = lives;
            PlayerLoseLife.play();
        }
    }

    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 3
            }
        }));
    }
}

// Explosion class
class Explosion extends ImageObj {
    constructor(position) {
        super({ x: 0, y: 0 }, 'Explosion.png', 1, position);
        this.time = 350;
    }

    update() {
        super.update();

        this.time--;
        if (this.time == 0) {
            this.opacity = 0;
        }
    }
}

// Invader Grid Class
class Grid extends Obj {
    constructor() {
        super({ x: 1, y: 0 });
        this.position = { x: 0, y: 0 };

        this.invaders = [];

        let rows = Math.floor(Math.random() * 3) + 2;
        let columns = Math.floor(Math.random() * 5) + 10;
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                let position = { x: i * 48, y: j * 32 };
                this.invaders.push(new Invader(position))
            }
        }

        this.width = columns * 48;
        this.height = rows * 32;
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 30;
        }
    }
}

// Projectile class
class Projectile extends Obj {
    constructor({ velocity, position, color = 'red' }) {
        super({ x: velocity.x, y: velocity.y });
        this.position = { x: position.x, y: position.y };
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

// InvaderProjectile class
class InvaderProjectile extends Projectile {
    constructor({ velocity, position }) {
        super({
            velocity: velocity,
            position: position,
            color: 'white'
        });
    }
}

// Variables for animate function
const player = new Player();
const projectiles = [];
const invaderProjectiles = [];
let grid = [new Grid()];
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
const explosions = [];
let frames = 0;
let score = 0;
let lives = 3;
let game = {
    over: false,
    active: true
};

// Animate function (game loop)
function animate() {
    if (!game.active) {
        return;
    }

    // render background
    window.requestAnimationFrame(animate);
    canvasDrawer.fillStyle = 'black';
    canvasDrawer.fillRect(0, 0, canvas.width, canvas.height);

    // Render player
    player.update();

    // Explosion rendering
    if (game.over && explosions.length == 0) {
        explosions.push(new Explosion({
            x: player.position.x,
            y: player.position.y
        }));
    } else if (game.over) {
        explosions[0].update();
    }

    // Projectile movement and rendering
    if (projectiles.length > 0) {
        if (projectiles[0].position.y + projectiles[0].height <= 0) {
            setTimeout(() => {
                projectiles.splice(0, 1);
            }, 0);
        } else {
            projectiles[0].update();
        }
    };

    // Invader Projectile movement and rendering
    invaderProjectiles.forEach((invaderProjectile, i) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(i, 1);
            }, 0);
        } else {
            invaderProjectile.update();
        }

        // If player is shot
        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width &&
            invaderProjectile.position.y <= player.position.y + player.height) {

            setTimeout(() => {
                invaderProjectiles.splice(i, 1);
                lives -= 1;
                livesEl.innerHTML = lives;
                if (lives == 0) {
                    player.opacity = 0;
                    game.over = true;

                    setTimeout(() => {
                        game.active = false;
                        localStorage.setItem('score', score);
                        location.href = '/save'
                    }, 2000);
                }
                PlayerLoseLife.play();
            }, 0);
        }
    });

    // Grid movement and rendering
    if (grid.length > 0) {
        grid[0].update();
        grid[0].invaders.forEach((invader, i) => {
            if (!game.over) {
                invader.velocity = grid[0].velocity;
            } else {
                invader.velocity = { x: 0, y: 0 };
            }
            invader.update();

            // If invader is shot
            if (projectiles.length > 0) {
                let projectile = projectiles[0];
                if (projectile.position.y <= invader.position.y + invader.height &&
                    projectile.position.y + projectile.height >= invader.position.y &&
                    projectile.position.x >= invader.position.x &&
                    projectile.position.x + projectile.width <= invader.position.x + invader.width) {
                    setTimeout(() => {
                        const invaderFound = grid[0].invaders.find((invader2) => {
                            return invader2 === invader;
                        });

                        const projectileFound = projectiles.find((projectile2) => {
                            return projectile2 === projectile;
                        })

                        if (invaderFound && projectileFound) {
                            grid[0].invaders.splice(i, 1);
                            projectiles.splice(0, 1);

                            if (grid[0].invaders.length > 0) {
                                const firstInvader = grid[0].invaders[0];
                                const lastInvader = grid[0].invaders[grid[0].invaders.length - 1];

                                grid[0].width = lastInvader.position.x + lastInvader.width * 1.5 - firstInvader.position.x;
                                grid[0].position.x = firstInvader.position.x;
                                score += 100;
                            } else {
                                grid.splice(0, 1);
                                score += 1000;
                            }
                        }

                        AlienHit.play();
                        scoreEl.innerHTML = score;
                    }, 0);
                }
            }
        });
    }

    // Respawn grid
    if (grid.length == 0) {
        grid = [new Grid()];
    }

    frames++;

    // Invader shoot call
    if (frames % 225 == 0 && grid.length > 0 && !game.over) {
        grid[0].invaders[Math.floor(Math.random() * grid[0].invaders.length)].shoot(invaderProjectiles);
    }

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
addEventListener('keydown', ({ key }) => {
    if (game.over) {
        return;
    }

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
                    velocity: {
                        x: 0,
                        y: -3
                    },
                    position: {
                        x: player.position.x + (player.width / 2) - 2,
                        y: player.position.y - 10
                    }
                }));
                laserShoot.play();
            }
            break;
    };
});

// Key Press up
addEventListener('keyup', ({ key }) => {
    if (game.over) {
        return;
    }

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