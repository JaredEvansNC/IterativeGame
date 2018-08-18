var enemySettings = {
    
    "basicEnemy" :              // This name is the name you use in the waveDefs array in gamesettings.js
    {           
        moveSpeed: 30,          // How fast this enemy moves
        movementType: "follow", // What movement pattern does this enemy use? can be 'follow', 'line', 'wave'
        health: 2,              // How much health does this enemy have
        collisionRadius: 70,    // How easy it is to collide with this enemy
        enemySize: 25,          // How big this enemy's image is
        damage: 1,              // How much damage this enemy does when it touches the player
        score: 10,              // How many points you earn for killing this enemy
        color: "fuchsia",       // What color is this enemy? Other colors can be found here: https://www.quackit.com/css/css_color_codes.cfm
        numberOfSides: 5,       // How many sides does this enemy's shape have?
    },

    "basicLineMoveEnemy" :
    {    
        moveSpeed: 30,  
        movementType: "line",
        health: 20,
        collisionRadius: 70,
        enemySize: 20,
        damage: 1,
        score: 20,
        color: "magenta",   
        numberOfSides: 3,       
    },

    "bossEnemy" :
    {            
        moveSpeed: 10, 
        movementType: "follow",         
        health: 50,             
        collisionRadius: 40,    
        enemySize: 40,           
        damage: 5,  
        score: 100,
        color: "DarkMagenta",
        numberOfSides: 6,        
    },
};