
# Psikotest Online – Mini-site (untuk HR)

Mini-site ini bisa Anda unggah ke GitHub Pages / Netlify / Vercel (hosting gratis). Sudah siap pakai:
- Form data kandidat
- 3 paket tes (Big Five, Numerik, Verbal)
- Timer per tes
- Skor otomatis + ringkasan
- Kirim hasil ke Google Sheets (via Google Apps Script)
- Cetak ke PDF (Ctrl/Cmd+P)

## Cara Pakai Singkat

1) **Unduh ZIP**, ekstrak folder `psikotest-online`.
2) Buka `index.html` di browser. Coba jalankan tes.
3) Untuk menerima hasil:
   - Buka **Google Drive → New → Google Sheets** (beri nama mis. `Hasil Psikotest`).
   - **Extensions → Apps Script**. Hapus isi, lalu tempel kode dari `apps_script/Code.gs` (di repo ini).
   - Klik **Deploy → New deployment**:
     - Type: **Web app**
     - Description: `Receiver`
     - Execute as: **Me (your account)**
     - Who has access: **Anyone** (atau Anyone with the link)
   - Klik **Deploy**, salin **Web app URL**.
   - Buka `index.html`, cari `YOUR_APPS_SCRIPT_WEB_APP_URL` dan ganti dengan URL tadi.
   - Simpan. Coba submit hasil dari halaman tes.

4) **Hosting** (opsional):
   - **GitHub Pages**: buat repo, upload isi folder, di Settings → Pages → pilih branch `main` / `docs`.
   - **Netlify/Vercel**: drag & drop folder ke dashboard.
   - Setelah live, bagikan link ke kandidat.

## Mengubah / Menambah Soal

- Edit file `tests.js`.
- Tipe butir:
  - `likert5` → skala 1–5 (STS…SS), gunakan properti `trait` untuk Big Five (E/A/C/N/O), `reverse: true` untuk membalik skor.
  - `mcq` → pilihan ganda `options:[]` dan `key` untuk jawaban benar.
- Durasi (menit) ada di `minutes`.

## Struktur Data Hasil (yang dikirim ke Sheets)

```json
{
  "company": "Perusahaan Anda",
  "candidate": { "nama": "...", "email": "...", "posisi": "...", "kode": "..." },
  "results": {
    "b5": { "score": {"E":3.8,"A":4.2,"C":4.6,"N":2.1,"O":4.0}, "items":[...], "startAt":"...", "endAt":"..." },
    "num": { "score": {"benar":6,"total":8,"persentase":75}, "items":[...], ... },
    "verbal": { "score": {"benar":5,"total":6,"persentase":83}, "items":[...], ... }
  },
  "completedAt": "ISO string"
}
```

## Google Sheets – Apps Script

Lihat file `apps_script/Code.gs` untuk endpoint penerima POST JSON yang akan menulis ke sheet secara otomatis.

---

**Catatan Penting**  
- Big Five di sini adalah **screening singkat** untuk konteks kerja, **bukan diagnosis klinis**.
- Selalu kombinasikan hasil psikotes dengan wawancara/assesment lain.
