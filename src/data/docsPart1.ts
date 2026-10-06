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

export const DOCS_PART_1: DocumentModule[] = [
  // ==========================================
  // 00. COVER
  // ==========================================
  {
    id: 'doc-00-cover',
    docNumber: 'Cover',
    groupId: 'cover',
    title: 'Sampul Resmi Perangkat Administrasi Wali Kelas',
    shortTitle: 'Sampul / Cover Perangkat',
    description: 'Halaman sampul resmi buku perangkat administrasi wali kelas V (Fase C) Kurikulum Merdeka siap cetak A4.',
    orientation: 'portrait',
    customWidget: 'cover',
    tables: [],
  },

  // ==========================================
  // I. IDENTITAS (Dok. 01)
  // ==========================================
  {
    id: 'doc-01-identitas-profil',
    docNumber: '01',
    groupId: 'identitas',
    title: 'Identitas dan Profil Kelas V (Fase C)',
    shortTitle: '01. Identitas & Profil Kelas',
    description: 'Data satuan pendidikan, identitas wali kelas, kondisi umum kelas V Fase C, serta visi dan target kelas.',
    orientation: 'portrait',
    introText:
      'Dokumen ini memuat identitas resmi satuan pendidikan, identitas wali kelas, serta profil umum Kelas V (Fase C) SDN 2 Bojong pada Tahun Pelajaran 2026/2027.',
    tables: [
      {
        id: 't-01-a',
        title: 'A. Identitas Satuan Pendidikan dan Kelas',
        columns: [
          { key: 'no', label: 'No', width: '48px', align: 'center', isMono: true },
          { key: 'komponen', label: 'Komponen Identitas', width: '38%' },
          { key: 'keterangan', label: 'Isian / Keterangan Resmi' },
        ],
        rows: [
          { no: '1', komponen: 'Nama Satuan Pendidikan', keterangan: 'SDN 2 Bojong' },
          { no: '2', komponen: 'NPSN / NSS', keterangan: '' },
          { no: '3', komponen: 'Jenjang Pendidikan', keterangan: 'Sekolah Dasar (SD)' },
          { no: '4', komponen: 'Kelas / Fase Kurikulum Merdeka', keterangan: 'Kelas V (Lima) / Fase C' },
          { no: '5', komponen: 'Tahun Pelajaran', keterangan: '2026/2027' },
          { no: '6', komponen: 'Alamat Sekolah', keterangan: 'Desa Bojong' },
          { no: '7', komponen: 'Desa / Kelurahan & Kecamatan', keterangan: 'Desa Bojong, Kecamatan Pameungpeuk' },
          { no: '8', komponen: 'Kabupaten / Kota & Provinsi', keterangan: 'Kabupaten Garut, Jawa Barat' },
          { no: '9', komponen: 'Nama Kepala Sekolah', keterangan: '' },
          { no: '10', komponen: 'NIP Kepala Sekolah', keterangan: '' },
        ],
      },
      {
        id: 't-01-b',
        title: 'B. Identitas Wali Kelas',
        columns: [
          { key: 'no', label: 'No', width: '48px', align: 'center', isMono: true },
          { key: 'atribut', label: 'Atribut Wali Kelas', width: '38%' },
          { key: 'isian', label: 'Data Wali Kelas' },
        ],
        rows: [
          { no: '1', atribut: 'Nama Lengkap dan Gelar', isian: 'Hendra Purnama, S.Pd.' },
          { no: '2', atribut: 'NIP / NI PPPK / NUPTK', isian: '' },
          { no: '3', atribut: 'Pangkat / Golongan Ruang', isian: '' },
          { no: '4', atribut: 'Jabatan Fungsional', isian: 'Guru Kelas V (Fase C)' },
          { no: '5', atribut: 'Pendidikan Terakhir', isian: 'S-1 Pendidikan' },
          { no: '6', atribut: 'Nomor SK Pembagian Tugas Mengajar', isian: '' },
          { no: '7', atribut: 'Nomor Telepon / WhatsApp Aktif', isian: '' },
          { no: '8', atribut: 'Pos-el (Email) Dinas', isian: 'hendrapurnama58@guru.sd.belajar.id' },
        ],
      },
      {
        id: 't-01-c',
        title: 'C. Profil Komposisi Peserta Didik & Inventaris Ruang Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '48px', align: 'center', isMono: true },
          { key: 'aspek', label: 'Aspek Profil Kelas', width: '38%' },
          { key: 'jumlah', label: 'Jumlah / Kondisi', width: '25%', align: 'center', isMono: true },
          { key: 'catatan', label: 'Keterangan Tambahan' },
        ],
        rows: [
          { no: '1', aspek: 'Jumlah Peserta Didik Laki-laki (L)', jumlah: '', catatan: 'Siswa aktif Semester Ganjil/Genap' },
          { no: '2', aspek: 'Jumlah Peserta Didik Perempuan (P)', jumlah: '', catatan: 'Siswa aktif Semester Ganjil/Genap' },
          { no: '3', aspek: 'Jumlah Total Peserta Didik', jumlah: '', catatan: 'Rombongan belajar Kelas V' },
          { no: '4', aspek: 'Meja dan Kursi Peserta Didik', jumlah: '', catatan: 'Kondisi baik / perlu perbaikan' },
          { no: '5', aspek: 'Meja dan Kursi Guru', jumlah: '1 Set', catatan: 'Kondisi baik' },
          { no: '6', aspek: 'Papan Tulis (Whiteboard) & Alat Tulis', jumlah: '1 Unit', catatan: 'Kondisi baik' },
          { no: '7', aspek: 'Sudut Baca / Pojok Literasi Fase C', jumlah: '1 Unit', catatan: 'Koleksi buku pengayaan & cerita anak' },
          { no: '8', aspek: 'Papan Pajangan Karya Siswa & P5', jumlah: '1 Unit', catatan: 'Dinding belakang/samping kelas' },
          { no: '9', aspek: 'Perlengkapan Kebersihan & Kotak P3K', jumlah: '1 Paket', catatan: 'Dikelola regu piket & seksi UKS' },
        ],
      },
    ],
  },

  // ==========================================
  // II. ADMINISTRASI KELAS (Dok. 02, 06, 07, 08, 09, 10)
  // ==========================================
  {
    id: 'doc-02-struktur-organisasi',
    docNumber: '02',
    groupId: 'administrasi_kelas',
    title: 'Struktur Organisasi Kelas V',
    shortTitle: '02. Struktur Organisasi Kelas',
    description: 'Susunan pengurus kelas V SDN 2 Bojong beserta rincian tugas pokok dan tanggung jawab pengurus.',
    orientation: 'portrait',
    customWidget: 'org_chart',
    introText:
      'Struktur organisasi kelas dibentuk secara demokratis melalui musyawarah kelas untuk melatih kepemimpinan, tanggung jawab, dan gotong royong peserta didik Fase C.',
    tables: [
      {
        id: 't-02-a',
        title: 'Daftar Pengurus Organisasi Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '44px', align: 'center', isMono: true },
          { key: 'jabatan', label: 'Jabatan Pengurus', width: '26%' },
          { key: 'nama', label: 'Nama Peserta Didik / Pejabat', width: '32%' },
          { key: 'tugas', label: 'Uraian Tugas Pokok' },
        ],
        rows: [
          { no: '1', jabatan: 'Pelindung / Penasihat', nama: 'Kepala SDN 2 Bojong', tugas: 'Memberikan arahan kebijakan dan pembinaan umum satuan pendidikan.' },
          { no: '2', jabatan: 'Pembina / Wali Kelas', nama: 'Hendra Purnama, S.Pd.', tugas: 'Membimbing pengelolaan kelas, akademik, dan karakter siswa.' },
          { no: '3', jabatan: 'Ketua Kelas', nama: '', tugas: 'Memimpin barisan, mengoordinasikan ketertiban kelas, dan penghubung guru.' },
          { no: '4', jabatan: 'Wakil Ketua Kelas', nama: '', tugas: 'Membantu ketua kelas dan menggantikan tugas saat ketua berhalangan.' },
          { no: '5', jabatan: 'Sekretaris I', nama: '', tugas: 'Mencatat agenda kelas, jurnal papan tulis, dan membantu buku absensi.' },
          { no: '6', jabatan: 'Sekretaris II', nama: '', tugas: 'Mengelola jadwal pelajaran, mading kelas, dan inventaris alat tulis.' },
          { no: '7', jabatan: 'Bendahara I', nama: '', tugas: 'Mencatat tabungan/kas sosial kelas secara transparan atas sepengetahuan wali kelas.' },
          { no: '8', jabatan: 'Bendahara II', nama: '', tugas: 'Membantu pembukuan kas sosial dan pelaporan bulanan.' },
          { no: '9', jabatan: 'Seksi Kebersihan & Lingkungan', nama: '', tugas: 'Memantau pelaksanaan piket harian dan kebersihan ruang/taman kelas.' },
          { no: '10', jabatan: 'Seksi Ketertiban & Keamanan', nama: '', tugas: 'Menjaga suasana kondusif saat belajar dan istirahat.' },
          { no: '11', jabatan: 'Seksi Kerohanian', nama: '', tugas: 'Memimpin doa sebelum/sesudah belajar dan kegiatan pembiasaan keagamaan.' },
          { no: '12', jabatan: 'Seksi Literasi & Pojok Baca', nama: '', tugas: 'Menata buku pojok baca kelas dan mencatat peminjaman buku bacaan.' },
          { no: '13', jabatan: 'Seksi UKS & Kesehatan', nama: '', tugas: 'Memeriksa kelengkapan kotak P3K dan membantu teman yang kurang sehat.' },
        ],
      },
    ],
  },

  {
    id: 'doc-06-denah-tempat-duduk',
    docNumber: '06',
    groupId: 'administrasi_kelas',
    title: 'Denah Tempat Duduk Kelas V',
    shortTitle: '06. Denah Tempat Duduk',
    description: 'Tata letak meja belajar peserta didik, meja guru, papan tulis, pojok baca, serta tabel penempatan dan rotasi tempat duduk.',
    orientation: 'portrait',
    customWidget: 'seating_chart',
    introText:
      'Penataan tempat duduk disusun dengan memperhatikan kondisi penglihatan, pendengaran, postur tubuh, serta dinamika kolaborasi peserta didik. Rotasi tempat duduk dilakukan secara berkala setiap dua minggu.',
    tables: [
      {
        id: 't-06-a',
        title: 'Tabel Daftar Penempatan Meja Peserta Didik (Kelompok / Baris)',
        columns: [
          { key: 'kodeMeja', label: 'Nomor Meja', width: '90px', align: 'center', isMono: true },
          { key: 'posisi', label: 'Baris / Kelompok', width: '22%' },
          { key: 'siswaKiri', label: 'Nama Siswa (Kursi A)', width: '28%' },
          { key: 'siswaKanan', label: 'Nama Siswa (Kursi B)', width: '28%' },
          { key: 'catatan', label: 'Keterangan (Visus/Pendengaran)' },
        ],
        rows: [
          { kodeMeja: 'Meja 01', posisi: 'Baris Depan - Lajur 1', siswaKiri: '', siswaKanan: '', catatan: 'Prioritas siswa berkacamata / postur mungil' },
          { kodeMeja: 'Meja 02', posisi: 'Baris Depan - Lajur 2', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 03', posisi: 'Baris Depan - Lajur 3', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 04', posisi: 'Baris Depan - Lajur 4', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 05', posisi: 'Baris Kedua - Lajur 1', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 06', posisi: 'Baris Kedua - Lajur 2', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 07', posisi: 'Baris Kedua - Lajur 3', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 08', posisi: 'Baris Kedua - Lajur 4', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 09', posisi: 'Baris Ketiga - Lajur 1', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 10', posisi: 'Baris Ketiga - Lajur 2', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 11', posisi: 'Baris Ketiga - Lajur 3', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 12', posisi: 'Baris Ketiga - Lajur 4', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 13', posisi: 'Baris Belakang - Lajur 1', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 14', posisi: 'Baris Belakang - Lajur 2', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 15', posisi: 'Baris Belakang - Lajur 3', siswaKiri: '', siswaKanan: '', catatan: '' },
          { kodeMeja: 'Meja 16', posisi: 'Baris Belakang - Lajur 4', siswaKiri: '', siswaKanan: '', catatan: '' },
        ],
      },
    ],
  },

  {
    id: 'doc-07-jadwal-pelajaran',
    docNumber: '07',
    groupId: 'administrasi_kelas',
    title: 'Jadwal Pelajaran Kelas V (Kurikulum Merdeka Fase C)',
    shortTitle: '07. Jadwal Pelajaran',
    description: 'Jadwal kegiatan pembelajaran intrakurikuler dan kokurikuler (P5) Kelas V SDN 2 Bojong (1 JP = 35 Menit).',
    orientation: 'landscape',
    introText:
      'Struktur jadwal disusun mengacu pada Kurikulum Merdeka Jenjang SD Kelas V (Fase C) dengan alokasi waktu 1 Jam Pelajaran (JP) = 35 menit, mencakup pembelajaran intrakurikuler dan Projek Penguatan Profil Pelajar Pancasila (P5).',
    tables: [
      {
        id: 't-07-a',
        title: 'Jadwal Mingguan Pembelajaran Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'jp', label: 'JP Ke-', width: '68px', align: 'center', isMono: true },
          { key: 'waktu', label: 'Waktu (WIB)', width: '115px', align: 'center', isMono: true },
          { key: 'senin', label: 'Senin' },
          { key: 'selasa', label: 'Selasa' },
          { key: 'rabu', label: 'Rabu' },
          { key: 'kamis', label: 'Kamis' },
          { key: 'jumat', label: 'Jumat' },
          { key: 'sabtu', label: 'Sabtu' },
        ],
        rows: [
          {
            jp: '0',
            waktu: '07.00 - 07.15',
            senin: 'Persiapan Upacara',
            selasa: 'Pembiasaan & Literasi',
            rabu: 'Pembiasaan & Numerasi',
            kamis: 'Pembiasaan & Literasi',
            jumat: 'Pembiasaan Keagamaan',
            sabtu: 'Senam Pagi Bersama',
          },
          {
            jp: '1',
            waktu: '07.15 - 07.50',
            senin: 'Upacara Bendera',
            selasa: 'Matematika',
            rabu: 'IPAS (Sains & Sosial)',
            kamis: 'PJOK',
            jumat: 'Pendidikan Agama & BP',
            sabtu: 'Seni dan Budaya',
          },
          {
            jp: '2',
            waktu: '07.50 - 08.25',
            senin: 'Pendidikan Pancasila',
            selasa: 'Matematika',
            rabu: 'IPAS (Sains & Sosial)',
            kamis: 'PJOK',
            jumat: 'Pendidikan Agama & BP',
            sabtu: 'Seni dan Budaya',
          },
          {
            jp: '3',
            waktu: '08.25 - 09.00',
            senin: 'Pendidikan Pancasila',
            selasa: 'Matematika',
            rabu: 'IPAS (Sains & Sosial)',
            kamis: 'PJOK',
            jumat: 'Pendidikan Agama & BP',
            sabtu: 'Seni dan Budaya',
          },
          {
            jp: '-',
            waktu: '09.00 - 09.15',
            senin: 'ISTIRAHAT I',
            selasa: 'ISTIRAHAT I',
            rabu: 'ISTIRAHAT I',
            kamis: 'ISTIRAHAT I',
            jumat: 'ISTIRAHAT I',
            sabtu: 'ISTIRAHAT I',
          },
          {
            jp: '4',
            waktu: '09.15 - 09.50',
            senin: 'Bahasa Indonesia',
            selasa: 'Bahasa Indonesia',
            rabu: 'Matematika',
            kamis: 'IPAS (Sains & Sosial)',
            jumat: 'Bahasa Indonesia',
            sabtu: 'Projek P5',
          },
          {
            jp: '5',
            waktu: '09.50 - 10.25',
            senin: 'Bahasa Indonesia',
            selasa: 'Bahasa Indonesia',
            rabu: 'Matematika',
            kamis: 'IPAS (Sains & Sosial)',
            jumat: 'Bahasa Indonesia',
            sabtu: 'Projek P5',
          },
          {
            jp: '6',
            waktu: '10.25 - 11.00',
            senin: 'Bahasa Indonesia',
            selasa: 'Pendidikan Pancasila',
            rabu: 'Bahasa Inggris',
            kamis: 'Muatan Lokal',
            jumat: 'Refleksi & Kebersihan',
            sabtu: 'Projek P5',
          },
          {
            jp: '-',
            waktu: '11.00 - 11.15',
            senin: 'ISTIRAHAT II',
            selasa: 'ISTIRAHAT II',
            rabu: 'ISTIRAHAT II',
            kamis: 'ISTIRAHAT II',
            jumat: 'Pulang Sekolah',
            sabtu: 'Ekstrakurikuler / Pramuka',
          },
          {
            jp: '7',
            waktu: '11.15 - 11.50',
            senin: 'Projek P5',
            selasa: 'Pendidikan Pancasila',
            rabu: 'Bahasa Inggris',
            kamis: 'Muatan Lokal',
            jumat: '-',
            sabtu: 'Ekstrakurikuler / Pramuka',
          },
          {
            jp: '8',
            waktu: '11.50 - 12.25',
            senin: 'Projek P5',
            selasa: 'Projek P5',
            rabu: 'Projek P5',
            kamis: 'Bimbingan Wali Kelas',
            jumat: '-',
            sabtu: '-',
          },
        ],
        footerNotes: [
          'Keterangan: Jadwal mata pelajaran Pendidikan Agama dan PJOK disesuaikan dengan jadwal guru mata pelajaran SDN 2 Bojong.',
        ],
      },
    ],
  },

  {
    id: 'doc-08-jadwal-piket',
    docNumber: '08',
    groupId: 'administrasi_kelas',
    title: 'Jadwal Piket Kelas V',
    shortTitle: '08. Jadwal Piket Kelas',
    description: 'Pembagian regu kerja bakti harian peserta didik Kelas V dari hari Senin sampai dengan Sabtu.',
    orientation: 'portrait',
    introText:
      'Petugas piket hadir 15 menit sebelum bel masuk untuk menyapu lantai, membersihkan meja guru dan papan tulis, merapikan pojok baca, serta menyiram tanaman di depan kelas.',
    tables: [
      {
        id: 't-08-a',
        title: 'Daftar Regu Piket Harian Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '44px', align: 'center', isMono: true },
          { key: 'senin', label: 'Senin' },
          { key: 'selasa', label: 'Selasa' },
          { key: 'rabu', label: 'Rabu' },
          { key: 'kamis', label: 'Kamis' },
          { key: 'jumat', label: 'Jumat' },
          { key: 'sabtu', label: 'Sabtu' },
        ],
        rows: emptyRows(6, ['no', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']),
        footerNotes: [
          'Catatan: Nama siswa yang dicetak tebal/garis bawah bertugas sebagai Koordinator Regu Piket pada hari tersebut.',
        ],
      },
      {
        id: 't-08-b',
        title: 'Rincian Standar Operasional Piket Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '44px', align: 'center', isMono: true },
          { key: 'waktu', label: 'Waktu Pelaksanaan', width: '25%' },
          { key: 'uraian', label: 'Rincian Tugas Regu Piket' },
        ],
        rows: [
          { no: '1', waktu: 'Pagi (06.45 - 07.00 WIB)', uraian: 'Membuka jendela ventilasi, menyapu lantai kelas dan teras, mengelap meja guru, serta menyiapkan spidol/penghapus.' },
          { no: '2', waktu: 'Saat Istirahat', uraian: 'Menghapus papan tulis setelah pergantian pelajaran dan memastikan tempat sampah tidak meluber.' },
          { no: '3', waktu: 'Pulang Sekolah', uraian: 'Merapikan kembali barisan kursi, membuang sampah ke tempat pembuangan akhir sekolah, dan menutup jendela.' },
        ],
      },
    ],
  },

  {
    id: 'doc-09-tata-tertib',
    docNumber: '09',
    groupId: 'administrasi_kelas',
    title: 'Tata Tertib Kelas V',
    shortTitle: '09. Tata Tertib Kelas',
    description: 'Ketentuan kehadiran, pakaian seragam, kebersihan, etika belajar, serta tindak lanjut pembinaan disiplin positif.',
    orientation: 'portrait',
    introText:
      'Tata tertib kelas ini disusun sebagai pedoman keteraturan dan disiplin positif bagi seluruh warga Kelas V SDN 2 Bojong pada Tahun Pelajaran 2026/2027.',
    tables: [
      {
        id: 't-09-a',
        title: 'Ketentuan Tata Tertib Peserta Didik Kelas V SDN 2 Bojong',
        columns: [
          { key: 'no', label: 'No', width: '44px', align: 'center', isMono: true },
          { key: 'aspek', label: 'Aspek Ketertiban', width: '24%' },
          { key: 'aturan', label: 'Uraian Tata Tertib & Kewajiban Peserta Didik' },
          { key: 'pembinaan', label: 'Tindak Lanjut Edukatif', width: '26%' },
        ],
        rows: [
          {
            no: '1',
            aspek: 'Kehadiran & Waktu',
            aturan: 'Hadir di sekolah paling lambat pukul 06.55 WIB. Bagi siswa yang berhalangan hadir wajib menyampaikan surat izin orang tua atau keterangan dokter.',
            pembinaan: 'Konfirmasi orang tua & pencatatan buku presensi.',
          },
          {
            no: '2',
            aspek: 'Seragam & Kerapian',
            aturan: 'Mengenakan seragam sekolah lengkap sesuai jadwal harian (Merah-Putih, Batik, Pramuka, Olahraga), bersepatu rapi, serta menjaga kerapian rambut dan kuku.',
            pembinaan: 'Teguran lisan santun & pembinaan kerapian diri.',
          },
          {
            no: '3',
            aspek: 'Sikap Saat Belajar',
            aturan: 'Berdoa sebelum dan sesudah belajar, menyimak penjelasan guru, aktif berdiskusi dengan tertib, dan menyelesaikan tugas tepat waktu.',
            pembinaan: 'Refleksi terbimbing bersama wali kelas.',
          },
          {
            no: '4',
            aspek: 'Kebersihan & Fasilitas',
            aturan: 'Membuang sampah pada tempatnya, melaksanakan piket sesuai jadwal, serta menjaga keutuhan meja, kursi, dan buku pojok baca.',
            pembinaan: 'Merapikan kembali area yang kotor/berantakan.',
          },
          {
            no: '5',
            aspek: 'Etika Pergaulan (Anti-Perundungan)',
            aturan: 'Bertutur kata sopan kepada guru dan sesama teman, dilarang keras melakukan perundungan (bullying) fisik maupun verbal.',
            pembinaan: 'Restitusi segitiga, mediasi, & komunikasi orang tua.',
          },
          {
            no: '6',
            aspek: 'Penggunaan Barang Bawaan',
            aturan: 'Tidak membawa benda tajam, mainan berlebihan, atau gawai (HP) tanpa instruksi resmi pembelajaran dari guru.',
            pembinaan: 'Penyimpanan sementara oleh wali kelas & dikembalikan ke orang tua.',
          },
        ],
      },
    ],
  },

  {
    id: 'doc-10-kesepakatan-kelas',
    docNumber: '10',
    groupId: 'administrasi_kelas',
    title: 'Kesepakatan Kelas V (Keyakinan Kelas)',
    shortTitle: '10. Kesepakatan Kelas',
    description: 'Rumusan keyakinan kelas positif yang disusun dan disepakati bersama oleh wali kelas dan seluruh peserta didik Kelas V.',
    orientation: 'portrait',
    introText:
      'Kesepakatan kelas dirumuskan melalui curah pendapat bersama seluruh peserta didik Kelas V di awal tahun pelajaran menggunakan kalimat positif yang menumbuhkan kesadaran intrinsik.',
    tables: [
      {
        id: 't-10-a',
        title: 'Butir-Butir Kesepakatan / Keyakinan Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '44px', align: 'center', isMono: true },
          { key: 'nilai', label: 'Nilai Keyakinan (Profil Pelajar Pancasila)', width: '28%' },
          { key: 'pernyataan', label: 'Pernyataan Kesepakatan Kelas (Kalimat Positif)' },
          { key: 'perilaku', label: 'Wujud Perilaku Nyata di Kelas', width: '30%' },
        ],
        rows: [
          {
            no: '1',
            nilai: 'Beriman & Berakhlak Mulia',
            pernyataan: 'Kami memulai dan mengakhiri kegiatan dengan doa serta berbicara menggunakan bahasa yang santun.',
            perilaku: 'Berdoa khusyuk, mengucapkan terima kasih, maaf, dan tolong.',
          },
          {
            no: '2',
            nilai: 'Menghargai Sesama',
            pernyataan: 'Kami saling menghormati, mendengarkan saat guru atau teman berbicara, dan berteman tanpa membeda-bedakan.',
            perilaku: 'Mengangkat tangan sebelum berbicara dan tidak memotong pembicaraan.',
          },
          {
            no: '3',
            nilai: 'Tanggung Jawab & Mandiri',
            pernyataan: 'Kami hadir tepat waktu dan menyelesaikan tugas belajar dengan jujur serta sungguh-sungguh.',
            perilaku: 'Mengumpulkan tugas tepat waktu dan mengembalikan barang ke tempat semula.',
          },
          {
            no: '4',
            nilai: 'Gotong Royong & Peduli Lingkungan',
            pernyataan: 'Kami menjaga kebersihan, kerapian, dan kenyamanan ruang Kelas V bersama-sama setiap hari.',
            perilaku: 'Melaksanakan piket kelas tanpa harus diingatkan dan memungut sampah yang terlihat.',
          },
          {
            no: '5',
            nilai: 'Semangat Belajar & Bertumbuh',
            pernyataan: 'Kami berani bertanya, berani mencoba, dan saling membantu teman yang mengalami kesulitan belajar.',
            perilaku: 'Aktif berdiskusi kelompok dan gemar membaca di pojok literasi.',
          },
        ],
      },
      {
        id: 't-10-b',
        title: 'Lembar Persetujuan dan Tanda Tangan Perwakilan Warga Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '44px', align: 'center', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik' },
          { key: 'peran', label: 'Peran di Kelas', width: '24%' },
          { key: 'ttd', label: 'Tanda Tangan Persetujuan', width: '24%' },
        ],
        rows: emptyRows(10, ['no', 'nama', 'peran', 'ttd']),
      },
    ],
  },

  // ==========================================
  // III. ADMINISTRASI PESERTA DIDIK (Dok. 03, 04, 05, 11, 12, 13)
  // ==========================================
  {
    id: 'doc-03-daftar-peserta-didik',
    docNumber: '03',
    groupId: 'administrasi_peserta_didik',
    title: 'Daftar Peserta Didik Kelas V',
    shortTitle: '03. Daftar Peserta Didik',
    description: 'Daftar induk nama peserta didik Kelas V SDN 2 Bojong Tahun Pelajaran 2026/2027.',
    orientation: 'portrait',
    introText:
      'Tabel berikut merupakan daftar resmi peserta didik Kelas V (Fase C) SDN 2 Bojong. Kolom dikosongkan agar dapat diisi sesuai data Dapodik sekolah.',
    tables: [
      {
        id: 't-03-a',
        title: 'Daftar Nama Peserta Didik Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '42px', align: 'center', isMono: true },
          { key: 'nis', label: 'NIS', width: '90px', align: 'center', isMono: true },
          { key: 'nisn', label: 'NISN', width: '110px', align: 'center', isMono: true },
          { key: 'nama', label: 'Nama Lengkap Peserta Didik' },
          { key: 'jk', label: 'L/P', width: '50px', align: 'center' },
          { key: 'ttl', label: 'Tempat, Tanggal Lahir', width: '22%' },
          { key: 'agama', label: 'Agama', width: '85px', align: 'center' },
          { key: 'ket', label: 'Ket.', width: '80px' },
        ],
        rows: emptyRows(20, ['no', 'nis', 'nisn', 'nama', 'jk', 'ttl', 'agama', 'ket']),
      },
    ],
  },

  {
    id: 'doc-04-data-identitas-siswa',
    docNumber: '04',
    groupId: 'administrasi_peserta_didik',
    title: 'Data Identitas Lengkap Peserta Didik',
    shortTitle: '04. Data Identitas Siswa',
    description: 'Biodata rinci peserta didik meliputi NIK, urutan kelahiran, alamat domisili, jarak tempuh, antropometri, dan KIP/PIP.',
    orientation: 'landscape',
    introText:
      'Data identitas rinci digunakan sebagai acuan layanan pembelajaran berdiferensiasi, pemetaan kesehatan dasar, dan pengajuan program bantuan pendidikan.',
    tables: [
      {
        id: 't-04-a',
        title: 'Biodata Lengkap Peserta Didik Kelas V SDN 2 Bojong',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'nama', label: 'Nama Lengkap Siswa', width: '18%' },
          { key: 'nik', label: 'NIK (16 Digit)', width: '125px', isMono: true },
          { key: 'anakKe', label: 'Anak Ke / Jml Sdr', width: '85px', align: 'center', isMono: true },
          { key: 'alamat', label: 'Alamat Lengkap (RT/RW, Dusun/Desa)', width: '22%' },
          { key: 'jarak', label: 'Jarak / Transport', width: '100px', align: 'center' },
          { key: 'tbBb', label: 'TB (cm) / BB (kg)', width: '95px', align: 'center', isMono: true },
          { key: 'kesehatan', label: 'Gol. Darah / Riwayat Kesehatan', width: '14%' },
          { key: 'kip', label: 'No. KIP / PIP', width: '100px', isMono: true },
        ],
        rows: emptyRows(15, ['no', 'nama', 'nik', 'anakKe', 'alamat', 'jarak', 'tbBb', 'kesehatan', 'kip']),
      },
    ],
  },

  {
    id: 'doc-05-data-orang-tua',
    docNumber: '05',
    groupId: 'administrasi_peserta_didik',
    title: 'Data Orang Tua / Wali Peserta Didik',
    shortTitle: '05. Data Orang Tua / Wali',
    description: 'Data identitas ayah, ibu, atau wali peserta didik beserta pekerjaan, pendidikan, dan nomor kontak aktif.',
    orientation: 'landscape',
    introText:
      'Data orang tua/wali peserta didik digunakan untuk memperlancar komunikasi kemitraan tri-pusat pendidikan antara sekolah dan keluarga.',
    tables: [
      {
        id: 't-05-a',
        title: 'Daftar Identitas Orang Tua / Wali Peserta Didik Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'namaSiswa', label: 'Nama Peserta Didik', width: '17%' },
          { key: 'namaAyah', label: 'Nama Ayah Kandung', width: '15%' },
          { key: 'namaIbu', label: 'Nama Ibu Kandung', width: '15%' },
          { key: 'pendidikan', label: 'Pendidikan (Ayah/Ibu)', width: '11%', align: 'center' },
          { key: 'pekerjaan', label: 'Pekerjaan (Ayah/Ibu)', width: '14%' },
          { key: 'noHp', label: 'Nomor HP / WhatsApp Aktif', width: '130px', isMono: true },
          { key: 'alamatOrtu', label: 'Alamat Orang Tua / Wali' },
        ],
        rows: emptyRows(15, ['no', 'namaSiswa', 'namaAyah', 'namaIbu', 'pendidikan', 'pekerjaan', 'noHp', 'alamatOrtu']),
      },
    ],
  },

  {
    id: 'doc-11-daftar-kehadiran',
    docNumber: '11',
    groupId: 'administrasi_peserta_didik',
    title: 'Daftar Kehadiran Harian Siswa (Bulanan)',
    shortTitle: '11. Daftar Kehadiran Siswa',
    description: 'Format lembar presensi harian peserta didik selama satu bulan beserta rekapitulasi S (Sakit), I (Izin), dan A (Alpa).',
    orientation: 'landscape',
    introText:
      'Bulan: .......................................... Tahun: 2026 / 2027. Berikan tanda titik/centang (v) untuk Hadir, S untuk Sakit, I untuk Izin, dan A untuk Tanpa Keterangan.',
    tables: [
      {
        id: 't-11-a',
        title: 'Lembar Presensi Harian Peserta Didik Kelas V (Minggu I - IV)',
        columns: [
          { key: 'no', label: 'No', width: '36px', align: 'center', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik', width: '20%' },
          { key: 'jk', label: 'L/P', width: '38px', align: 'center' },
          { key: 'm1', label: 'Minggu I (Tgl 1-7)', align: 'center', isMono: true },
          { key: 'm2', label: 'Minggu II (Tgl 8-14)', align: 'center', isMono: true },
          { key: 'm3', label: 'Minggu III (Tgl 15-21)', align: 'center', isMono: true },
          { key: 'm4', label: 'Minggu IV (Tgl 22-31)', align: 'center', isMono: true },
          { key: 's', label: 'S', width: '38px', align: 'center', isMono: true },
          { key: 'i', label: 'I', width: '38px', align: 'center', isMono: true },
          { key: 'a', label: 'A', width: '38px', align: 'center', isMono: true },
          { key: 'persen', label: '% Hadir', width: '68px', align: 'center', isMono: true },
        ],
        rows: emptyRows(18, ['no', 'nama', 'jk', 'm1', 'm2', 'm3', 'm4', 's', 'i', 'a', 'persen']),
        footerNotes: [
          'Rumus Persentase Kehadiran = ((Jumlah Hari Efektif - Jumlah S/I/A) / Jumlah Hari Efektif) x 100%.',
        ],
      },
    ],
  },

  {
    id: 'doc-12-rekap-absensi-bulanan',
    docNumber: '12',
    groupId: 'administrasi_peserta_didik',
    title: 'Rekapitulasi Absensi Bulanan Kelas V',
    shortTitle: '12. Rekap Absensi Bulanan',
    description: 'Rekapitulasi kehadiran peserta didik Kelas V per bulan selama Tahun Pelajaran 2026/2027 (Semester Ganjil dan Genap).',
    orientation: 'portrait',
    introText:
      'Tabel ini merekapitulasi jumlah hari efektif dan tingkat kehadiran rata-rata kelas setiap bulan dari Juli 2026 hingga Juni 2027.',
    tables: [
      {
        id: 't-12-a',
        title: 'Rekapitulasi Kehadiran Bulanan Kelas V Tahun Pelajaran 2026/2027',
        columns: [
          { key: 'no', label: 'No', width: '42px', align: 'center', isMono: true },
          { key: 'bulan', label: 'Bulan / Tahun', width: '24%' },
          { key: 'hariEfektif', label: 'Hari Efektif', width: '13%', align: 'center', isMono: true },
          { key: 'sakit', label: 'Jml Sakit (S)', width: '13%', align: 'center', isMono: true },
          { key: 'izin', label: 'Jml Izin (I)', width: '13%', align: 'center', isMono: true },
          { key: 'alpa', label: 'Jml Alpa (A)', width: '13%', align: 'center', isMono: true },
          { key: 'persentase', label: '% Kehadiran', width: '14%', align: 'center', isMono: true },
          { key: 'ket', label: 'Keterangan' },
        ],
        rows: [
          { no: '1', bulan: 'Juli 2026', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Ganjil' },
          { no: '2', bulan: 'Agustus 2026', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Ganjil' },
          { no: '3', bulan: 'September 2026', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Ganjil' },
          { no: '4', bulan: 'Oktober 2026', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Ganjil' },
          { no: '5', bulan: 'November 2026', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Ganjil' },
          { no: '6', bulan: 'Desember 2026', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Akhir Semester Ganjil' },
          { no: '7', bulan: 'Januari 2027', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Genap' },
          { no: '8', bulan: 'Februari 2027', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Genap' },
          { no: '9', bulan: 'Maret 2027', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Genap' },
          { no: '10', bulan: 'April 2027', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Genap' },
          { no: '11', bulan: 'Mei 2027', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Semester Genap' },
          { no: '12', bulan: 'Juni 2027', hariEfektif: '', sakit: '', izin: '', alpa: '', persentase: '', ket: 'Akhir Semester Genap' },
        ],
      },
    ],
  },

  {
    id: 'doc-13-catatan-keterlambatan',
    docNumber: '13',
    groupId: 'administrasi_peserta_didik',
    title: 'Catatan Keterlambatan dan Ketidakhadiran Siswa',
    shortTitle: '13. Catatan Keterlambatan & Absen',
    description: 'Jurnal pencatatan khusus siswa yang datang terlambat atau tidak hadir beserta alasan, bukti surat, dan tindak lanjut wali kelas.',
    orientation: 'portrait',
    introText:
      'Setiap kejadian keterlambatan atau ketidakhadiran peserta didik dicatat secara tertib untuk memantau kedisiplinan dan mendeteksi kendala kehadiran sejak dini.',
    tables: [
      {
        id: 't-13-a',
        title: 'Jurnal Pemantauan Keterlambatan dan Ketidakhadiran Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'tanggal', label: 'Hari / Tanggal', width: '15%', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik', width: '20%' },
          { key: 'status', label: 'Status (Terlambat / S / I / A)', width: '16%' },
          { key: 'alasan', label: 'Alasan / Keterangan & Bukti Fisik' },
          { key: 'tindakLanjut', label: 'Tindak Lanjut Wali Kelas', width: '22%' },
        ],
        rows: emptyRows(12, ['no', 'tanggal', 'nama', 'status', 'alasan', 'tindakLanjut']),
      },
    ],
  },

  // ==========================================
  // IV. MONITORING PERKEMBANGAN (Dok. 14, 15, 16, 19, 20, 21)
  // ==========================================
  {
    id: 'doc-14-catatan-perilaku',
    docNumber: '14',
    groupId: 'monitoring_perkembangan',
    title: 'Catatan Perilaku dan Perkembangan Sikap Siswa',
    shortTitle: '14. Catatan Perilaku & Sikap',
    description: 'Jurnal observasi sikap positif maupun perilaku yang memerlukan pembinaan berdasarkan dimensi Profil Pelajar Pancasila.',
    orientation: 'landscape',
    introText:
      'Catatan ini merekam kejadian menonjol (baik perilaku teladan maupun perilaku yang membutuhkan bimbingan) selama proses pembelajaran di Kelas V Fase C.',
    tables: [
      {
        id: 't-14-a',
        title: 'Jurnal Observasi Perilaku dan Perkembangan Karakter Peserta Didik',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'tanggal', label: 'Hari / Tanggal', width: '13%', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik', width: '18%' },
          { key: 'uraian', label: 'Catatan Kejadian / Perilaku yang Diamati' },
          { key: 'dimensi', label: 'Dimensi P5 Terkait', width: '16%' },
          { key: 'kategori', label: 'Positif / Perlu Bimbingan', width: '13%', align: 'center' },
          { key: 'tindakLanjut', label: 'Tindak Lanjut & Hasil', width: '18%' },
        ],
        rows: emptyRows(12, ['no', 'tanggal', 'nama', 'uraian', 'dimensi', 'kategori', 'tindakLanjut']),
      },
    ],
  },

  {
    id: 'doc-15-catatan-prestasi',
    docNumber: '15',
    groupId: 'monitoring_perkembangan',
    title: 'Catatan Prestasi Peserta Didik',
    shortTitle: '15. Catatan Prestasi Siswa',
    description: 'Rekam jejak capaian prestasi akademik dan non-akademik peserta didik Kelas V mulai tingkat kelas, sekolah, kecamatan, hingga nasional.',
    orientation: 'portrait',
    introText:
      'Setiap prestasi peserta didik baik di bidang akademik, olahraga (O2SN), seni (FLS2N), keagamaan (Pentas PAI), maupun pramuka dicatat beserta nomor sertifikat/piagam pendukung.',
    tables: [
      {
        id: 't-15-a',
        title: 'Daftar Prestasi Akademik dan Non-Akademik Peserta Didik Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'tanggal', label: 'Waktu / Tanggal', width: '14%', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik', width: '20%' },
          { key: 'jenisLomba', label: 'Nama Kegiatan / Cabang Prestasi' },
          { key: 'tingkat', label: 'Tingkat (Sekolah/Kec/Kab)', width: '16%' },
          { key: 'peringkat', label: 'Capaian / Juara', width: '12%', align: 'center' },
          { key: 'bukti', label: 'Bukti Fisik (Piagam/Piala)', width: '15%' },
        ],
        rows: emptyRows(10, ['no', 'tanggal', 'nama', 'jenisLomba', 'tingkat', 'peringkat', 'bukti']),
      },
    ],
  },

  {
    id: 'doc-16-perhatian-khusus',
    docNumber: '16',
    groupId: 'monitoring_perkembangan',
    title: 'Catatan Siswa yang Memerlukan Perhatian Khusus',
    shortTitle: '16. Siswa Perhatian Khusus',
    description: 'Pemetaan peserta didik yang mengalami hambatan belajar (literasi/numerasi), kendala kesehatan, atau hambatan sosial-emosional.',
    orientation: 'landscape',
    introText:
      'Identifikasi ini bersifat rahasia dan digunakan secara profesional oleh wali kelas untuk merancang strategi pendampingan individual serta pembelajaran berdiferensiasi.',
    tables: [
      {
        id: 't-16-a',
        title: 'Daftar Pemetaan dan Pendampingan Siswa Berkebutuhan Perhatian Khusus',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik', width: '18%' },
          { key: 'aspek', label: 'Aspek Hambatan (Akademik / Sosial / Kesehatan)', width: '18%' },
          { key: 'identifikasi', label: 'Deskripsi Kondisi & Faktor Penyebab' },
          { key: 'intervensi', label: 'Bentuk Pendampingan / Diferensiasi Pembelajaran', width: '22%' },
          { key: 'perkembangan', label: 'Perkembangan & Evaluasi', width: '16%' },
        ],
        rows: emptyRows(10, ['no', 'nama', 'aspek', 'identifikasi', 'intervensi', 'perkembangan']),
      },
    ],
  },

  {
    id: 'doc-19-catatan-bimbingan',
    docNumber: '19',
    groupId: 'monitoring_perkembangan',
    title: 'Catatan Bimbingan dan Tindak Lanjut Wali Kelas',
    shortTitle: '19. Catatan Bimbingan & Konseling',
    description: 'Layanan bimbingan individu maupun kelompok oleh wali kelas terhadap permasalahan belajar maupun sosial peserta didik.',
    orientation: 'landscape',
    introText:
      'Layanan bimbingan wali kelas di Sekolah Dasar dilaksanakan dengan pendekatan ramah anak, empatik, dan solutif.',
    tables: [
      {
        id: 't-19-a',
        title: 'Jurnal Layanan Bimbingan dan Tindak Lanjut Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '40px', align: 'center', isMono: true },
          { key: 'tanggal', label: 'Hari / Tanggal', width: '13%', isMono: true },
          { key: 'nama', label: 'Nama Siswa', width: '17%' },
          { key: 'masalah', label: 'Permasalahan yang Dihadapi' },
          { key: 'bentukBimbingan', label: 'Bentuk Layanan / Bimbingan', width: '18%' },
          { key: 'tindakLanjut', label: 'Rencana Tindak Lanjut & Hasil', width: '18%' },
          { key: 'paraf', label: 'Paraf Siswa/Ortu', width: '10%', align: 'center' },
        ],
        rows: emptyRows(10, ['no', 'tanggal', 'nama', 'masalah', 'bentukBimbingan', 'tindakLanjut', 'paraf']),
      },
    ],
  },

  {
    id: 'doc-20-rekap-hasil-belajar',
    docNumber: '20',
    groupId: 'monitoring_perkembangan',
    title: 'Rekapitulasi Hasil Belajar Siswa (Fase C)',
    shortTitle: '20. Rekap Hasil Belajar (Nilai)',
    description: 'Daftar kumpulan nilai (legger kelas) hasil asesmen sumatif mata pelajaran Kurikulum Merdeka Kelas V Fase C.',
    orientation: 'landscape',
    introText:
      'Semester: Ganjil / Genap — Tahun Pelajaran 2026/2027. Rekapitulasi ini memuat nilai akhir asesmen mata pelajaran intrakurikuler Kelas V SDN 2 Bojong.',
    tables: [
      {
        id: 't-20-a',
        title: 'Legger Rekapitulasi Nilai Akhir Mata Pelajaran Kelas V (Fase C)',
        columns: [
          { key: 'no', label: 'No', width: '36px', align: 'center', isMono: true },
          { key: 'nisn', label: 'NISN', width: '92px', align: 'center', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik', width: '19%' },
          { key: 'pabp', label: 'PABP', width: '54px', align: 'center', isMono: true },
          { key: 'pancasila', label: 'P.Pancasila', width: '74px', align: 'center', isMono: true },
          { key: 'bindo', label: 'B.Indo', width: '58px', align: 'center', isMono: true },
          { key: 'mtk', label: 'MTK', width: '54px', align: 'center', isMono: true },
          { key: 'ipas', label: 'IPAS', width: '54px', align: 'center', isMono: true },
          { key: 'pjok', label: 'PJOK', width: '54px', align: 'center', isMono: true },
          { key: 'seni', label: 'Seni', width: '54px', align: 'center', isMono: true },
          { key: 'bing', label: 'B.Ing', width: '54px', align: 'center', isMono: true },
          { key: 'mulok', label: 'Mulok', width: '54px', align: 'center', isMono: true },
          { key: 'rata', label: 'Rata-rata', width: '68px', align: 'center', isMono: true },
          { key: 'ket', label: 'Ket. KKTP', width: '80px', align: 'center' },
        ],
        rows: emptyRows(18, ['no', 'nisn', 'nama', 'pabp', 'pancasila', 'bindo', 'mtk', 'ipas', 'pjok', 'seni', 'bing', 'mulok', 'rata', 'ket']),
        footerNotes: [
          'Keterangan Mata Pelajaran: PABP = Pendidikan Agama & Budi Pekerti; P.Pancasila = Pendidikan Pancasila; B.Indo = Bahasa Indonesia; MTK = Matematika; IPAS = Ilmu Pengetahuan Alam dan Sosial; PJOK = Pendidikan Jasmani, Olahraga, dan Kesehatan; KKTP = Kriteria Ketercapaian Tujuan Pembelajaran.',
        ],
      },
    ],
  },

  {
    id: 'doc-21-rekap-karakter-keterampilan',
    docNumber: '21',
    groupId: 'monitoring_perkembangan',
    title: 'Rekap Perkembangan Karakter (P5) dan Keterampilan',
    shortTitle: '21. Rekap Karakter (P5) & Keterampilan',
    description: 'Pemetaan capaian 6 Dimensi Profil Pelajar Pancasila serta keterampilan proses peserta didik Fase C.',
    orientation: 'landscape',
    introText:
      'Keterangan Predikat Capaian Karakter P5: MB = Mulai Berkembang; SB = Sedang Berkembang; BSH = Berkembang Sesuai Harapan; SAB = Sangat Berkembang.',
    tables: [
      {
        id: 't-21-a',
        title: 'Tabel Capaian Dimensi Profil Pelajar Pancasila & Keterampilan Kelas V',
        columns: [
          { key: 'no', label: 'No', width: '36px', align: 'center', isMono: true },
          { key: 'nama', label: 'Nama Peserta Didik', width: '20%' },
          { key: 'd1', label: 'Beriman & Bertakwa', width: '90px', align: 'center' },
          { key: 'd2', label: 'Berkebinekaan Global', width: '95px', align: 'center' },
          { key: 'd3', label: 'Bergotong Royong', width: '90px', align: 'center' },
          { key: 'd4', label: 'Mandiri', width: '78px', align: 'center' },
          { key: 'd5', label: 'Bernalar Kritis', width: '85px', align: 'center' },
          { key: 'd6', label: 'Kreatif', width: '78px', align: 'center' },
          { key: 'keterampilan', label: 'Keterampilan Kolaborasi & Komunikasi' },
        ],
        rows: emptyRows(16, ['no', 'nama', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'keterampilan']),
      },
    ],
  },
];
