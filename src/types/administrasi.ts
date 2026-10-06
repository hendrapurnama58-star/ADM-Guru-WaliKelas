export type SectionGroupId =
  | 'cover'
  | 'identitas'
  | 'administrasi_kelas'
  | 'administrasi_peserta_didik'
  | 'monitoring_perkembangan'
  | 'komunikasi_ortu'
  | 'program_wali_kelas'
  | 'evaluasi'
  | 'laporan';

export interface SchoolMeta {
  jenjang: string;
  kelas: string;
  fase: string;
  tahunPelajaran: string;
  semester: string;
  namaSekolah: string;
  npsn: string;
  alamatSekolah: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  namaWaliKelas: string;
  nipWaliKelas: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  tempatTanggalTtd: string;
  jumlahSiswaL: string;
  jumlahSiswaP: string;
  jumlahSiswaTotal: string;
  ruangKelas: string;
}

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  isMono?: boolean;
}

export interface TableSectionData {
  id: string;
  title: string;
  subtitle?: string;
  columns: TableColumn[];
  rows: Record<string, string>[];
  footerNotes?: string[];
}

export interface DocumentModule {
  id: string;
  docNumber: string; // e.g., 'Cover', '01', '02', ... '29', 'Lampiran'
  groupId: SectionGroupId;
  title: string;
  shortTitle: string;
  description: string;
  orientation: 'portrait' | 'landscape';
  introText?: string;
  tables: TableSectionData[];
  customWidget?: 'cover' | 'seating_chart' | 'org_chart' | 'verification_attachment';
  verificationNotes?: string[];
}

export interface SectionGroup {
  id: SectionGroupId;
  stepNumber: string;
  label: string;
  description: string;
}
