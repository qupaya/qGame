import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: window.innerHeight,
      width: window.innerWidth,
      scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      canvasStyle: `display: block; width: 100%; height: 100%;`,
    };

  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }
}

class MainScene extends Phaser.Scene {
  private qupaya!: Phaser.GameObjects.Sprite;

  constructor() {
    super({key: 'main'})
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.image('logo', 'qupaya.png');
    this.load.image('ground', 'ground.png');
  }

  create(): void {
    console.log('create method');
    let logo = this.physics.add.sprite(Number(this.sys.game.config.width) / 2,0,"logo");
    logo.setScale(0.1, 0.1);
    logo.setGravityY(150);

    let groundX= Number(this.sys.game.config.width) / 2;
    let groundY= Number(this.sys.game.config.height) * .95;
    let ground= this.physics.add.sprite(groundX,groundY,"ground");
    ground.displayWidth = Number(this.sys.game.config.width);
    ground.displayWidth = Number(this.sys.game.config.width) * 1.1;
    ground.scaleY = 0.2

    this.physics.add.collider(logo, ground);
    ground.setImmovable();
    ground.setGravityY(0);

  }

}
