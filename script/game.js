
let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'gameContainer',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
        preload,
        create,
        update
    },
    //scene: null,
    backgroundColor: 0x333333,
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
let ufo
let ufoSpeed = Math.random() * 2
let ufoNum = 13
let ufoGroup
let ufoSpacing = 40
let ufoSwing = Math.random() * 60
let keyUp, keyDown, keyRight, keyLeft, keyShoot
let bulletSpeed = 800
let bulletShooted
let boomGroup


// upload assets come to game
function preload() {
    scene = this
    scene.load.image('background', '../assets/bg.png')
    scene.load.image('space', '../assets/spaceshi.png')
    scene.load.image('bullet', '../assets/bullet.png')
    scene.load.image('ufo', '../assets/ufo.png')
    scene.load.image('boom', '../assets/boom.png')
    scene.load.image('boomText', '../assets/boom2.png')
}
//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
// create assets running insite games
function create() {
    createBackground()
    createPlayer()
    createButtonControllerPlayer()
    bulletShooted = scene.add.group()
    createUfo()
    scene.physics.add.overlap(ufoGroup, bulletShooted, ufoDestroy)
    boomGroup = scene.add.group()

}
// create background
function createBackground() {
    let image = scene.add.image(scene.cameras.main.width / 2, scene.cameras.main.height / 2, 'background')
    let scaleX = scene.cameras.main.width / image.width
    let scaleY = scene.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)
    // console.log('kkkk', scene.cameras.main.width);

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
        ufo = scene.physics.add.sprite(200, 80 + (i * ufoSpacing), 'ufo')
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
//event create UFO destroy
function ufoDestroy(ufo, bullet) {
    boomEfface(ufo.x, ufo.y)
    bullet.destroy()
    ufo.destroy()

}
function boomEfface(posX, posY) {
    let boomEfface1 = scene.add.sprite(posX, posY, 'boom')
    boomEfface1.scale = 0.1
    boomEfface1.rotation = Phaser.Math.Between(0, 360)
    let boomEfface2 = scene.add.sprite(posX, posY, 'boomText')
    boomEfface2.scale = 0.05
    boomEfface2.rotation = Phaser.Math.Between(0, 360)
    boomGroup.add(boomEfface1)
    boomGroup.add(boomEfface2)
}
//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
//even update
function update() {
    //player.rotation += 0.01
    updateControlPlayer()
    updateShooting()
    updateUFO()
    updateBoomEfface()
}
//event update control player
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
//event update when player shooting
function updateShooting() {
    if (Phaser.Input.Keyboard.JustDown(keyShoot)) {
        let bullet = scene.physics.add.sprite(player.x + 10, player.y + 2, 'bullet')
        bullet.setScale(0.02)
        bullet.body.velocity.x = bulletSpeed
        bulletShooted.add(bullet)
        //console.log('shooting.....', bulletShooted.children);
    }
    // event bullet outsite screen is destroy
    for (let i = 0; i < bulletShooted.getChildren().length; i++) {
        //console.log('', bulletShooted.getChildren()[i])
        let bullet = bulletShooted.getChildren()[i]
        //bullet.rotation += 0.1  
        if (bullet.x > config.width) {
            bullet.destroy()
            //console.log('bulletDestroy.....', bulletShooted.children);
        }
    }

}
//event opent ufo
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
//event efface boom
function updateBoomEfface() {
    for (let i = 0; i < boomGroup.getChildren().length; i++) {
        let boom = boomGroup.getChildren()[i]
        boom.rotation += 0.06
        boom.scale += 0.01
        boom.alpha -= 0.05
        if (boom.alpha <= 0) {
            boom.destroy()
        }
        //console.log(boomGroup.getChildren());
    }
}



//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
