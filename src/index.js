import Phaser from "phaser";
import Config from './config/Config';
import HomeScreen from './scenes/HomeScreen';

class Game extends Phaser.Game {
	constructor() {
		super(Config);
		this.scene.add( 'HomeScreen', HomeScreen );
		this.scene.start( 'HomeScreen' );
	}
}

window.onload = function() {
	window.game = new Game();
}

