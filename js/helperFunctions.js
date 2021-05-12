function generateRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function calculateDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

/**
 * This will rotates coordinate system to calculate new velocities
 *
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 * @param velocity
 * @param angle
 */

function rotate(velocity, angle) {
    return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}