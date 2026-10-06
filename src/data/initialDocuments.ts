import { DocumentModule, SchoolMeta, SectionGroup } from '../types/administrasi';
import { DOCS_PART_1 } from './docsPart1';
import { DOCS_PART_2 } from './docsPart2';

export const INITIAL_SCHOOL_META: SchoolMeta = {
  jenjang: 'SD',
  kelas: 'V (Lima)',
  fase: 'C',
  tahunPelajaran: '2026/2027',
  semester: 'Ganjil & Genap',
  namaSekolah: 'SDN 2 Bojong',
  npsn: '',
  alamatSekolah: 'Desa Bojong',
  kecamatan: 'Pameungpeuk',
  kabupaten: 'Kabupaten Garut',
  provinsi: 'Jawa Barat',
  namaWaliKelas: 'Hendra Purnama, S.Pd.',
  nipWaliKelas: '',
  namaKepalaSekolah: '',
  nipKepalaSekolah: '',
  tempatTanggalTtd: 'Pameungpeuk, Juli 2026',
  jumlahSiswaL: '',
  jumlahSiswaP: '',
  jumlahSiswaTotal: '',
  ruangKelas: 'Ruang Kelas V',
};

export const SECTION_GROUPS: SectionGroup[] = [
  {
    id: 'cover',
    stepNumber: '01',
    label: 'Cover Perangkat',
    description: 'Sampul resmi buku administrasi wali kelas V Fase C.',
  },
  {
    id: 'identitas',
    stepNumber: '02',
    label: 'Identitas & Profil',
    description: 'Identitas sekolah, wali kelas, dan profil Kelas V.',
  },
  {
    id: 'administrasi_kelas',
    stepNumber: '03',
    label: 'Administrasi Kelas',
    description: 'Struktur organisasi, denah duduk, jadwal, piket, tata tertib, & kesepakatan kelas.',
  },
  {
    id: 'administrasi_peserta_didik',
    stepNumber: '04',
    label: 'Administrasi Peserta Didik',
    description: 'Daftar siswa, biodata identitas, data orang tua, presensi harian, rekap bulanan, & keterlambatan.',
  },
  {
    id: 'monitoring_perkembangan',
    stepNumber: '05',
    label: 'Monitoring Perkembangan',
    description: 'Catatan perilaku, prestasi, perhatian khusus, bimbingan konseling, rekap nilai, & karakter P5.',
  },
  {
    id: 'komunikasi_ortu',
    stepNumber: '06',
    label: 'Komunikasi Orang Tua',
    description: 'Buku penghubung/komunikasi orang tua dan notula rapat pertemuan wali murid.',
  },
  {
    id: 'program_wali_kelas',
    stepNumber: '07',
    label: 'Program Wali Kelas',
    description: 'Jurnal kegiatan harian wali kelas, program kerja tahunan, dan agenda kegiatan kelas.',
  },
  {
    id: 'evaluasi',
    stepNumber: '08',
    label: 'Evaluasi & Refleksi',
    description: 'Evaluasi ketercapaian program wali kelas, refleksi wali kelas, dan program tindak lanjut.',
  },
  {
    id: 'laporan',
    stepNumber: '09',
    label: 'Laporan & Lampiran',
    description: 'Laporan perkembangan kelas, laporan akhir tahun, serta bukti fisik & dokumentasi terverifikasi.',
  },
];

export const ALL_INITIAL_DOCUMENTS: DocumentModule[] = [
  ...DOCS_PART_1,
  ...DOCS_PART_2,
];
