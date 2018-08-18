var enemySettings = {
    
    "basicEnemy" :              // This name is the name you use in the waveDefs array in gamesettings.js
    {           
        moveSpeed: 30,          // How fast this enemy moves
        movementType: "follow", // What movement pattern does this enemy use? can be 'follow', 'line', 'wave'
        health: 2,              // How much health does this enemy have
        collisionRadius: 15,    // How easy it is to collide with this enemy
        enemySize: 25,          // How big this enemy's image is
        damage: 1,              // How much damage this enemy does when it touches the player
        color: "fuchsia",       // What color is this enemy? Other colors can be found here: https://www.quackit.com/css/css_color_codes.cfm
        numberOfSides: 5,       // How many sides does this enemy's shape have?
        droppedPickups: [       // What pickups does the enemy drop when it dies?
            {
                pickupName: "coin1",    // Which pickup from pickupSettings.js will be dropped
                dropChance: 1,          // How likely it is to drop, 0 to 1, 1 being 100% chance
            },
            {
                pickupName: "coin1",    // Which pickup from pickupSettings.js will be dropped
                dropChance: 0.66,          // How likely it is to drop, 0 to 1, 1 being 100% chance
            },
            {
                pickupName: "coin5",    // Which pickup from pickupSettings.js will be dropped
                dropChance: 0.33,          // How likely it is to drop, 0 to 1, 1 being 100% chance
            },
        ]
    },

    "healthpackEnemy" :
    {            
        moveSpeed: 20, 
        movementType: "follow",         
        health: 4,             
        collisionRadius: 30,    
        enemySize: 15,           
        damage: 3,  
        color: "crimson",
        numberOfSides: 3,
        droppedPickups: [       
            {
                pickupName: "healthpack",    
                dropChance: 1,          
            },

        ]        
    },

    "bossEnemy" :
    {            
        moveSpeed: 10, 
        movementType: "follow",         
        health: 50,             
        collisionRadius: 40,    
        enemySize: 40,           
        damage: 5,  
        color: "DarkMagenta",
        numberOfSides: 6,
        droppedPickups: [       
            {
                pickupName: "coin5",    
                dropChance: 1,         
            },
            {
                pickupName: "coin5",    // Which pickup from pickupSettings.js will be dropped
                dropChance: 1,          // How likely it is to drop, 0 to 1, 1 being 100% chance
            },
        ]        
    },
};