const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

let ballsArray;
const minRadius = 10;
const maxRadius = 30;
const totalBalls = 150;
const randomBallColors = ['#FF7B54', '#FFB26B', '#FFD56B', '#939B62'];

// Setting up collision area
const ballBounceArea = {
    canvas: document.querySelector('canvas'),
    start: function () {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.context = this.canvas.getContext('2d');

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener('resize', function() {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;

            init();
        }.bind(this));
    }
}

function init() {
    ballBounceArea.start();
    ballsArray = [];

    for (let i = 0; i < totalBalls; i++) {
        const radius = generateRandomIntFromRange(minRadius, maxRadius);
        let x = generateRandomIntFromRange(radius, ballBounceArea.canvas.width - radius);
        let y = generateRandomIntFromRange(radius, ballBounceArea.canvas.height - radius);
        const ballColor = generateRandomColor(randomBallColors);
        let mass = 1; // This can be random too.
        // If mass is set to random:
        // let mass = generateRandomIntFromRange(minMass, maxMass);

        if (i !== 0) {
            for (let j = 0; j < ballsArray.length; j++) {
                if (calculateDistance(x, y, ballsArray[j].x, ballsArray[j].y) - (radius + ballsArray[j].radius) < 0) {
                    x = generateRandomIntFromRange(radius, ballBounceArea.canvas.width - radius);
                    y = generateRandomIntFromRange(radius, ballBounceArea.canvas.height - radius);

                    j = -1;
                }
            }
        }

        ballsArray.push(new Ball(x, y, radius, ballColor, mass));
    }
}

function startCollision() {
    requestAnimationFrame(startCollision);
    const ctx = ballBounceArea.context;
    ctx.clearRect(0, 0, ballBounceArea.canvas.width, ballBounceArea.canvas.height);

    ballsArray.forEach(function(particle) {
        particle.update(ballsArray);
    });
}

init();
startCollision();

