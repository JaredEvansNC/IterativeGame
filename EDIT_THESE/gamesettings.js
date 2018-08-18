var gameSettings = {
    DEBUG_MODE_ON: true,   // Set this to true to see the collision radiuses

    waveStartDelay: 3,  // Before a wave starts, how much time is there for the intro?
    waveIsOverDelay: 3, // After a wave ends, how much time is there before we go to the next wave intro?

    victoryMessage: "ALL WAVES COMPLETED",

    //define what happens in each wave
    waveDefs: [
        {
            waveName: "default",    // This will use whatever string you put in, by default it will say "Wave" followed by the number
            spawnRate: 1,           // How long it takes, in seconds, before the next enemy appears
            spawnRateRandomizer: 0.5, // How much time, in seconds, might be added or substracted from the next spawn time, keep this shorter than your spawnrate
            enemiesToClear: 3,      // How many enemies need to be killed before the next wave can start
            enemyList: [            // What enemies can spawn in this wave? Add a name more than once to make it spawn more often
                "basicEnemy"
            ],
        },
        {
            waveName: "Ultimate Wave",
            spawnRate: 3,           
            spawnRateRandomizer: 2, 
            enemiesToClear: 5,      
            enemyList: [            
                "basicEnemy"
            ]
        }
    ],
}