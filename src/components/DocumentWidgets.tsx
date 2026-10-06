import React, { useState } from 'react';
import { DocumentModule, SchoolMeta } from '../types/administrasi';
import { Upload, CheckCircle2, FileCheck, Image as ImageIcon, Trash2 } from 'lucide-react';

export const TUT_WURI_LOGO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo-Tut-Wuri-Handayani-PNG-Warna.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original';

export const GARUT_LOGO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/d/d4/Lambang_Kabupaten_Garut.svg?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original';

export const TutWuriLogo: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} text-slate-900`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo Tut Wuri Handayani"
      >
        <polygon points="50,4 93,26 82,78 50,96 18,78 7,26" stroke="currentColor" strokeWidth="3.5" fill="#eff6ff" />
        <circle cx="50" cy="44" r="14" stroke="currentColor" strokeWidth="2.5" />
        <text x="50" y="48" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">
          TUT WURI
        </text>
      </svg>
    );
  }

  return (
    <img
      src={TUT_WURI_LOGO_URL}
      alt="Logo Tut Wuri Handayani"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setImgError(true)}
      className={`${className} object-contain`}
    />
  );
};

export const GarutLogo: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} text-slate-900`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lambang Kabupaten Garut"
      >
        <path d="M18,12 H82 V54 C82,76 50,92 50,92 C50,92 18,76 18,54 Z" stroke="currentColor" strokeWidth="3.5" fill="#f8fafc" />
        <text x="50" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">
          GARUT
        </text>
      </svg>
    );
  }

  return (
    <img
      src={GARUT_LOGO_URL}
      alt="Lambang Kabupaten Garut"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setImgError(true)}
      className={`${className} object-contain`}
    />
  );
};

interface WidgetProps {
  doc: DocumentModule;
  meta: SchoolMeta;
  onUpdateCell?: (tableId: string, rowIndex: number, colKey: string, value: string) => void;
}

export function formatKecamatanKabupaten(meta: SchoolMeta): string {
  const kecRaw = (meta.kecamatan || 'Pameungpeuk').replace(/^Kecamatan\s+/i, '').trim();
  const kec = kecRaw.toLowerCase() === 'bojong' ? 'Pameungpeuk' : kecRaw;
  const kabRaw = (meta.kabupaten || 'Kabupaten Garut').trim();
  const kab =
    kabRaw.toLowerCase().startsWith('kabupaten') || kabRaw.toLowerCase().startsWith('kota')
      ? kabRaw
      : `Kabupaten ${kabRaw}`;
  return `Kecamatan ${kec} ${kab}`;
}

export const OfficialKopSurat: React.FC<{ meta: SchoolMeta }> = ({ meta }) => {
  const kabHeader =
    meta.kabupaten && !meta.kabupaten.toLowerCase().startsWith('kabupaten')
      ? `Kabupaten ${meta.kabupaten}`
      : meta.kabupaten || 'Kabupaten Garut';

  return (
    <div className="border-b-4 border-double border-slate-900 pb-3.5 mb-5 text-center font-serif-doc">
      <div className="flex items-center justify-between gap-4">
        {/* Left Emblem: Logo Tut Wuri Handayani */}
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          <TutWuriLogo className="w-14 h-14" />
        </div>

        {/* Center Header Text */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-800">
            Pemerintah Daerah {kabHeader}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-800">
            Dinas Pendidikan
          </p>
          <h2 className="text-xl font-bold uppercase tracking-wide text-slate-950 mt-0.5">
            {meta.namaSekolah}
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Kecamatan {(meta.kecamatan || 'Pameungpeuk').replace(/^Kecamatan\s+/i, '').trim() || 'Pameungpeuk'}
          </p>
          <p className="text-[11px] text-slate-600 mt-0.5 font-sans">
            Alamat: {meta.alamatSekolah || 'Desa Bojong'} · {formatKecamatanKabupaten(meta)}
            {meta.npsn ? ` · NPSN: ${meta.npsn}` : ''}
          </p>
        </div>

        {/* Right Emblem: Lambang Kabupaten Garut */}
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          <GarutLogo className="w-14 h-14" />
        </div>
      </div>
    </div>
  );
};

export const OfficialSignatureBlock: React.FC<{ meta: SchoolMeta }> = ({ meta }) => {
  return (
    <div className="mt-8 pt-4 grid grid-cols-2 gap-8 text-xs text-slate-900 break-inside-avoid">
      <div className="text-center">
        <p className="mb-1">Mengetahui,</p>
        <p className="font-semibold">Kepala {meta.namaSekolah}</p>
        <div className="h-20" />
        <p className="font-bold underline decoration-slate-800 underline-offset-2">
          {meta.namaKepalaSekolah || '.........................................................'}
        </p>
        <p className="font-mono-num text-[11px] text-slate-700 mt-0.5">
          NIP. {meta.nipKepalaSekolah || '.............................................'}
        </p>
      </div>

      <div className="text-center">
        <p className="mb-1">{meta.tempatTanggalTtd || 'Bojong, .......................... 2026'}</p>
        <p className="font-semibold">Wali Kelas {meta.kelas}</p>
        <div className="h-20" />
        <p className="font-bold underline decoration-slate-800 underline-offset-2">
          {meta.namaWaliKelas}
        </p>
        <p className="font-mono-num text-[11px] text-slate-700 mt-0.5">
          NIP. {meta.nipWaliKelas || '.............................................'}
        </p>
      </div>
    </div>
  );
};

export const CoverSheetWidget: React.FC<WidgetProps> = ({ meta }) => {
  return (
    <div className="border-4 border-double border-slate-900 p-8 sm:p-10 min-h-[255mm] flex flex-col justify-between text-center bg-white">
      {/* Top Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
          Dokumen Administrasi Satuan Pendidikan
        </p>
        <h1 className="font-serif-doc text-2xl sm:text-3xl font-bold uppercase tracking-wide text-slate-950 mt-2">
          Perangkat Administrasi Wali Kelas
        </h1>
        <p className="text-sm font-medium text-slate-700 mt-1 uppercase tracking-wider">
          Implementasi Kurikulum Merdeka — Jenjang Sekolah Dasar (SD)
        </p>
        <div className="w-32 h-0.5 bg-slate-900 mx-auto mt-4" />
      </div>

      {/* Center Emblem & Class Highlight */}
      <div className="my-6 flex flex-col items-center">
        <div className="w-36 h-36 flex items-center justify-center mb-5">
          <TutWuriLogo className="w-32 h-32" />
        </div>

        <div className="inline-block border-y-2 border-slate-900 py-2.5 px-8">
          <p className="text-xl font-serif-doc font-bold text-slate-950 uppercase">
            KELAS {meta.kelas} — FASE {meta.fase}
          </p>
          <p className="text-sm font-mono-num font-semibold text-slate-800 mt-0.5">
            TAHUN PELAJARAN {meta.tahunPelajaran}
          </p>
        </div>
      </div>

      {/* Official Identity Box */}
      <div className="max-w-lg mx-auto w-full border border-slate-800 bg-slate-50/60 p-5 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-300 pb-1.5">
          Identitas Resmi Perangkat Kelas
        </p>
        <table className="w-full text-xs text-slate-900">
          <tbody>
            <tr className="border-b border-slate-200/80">
              <td className="py-2 font-medium text-slate-600 w-40">Nama Sekolah</td>
              <td className="py-2 font-bold">: {meta.namaSekolah}</td>
            </tr>
            <tr className="border-b border-slate-200/80">
              <td className="py-2 font-medium text-slate-600">Jenjang / Kelas / Fase</td>
              <td className="py-2 font-semibold">: {meta.jenjang} / Kelas {meta.kelas} / Fase {meta.fase}</td>
            </tr>
            <tr className="border-b border-slate-200/80">
              <td className="py-2 font-medium text-slate-600">Tahun Pelajaran</td>
              <td className="py-2 font-mono-num font-semibold">: {meta.tahunPelajaran}</td>
            </tr>
            <tr className="border-b border-slate-200/80">
              <td className="py-2 font-medium text-slate-600">Nama Wali Kelas</td>
              <td className="py-2 font-bold text-slate-950">: {meta.namaWaliKelas}</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-slate-600">NIP / NUPTK</td>
              <td className="py-2 font-mono-num">: {meta.nipWaliKelas || '................................................'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Institutional Footer */}
      <div className="mt-8 pt-4 border-t border-slate-300">
        <p className="font-serif-doc text-base font-bold uppercase tracking-wide text-slate-950">
          {meta.namaSekolah}
        </p>
        <p className="text-xs text-slate-700 mt-0.5">
          {formatKecamatanKabupaten(meta)}
        </p>
        <p className="text-xs font-mono-num font-semibold text-slate-900 mt-1">
          TAHUN PELAJARAN {meta.tahunPelajaran}
        </p>
      </div>
    </div>
  );
};

export const OrgChartWidget: React.FC<WidgetProps> = ({ doc, meta }) => {
  const rows = doc.tables[0]?.rows || [];
  const getByRole = (roleSubstring: string) => {
    const found = rows.find((r) => r.jabatan?.toLowerCase().includes(roleSubstring.toLowerCase()));
    return found?.nama || '................................';
  };

  return (
    <div className="mb-6 border border-slate-300 bg-slate-50/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 text-center mb-4">
        Bagan Struktur Organisasi Kelas {meta.kelas} — {meta.namaSekolah}
      </p>
      <div className="flex flex-col items-center gap-2.5 text-xs">
        {/* Pelindung & Wali Kelas */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="border border-slate-800 bg-white p-2 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Pelindung / Kepala Sekolah</p>
            <p className="font-bold text-slate-900 mt-0.5 truncate">{meta.namaKepalaSekolah || 'Kepala SDN 2 Bojong'}</p>
          </div>
          <div className="border-2 border-slate-900 bg-white p-2 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">Wali Kelas V</p>
            <p className="font-bold text-slate-950 mt-0.5 truncate">{meta.namaWaliKelas}</p>
          </div>
        </div>

        <div className="w-px h-3 bg-slate-500" />

        {/* Ketua & Wakil */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="border border-slate-700 bg-white p-2 text-center">
            <p className="text-[10px] uppercase text-slate-500 font-semibold">Ketua Kelas</p>
            <p className="font-semibold text-slate-900 mt-0.5 truncate">{getByRole('Ketua Kelas')}</p>
          </div>
          <div className="border border-slate-700 bg-white p-2 text-center">
            <p className="text-[10px] uppercase text-slate-500 font-semibold">Wakil Ketua Kelas</p>
            <p className="font-semibold text-slate-900 mt-0.5 truncate">{getByRole('Wakil Ketua')}</p>
          </div>
        </div>

        <div className="w-px h-3 bg-slate-500" />

        {/* Sekretaris & Bendahara */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          <div className="border border-slate-600 bg-white p-2 text-center">
            <p className="text-[10px] uppercase text-slate-500 font-semibold">Sekretaris I & II</p>
            <p className="text-[11px] text-slate-900 mt-0.5 truncate">1. {getByRole('Sekretaris I')}</p>
            <p className="text-[11px] text-slate-900 truncate">2. {getByRole('Sekretaris II')}</p>
          </div>
          <div className="border border-slate-600 bg-white p-2 text-center">
            <p className="text-[10px] uppercase text-slate-500 font-semibold">Bendahara I & II</p>
            <p className="text-[11px] text-slate-900 mt-0.5 truncate">1. {getByRole('Bendahara I')}</p>
            <p className="text-[11px] text-slate-900 truncate">2. {getByRole('Bendahara II')}</p>
          </div>
        </div>

        <div className="w-px h-3 bg-slate-500" />

        {/* Seksi-seksi */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
          {[
            { label: 'Seksi Kebersihan', key: 'Kebersihan' },
            { label: 'Seksi Ketertiban', key: 'Ketertiban' },
            { label: 'Seksi Kerohanian', key: 'Kerohanian' },
            { label: 'Seksi Literasi', key: 'Literasi' },
            { label: 'Seksi UKS', key: 'UKS' },
          ].map((sec) => (
            <div key={sec.key} className="border border-slate-400 bg-white p-1.5 text-center">
              <p className="text-[9.5px] font-semibold uppercase text-slate-600">{sec.label}</p>
              <p className="text-[11px] text-slate-900 mt-0.5 truncate">{getByRole(sec.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SeatingChartWidget: React.FC<WidgetProps> = ({ doc, meta }) => {
  const rows = doc.tables[0]?.rows || [];

  return (
    <div className="mb-6 border border-slate-400 bg-slate-50/40 p-4">
      <div className="text-center mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Skema Tata Letak Ruang Kelas {meta.kelas} (Fase {meta.fase}) — {meta.namaSekolah}
        </p>
        <p className="text-[11px] text-slate-600">
          Nama pada visualisasi meja di bawah ini otomatis tersinkronisasi dengan Tabel Penempatan Meja.
        </p>
      </div>

      {/* Front of Classroom: Door, Whiteboard, Teacher Desk */}
      <div className="grid grid-cols-12 gap-2 mb-4 items-center">
        <div className="col-span-2 border border-dashed border-slate-500 bg-white py-2 px-1 text-center text-[10px] font-semibold text-slate-700">
          PINTU MASUK
        </div>
        <div className="col-span-7 border-2 border-slate-900 bg-slate-100 py-2.5 px-3 text-center">
          <p className="text-xs font-bold tracking-wider uppercase text-slate-900">PAPAN TULIS (WHITEBOARD) KELAS V</p>
        </div>
        <div className="col-span-3 border-2 border-slate-800 bg-white py-2 px-2 text-center">
          <p className="text-[10px] font-bold uppercase text-slate-700">MEJA WALI KELAS</p>
          <p className="text-[10px] text-slate-900 truncate font-medium">{meta.namaWaliKelas}</p>
        </div>
      </div>

      {/* 16 Student Desks (4 Rows x 4 Columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
        {rows.slice(0, 16).map((r, idx) => (
          <div key={idx} className="border border-slate-700 bg-white p-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1">
              <span className="text-[10px] font-mono-num font-bold text-slate-800">
                {r.kodeMeja || `Meja ${idx + 1}`}
              </span>
              <span className="text-[9px] text-slate-500">2 Kursi</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <div className="border border-slate-200 bg-slate-50 px-1.5 py-1 truncate" title={r.siswaKiri || 'Kursi A (Kosong)'}>
                <span className="text-[9px] text-slate-400 block">Kursi A:</span>
                <span className="font-medium text-slate-900">{r.siswaKiri || '................'}</span>
              </div>
              <div className="border border-slate-200 bg-slate-50 px-1.5 py-1 truncate" title={r.siswaKanan || 'Kursi B (Kosong)'}>
                <span className="text-[9px] text-slate-400 block">Kursi B:</span>
                <span className="font-medium text-slate-900">{r.siswaKanan || '................'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back of Classroom: Reading Corner, P5 Display, Cabinet */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-300 text-center text-[10px]">
        <div className="border border-slate-600 bg-white py-2 px-2">
          <p className="font-bold uppercase text-slate-800">POJOK BACA / LITERASI FASE C</p>
          <p className="text-slate-600">Rak Buku Cerita & Ensiklopedia SD</p>
        </div>
        <div className="border border-slate-600 bg-white py-2 px-2">
          <p className="font-bold uppercase text-slate-800">PAPAN PAJANGAN KARYA & P5</p>
          <p className="text-slate-600">Portofolio Siswa & Kesepakatan Kelas</p>
        </div>
        <div className="border border-slate-600 bg-white py-2 px-2">
          <p className="font-bold uppercase text-slate-800">LEMARI ARSIP & KOTAK P3K</p>
          <p className="text-slate-600">Alat Peraga IPAS/Matematika & UKS</p>
        </div>
      </div>
    </div>
  );
};

interface EvidencePhotoSlot {
  id: string;
  code: string;
  title: string;
  caption: string;
  datePlaceholder: string;
  imageUrl?: string;
}

export const VerificationAttachmentWidget: React.FC<WidgetProps> = ({ meta }) => {
  const [photoSlots, setPhotoSlots] = useState<EvidencePhotoSlot[]>([
    {
      id: 'ev-1',
      code: 'DOK-FISIK/01',
      title: 'Bukti Fisik 1: Penyusunan & Penandatanganan Kesepakatan Kelas V',
      caption: 'Dokumentasi musyawarah mufakat perumusan keyakinan positif Kelas V Fase C bersama Wali Kelas.',
      datePlaceholder: 'Juli 2026',
    },
    {
      id: 'ev-2',
      code: 'DOK-FISIK/02',
      title: 'Bukti Fisik 2: Pelaksanaan Pembiasaan Literasi & Piket Kelas Harian',
      caption: 'Dokumentasi kegiatan membaca 15 menit di Pojok Baca dan kerja bakti regu piket Kelas V.',
      datePlaceholder: 'Semester Ganjil / Genap',
    },
    {
      id: 'ev-3',
      code: 'DOK-FISIK/03',
      title: 'Bukti Fisik 3: Rapat Koordinasi Orang Tua / Paguyuban & Penyerahan Rapor',
      caption: 'Dokumentasi pertemuan tatap muka Wali Kelas V dengan orang tua/wali siswa beserta daftar hadir fisik.',
      datePlaceholder: 'Desember 2026 / Juni 2027',
    },
    {
      id: 'ev-4',
      code: 'DOK-FISIK/04',
      title: 'Bukti Fisik 4: Aktivitas & Gelar Karya Projek Penguatan Profil Pelajar Pancasila (P5)',
      caption: 'Dokumentasi proses pembuatan karya kolaboratif dan pameran hasil belajar siswa Kelas V Fase C.',
      datePlaceholder: 'Tahun Pelajaran 2026/2027',
    },
  ]);

  const handlePhotoUpload = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoSlots((prev) =>
        prev.map((slot) => (slot.id === slotId ? { ...slot, imageUrl: String(reader.result) } : slot))
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (slotId: string) => {
    setPhotoSlots((prev) =>
      prev.map((slot) => (slot.id === slotId ? { ...slot, imageUrl: undefined } : slot))
    );
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Verification Stamp Header */}
      <div className="border-2 border-slate-800 bg-slate-50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-300 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-slate-900 shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Lembar Pengesahan & Verifikasi Bukti Fisik Administrasi Wali Kelas
            </h3>
          </div>
          <span className="text-[11px] font-mono-num font-semibold text-emerald-800">
            STATUS: FORMULIR BUKTI FISIK TERVERIFIKASI
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Seluruh dokumen administrasi Kelas {meta.kelas} (Fase {meta.fase}) Tahun Pelajaran {meta.tahunPelajaran} di {meta.namaSekolah} dilengkapi dengan ruang tempel foto dokumentasi fisik, salinan daftar hadir asli, serta lembar kendali verifikasi supervisi Kepala Sekolah di bawah ini.
        </p>
      </div>

      {/* 4 Verified Physical Documentation Frames */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Lembar Dokumentasi Bukti Fisik Kegiatan Kelas V (Siap Cetak / Unggah Foto Dokumentasi)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photoSlots.map((slot) => (
            <div key={slot.id} className="border border-slate-800 bg-white p-3 flex flex-col justify-between break-inside-avoid">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
                  <span className="text-[10px] font-mono-num font-bold text-slate-700">{slot.code}</span>
                  <span className="text-[10px] font-mono-num text-slate-600">{slot.datePlaceholder}</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mb-2">{slot.title}</p>

                {/* Photo Frame Box */}
                {slot.imageUrl ? (
                  <div className="relative border border-slate-300 bg-slate-100 h-40 flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src={slot.imageUrl}
                      alt={slot.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(slot.id)}
                      className="no-print absolute top-2 right-2 bg-white/90 hover:bg-white text-red-700 border border-slate-300 px-2 py-1 text-[10px] font-medium flex items-center gap-1"
                      aria-label={`Hapus foto ${slot.title}`}
                    >
                      <Trash2 className="w-3 h-3" />
                      Hapus
                    </button>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-400 bg-slate-50/70 h-40 flex flex-col items-center justify-center p-3 text-center mb-2">
                    <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
                    <p className="text-[11px] font-medium text-slate-700">
                      Area Tempel Foto Bukti Fisik (Ukuran 3R / 4R)
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Tempelkan foto cetak di sini atau unggah file dokumentasi digital sebelum mencetak.
                    </p>
                    <label className="no-print mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-[11px] font-medium text-slate-800 cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Pilih Foto Kegiatan</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(slot.id, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                <p className="text-[11px] text-slate-600 leading-snug">{slot.caption}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-700">
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Diverifikasi Wali Kelas
                </span>
                <span>Paraf Pengawas/KS: ...............</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Format Surat Pemberitahuan / Panggilan Orang Tua (Siap Pakai) */}
      <div className="border border-slate-800 p-4 bg-white break-inside-avoid">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-2 mb-3">
          Format Bukti Fisik Surat Komunikasi / Undangan Orang Tua Siswa Kelas V
        </p>
        <div className="text-xs text-slate-800 space-y-1.5 font-serif-doc">
          <div className="flex justify-between">
            <span>Nomor : ....../WK-V/SDN2B/2026</span>
            <span>{meta.tempatTanggalTtd || 'Bojong, ...................... 2026'}</span>
          </div>
          <div>Lampiran : -</div>
          <div>Perihal : <strong>Undangan Konsultasi Perkembangan Peserta Didik Kelas V</strong></div>
          <p className="pt-2">
            Kepada Yth. Bapak/Ibu Orang Tua/Wali dari ..........................................................<br />
            di Tempat
          </p>
          <p className="pt-1 leading-relaxed">
            Dengan hormat, dalam rangka menyelaraskan pendampingan belajar dan perkembangan karakter putra/putri Bapak/Ibu di Kelas {meta.kelas} (Fase {meta.fase}) {meta.namaSekolah}, kami mengharapkan kehadiran Bapak/Ibu pada:
          </p>
          <div className="pl-4 py-1 space-y-0.5">
            <p>Hari / Tanggal : ........................................................................</p>
            <p>Waktu : Pukul ................... WIB s.d. Selesai</p>
            <p>Tempat : Ruang Kelas {meta.kelas} {meta.namaSekolah}</p>
            <p>Agenda : ........................................................................</p>
          </div>
          <p className="leading-relaxed">
            Demikian surat pemberitahuan ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu yang baik, kami ucapkan terima kasih.
          </p>
        </div>
      </div>
    </div>
  );
};
