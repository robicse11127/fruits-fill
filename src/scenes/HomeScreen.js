import 'phaser';
import logoImg from "../assets/logo.png";

class HomeScreen extends Phaser.Scene {
    constructor() {
        super('HomeScreen')
    }

    preload() {
        this.load.image("logo", logoImg);
    }

    create() {
        const logo = this.add.image(400, 150, "logo")
    }
}
 
export default HomeScreen;
