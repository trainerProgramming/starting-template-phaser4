// File ini digunakan sebagai tempat penyimpanan state/variabel global.
// Berguna untuk menyimpan data yang harus bertahan melintasi berbagai Scene 
// (misal skor dari GameScene ingin ditampilkan di GameOverScene).

export const GLOBALS = {
    // --- KONSTANTA LAYAR / SISTEM ---
    // Variabel yang sebaiknya tidak diubah (Konstanta)
    WIDTH: 800,
    HEIGHT: 600,

    // --- STATE PERMAINAN ---
    // Variabel yang akan berubah seiring berjalannya game
    score: 0,
    highScore: 0,
    lives: 3,
    currentLevel: 1,

    // --- PENGATURAN PEMAIN ---
    isMusicMuted: false,
    isSfxMuted: false,

    // Fungsi bantuan untuk me-reset data (misal saat game over)
    resetGameData() {
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 1;
    }
};
