import {config} from './game.js'

function createSpacePlayer(){
    player = scene.physics.add.sprite(0, config.height / 2, 'space')
    player.speed = 400
    player.setScale(0.2)
}

export {createSpacePlayer}