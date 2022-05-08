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
let keyUp, keyDown, keyRight, keyLeft, keyShoot
let bulletSpeed = 800
let bulletShooted

// upload assets come to game
function preload() {
    scene = this
    scene.load.image('space', '../assets/spaceshi.png')
    scene.load.image('bullet', '../assets/bullet.png')
}
//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
// create assets running insite games
function create() {
    createPlayer()
    createButtonController()
    bulletShooted = scene.add.group()
}
//create button controller
function createButtonController() {
    keyUp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    keyDown = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    keyShoot = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
}
//------------------------------------ End -----------------------------------------------
//----------------------------------------------------------------------------------------
//even update
function update() {
    //player.rotation += 0.01
    controlPlayer()
    shooting()
}

//update when player shooting
function shooting() {
    if (Phaser.Input.Keyboard.JustDown(keyShoot)) {
        //console.log('shooting.....');
        let bullet = scene.physics.add.sprite(player.x + 10, player.y + 2, 'bullet')
        bullet.setScale(0.06)
        bullet.body.velocity.x = bulletSpeed
        bulletShooted.add(bullet)
        console.log('shooting.....', bulletShooted.children);
    }
}

//Create player
function createPlayer() {
    player = scene.physics.add.sprite(0, config.height / 2, 'space')
    player.speed = 400
    player.setScale(0.2)
}

//Control player
function controlPlayer() {
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
