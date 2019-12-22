import 'phaser';
import Config from "../config/Config";
import sky from "../assets/img/sky.png";
import ground from "../assets/img/platform.png";
import star from "../assets/img/star.png";
import bomb from '../assets/img/bomb.png';
import dude from '../assets/img/dude.png';

class HomeScreen extends Phaser.Scene {
    constructor() {
        super('HomeScreen')

        var platforms;
        var player;
        var cursor;
        var stars;
        var {physics} = Config;
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('ground', ground);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        const sky = this.add.image(400, 300, 'sky');
        // const star = this.add.image(400, 300, 'star');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create( 400, 568, 'ground' ).setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground')

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ {key: 'dude', frame: 4} ],
            frameRate: 20
        })

                
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // this.player.body.setGravityY(300);
        this.physics.add.collider(this.player, this.platforms);

        /**
         * Controlling the player with Keyboard
         */
        this.cursor = this.input.keyboard.createCursorKeys();

        /**
         * Creating Stars
         */
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })
        

    }

    update() {
        /**
         * Left Key
         */
        if( this.cursor.left.isDown ) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        /**
         * Right Key
         */
        else if( this.cursor.right.isDown ) {
            this.player.setVelocityX(160);
            this.player.anims.play('left', true);
        }
        /**
         * Default
         */
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if(this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.setVelocity(-330)
        }
    }
}
 
export default HomeScreen;
