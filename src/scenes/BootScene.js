import Phaser from 'phaser';
// Memanggil variabel dari file terpisah (assetsManifest.js)
import { assetsManifest } from '../utils/assetsManifest';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // --- SETUP LOADING BAR ---
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading Assets...',
            style: { font: '20px monospace', fill: '#ffffff' }
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // --- PROSES LOAD ASET DARI VARIABEL IMPORT ---
        assetsManifest.images.forEach(asset => this.load.image(asset.key, asset.path));
        assetsManifest.audio.forEach(asset => this.load.audio(asset.key, asset.path));
        assetsManifest.spritesheets.forEach(asset => this.load.spritesheet(asset.key, asset.path, asset.frameConfig));
    }

    create() {
        // Pindah ke Menu Utama setelah selesai
        this.scene.start('MenuScene');
    }
}
