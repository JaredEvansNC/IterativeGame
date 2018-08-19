// These are the definitions of items that can be picked up, such as coins, health packs, and permanent upgrades
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
        changeInDamage: 0,  // What value to change player bullet damage by, permanent until next game
        changeInSpeed: 0,   // What value to change player speed by, permanent until next game (should be a larger number, probably double digits at minimum)
        changeInMaxHealth: 0,  // What value to change player max health by, permanent until next game
    },
    "coin1": {
        displayText: "$1",
        imageSize: 12,
        collisionRadius: 15,
        color: "darkorange",
        textColor: "maroon",
        timeToLive: 5,
        changeInHealth: 0,
        changeInScore: 1,
        changeInDamage: 0,
        changeInSpeed: 0,
        changeInMaxHealth: 0,
    },
    "coin5": {
        displayText: "$5",
        imageSize: 15,
        collisionRadius: 15,
        color: "darkorange",
        textColor: "maroon",
        timeToLive: 5,
        changeInHealth: 0,
        changeInScore: 5,
        changeInDamage: 0,
        changeInSpeed: 0,
        changeInMaxHealth: 0,
    },
    "permanentDamageBoost": {
        displayText: "DMG+",
        imageSize: 25,
        collisionRadius: 45,
        color: "cornflowerblue",
        textColor: "navy",
        timeToLive: 10,
        changeInHealth: 0,
        changeInScore: 0,
        changeInDamage: 1,
        changeInSpeed: 0,
        changeInMaxHealth: 0,
    },
    "permanentSpeedBoost": {
        displayText: "SPD+",
        imageSize: 25,
        collisionRadius: 45,
        color: "orangered",
        textColor: "gold",
        timeToLive: 10,
        changeInHealth: 0,
        changeInScore: 0,
        changeInDamage: 0,
        changeInSpeed: 25,
        changeInMaxHealth: 0,
    },
    "permanentHealthBoost": {
        displayText: "HLTH+",
        imageSize: 25,
        collisionRadius: 45,
        color: "red",
        textColor: "white",
        timeToLive: 10,
        changeInHealth: 0,
        changeInScore: 0,
        changeInDamage: 0,
        changeInSpeed: 0,
        changeInMaxHealth: 1,
    }
}