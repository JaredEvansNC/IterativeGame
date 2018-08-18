var enemySettings = {
    "basicEnemy" : {            // This name is the name you use in the waveDefs array in gamesettings.js
        moveSpeed: 30,          // How fast this enemy moves
        movementType: "follow", // What movement pattern does this enemy use? can be 'follow', 'line', 'wave'
        health: 20,             // How much health does this enemy have
        collisionRadius: 70,    // How easy it is to collide with this enemy
        enemySize: 20,          // How big this enemy's image is
        damage: 1,              // How much damage this enemy does when it touches the player
    },
    "basicLineMoveEnemy" : {    // This name is the name you use in the waveDefs array in gamesettings.js
        moveSpeed: 30,  
        movementType: "line",
        health: 20,
        collisionRadius: 70,
        enemySize: 20,
        damage: 1,
    },
};