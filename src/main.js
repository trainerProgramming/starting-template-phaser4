import Phaser from 'phaser';

// Import semua Scene yang akan digunakan di dalam game
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

// Import variabel global
import { GLOBALS } from './utils/globals';

// Objek konfigurasi utama Phaser
const config = {
    // Tipe rendering: AUTO akan mencoba menggunakan WebGL jika didukung browser, jika tidak akan otomatis turun ke Canvas.
    type: Phaser.AUTO, 
    
    // Menggunakan variabel ukuran layar dari globals.js
    width: GLOBALS.WIDTH,
    height: GLOBALS.HEIGHT,
    
    // ID dari elemen <div> di index.html tempat game akan dirender
    parent: 'game-container',
    
    // Konfigurasi sistem Fisika game (Physics Engine)
    physics: {
        default: 'arcade', // Menggunakan Arcade Physics (ringan dan mudah digunakan)
        arcade: {
            gravity: { y: 300 }, // Nilai gravitasi (tarikan ke bawah). y: 300 berarti objek akan jatuh ke bawah.
            debug: false         // Ubah ke 'true' untuk melihat garis batas (hitbox) objek saat proses pembuatan game.
        }
    },
    
    // Daftar Scene (Adegan) yang didaftarkan.
    // PERHATIAN: Scene yang berada paling atas (indeks 0) akan dieksekusi pertama kali saat game dinyalakan!
    scene: [
        BootScene, // Berjalan pertama kali untuk me-load semua aset
        MenuScene, // Berjalan setelah BootScene, menampilkan Menu Utama
        GameScene  // Berjalan ketika tombol 'Play' ditekan di Menu Utama
    ]
};

// Menginisialisasi/menjalankan engine Phaser menggunakan konfigurasi di atas
export default new Phaser.Game(config);
