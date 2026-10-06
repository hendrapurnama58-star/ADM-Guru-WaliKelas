import { DocumentModule } from '../types/administrasi';

const emptyRows = (count: number, keys: string[], numbered = true): Record<string, string>[] => {
  return Array.from({ length: count }, (_, idx) => {
    const row: Record<string, string> = {};
    keys.forEach((k) => {
      if (k === 'no' && numbered) {
        row[k] = String(idx + 1);
      } else {
        row[k] = '';
      }
    });
    return row;
  });
};

export const DOCS_PART_2: DocumentModule[] = [
  // ==========================================
  // V. KOMUNIKASI ORANG TUA (Dok. 17, 24)
  // ==========================================
  {
    id: 'doc-17-buku-komunikasi-ortu',
    docNumber: '17',
    groupId: 'komunikasi_ortu',
    title: 'Buku Komunikasi Wali Kelas dengan Orang Tua / Wali',
    shortTitle: '17. Buku Komunikasi Orang Tua',
    description: 'Jurnal pencatatan konsultasi, koordinasi, dan komunikasi antara wali kelas dan orang tua/wali siswa Kelas V.',
    orientation: 'landscape',
    introText:
      'Buku komunikasi ini merekam setiap interaksi resmi antara Wali Kelas V SDN 2 Bojong dengan orang tua/wali siswa baik secara tatap muka, kunjungan rumah (home visit), maupun media daring.',
    tables: [
      {
        id: 't-17-a',
        title: 'Jurnal Komunikasi dan Konsultasi Orang Tua / Wali Siswa Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'tanggal', label: 'Hari / Tanggal', width: '12%', isMono: true },
          { key: 'namaSiswa', label: 'Nama Peserta Didik', width: '16%' },
          { key: 'namaOrtu', label: 'Nama Orang Tua / Wali', width: '16%' },
          { key: 'media', label: 'Media (Tatap Muka / WA / Surat)', width: '14%', align: 'center' },
          { key: 'topik', label: 'Topik Pembahasan / Informasi dari Wali Kelas' },
          { key: 'tanggapan', label: 'Tanggapan Ortu & Kesepakatan Bersama', width: '20%' },
          { key: 'paraf', label: 'Paraf', width: '65px', align: 'center' },
        ],
        rows: emptyRows(12, ['no', 'tanggal', 'namaSiswa', 'namaOrtu', 'media', 'topik', 'tanggapan', 'paraf']),
      },
    ],
  },

  {
    id: 'doc-24-catatan-rapat-ortu',
    docNumber: '24',
    groupId: 'komunikasi_ortu',
    title: 'Catatan Rapat / Pertemuan dengan Orang Tua Siswa',
    shortTitle: '24. Catatan Rapat Orang Tua',
    description: 'Notula resmi pertemuan wali kelas bersama paguyuban/orang tua siswa Kelas V (Sosialisasi Program, Projek P5, dan Pembagian Rapor).',
    orientation: 'portrait',
    introText:
      'Dokumen ini memuat risalah pertemuan resmi antara Wali Kelas V dengan orang tua/wali peserta didik SDN 2 Bojong pada Tahun Pelajaran 2026/2027.',
    tables: [
      {
        id: 't-24-a',
        title: 'A. Risalah & Notula Pertemuan Orang Tua / Wali Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'tanggal', label: 'Hari / Tanggal', width: '16%', isMono: true },
          { key: 'agenda', label: 'Agenda Pertemuan', width: '24%' },
          { key: 'hadir', label: 'Jml Hadir', width: '11%', align: 'center', isMono: true },
          { key: 'hasil', label: 'Pokok Bahasan & Keputusan Bersama' },
          { key: 'ket', label: 'Dok. Bukti', width: '14%' },
        ],
        rows: [
          {
            no: '1',
            tanggal: 'Juli 2026',
            agenda: 'Sosialisasi Program Kelas V (Fase C), Kesepakatan Kelas, & Kurikulum Merdeka',
            hadir: '',
            hasil: 'Penyampaian jadwal pelajaran, target capaian literasi-numerasi Fase C, dan pembentukan paguyuban kelas.',
            ket: 'Daftar Hadir & Foto',
          },
          {
            no: '2',
            tanggal: 'September 2026',
            agenda: 'Koordinasi Pelaksanaan Projek Penguatan Profil Pelajar Pancasila (P5) Semester 1',
            hadir: '',
            hasil: 'Dukungan alat/bahan ramah lingkungan untuk kegiatan gelar karya siswa.',
            ket: 'Daftar Hadir & Foto',
          },
          {
            no: '3',
            tanggal: 'Desember 2026',
            agenda: 'Evaluasi Pembelajaran Semester Ganjil & Penyerahan Laporan Hasil Belajar (Rapor)',
            hadir: '',
            hasil: 'Refleksi capaian hasil belajar siswa Semester 1 dan tindak lanjut libur semester.',
            ket: 'Daftar Hadir & Tanda Terima',
          },
          {
            no: '4',
            tanggal: 'Januari 2027',
            agenda: 'Rapat Awal Semester Genap & Persiapan Asesmen Nasional (ANBK) Pra-Kelas V',
            hadir: '',
            hasil: 'Penguatan pembiasaan literasi membaca dan numerasi bagi siswa Kelas V.',
            ket: 'Daftar Hadir & Foto',
          },
          {
            no: '5',
            tanggal: 'Juni 2027',
            agenda: 'Rapat Akhir Tahun Pelajaran 2026/2027 & Penyerahan Rapor Kenaikan Kelas',
            hadir: '',
            hasil: 'Laporan ketuntasan belajar Fase C Kelas V dan persiapan transisi ke Kelas VI.',
            ket: 'Daftar Hadir & Foto',
          },
        ],
      },
      {
        id: 't-24-b',
        title: 'B. Daftar Hadir Pertemuan Orang Tua / Wali Siswa Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'namaSiswa', label: 'Nama Peserta Didik', width: '28%' },
          { key: 'namaOrtu', label: 'Nama Orang Tua / Wali yang Hadir', width: '28%' },
          { key: 'noHp', label: 'No. HP / WA', width: '20%', isMono: true },
          { key: 'ttd', label: 'Tanda Tangan', width: '18%' },
        ],
        rows: emptyRows(12, ['no', 'namaSiswa', 'namaOrtu', 'noHp', 'ttd']),
      },
    ],
  },

  // ==========================================
  // VI. PROGRAM WALI KELAS (Dok. 18, 22, 23)
  // ==========================================
  {
    id: 'doc-18-jurnal-wali-kelas',
    docNumber: '18',
    groupId: 'program_wali_kelas',
    title: 'Jurnal Kegiatan Harian / Mingguan Wali Kelas',
    shortTitle: '18. Jurnal Kegiatan Wali Kelas',
    description: 'Catatan pelaksanaan tugas manajerial, pembinaan karakter, layanan administrasi, dan pendampingan belajar oleh wali kelas.',
    orientation: 'landscape',
    introText:
      'Jurnal ini mendokumentasikan aktivitas harian dan mingguan Wali Kelas V SDN 2 Bojong dalam mengelola kelas dan membina peserta didik.',
    tables: [
      {
        id: 't-18-a',
        title: 'Jurnal Pelaksanaan Kegiatan Wali Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'tanggal', label: 'Hari / Tanggal', width: '14%', isMono: true },
          { key: 'jenisKegiatan', label: 'Bidang Kegiatan (Manajerial / Akademik / Karakter)', width: '22%' },
          { key: 'uraian', label: 'Uraian Aktivitas & Pelaksanaan di Kelas' },
          { key: 'hasil', label: 'Hasil / Capaian Kegiatan', width: '20%' },
          { key: 'tindakLanjut', label: 'Tindak Lanjut', width: '16%' },
        ],
        rows: emptyRows(12, ['no', 'tanggal', 'jenisKegiatan', 'uraian', 'hasil', 'tindakLanjut']),
      },
    ],
  },

  {
    id: 'doc-22-program-kerja-wali-kelas',
    docNumber: '22',
    groupId: 'program_wali_kelas',
    title: 'Program Kerja Tahunan Wali Kelas V (Fase C)',
    shortTitle: '22. Program Kerja Wali Kelas',
    description: 'Rencana kerja sistematis Wali Kelas V SDN 2 Bojong Tahun Pelajaran 2026/2027 meliputi bidang administrasi, akademik, karakter, dan kemitraan.',
    orientation: 'landscape',
    introText:
      'Program kerja ini menjadi acuan operasional Wali Kelas V dalam menyelenggarakan pengelolaan kelas yang efektif, berpusat pada peserta didik, dan selaras dengan Kurikulum Merdeka.',
    tables: [
      {
        id: 't-22-a',
        title: 'Matriks Program Kerja Wali Kelas V SDN 2 Bojong Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '38px', align: 'center', isMono: true },
          { key: 'bidang', label: 'Bidang Program', width: '16%' },
          { key: 'kegiatan', label: 'Uraian Kegiatan Pokok', width: '26%' },
          { key: 'tujuan', label: 'Tujuan & Sasaran' },
          { key: 'waktu', label: 'Waktu Pelaksanaan', width: '14%', align: 'center' },
          { key: 'indikator', label: 'Indikator Keberhasilan', width: '18%' },
        ],
        rows: [
          {
            no: '1',
            bidang: 'Pengorganisasian & Administrasi Awal Tahun',
            kegiatan: 'Pendataan biodata siswa, penyusunan struktur kelas, jadwal pelajaran, piket, denah duduk, & kesepakatan kelas.',
            tujuan: 'Terciptanya tata kelola administrasi dan lingkungan fisik Kelas V yang tertib sejak awal semester.',
            waktu: 'Juli 2026',
            indikator: 'Dokumen administrasi kelas lengkap 100% dan terpajang rapi.',
          },
          {
            no: '2',
            bidang: 'Asesmen Diagnostik & Pemetaan Fase C',
            kegiatan: 'Pelaksanaan asesmen awal kognitif (literasi-numerasi) dan non-kognitif (gaya belajar & latar belakang siswa).',
            tujuan: 'Memetakan kesiapan belajar siswa Kelas V sebagai dasar pembelajaran berdiferensiasi.',
            waktu: 'Juli - Agustus 2026',
            indikator: 'Profil belajar seluruh siswa Kelas V terpetakan secara akurat.',
          },
          {
            no: '3',
            bidang: 'Pengelolaan Lingkungan & Pojok Literasi',
            kegiatan: 'Penataan sudut baca Fase C, pemajangan karya siswa, pohon literasi, dan pemeliharaan kebersihan harian.',
            tujuan: 'Menumbuhkan budaya baca 15 menit sebelum belajar dan rasa memiliki terhadap ruang kelas.',
            waktu: 'Juli 2026 - Juni 2027 (Rutin)',
            indikator: 'Ruang kelas bersih, pojok baca aktif dimanfaatkan setiap hari.',
          },
          {
            no: '4',
            bidang: 'Pembinaan Akademik, Literasi, & Numerasi (Persiapan ANBK)',
            kegiatan: 'Pendampingan intensif membaca pemahaman teks informasi/fiksi dan penalaran numerasi Fase C.',
            tujuan: 'Meningkatkan kompetensi literasi dan numerasi siswa Kelas V menyongsong Asesmen Nasional.',
            waktu: 'Agustus 2026 - Mei 2027',
            indikator: 'Minimal 90% siswa mencapai batas KKTP mata pelajaran.',
          },
          {
            no: '5',
            bidang: 'Pembinaan Karakter & Projek P5',
            kegiatan: 'Fasilitasi kegiatan Projek Penguatan Profil Pelajar Pancasila (P5), pembiasaan doa, disiplin positif, dan anti-perundungan.',
            tujuan: 'Menginternalisasi 6 dimensi Profil Pelajar Pancasila dalam keseharian siswa.',
            waktu: 'Semester 1 & Semester 2',
            indikator: 'Terlaksananya 2 tema Projek P5 dan gelar karya kelas.',
          },
          {
            no: '6',
            bidang: 'Layanan Bimbingan & Perhatian Khusus',
            kegiatan: 'Identifikasi kesulitan belajar, bimbingan individu/kelompok kecil (remedial & pengayaan), serta konseling dasar.',
            tujuan: 'Membantu siswa yang mengalami hambatan akademik maupun sosial-emosional.',
            waktu: 'Insidental / Berkala Bulanan',
            indikator: 'Siswa dengan hambatan belajar memperoleh pendampingan terukur.',
          },
          {
            no: '7',
            bidang: 'Kemitraan & Komunikasi Orang Tua',
            kegiatan: 'Pertemuan paguyuban kelas, pelaporan berkala via Buku Komunikasi, dan kunjungan rumah (home visit) bila diperlukan.',
            tujuan: 'Membangun sinergi positif antara wali kelas dan orang tua dalam mendampingi anak.',
            waktu: 'Awal/Tengah/Akhir Semester',
            indikator: 'Tingkat kehadiran rapat orang tua >= 90% dan komunikasi lancar.',
          },
          {
            no: '8',
            bidang: 'Evaluasi, Pelaporan Rapor, & Akhir Tahun',
            kegiatan: 'Pengolahan nilai asesmen sumatif, pengisian e-Rapor Kurikulum Merdeka, penyerahan rapor, dan laporan akhir tahun.',
            tujuan: 'Menyajikan laporan capaian hasil belajar siswa secara objektif dan akuntabel.',
            waktu: 'Desember 2026 & Juni 2027',
            indikator: 'Rapor dan laporan wali kelas selesai tepat waktu 100%.',
          },
        ],
      },
    ],
  },

  {
    id: 'doc-23-agenda-kegiatan-kelas',
    docNumber: '23',
    groupId: 'program_wali_kelas',
    title: 'Agenda Kegiatan Kelas V Tahun Pelajaran 2026/2027',
    shortTitle: '23. Agenda Kegiatan Kelas',
    description: 'Kalender operasional kegiatan Kelas V selama Semester Ganjil dan Semester Genap Tahun Pelajaran 2026/2027.',
    orientation: 'portrait',
    introText:
      'Agenda kegiatan kelas diselaraskan dengan Kalender Pendidikan Dinas Pendidikan dan program akademik SDN 2 Bojong.',
    tables: [
      {
        id: 't-23-a',
        title: 'Jadwal Agenda Kegiatan Utama Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'bulan', label: 'Bulan / Periode', width: '20%' },
          { key: 'namaAgenda', label: 'Nama Agenda Kegiatan Kelas V', width: '34%' },
          { key: 'uraian', label: 'Deskripsi Pelaksanaan & Sasaran' },
          { key: 'status', label: 'Status / Ket.', width: '14%', align: 'center' },
        ],
        rows: [
          { no: '1', bulan: 'Juli 2026', namaAgenda: 'Transisi Kelas V, Pemilihan Pengurus, & Kesepakatan Kelas', uraian: 'Orientasi kelas baru, musyawarah mufakat pengurus kelas, dan penandatanganan keyakinan kelas.', status: 'Terjadwal' },
          { no: '2', bulan: 'Juli 2026', namaAgenda: 'Asesmen Diagnostik Awal Fase C', uraian: 'Pemetaan kemampuan membaca, berhitung dasar, dan kesiapan sosial-emosional siswa.', status: 'Terjadwal' },
          { no: '3', bulan: 'Agustus 2026', namaAgenda: 'Semarak Kemerdekaan RI & Lomba Kebersihan Kelas', uraian: 'Menghias ruang Kelas V secara gotong royong dan partisipasi lomba tingkat sekolah.', status: 'Terjadwal' },
          { no: '4', bulan: 'September 2026', namaAgenda: 'Sumatif Tengah Semester (STS) Ganjil', uraian: 'Pelaksanaan asesmen formatif/sumatif tengah semester dan evaluasi ketercapaian awal.', status: 'Terjadwal' },
          { no: '5', bulan: 'Oktober - Nov 2026', namaAgenda: 'Pelaksanaan Projek P5 Tema 1 & Hari Guru', uraian: 'Aksi nyata Projek Penguatan Profil Pelajar Pancasila Semester Ganjil.', status: 'Terjadwal' },
          { no: '6', bulan: 'Desember 2026', namaAgenda: 'Sumatif Akhir Semester (SAS) Ganjil & Pembagian Rapor', uraian: 'Ujian akhir semester ganjil, pengolahan e-Rapor, dan penyerahan rapor ke orang tua.', status: 'Terjadwal' },
          { no: '7', bulan: 'Januari 2027', namaAgenda: 'Refleksi Awal Semester Genap & Rotasi Kelompok Belajar', uraian: 'Evaluasi kesepakatan kelas dan penyegaran denah tempat duduk Semester 2.', status: 'Terjadwal' },
          { no: '8', bulan: 'Februari - Maret 2027', namaAgenda: 'Simulasi Literasi-Numerasi (Persiapan ANBK Kelas V) & STS Genap', uraian: 'Latihan soal AKM Literasi-Numerasi berbasis komputer/kertas dan Sumatif Tengah Semester Genap.', status: 'Terjadwal' },
          { no: '9', bulan: 'April - Mei 2027', namaAgenda: 'Gelar Karya Projek P5 Tema 2', uraian: 'Pameran hasil karya kokurikuler siswa Kelas V bersama orang tua.', status: 'Terjadwal' },
          { no: '10', bulan: 'Juni 2027', namaAgenda: 'Sumatif Akhir Tahun (SAT), Rapat Kenaikan Kelas, & Rapor', uraian: 'Asesmen akhir tahun pelajaran 2026/2027 dan pelaporan kenaikan ke Kelas VI.', status: 'Terjadwal' },
        ],
      },
    ],
  },

  // ==========================================
  // VII. EVALUASI (Dok. 26, 27, 28)
  // ==========================================
  {
    id: 'doc-26-evaluasi-program',
    docNumber: '26',
    groupId: 'evaluasi',
    title: 'Evaluasi Ketercapaian Program Wali Kelas V',
    shortTitle: '26. Evaluasi Program Wali Kelas',
    description: 'Analisis realisasi program kerja wali kelas, kendala pelaksanaan di lapangan, serta alternatif solusi perbaikan.',
    orientation: 'landscape',
    introText:
      'Evaluasi program dilaksanakan setiap akhir semester untuk mengukur efektivitas pengelolaan Kelas V SDN 2 Bojong terhadap target yang telah ditetapkan.',
    tables: [
      {
        id: 't-26-a',
        title: 'Tabel Evaluasi Pelaksanaan Program Kerja Wali Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '38px', align: 'center', isMono: true },
          { key: 'program', label: 'Bidang / Nama Program Kerja', width: '20%' },
          { key: 'target', label: 'Target Capaian', width: '16%' },
          { key: 'realisasi', label: 'Realisasi Pelaksanaan', width: '18%' },
          { key: 'kendala', label: 'Hambatan / Kendala yang Dihadapi' },
          { key: 'solusi', label: 'Solusi & Upaya Perbaikan', width: '20%' },
        ],
        rows: [
          {
            no: '1',
            program: 'Tertib Administrasi & Organisasi Kelas',
            target: '100% dokumen kelas tersusun rapi',
            realisasi: '',
            kendala: '',
            solusi: '',
          },
          {
            no: '2',
            program: 'Tingkat Kehadiran & Kedisiplinan Siswa',
            target: 'Kehadiran bulanan >= 95%',
            realisasi: '',
            kendala: '',
            solusi: '',
          },
          {
            no: '3',
            program: 'Pembiasaan Literasi & Pojok Baca Fase C',
            target: 'Membaca 15 menit setiap pagi berjalan rutin',
            realisasi: '',
            kendala: '',
            solusi: '',
          },
          {
            no: '4',
            program: 'Ketuntasan Hasil Belajar (KKTP) & Penguatan Numerasi',
            target: '>= 90% siswa mencapai KKTP',
            realisasi: '',
            kendala: '',
            solusi: '',
          },
          {
            no: '5',
            program: 'Pengembangan Karakter & Projek P5',
            target: 'Seluruh siswa berkembang sesuai harapan (BSH/SAB)',
            realisasi: '',
            kendala: '',
            solusi: '',
          },
          {
            no: '6',
            program: 'Komunikasi & Partisipasi Orang Tua / Wali',
            target: 'Kehadiran pertemuan orang tua >= 90%',
            realisasi: '',
            kendala: '',
            solusi: '',
          },
        ],
      },
    ],
  },

  {
    id: 'doc-27-refleksi-wali-kelas',
    docNumber: '27',
    groupId: 'evaluasi',
    title: 'Lembar Refleksi Wali Kelas V',
    shortTitle: '27. Refleksi Wali Kelas',
    description: 'Refleksi diri wali kelas terkait praktik pendampingan siswa, manajemen iklim kelas, serta pengembangan kompetensi profesional.',
    orientation: 'portrait',
    introText:
      'Refleksi ini disusun oleh Wali Kelas V (Hendra Purnama, S.Pd.) sebagai bahan evaluasi diri yang jujur dan konstruktif dalam mendampingi tumbuh kembang peserta didik Fase C.',
    tables: [
      {
        id: 't-27-a',
        title: 'Instrumen Refleksi Manajerial dan Pedagogik Wali Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'pertanyaan', label: 'Komponen / Pertanyaan Pemantik Refleksi', width: '38%' },
          { key: 'catatanRefleksi', label: 'Uraian Refleksi Wali Kelas' },
        ],
        rows: [
          {
            no: '1',
            pertanyaan: 'Praktik baik (best practice) apa yang paling berhasil diterapkan dalam pengelolaan Kelas V semester ini?',
            catatanRefleksi: '',
          },
          {
            no: '2',
            pertanyaan: 'Bagaimana efektivitas penerapan Kesepakatan Kelas terhadap perubahan perilaku disiplin positif siswa?',
            catatanRefleksi: '',
          },
          {
            no: '3',
            pertanyaan: 'Apa tantangan terbesar dalam memfasilitasi keberagaman kemampuan belajar (diferensiasi) siswa Fase C?',
            catatanRefleksi: '',
          },
          {
            no: '4',
            pertanyaan: 'Siswa mana saja yang menunjukkan kemajuan paling pesat, dan siswa mana yang masih memerlukan pendampingan ekstra?',
            catatanRefleksi: '',
          },
          {
            no: '5',
            pertanyaan: 'Bagaimana kualitas kolaborasi dengan orang tua/wali siswa serta rekan sejawat guru mata pelajaran?',
            catatanRefleksi: '',
          },
          {
            no: '6',
            pertanyaan: 'Kompetensi apa yang perlu saya tingkatkan sebagai wali kelas pada periode berikutnya?',
            catatanRefleksi: '',
          },
        ],
      },
    ],
  },

  {
    id: 'doc-28-program-tindak-lanjut',
    docNumber: '28',
    groupId: 'evaluasi',
    title: 'Program Tindak Lanjut Wali Kelas',
    shortTitle: '28. Program Tindak Lanjut',
    description: 'Rencana aksi perbaikan pembelajaran, layanan remedial/pengayaan, serta pembinaan lanjutan berdasarkan hasil evaluasi dan refleksi.',
    orientation: 'landscape',
    introText:
      'Program tindak lanjut disusun sebagai langkah konkret memperbaiki kelemahan program dan mempertahankan capaian positif di Kelas V SDN 2 Bojong.',
    tables: [
      {
        id: 't-28-a',
        title: 'Rencana Aksi Tindak Lanjut Hasil Evaluasi Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'fokusArea', label: 'Fokus Area (Akademik / Karakter / Manajerial)', width: '20%' },
          { key: 'temuanEvaluasi', label: 'Hasil Evaluasi / Masalah yang Ditemukan', width: '24%' },
          { key: 'bentukTindakLanjut', label: 'Rencana Strategi & Bentuk Tindak Lanjut' },
          { key: 'sasaran', label: 'Sasaran Siswa / Pihak Terkait', width: '16%' },
          { key: 'targetWaktu', label: 'Target Waktu', width: '13%', align: 'center' },
        ],
        rows: [
          {
            no: '1',
            fokusArea: 'Pendampingan Akademik (Remedial)',
            temuanEvaluasi: 'Siswa yang belum mencapai KKTP pada materi prasyarat.',
            bentukTindakLanjut: 'Bimbingan kelompok kecil (tutor sebaya & klinik belajar sore/jam tambahan).',
            sasaran: '',
            targetWaktu: '',
          },
          {
            no: '2',
            fokusArea: 'Pengayaan Akademik & Talenta',
            temuanEvaluasi: 'Siswa yang melampaui capaian pembelajaran lebih cepat.',
            bentukTindakLanjut: 'Pemberian proyek tantangan literasi/sains dan pembinaan lomba sekolah.',
            sasaran: '',
            targetWaktu: '',
          },
          {
            no: '3',
            fokusArea: 'Pembinaan Kehadiran & Ketertiban',
            temuanEvaluasi: 'Siswa yang masih sering terlambat atau absen tanpa keterangan.',
            bentukTindakLanjut: 'Dialog personal (restitusi) dan komunikasi intensif bersama orang tua.',
            sasaran: '',
            targetWaktu: '',
          },
          {
            no: '4',
            fokusArea: 'Penguatan Lingkungan Kelas',
            temuanEvaluasi: 'Pemeliharaan pojok baca dan kelengkapan alat kebersihan.',
            bentukTindakLanjut: 'Rotasi buku bacaan berkala dan evaluasi kerja regu piket setiap Jumat.',
            sasaran: 'Seluruh warga Kelas V',
            targetWaktu: 'Setiap Bulan',
          },
        ],
      },
    ],
  },

  // ==========================================
  // VIII. LAPORAN & LAMPIRAN (Dok. 25, 29, 30)
  // ==========================================
  {
    id: 'doc-25-laporan-perkembangan-kelas',
    docNumber: '25',
    groupId: 'laporan',
    title: 'Laporan Berkala Perkembangan Kelas V',
    shortTitle: '25. Laporan Perkembangan Kelas',
    description: 'Laporan komprehensif kondisi akademik, ketertiban, kehadiran, dan sarana prasarana Kelas V kepada Kepala SDN 2 Bojong.',
    orientation: 'portrait',
    introText:
      'Laporan ini disampaikan secara berkala kepada Kepala SDN 2 Bojong sebagai bentuk pertanggungjawaban pelaksanaan tugas Wali Kelas V.',
    tables: [
      {
        id: 't-25-a',
        title: 'Ringkasan Eksekutif Perkembangan Kelas V (Semester Ganjil / Genap)',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'bidangLaporan', label: 'Bidang Perkembangan yang Dilaporkan', width: '32%' },
          { key: 'capaianKondisi', label: 'Uraian Kondisi Aktual & Capaian Kelas' },
          { key: 'rekomendasi', label: 'Usulan / Rekomendasi Tindak Lanjut', width: '26%' },
        ],
        rows: [
          {
            no: '1',
            bidangLaporan: 'Keadaan Jumlah & Mutasi Peserta Didik',
            capaianKondisi: 'Jumlah siswa awal: ..... orang (L: ..., P: ...). Mutasi masuk: ..., Mutasi keluar: ..., Jumlah akhir: ..... orang.',
            rekomendasi: 'Pemutakhiran data Dapodik sekolah.',
          },
          {
            no: '2',
            bidangLaporan: 'Tingkat Kehadiran & Kedisiplinan',
            capaianKondisi: 'Rata-rata persentase kehadiran kelas mencapai ......%. Mayoritas siswa hadir tepat waktu.',
            rekomendasi: 'Pemantauan berkelanjutan bersama orang tua.',
          },
          {
            no: '3',
            bidangLaporan: 'Perkembangan Capaian Akademik (Fase C)',
            capaianKondisi: 'Rata-rata ketuntasan tujuan pembelajaran kelas mencapai ......%.',
            rekomendasi: 'Penguatan literasi dan numerasi terpadu.',
          },
          {
            no: '4',
            bidangLaporan: 'Perkembangan Karakter (Profil Pelajar Pancasila)',
            capaianKondisi: 'Budaya sopan santun, gotong royong piket, dan kepedulian teman berjalan kondusif.',
            rekomendasi: 'Apresiasi berkala siswa teladan bulanan.',
          },
          {
            no: '5',
            bidangLaporan: 'Kondisi Sarana & Inventaris Ruang Kelas V',
            capaianKondisi: 'Kondisi meja, kursi, papan tulis, dan pojok baca terawat dengan baik.',
            rekomendasi: '',
          },
        ],
      },
    ],
  },

  {
    id: 'doc-29-laporan-akhir-tahun',
    docNumber: '29',
    groupId: 'laporan',
    title: 'Laporan Akhir Tahun Wali Kelas V (TP 2026/2027)',
    shortTitle: '29. Laporan Akhir Tahun',
    description: 'Laporan pertanggungjawaban akhir tahun pelajaran 2026/2027 meliputi rekapitulasi kenaikan kelas V ke kelas VI dan ketuntasan program.',
    orientation: 'portrait',
    introText:
      'Laporan Akhir Tahun ini merangkum seluruh pelaksanaan administrasi, pembelajaran, pembinaan karakter, serta rekapitulasi kenaikan kelas peserta didik Kelas V SDN 2 Bojong pada akhir Tahun Pelajaran 2026/2027.',
    tables: [
      {
        id: 't-29-a',
        title: 'A. Rekapitulasi Kenaikan Kelas Peserta Didik Kelas V ke Kelas VI',
        columns: [
          { key: 'no', label: 'No', width: '42px', align: 'center', isMono: true },
          { key: 'kategori', label: 'Uraian Status Akhir Tahun Pelajaran 2026/2027' },
          { key: 'laki', label: 'Laki-laki (L)', width: '16%', align: 'center', isMono: true },
          { key: 'perempuan', label: 'Perempuan (P)', width: '16%', align: 'center', isMono: true },
          { key: 'jumlah', label: 'Jumlah Total', width: '16%', align: 'center', isMono: true },
          { key: 'persen', label: 'Persentase (%)', width: '16%', align: 'center', isMono: true },
        ],
        rows: [
          { no: '1', kategori: 'Jumlah Peserta Didik Awal Tahun Pelajaran', laki: '', perempuan: '', jumlah: '', persen: '100%' },
          { no: '2', kategori: 'Peserta Didik Mutasi Masuk / Keluar', laki: '', perempuan: '', jumlah: '', persen: '' },
          { no: '3', kategori: 'Peserta Didik Mengikuti Asesmen Akhir Tahun', laki: '', perempuan: '', jumlah: '', persen: '' },
          { no: '4', kategori: 'Peserta Didik Dinyatakan NAIK ke Kelas VI (Enam)', laki: '', perempuan: '', jumlah: '', persen: '' },
          { no: '5', kategori: 'Peserta Didik Dinyatakan Tinggal di Kelas V (Lima)', laki: '', perempuan: '', jumlah: '', persen: '' },
        ],
      },
      {
        id: 't-29-b',
        title: 'B. Rekapitulasi Ketuntasan Program Kerja Wali Kelas Selama 1 Tahun',
        columns: [
          { key: 'no', label: 'No', width: '42px', align: 'center', isMono: true },
          { key: 'komponenProgram', label: 'Komponen Administrasi & Program Kerja', width: '38%' },
          { key: 'status', label: 'Status Keterlaksanaan', width: '22%', align: 'center' },
          { key: 'catatanAkhir', label: 'Catatan Rekomendasi untuk Wali Kelas VI Berikutnya' },
        ],
        rows: [
          { no: '1', komponenProgram: 'Penyusunan & Pemeliharaan Administrasi Kelas V', status: 'Terlaksana', catatanAkhir: '' },
          { no: '2', komponenProgram: 'Tuntaskan Capaian Pembelajaran Intrakurikuler Fase C (Kelas V)', status: 'Terlaksana', catatanAkhir: '' },
          { no: '3', komponenProgram: 'Pelaksanaan 2 Tema Projek Penguatan Profil Pelajar Pancasila (P5)', status: 'Terlaksana', catatanAkhir: '' },
          { no: '4', komponenProgram: 'Layanan Bimbingan Siswa & Kemitraan Orang Tua', status: 'Terlaksana', catatanAkhir: '' },
          { no: '5', komponenProgram: 'Penyerahan Rapor Semester Ganjil & Semester Genap', status: 'Terlaksana', catatanAkhir: '' },
        ],
      },
    ],
  },

  {
    id: 'doc-30-lampiran-bukti-fisik',
    docNumber: 'Lampiran',
    groupId: 'laporan',
    title: 'Lampiran Dokumen Pendukung & Bukti Fisik Kegiatan Terverifikasi',
    shortTitle: '30. Lampiran & Bukti Fisik',
    description: 'Lembar verifikasi bukti fisik kegiatan kelas, bingkai dokumentasi foto terverifikasi, arsip surat pemberitahuan/panggilan, dan pengesahan Kepala Sekolah.',
    orientation: 'portrait',
    customWidget: 'verification_attachment',
    introText:
      'Lampiran ini merupakan instrumen kendali mutu dan bukti fisik otentik pelaksanaan tugas Wali Kelas V SDN 2 Bojong yang telah diverifikasi oleh Kepala Sekolah.',
    tables: [
      {
        id: 't-30-a',
        title: 'Daftar Ceklis Verifikasi Bukti Fisik & Dokumen Pendukung Wali Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'kodeBukti', label: 'Kode Arsip', width: '105px', align: 'center', isMono: true },
          { key: 'namaBukti', label: 'Jenis Bukti Fisik Kegiatan & Dokumen Pendukung', width: '34%' },
          { key: 'statusAda', label: 'Ketersediaan (Ada / Tidak)', width: '15%', align: 'center' },
          { key: 'verifikasiKs', label: 'Status Verifikasi Kepala Sekolah', width: '18%', align: 'center' },
          { key: 'keterangan', label: 'Keterangan Fisik / Lokasi Arsip' },
        ],
        rows: [
          {
            no: '1',
            kodeBukti: 'BF-WK5/01',
            namaBukti: 'SK Pembagian Tugas Mengajar & Wali Kelas V TP 2026/2027',
            statusAda: 'Ada (Lengkap)',
            verifikasiKs: 'Terverifikasi',
            keterangan: 'Map Bundel Administrasi Utama',
          },
          {
            no: '2',
            kodeBukti: 'BF-WK5/02',
            namaBukti: 'Poster Fisik Kesepakatan Kelas V Bertanda Tangan Siswa',
            statusAda: 'Ada (Lengkap)',
            verifikasiKs: 'Terverifikasi',
            keterangan: 'Terpasang di Dinding Kelas V',
          },
          {
            no: '3',
            kodeBukti: 'BF-WK5/03',
            namaBukti: 'Arsip Surat Izin Orang Tua & Surat Keterangan Dokter Siswa',
            statusAda: 'Ada (Lengkap)',
            verifikasiKs: 'Terverifikasi',
            keterangan: 'Map Arsip Presensi Kelas V',
          },
          {
            no: '4',
            kodeBukti: 'BF-WK5/04',
            namaBukti: 'Undangan, Daftar Hadir Asli, & Notula Rapat Orang Tua Siswa',
            statusAda: 'Ada (Lengkap)',
            verifikasiKs: 'Terverifikasi',
            keterangan: 'Map Kemitraan Orang Tua',
          },
          {
            no: '5',
            kodeBukti: 'BF-WK5/05',
            namaBukti: 'Dokumentasi Foto Kegiatan Kelas, Piket, Literasi, & Gelar Karya P5',
            statusAda: 'Ada (Lengkap)',
            verifikasiKs: 'Terverifikasi',
            keterangan: 'Lembar Dokumentasi Foto Terlampir',
          },
          {
            no: '6',
            kodeBukti: 'BF-WK5/06',
            namaBukti: 'Salinan Piagam Penghargaan / Sertifikat Prestasi Siswa Kelas V',
            statusAda: 'Ada (Lengkap)',
            verifikasiKs: 'Terverifikasi',
            keterangan: 'Portofolio Prestasi Kelas V',
          },
          {
            no: '7',
            kodeBukti: 'BF-WK5/07',
            namaBukti: 'Buku Tanda Terima Pengambilan & Pengembalian Rapor Siswa',
            statusAda: 'Ada (Lengkap)',
            verifikasiKs: 'Terverifikasi',
            keterangan: 'Bundel Evaluasi Hasil Belajar',
          },
        ],
      },
    ],
  },
];
