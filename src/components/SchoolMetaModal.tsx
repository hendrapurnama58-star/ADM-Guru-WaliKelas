import React from 'react';
import { SchoolMeta } from '../types/administrasi';
import { X, RotateCcw, Check } from 'lucide-react';

interface SchoolMetaModalProps {
  isOpen: boolean;
  meta: SchoolMeta;
  onClose: () => void;
  onUpdateMeta: (updated: SchoolMeta) => void;
  onResetAll: () => void;
}

export const SchoolMetaModal: React.FC<SchoolMetaModalProps> = ({
  isOpen,
  meta,
  onClose,
  onUpdateMeta,
  onResetAll,
}) => {
  if (!isOpen) return null;

  const handleChange = (key: keyof SchoolMeta, val: string) => {
    onUpdateMeta({ ...meta, [key]: val });
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-meta-title"
    >
      <div className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 id="modal-meta-title" className="text-base font-bold text-slate-900">
              Pengaturan Identitas Sekolah & Kop Dokumen
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Data yang diisi di sini otomatis diterapkan pada Sampul, Kop Surat, dan Blok Tanda Tangan di seluruh 29 dokumen.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md"
            aria-label="Tutup pengaturan identitas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="meta-namaSekolah" className="block font-semibold text-slate-700 mb-1">
              Nama Satuan Pendidikan
            </label>
            <input
              id="meta-namaSekolah"
              type="text"
              value={meta.namaSekolah}
              onChange={(e) => handleChange('namaSekolah', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-npsn" className="block font-semibold text-slate-700 mb-1">
              NPSN Sekolah (Kosongkan jika diisi tulis tangan)
            </label>
            <input
              id="meta-npsn"
              type="text"
              placeholder="Contoh: 2021xxxx"
              value={meta.npsn}
              onChange={(e) => handleChange('npsn', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono-num text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-jenjang" className="block font-semibold text-slate-700 mb-1">
              Jenjang Pendidikan
            </label>
            <input
              id="meta-jenjang"
              type="text"
              value={meta.jenjang}
              onChange={(e) => handleChange('jenjang', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="meta-kelas" className="block font-semibold text-slate-700 mb-1">
                Kelas
              </label>
              <input
                id="meta-kelas"
                type="text"
                value={meta.kelas}
                onChange={(e) => handleChange('kelas', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="meta-fase" className="block font-semibold text-slate-700 mb-1">
                Fase Kurikulum
              </label>
              <input
                id="meta-fase"
                type="text"
                value={meta.fase}
                onChange={(e) => handleChange('fase', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="meta-tp" className="block font-semibold text-slate-700 mb-1">
              Tahun Pelajaran
            </label>
            <input
              id="meta-tp"
              type="text"
              value={meta.tahunPelajaran}
              onChange={(e) => handleChange('tahunPelajaran', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono-num text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-ttd" className="block font-semibold text-slate-700 mb-1">
              Tempat & Tanggal Penandatanganan
            </label>
            <input
              id="meta-ttd"
              type="text"
              placeholder="Bojong, Juli 2026"
              value={meta.tempatTanggalTtd}
              onChange={(e) => handleChange('tempatTanggalTtd', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-wali" className="block font-semibold text-slate-700 mb-1">
              Nama Wali Kelas
            </label>
            <input
              id="meta-wali"
              type="text"
              value={meta.namaWaliKelas}
              onChange={(e) => handleChange('namaWaliKelas', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-nipWali" className="block font-semibold text-slate-700 mb-1">
              NIP / NI PPPK Wali Kelas
            </label>
            <input
              id="meta-nipWali"
              type="text"
              placeholder="Kosongkan jika diisi kemudian"
              value={meta.nipWaliKelas}
              onChange={(e) => handleChange('nipWaliKelas', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono-num text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-kepsek" className="block font-semibold text-slate-700 mb-1">
              Nama Kepala Sekolah
            </label>
            <input
              id="meta-kepsek"
              type="text"
              placeholder="Kosongkan jika diisi kemudian"
              value={meta.namaKepalaSekolah}
              onChange={(e) => handleChange('namaKepalaSekolah', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-nipKepsek" className="block font-semibold text-slate-700 mb-1">
              NIP Kepala Sekolah
            </label>
            <input
              id="meta-nipKepsek"
              type="text"
              placeholder="Kosongkan jika diisi kemudian"
              value={meta.nipKepalaSekolah}
              onChange={(e) => handleChange('nipKepalaSekolah', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono-num text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-alamat" className="block font-semibold text-slate-700 mb-1">
              Alamat Jalan / Desa Sekolah
            </label>
            <input
              id="meta-alamat"
              type="text"
              placeholder="Kosongkan jika diisi kemudian"
              value={meta.alamatSekolah}
              onChange={(e) => handleChange('alamatSekolah', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="meta-kabupaten" className="block font-semibold text-slate-700 mb-1">
              Kabupaten / Kota (Untuk Kop Surat)
            </label>
            <input
              id="meta-kabupaten"
              type="text"
              placeholder="Contoh: Kabupaten Purwakarta / Cianjur / Tegal"
              value={meta.kabupaten}
              onChange={(e) => handleChange('kabupaten', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50 border border-red-200 rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Semua Tabel ke Format Awal</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Simpan & Terapkan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
