import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        // Nama Scene ini wajib didaftarkan (unik) agar bisa dipanggil oleh scene.start()
        super('MenuScene');
    }

    // Fungsi create() dijalankan SATU KALI ketika scene ini dimulai
    create() {
        // Mengambil ukuran lebar & tinggi layar saat ini
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // --- 1. MENAMBAHKAN JUDUL GAME ---
        // this.add.text(x, y, teks, { gaya/styling })
        this.add.text(width / 2, height / 2 - 50, 'MAIN MENU', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5); // setOrigin(0.5) membuat titik pusat teks persis di tengah

        // --- 2. MENAMBAHKAN TOMBOL PLAY ---
        const playButton = this.add.text(width / 2, height / 2 + 50, 'Play Game', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffff00' // Warna awal: kuning
        })
            .setOrigin(0.5)
            .setInteractive(); // WAJIB DIPANGGIL: Membuat teks ini bisa diklik/disentuh (sebagai tombol)

        // --- 3. MENAMBAHKAN EVENT LISTENER PADA TOMBOL ---

        // Event 'pointerdown' = Ketika tombol ini diklik oleh mouse atau disentuh jari
        playButton.on('pointerdown', () => {
            // Berpindah dari MenuScene ke GameScene
            this.scene.start('GameScene');
        });

        // Event 'pointerover' = Ketika kursor mouse *masuk/berada* di atas tombol (Hover)
        playButton.on('pointerover', () => {
            playButton.setColor('#ff0000'); // Berubah jadi merah saat di-hover
            this.input.setDefaultCursor('pointer'); // Mengubah ikon kursor mouse jadi tangan menunjuk
        });

        // Event 'pointerout' = Ketika kursor mouse *keluar* dari area tombol
        playButton.on('pointerout', () => {
            playButton.setColor('#ffff00'); // Kembali jadi kuning
            this.input.setDefaultCursor('default'); // Mengubah ikon kursor kembali normal
        });
    }
}
