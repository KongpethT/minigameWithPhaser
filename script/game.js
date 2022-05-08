let config = {
    type: Phaser.AUTO,
    width: 1334,
    height: 480,
    parent: 'gameContainer',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debut: false
        }
    }
}

let game = new Phaser.Game(config)
let scene
let player
let ufoNum = 10
let ufoGroup
let ufoSpacing = 40
let ufoSwing = Math.random() * 60
let keyUp, keyDown, keyRight, keyLeft, keyShoot
let bulletSpeed = 800
let bulletShooted

// upload assets come to game
function preload() {
    scene = this
    scene.load.image('bg', '../assets/bg.png')
    scene.load.image('space', '../assets/spaceshi.png')
    scene.load.image('bullet', '../assets/bullet.png')
    scene.load.image('ufo', '../assets/ufo.png')
}
//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
// create assets running insite games
function create() {
    scene.add.image(680, 100, 'bg')
    createPlayer()
    createButtonControllerPlayer()
    bulletShooted = scene.add.group()
    createUfo()
}
//Create scenes
function createPlayer() {
    player = scene.physics.add.sprite(0, config.height / 2, 'space')
    player.speed = 400
    player.setScale(0.06)
}
//create button controller
function createButtonControllerPlayer() {
    keyUp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    keyDown = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    keyShoot = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
}
//create ufo
function createUfo() {
    ufoGroup = scene.add.group()
    for (let i = 0; i < ufoNum; i++) {
        let ufo = scene.physics.add.sprite(200, 80 + (i * ufoSpacing), 'ufo')
        ufo.setScale(0.06)
        ufo.speed = (Math.random() * 2) + 2
        ufo.startX = config.width + (ufo.width / 2)
        ufo.startY = 80 + (i * ufoSpacing)
        ufo.x = ufo.startX
        ufo.y = ufo.startY
        ufo.magnitude = ufoSwing
        ufoGroup.add(ufo)
    }
}
//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
//even update
function update() {
    //player.rotation += 0.01
    updateControlPlayer()
    updateShooting()
    updateUFO()
}
//Control player
function updateControlPlayer() {
    if (keyUp.isDown) {
        player.setVelocityY(-player.speed)
    }
    else if (keyDown.isDown) {

        player.setVelocityY(player.speed)
    } else {
        player.setVelocityY(0)
    }

    if (keyRight.isDown) {
        player.setVelocityX(player.speed)
    }
    else if (keyLeft.isDown) {
        player.setVelocityX(-player.speed)
    } else {
        player.setVelocityX(0)
    }

    if (player.y < 0 + (player.getBounds().height / 2 + 7)) {
        player.y = player.getBounds().height / 2 + 7
    } else if (player.y > config.height - (player.getBounds().height / 2 + 7)) {
        player.y = config.height - (player.getBounds().height / 2 + 7)
    }

    if (player.x < 0 + (player.getBounds().width / 2 + 7)) {
        player.x = player.getBounds().width / 2 + 7
    } else if (player.x > config.width - (player.getBounds().height / 2 + 7)) {
        player.x = config.width - (player.getBounds().width / 2 + 20)
    }
}
//update when player shooting
function updateShooting() {
    if (Phaser.Input.Keyboard.JustDown(keyShoot)) {
        let bullet = scene.physics.add.sprite(player.x + 10, player.y + 2, 'bullet')
        bullet.setScale(0.02)
        bullet.body.velocity.x = bulletSpeed
        bulletShooted.add(bullet)
        console.log('shooting.....', bulletShooted.children);
    }
    // event bullet outsite screen is destroy
    for (let i = 0; i < bulletShooted.getChildren().length; i++) {
        //console.log('', bulletShooted.getChildren()[i])
        let bullet = bulletShooted.getChildren()[i]
        //bullet.rotation += 0.1  
        if (bullet.x > config.width) {
            bullet.destroy()
            console.log('bulletDestroy.....', bulletShooted.children);
        }
    }

}
function updateUFO() {
    //console.log(ufoGroup.getChildren().length);
    for (let i = 0; i < ufoGroup.getChildren().length; i++) {
        let UFO = ufoGroup.getChildren()[i]
        UFO.x -= UFO.speed
        UFO.y = UFO.startY + (Math.sin(game.getTime() / 1000) * UFO.magnitude)

        if (UFO.x < 0 - (UFO.width / 2)) {
            UFO.speed = (Math.random() * 2) + 2
            UFO.x = UFO.startX
            UFO.magnitude = ufoSwing
        }
    }
}


//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
