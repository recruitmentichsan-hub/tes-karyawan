
// ====== Definisi Paket Tes ======
// Catatan: Anda bisa mengubah/menambah soal di sini.
// Struktur minimal tiap test:
// { id, title, minutes, items: [ {type, prompt, options?, key?, trait?} ] }
window.TESTS = {
  b5: {
    id: "b5",
    title: "Kepribadian (DiSC)",
    minutes: 20,
    items: [
      // Skala 1-5: Sangat Tidak Setuju ... Sangat Setuju
      // Trait: E (Extraversion), A (Agreeableness), C (Conscientiousness), N (Neuroticism / Emotional Stability-), O (Openness)
      {type:"likert5", prompt:"Saya merasa nyaman memimpin atau berbicara di depan orang banyak.", trait:"E"},
      {type:"likert5", prompt:"Saya mudah berempati terhadap orang lain.", trait:"A"},
      {type:"likert5", prompt:"Saya rapi dan terorganisir dalam bekerja.", trait:"C"},
      {type:"likert5", prompt:"Saya mudah cemas dalam situasi tertekan.", trait:"N"},
      {type:"likert5", prompt:"Saya tertarik mencoba ide baru.", trait:"O"},
      {type:"likert5", prompt:"Saya suka bersosialisasi di lingkungan baru.", trait:"E"},
      {type:"likert5", prompt:"Saya berusaha menghindari konflik dan bersikap kooperatif.", trait:"A"},
      {type:"likert5", prompt:"Saya menyelesaikan tugas tepat waktu.", trait:"C"},
      {type:"likert5", prompt:"Saya sering merasa khawatir tanpa alasan jelas.", trait:"N"},
      {type:"likert5", prompt:"Saya menikmati belajar hal yang tidak biasa.", trait:"O"},
      {type:"likert5", prompt:"Saya energik ketika bekerja dengan tim.", trait:"E"},
      {type:"likert5", prompt:"Saya memaafkan kesalahan kecil orang lain.", trait:"A"},
      {type:"likert5", prompt:"Saya memperhatikan detail dengan teliti.", trait:"C"},
      {type:"likert5", prompt:"Saya mudah panik ketika dikejar deadline.", trait:"N"},
      {type:"likert5", prompt:"Saya kreatif dalam memecahkan masalah.", trait:"O"},
      {type:"likert5", prompt:"Saya merasa bersemangat saat bertemu orang baru.", trait:"E"},
      {type:"likert5", prompt:"Saya peduli pada perasaan rekan kerja.", trait:"A"},
      {type:"likert5", prompt:"Saya merencanakan pekerjaan sebelum memulai.", trait:"C"},
      {type:"likert5", prompt:"Saya stabil secara emosional (jarang tersulut).", trait:"N-", reverse:true},
      {type:"likert5", prompt:"Saya terbuka terhadap perspektif yang berbeda.", trait:"O"}
      {type:"likert5", prompt:"Saya terbuka terhadap kesempatan baru.", trait:"O"}
    ]
  },
  num: {
    id: "num",
    title: "Numerik",
    minutes: 12,
    items: [
      {type:"mcq", prompt:"Jika 3x + 2 = 17, maka x = ?", options:["3","4","5","6"], key: "5"},
      {type:"mcq", prompt:"Harga setelah diskon 20% dari Rp250.000 adalah?", options:["Rp200.000","Rp210.000","Rp220.000","Rp230.000"], key:"Rp200.000"},
      {type:"mcq", prompt:"Rata-rata dari 8, 10, 12, 14 adalah?", options:["10","11","11,5","12"], key:"11"},
      {type:"mcq", prompt:"Sebuah grafik menunjukkan penjualan naik dari 120 ke 150. Kenaikan persentasenya adalah?", options:["20%","25%","30%","15%"], key:"25%"},
      {type:"mcq", prompt:"12 pekerja menyelesaikan proyek dalam 10 hari. Jika pekerja menjadi 15 (kecepatan sama), berapa hari?", options:["6","7","8","9"], key:"8"},
      {type:"mcq", prompt:"Bilangan berikut mana yang kelipatan 9?", options:["27","32","44","52"], key:"27"},
      {type:"mcq", prompt:"Pukul 09.30 ke 13.45 adalah selisih ...", options:["4 jam 15 mnt","4 jam 30 mnt","3 jam 45 mnt","5 jam"], key:"4 jam 15 mnt"},
      {type:"mcq", prompt:"Nilai x dari 5x = 2x + 21 adalah?", options:["5","6","7","8"], key:"7"}
    ]
  },
  verbal: {
    id: "verbal",
    title: "Verbal (Sinonim/Analogi)",
    minutes: 8,
    items: [
      {type:"mcq", prompt:"Sinonim 'konkret' adalah...", options:["abstrak","nyata","hipotetis","maya"], key:"nyata"},
      {type:"mcq", prompt:"Analogi: Dokter : Pasien = Guru : ...", options:["Murid","Sekolah","Kelas","Pelajaran"], key:"Murid"},
      {type:"mcq", prompt:"Antonim 'ekspansif' adalah...", options:["meluas","menyempit","berkembang","melonjak"], key:"menyempit"},
      {type:"mcq", prompt:"Isi yang paling tepat: 'Ia bekerja dengan sangat ____ sehingga jarang terjadi kesalahan.'", options:["serampangan","teliti","terburu-buru","santai"], key:"teliti"},
      {type:"mcq", prompt:"Analogi: Roda : Mobil = Sayap : ...", options:["Kapal","Burung","Sepeda","Jalan"], key:"Burung"},
      {type:"mcq", prompt:"Sinonim 'integritas' adalah...", options:["kejujuran","popularitas","kreativitas","keberuntungan"], key:"kejujuran"}
    ]
  }
};
