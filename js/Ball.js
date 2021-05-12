function Ball(x, y, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.mass = mass;

    // Assigning random velocities to balls
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    };
    this.radius = radius;
    this.color = color;
    // this.mass = 1;

    this.draw = function() {
        const ctx = ballBounceArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    this.checkBorderCollision = function () {
        if (this.x - this.radius <= 0
            || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0
            || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        }
    }

    this.update = function(balls) {
        this.draw();

        // for (let i = 0; i < balls.length; i++) {
        //     let particle = balls[i];
        //     for (let j = i + 1; j < balls.length; j++) {
        //         let otherParticle = balls[j];
        //         if (calculateDistance(particle.x, particle.y, otherParticle.x, otherParticle.y) - this.radius * 2 < 0) {
        //             resolveCollision(particle, otherParticle);
        //         }
        //     }
        // }

        // Comparing "this" i.e. current ball to other balls will solve the problem of nested for-loop.
        for( let i = 0; i < balls.length; i++){
            if(this === balls[i]) continue;
            if(calculateDistance(this.x, this.y, balls[i].x, balls[i].y) - (this.radius + balls[i].radius) < 0){
                detectCircularCollision(this, balls[i]);
            }
        }

        this.checkBorderCollision();

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}