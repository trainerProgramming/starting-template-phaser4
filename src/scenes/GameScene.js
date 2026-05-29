import Phaser from 'phaser';
// Meng-import file globals
import { GLOBALS } from '../utils/globals';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    // Fungsi create() digunakan untuk menyusun dunia game (menempatkan player, musuh, background)
    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Contoh menampilkan teks di tengah layar
        this.add.text(width / 2, height / 2 - 50, 'GAMEPLAY SCENE\n(Tekan ESC untuk kembali)', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // ==============================================================
        // CONTOH PENGGUNAAN VARIABEL GLOBAL
        // ==============================================================

        // 1. Membaca dan menampilkan state dari GLOBALS
        let scoreText = this.add.text(20, 20, `Skor: ${GLOBALS.score}`, { fontSize: '24px', fill: '#00ff00' });
        let livesText = this.add.text(20, 50, `Nyawa: ${GLOBALS.lives}`, { fontSize: '24px', fill: '#ff0000' });

        // 2. Simulasi Interaksi: Mengubah GLOBALS dan mengupdate UI layar
        this.add.text(width / 2, height / 2 + 50, '(Tekan SPASI untuk tambah skor)', { fontSize: '20px', fill: '#ffff00' }).setOrigin(0.5);
        
        this.input.keyboard.on('keydown-SPACE', () => {
            GLOBALS.score += 10; // 2a. Tambah data di global
            scoreText.setText(`Skor: ${GLOBALS.score}`); // 2b. Perbarui teks di layar
        });

        // ==============================================================

        // Mendengarkan event tombol 'ESC' (Escape) pada keyboard
        this.input.keyboard.on('keydown-ESC', () => {
            // Jika ditekan, kembalikan pemain ke layar Menu Utama
            this.scene.start('MenuScene');
        });
    }

    // Fungsi update() dipanggil SECARA TERUS-MENERUS sebanyak 60 kali per detik (60 FPS).
    // Letakkan logika yang harus dicek berulang-ulang di sini (misal: pergerakan, input tombol panah)
    update(time, delta) {
        // Contoh logika:
        // if (tombolKiriDitekan) {
        //     player.x -= kecepatan;
        // }
    }
}
