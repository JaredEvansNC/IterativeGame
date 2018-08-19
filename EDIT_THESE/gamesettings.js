
// Various game settings, including the definition of each wave
var gameSettings = {
    DEBUG_MODE_ON: false,   // Set this to true to see the collision radiuses around each game object

    waveStartDelay: 3,  // Before a wave starts, how much time is there for the intro?
    waveIsOverDelay: 3, // After a wave ends, how much time is there before we go to the next wave intro?

    victoryMessage: "ALL WAVES COMPLETED",  // The final text that appears

    //define what happens in each wave, and how many waves there are total
    waveDefs: [
        {
            waveName: "default",    // This will use whatever string you put in, by default it will say "Wave" followed by the number
            spawnRate: 5,           // How long it takes, in seconds, before the next enemy appears
            spawnRateRandomizer: 3, // How much time, in seconds, might be added or substracted from the next spawn time, keep this shorter than your spawnrate
            enemyList: [            // What enemies will spawn this wave. Enemies will spawn in this order.
                "basicEnemy", 
                "basicEnemy", 
                "bulletEnemy", 
            ],
        },
        {
            waveName: "Final Wave",
            spawnRate: 3,           
            spawnRateRandomizer: 2, 
            enemyList: [            
                "basicEnemy",
                "bulletEnemy",
                "healthpackEnemy",
                "basicEnemy",
                "bossEnemy",
            ]
        }
    ],
}