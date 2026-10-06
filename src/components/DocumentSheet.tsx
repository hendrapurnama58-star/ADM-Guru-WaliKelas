import React from 'react';
import { DocumentModule, SchoolMeta } from '../types/administrasi';
import {
  CoverSheetWidget,
  OfficialKopSurat,
  OfficialSignatureBlock,
  OrgChartWidget,
  SeatingChartWidget,
  VerificationAttachmentWidget,
} from './DocumentWidgets';
import { Plus, Minus } from 'lucide-react';

interface DocumentSheetProps {
  doc: DocumentModule;
  meta: SchoolMeta;
  onUpdateCell: (docId: string, tableId: string, rowIndex: number, colKey: string, value: string) => void;
  onAddRow: (docId: string, tableId: string) => void;
  onRemoveLastRow: (docId: string, tableId: string) => void;
}

export const DocumentSheet: React.FC<DocumentSheetProps> = ({
  doc,
  meta,
  onUpdateCell,
  onAddRow,
  onRemoveLastRow,
}) => {
  if (doc.customWidget === 'cover') {
    return (
      <article className="a4-sheet page-break-after" aria-label={doc.title}>
        <CoverSheetWidget doc={doc} meta={meta} />
      </article>
    );
  }

  const sheetClass = doc.orientation === 'landscape' ? 'a4-sheet-landscape' : 'a4-sheet';

  return (
    <article className={`${sheetClass} page-break-after`} aria-label={doc.title}>
      {/* Official School Letterhead (Kop Surat) */}
      <OfficialKopSurat meta={meta} />

      {/* Document Title & Metadata Strip */}
      <div className="text-center mb-5">
        <p className="text-[11px] font-mono-num uppercase tracking-widest text-slate-600">
          {doc.docNumber === 'Lampiran'
            ? 'LAMPIRAN BUKTI FISIK & VERIFIKASI'
            : `PERANGKAT ADMINISTRASI WALI KELAS · DOKUMEN ${doc.docNumber}`}
        </p>
        <h1
          className="font-serif-doc text-lg sm:text-xl font-bold uppercase text-slate-950 mt-0.5"
          style={{ textWrap: 'balance' }}
        >
          {doc.title}
        </h1>
        <div className="mt-2 py-1.5 px-3 border-y border-slate-300 bg-slate-50/70 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700">
          <span>
            Sekolah: <strong className="text-slate-950">{meta.namaSekolah}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Jenjang/Kelas: <strong className="text-slate-950">{meta.jenjang} / Kelas {meta.kelas}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Fase: <strong className="text-slate-950">Fase {meta.fase} (Kurikulum Merdeka)</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            TP: <strong className="font-mono-num text-slate-950">{meta.tahunPelajaran}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Wali Kelas: <strong className="text-slate-950">{meta.namaWaliKelas}</strong>
          </span>
        </div>
      </div>

      {/* Introductory Paragraph */}
      {doc.introText && (
        <p className="text-xs text-slate-700 leading-relaxed mb-4">{doc.introText}</p>
      )}

      {/* Optional Custom Visual Diagram before tables */}
      {doc.customWidget === 'org_chart' && <OrgChartWidget doc={doc} meta={meta} />}
      {doc.customWidget === 'seating_chart' && <SeatingChartWidget doc={doc} meta={meta} />}

      {/* Structured Editable Tables */}
      <div className="space-y-6">
        {doc.tables.map((table) => (
          <div key={table.id} className="break-inside-avoid-page">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wide text-slate-900">
                {table.title}
              </h2>
              <div className="no-print flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onAddRow(doc.id, table.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors whitespace-nowrap"
                  aria-label={`Tambah baris pada ${table.title}`}
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah Baris</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveLastRow(doc.id, table.id)}
                  disabled={table.rows.length <= 1}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-slate-300 rounded transition-colors whitespace-nowrap"
                  aria-label={`Hapus baris terakhir pada ${table.title}`}
                >
                  <Minus className="w-3 h-3" />
                  <span>Hapus Baris</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
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
                  {table.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-blue-50/30 transition-colors">
                      {table.columns.map((col) => {
                        const cellVal = row[col.key] ?? '';
                        return (
                          <td
                            key={col.key}
                            className={`${
                              col.align === 'center'
                                ? 'text-center'
                                : col.align === 'right'
                                ? 'text-right'
                                : 'text-left'
                            } ${col.isMono ? 'font-mono-num tabular-nums' : ''} p-0`}
                          >
                            <input
                              type="text"
                              value={cellVal}
                              placeholder="..."
                              aria-label={`${table.title} baris ${rowIdx + 1} kolom ${col.label}`}
                              onChange={(e) =>
                                onUpdateCell(doc.id, table.id, rowIdx, col.key, e.target.value)
                              }
                              className={`w-full bg-transparent px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-300 focus:outline-none focus:bg-blue-50/80 focus:ring-1 focus:ring-blue-600 ${
                                col.align === 'center'
                                  ? 'text-center'
                                  : col.align === 'right'
                                  ? 'text-right'
                                  : 'text-left'
                              } ${col.isMono ? 'font-mono-num tabular-nums' : ''}`}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {table.footerNotes && table.footerNotes.length > 0 && (
              <div className="mt-1.5 space-y-0.5">
                {table.footerNotes.map((note, idx) => (
                  <p key={idx} className="text-[11px] italic text-slate-600">
                    {note}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Optional Verification Attachment Widget after tables */}
      {doc.customWidget === 'verification_attachment' && (
        <VerificationAttachmentWidget doc={doc} meta={meta} />
      )}

      {/* Official Signature Block */}
      <OfficialSignatureBlock meta={meta} />
    </article>
  );
};
