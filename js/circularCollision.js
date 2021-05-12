/**
 * Theory Behind Elastic Collision:
 * When two circles collides with each other, we need to change velocities of balls
 * to create an accurate reaction between them. The velocities of two circles colliding
 * are changed based on the angle they hit at each other. In order to achieve this elastic collision,
 * I have used One-Dimensional Newtonian equation. This equation, however works only if the balls
 * colliding with each other are parallel to each other. To do that, the only solution is to rotate the
 * balls based on the angle they were collided to each other. This rotation will let us use that One-Dimensional
 * Newtonian equation for realistic elastic collision. After we get the new velocities after running off the equation,
 * we need to re-rotate the balls to their original position.
 *
 * Equation Reference: https://en.wikipedia.org/wiki/Elastic_collision
 *
 * @return Null | Does not return a value
 * @param currentBall
 * @param nextBall
 */

function detectCircularCollision(currentBall, nextBall) {
    const velocityDifferenceX = currentBall.velocity.x - nextBall.velocity.x;
    const velocityDifferenceY = currentBall.velocity.y - nextBall.velocity.y;

    const xDistance = nextBall.x - currentBall.x;
    const yDistance = nextBall.y - currentBall.y;

    /*
    * This is to check the accidental overlap of the balls when colliding
    * with each other.
    *  */
    if (velocityDifferenceX * xDistance + velocityDifferenceY * yDistance >= 0) {

        // Getting angle between two colliding balls
        const angle = -Math.atan2(nextBall.y - currentBall.y, nextBall.x - currentBall.x);

        const m1 = currentBall.mass;
        const m2 = nextBall.mass;

        // Velocity before elastic collision equation
        const u1 = rotate(currentBall.velocity, angle);
        const u2 = rotate(nextBall.velocity, angle);

        // Velocity after 1d elastic collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const finalVelocity1 = rotate(v1, -angle);
        const finalVelocity2 = rotate(v2, -angle);

        // Swapping the balls velocities for realistic collision and bounce effect
        currentBall.velocity.x = finalVelocity1.x;
        currentBall.velocity.y = finalVelocity1.y;

        nextBall.velocity.x = finalVelocity2.x;
        nextBall.velocity.y = finalVelocity2.y;
    }
}