import React, { useState } from 'react';
import { DocumentModule, SchoolMeta } from '../types/administrasi';
import { saveAsPdf } from '../utils/pdfGenerator';
import { triggerPrintViaIframe, downloadWordDoc } from '../utils/exportUtils';
import {
  CoverSheetWidget,
  OfficialKopSurat,
  OfficialSignatureBlock,
  OrgChartWidget,
  SeatingChartWidget,
  VerificationAttachmentWidget,
} from './DocumentWidgets';
import {
  Printer,
  Download,
  FileDown,
  X,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  FileText,
  Layers,
} from 'lucide-react';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDoc: DocumentModule;
  allDocs: DocumentModule[];
  meta: SchoolMeta;
  initialScope?: 'single' | 'bundle';
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  activeDoc,
  allDocs,
  meta,
  initialScope = 'single',
}) => {
  const [scope, setScope] = useState<'single' | 'bundle'>(initialScope);
  const [zoom, setZoom] = useState<number>(100);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  if (!isOpen) return null;

  const docsToPreview = scope === 'single' ? [activeDoc] : allDocs;

  const handleSaveAsPdf = () => {
    setIsGeneratingPdf(true);
    setStatusMessage('Menyiapkan dokumen PDF ukuran A4...');
    setTimeout(() => {
      try {
        const filename =
          scope === 'single'
            ? `Perangkat_Wali_Kelas_V_SDN2Bojong_${activeDoc.shortTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`
            : `Bundel_Lengkap_Perangkat_Wali_Kelas_V_SDN_2_Bojong_2026_2027.pdf`;
        saveAsPdf(docsToPreview, meta, filename);
        setStatusMessage(`Berhasil! File "${filename}" telah diunduh ke perangkat Anda.`);
      } catch {
        setStatusMessage('Gagal membuat PDF. Silakan gunakan tombol Dialog Cetak Printer.');
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 80);
  };

  const handleBrowserPrint = () => {
    setStatusMessage('Membuka dialog cetak printer ukuran A4...');
    triggerPrintViaIframe(docsToPreview, meta);
  };

  const handleDownloadWord = () => {
    const filename =
      scope === 'single'
        ? `Perangkat_Wali_Kelas_V_SDN2Bojong_${activeDoc.shortTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.doc`
        : `Bundel_Lengkap_Perangkat_Wali_Kelas_V_SDN_2_Bojong_2026_2027.doc`;
    downloadWordDoc(docsToPreview, meta, filename);
    setStatusMessage(`File Word "${filename}" berhasil diunduh.`);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-slate-900/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-preview-title"
    >
      {/* Top Control Bar */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 lg:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div>
            <h2 id="print-preview-title" className="text-sm font-bold text-white">
              Pratinjau Cetak A4 & Simpan PDF (Print Preview)
            </h2>
            <p className="text-[11px] text-slate-300">
              {scope === 'single'
                ? `${activeDoc.shortTitle} · Kertas ${
                    activeDoc.orientation === 'landscape' ? 'A4 Landscape' : 'A4 Portrait'
                  }`
                : `Bundel Lengkap Seluruh Perangkat (${allDocs.length} Dokumen A4)`}
            </p>
          </div>
        </div>

        {/* Center Controls: Scope + Zoom */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Scope Selector */}
          <div className="flex items-center bg-slate-800 p-1 rounded-md border border-slate-700">
            <button
              type="button"
              onClick={() => {
                setScope('single');
                setStatusMessage(null);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                scope === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lembar Ini (1 Dok)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setScope('bundle');
                setStatusMessage(null);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                scope === 'bundle'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Semua ({allDocs.length} Dok)</span>
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(65, z - 15))}
              className="p-1 text-slate-300 hover:text-white"
              aria-label="Perkecil tampilan"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono-num px-1.5 text-slate-200">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(130, z + 15))}
              className="p-1 text-slate-300 hover:text-white"
              aria-label="Perbesar tampilan"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Primary Actions: Save as PDF, Print Dialog, Word, Close */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveAsPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'Membuat PDF...' : 'Simpan sebagai PDF (.pdf)'}</span>
          </button>

          <button
            type="button"
            onClick={handleBrowserPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Printer</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadWord}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Unduh .doc</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Tutup pratinjau cetak"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Tutup</span>
          </button>
        </div>
      </div>

      {/* Status Notification Bar inside Preview */}
      {statusMessage && (
        <div className="bg-emerald-950/90 border-b border-emerald-700 px-6 py-2 text-xs text-emerald-200 flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            {statusMessage}
          </span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-emerald-300 hover:text-white text-[11px] underline"
          >
            Tutup Info
          </button>
        </div>
      )}

      {/* Scrollable A4 Sheets Preview Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-slate-800/90">
        {docsToPreview.map((doc, pageIdx) => {
          const isLandscape = doc.orientation === 'landscape';
          return (
            <div key={doc.id} className="flex flex-col items-center">
              {/* Page Counter Header above Sheet */}
              <div className="mb-2 flex items-center gap-2 text-xs text-slate-300 font-mono-num">
                <span>
                  Halaman {pageIdx + 1} dari {docsToPreview.length}
                </span>
                <span>·</span>
                <span>{doc.shortTitle}</span>
                <span>·</span>
                <span>{isLandscape ? 'A4 Landscape (297 × 210 mm)' : 'A4 Portrait (210 × 297 mm)'}</span>
              </div>

              {/* Clean Read-Only A4 Paper Sheet */}
              <div
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center',
                }}
                className={`bg-white text-slate-950 shadow-2xl border border-slate-300 transition-transform ${
                  isLandscape
                    ? 'w-full max-w-[297mm] min-h-[210mm] p-[14mm_16mm]'
                    : 'w-full max-w-[210mm] min-h-[297mm] p-[16mm_18mm]'
                }`}
              >
                {doc.customWidget === 'cover' ? (
                  <CoverSheetWidget doc={doc} meta={meta} />
                ) : (
                  <div>
                    <OfficialKopSurat meta={meta} />

                    <div className="text-center mb-5">
                      <p className="text-[11px] font-mono-num uppercase tracking-widest text-slate-600">
                        {doc.docNumber === 'Lampiran'
                          ? 'LAMPIRAN BUKTI FISIK & VERIFIKASI'
                          : `PERANGKAT ADMINISTRASI WALI KELAS · DOKUMEN ${doc.docNumber}`}
                      </p>
                      <h3 className="font-serif-doc text-lg font-bold uppercase text-slate-950 mt-0.5">
                        {doc.title}
                      </h3>
                      <div className="mt-2 py-1.5 px-3 border-y border-slate-400 bg-slate-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-800">
                        <span>
                          Sekolah: <strong>{meta.namaSekolah}</strong>
                        </span>
                        <span>·</span>
                        <span>
                          Jenjang/Kelas: <strong>{meta.jenjang} / Kelas {meta.kelas}</strong>
                        </span>
                        <span>·</span>
                        <span>
                          Fase: <strong>Fase {meta.fase} (Kurikulum Merdeka)</strong>
                        </span>
                        <span>·</span>
                        <span>
                          TP: <strong className="font-mono-num">{meta.tahunPelajaran}</strong>
                        </span>
                        <span>·</span>
                        <span>
                          Wali Kelas: <strong>{meta.namaWaliKelas}</strong>
                        </span>
                      </div>
                    </div>

                    {doc.introText && (
                      <p className="text-xs text-slate-800 leading-relaxed mb-4">{doc.introText}</p>
                    )}

                    {doc.customWidget === 'org_chart' && <OrgChartWidget doc={doc} meta={meta} />}
                    {doc.customWidget === 'seating_chart' && (
                      <SeatingChartWidget doc={doc} meta={meta} />
                    )}

                    <div className="space-y-5">
                      {doc.tables.map((table) => (
                        <div key={table.id}>
                          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-950 mb-1.5">
                            {table.title}
                          </h4>
                          <table className="doc-table">
                            <thead>
                              <tr>
                                {table.columns.map((col) => (
                                  <th
                                    key={col.key}
                                    style={{ width: col.width }}
                                    className={`${
                                      col.align === 'center'
                                        ? 'text-center'
                                        : col.align === 'right'
                                        ? 'text-right'
                                        : 'text-left'
                                    } ${col.isMono ? 'font-mono-num' : ''}`}
                                  >
                                    {col.label}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {table.columns.map((col) => {
                                    const val = row[col.key] ?? '';
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${
                                          col.align === 'center'
                                            ? 'text-center'
                                            : col.align === 'right'
                                            ? 'text-right'
                                            : 'text-left'
                                        } ${col.isMono ? 'font-mono-num tabular-nums' : ''} py-1.5 px-2.5 text-xs`}
                                      >
                                        {val || '\u00A0'}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {table.footerNotes && table.footerNotes.length > 0 && (
                            <div className="mt-1 space-y-0.5">
                              {table.footerNotes.map((note, nIdx) => (
                                <p key={nIdx} className="text-[11px] italic text-slate-600">
                                  {note}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {doc.customWidget === 'verification_attachment' && (
                      <VerificationAttachmentWidget doc={doc} meta={meta} />
                    )}

                    <OfficialSignatureBlock meta={meta} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
