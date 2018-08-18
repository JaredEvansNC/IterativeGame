var pickupSettings = {
    "healthpack": {         // the name of the pickup, used in enemysettings
        displayText: "+",   // What text to show on the pickup
        imageSize: 20,      // How big should the image for this pickup be
        collisionRadius: 35,// How easy is it to collide with this pickup
        color: "green",     // What color will this pickup be
        textColor: "white", // What color should the text be?
        timeToLive: -1,     // How long should this pickup last in, seconds. -1 means it will last forever until picked up, or the wave is over
        changeInHealth: 2,  // What value to change the health by, can be negative
        changeInScore: 0,   // What value to change the score by, can be negative
    },
    "coin1": {
        displayText: "$1",
        imageSize: 12,
        collisionRadius: 15,
        color: "darkorange",
        textColor: "maroon",
        timeToLive: 5,
        changeInHealth: 0,
        changeInScore: 1
    },
    "coin5": {
        displayText: "$5",
        imageSize: 15,
        collisionRadius: 15,
        color: "darkorange",
        textColor: "maroon",
        timeToLive: 5,
        changeInHealth: 0,
        changeInScore: 5
    }
}