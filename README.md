# Phaser 4 + Vite Game Template

Template proyek pembuat game tingkat lanjut menggunakan **Phaser v4.1.0** dengan konfigurasi **Vite** sebagai *module bundler*. Template ini sudah dioptimalkan agar pengembangan berjalan cepat, rapi, dan modular, termasuk penggunaan sistem Asset Manifest otomatis.

---

## 🚀 Cara Menjalankan Proyek

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).

1. Buka terminal di dalam direktori proyek ini.
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan (dilengkapi fitur *Hot-Reload*):
   ```bash
   npm run dev
   ```
4. Buka URL yang diberikan di terminal (biasanya `http://localhost:5173`) di browser Anda.

### 📦 Build untuk Produksi
Jika game Anda sudah selesai dan siap untuk di-publish (ke platform seperti Itch.io atau web hosting):
```bash
npm run build
```
Hasil file final yang terkompresi dan siap diunggah akan berada di dalam folder `dist/`.

---

## 📂 Struktur Direktori Utama

- `public/assets/` : Menyimpan file aset mentah (gambar, suara, spine, partikel). Folder `public/` dilayani secara statis oleh Vite.
- `src/` : Tempat seluruh kode program game ditulis (logika, scene, komponen).
- `package.json` : Konfigurasi dependensi, daftar modul pihak ketiga, versi Phaser, dan skrip *build*.

---

## 🎨 Panduan Mengelola Aset (Otomatis & Global)

Proyek ini telah dikonfigurasi dengan **sistem pendaftaran aset terpusat**. Anda **tidak perlu lagi menulis** `this.load.image(...)` secara manual di setiap Scene.

Semua aset didaftarkan melalui file: **`src/utils/assetsManifest.js`**. 
Saat game pertama kali berjalan, file `BootScene.js` akan membaca daftar tersebut dan memuat semua asetnya satu per satu sembari menampilkan animasi *loading*.

### 1. Cara Menambahkan Aset Baru
1. Taruh file mentah Anda di dalam sub-folder `public/assets/` yang sesuai (misal: gambar di folder `images/`).
2. Buka file `src/utils/assetsManifest.js`.
3. Tambahkan aset Anda di array (kategori) yang relevan menggunakan format objek.

**Contoh cara menulis di `assetsManifest.js`:**
```javascript
export const assetsManifest = {
    images: [
        { key: 'bg-menu', path: 'assets/images/background.png' },
        { key: 'player-icon', path: 'assets/images/player.png' }
    ],
    audio: [
        { key: 'bgm-menu', path: 'assets/audio/menu-music.mp3' },
        { key: 'jump-sfx', path: 'assets/audio/jump.wav' }
    ],
    spritesheets: [
        { 
            key: 'hero-run', 
            path: 'assets/spritesheets/hero.png', 
            frameConfig: { frameWidth: 64, frameHeight: 64 } 
        }
    ]
    // Tersedia juga kategori spine & particles
};
```

### 2. Cara Memanggil Aset di Dalam Scene
Karena aset sudah dimuat secara global oleh `BootScene`, maka di Scene apa pun setelahnya (misal `MenuScene` atau `GameScene`), Anda bisa langsung menggunakan `key`-nya secara bebas!

**Cara Menampilkan Gambar atau Sprite:**
```javascript
// Di dalam blok fungsi create() pada Scene
this.add.image(400, 300, 'bg-menu');

// Menampilkan spritesheet
this.add.sprite(100, 200, 'hero-run');
```

**Cara Memutar Suara:**
```javascript
// Efek Suara Sekali Putar
this.sound.play('jump-sfx');

// Memutar Musik Latar Belakang (Berulang / Looping)
const music = this.sound.add('bgm-menu', { loop: true });
music.play();
```

---

## 🎬 Panduan Membuat dan Menambahkan Scene Baru

Phaser membagi game menjadi bagian-bagian layar yang disebut "Scene" (seperti Menu, Gameplay, Game Over).

### 1. Buat File Scene Baru
Buat file JavaScript baru di dalam folder `src/scenes/` (misal: `GameOverScene.js`).
```javascript
import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene'); // Pastikan nama di super() unik!
    }

    create() {
        this.add.text(400, 300, 'GAME OVER', { 
            fontSize: '32px',
            color: '#ff0000' 
        }).setOrigin(0.5);
    }
}
```

### 2. Daftarkan Scene di `main.js`
Agar engine Phaser mengenali Scene baru Anda, Anda wajib mendaftarkannya di konfigurasi permainan.
Buka file `src/main.js`:
```javascript
// 1. Import scene baru yang tadi dibuat
import { GameOverScene } from './scenes/GameOverScene';

const config = {
    // ... konfigurasi layar & fisika ...
    scene: [
        BootScene,
        MenuScene,
        GameScene,
        GameOverScene // 2. Tambahkan ke dalam array ini
    ]
};
```

### 3. Cara Berpindah Antar Scene
Jika Anda ingin berpindah dari satu Scene ke Scene yang lain (misal karakter mati di `GameScene` lalu pindah ke `GameOverScene`), panggil kode berikut di mana saja dalam scene tersebut:
```javascript
// Menghentikan scene saat ini dan menjalankan scene tujuan
this.scene.start('GameOverScene'); 
```

---

## 🛠 Panduan Menggunakan Constants (Variabel Global Konstan)

Template ini menyediakan file **`src/utils/constants.js`** yang berguna untuk menyimpan variabel yang bersifat global dan tidak akan berubah ukurannya (misalnya resolusi dasar ukuran layar).

**Cara Menggunakan:**
```javascript
import { CONSTANTS } from '../utils/constants';

// Menempatkan objek secara dinamis mengikuti konstanta lebar layar (WIDTH)
this.add.text(CONSTANTS.WIDTH / 2, 50, 'Hello', {}).setOrigin(0.5);
```
