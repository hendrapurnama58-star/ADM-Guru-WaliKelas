import React, { useState, useEffect, useMemo } from 'react';
import {
  ALL_INITIAL_DOCUMENTS,
  INITIAL_SCHOOL_META,
  SECTION_GROUPS,
} from './data/initialDocuments';
import { DocumentModule, SchoolMeta, SectionGroupId } from './types/administrasi';
import { DocumentSheet } from './components/DocumentSheet';
import { SchoolMetaModal } from './components/SchoolMetaModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { copyDocumentToClipboard, downloadWordDoc } from './utils/exportUtils';
import { saveAsPdf } from './utils/pdfGenerator';
import {
  Printer,
  Copy,
  FileDown,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Settings,
  Layers,
  FileText,
  Check,
  Menu,
  X,
} from 'lucide-react';

const STORAGE_KEY_DOCS = 'wali_kelas_v_sdn2bojong_docs_v2';
const STORAGE_KEY_META = 'wali_kelas_v_sdn2bojong_meta_v2';

export default function App() {
  const [meta, setMeta] = useState<SchoolMeta>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_META);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SCHOOL_META,
          ...parsed,
          kecamatan:
            !parsed.kecamatan || parsed.kecamatan.toLowerCase() === 'bojong'
              ? 'Pameungpeuk'
              : parsed.kecamatan,
          kabupaten:
            !parsed.kabupaten || parsed.kabupaten.toLowerCase() === 'garut'
              ? 'Kabupaten Garut'
              : parsed.kabupaten,
        };
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_SCHOOL_META;
  });

  const [documents, setDocuments] = useState<DocumentModule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DOCS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === ALL_INITIAL_DOCUMENTS.length) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return ALL_INITIAL_DOCUMENTS;
  });

  const [activeDocId, setActiveDocId] = useState<string>('doc-00-cover');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [navMode, setNavMode] = useState<'systematic' | 'numeric'>('systematic');
  const [viewMode, setViewMode] = useState<'single' | 'bundle'>('single');
  const [isMetaModalOpen, setIsMetaModalOpen] = useState<boolean>(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_META, JSON.stringify(meta));
    } catch {
      // ignore
    }
  }, [meta]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(documents));
    } catch {
      // ignore
    }
  }, [documents]);

  const activeDoc = useMemo(
    () => documents.find((d) => d.id === activeDocId) || documents[0],
    [documents, activeDocId]
  );

  const activeGroup = useMemo(
    () => SECTION_GROUPS.find((g) => g.id === activeDoc.groupId) || SECTION_GROUPS[0],
    [activeDoc]
  );

  // Ordered list of documents according to navMode
  const orderedDocuments = useMemo(() => {
    if (navMode === 'systematic') {
      return documents;
    }
    // Numeric order: Cover, 01..29, Lampiran
    return [...documents].sort((a, b) => {
      const getOrderVal = (numStr: string) => {
        if (numStr === 'Cover') return 0;
        if (numStr === 'Lampiran') return 999;
        return parseInt(numStr, 10) || 500;
      };
      return getOrderVal(a.docNumber) - getOrderVal(b.docNumber);
    });
  }, [documents, navMode]);

  const filteredDocuments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return orderedDocuments;
    return orderedDocuments.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.shortTitle.toLowerCase().includes(q) ||
        d.docNumber.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }, [orderedDocuments, searchQuery]);

  const currentDocIndex = useMemo(
    () => orderedDocuments.findIndex((d) => d.id === activeDoc.id),
    [orderedDocuments, activeDoc.id]
  );

  const handlePrevDoc = () => {
    if (currentDocIndex > 0) {
      setActiveDocId(orderedDocuments[currentDocIndex - 1].id);
      setViewMode('single');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextDoc = () => {
    if (currentDocIndex < orderedDocuments.length - 1) {
      setActiveDocId(orderedDocuments[currentDocIndex + 1].id);
      setViewMode('single');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectGroup = (groupId: SectionGroupId) => {
    const firstInGroup = documents.find((d) => d.groupId === groupId);
    if (firstInGroup) {
      setActiveDocId(firstInGroup.id);
      setViewMode('single');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateCell = (
    docId: string,
    tableId: string,
    rowIndex: number,
    colKey: string,
    value: string
  ) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== docId) return doc;
        return {
          ...doc,
          tables: doc.tables.map((t) => {
            if (t.id !== tableId) return t;
            const nextRows = [...t.rows];
            nextRows[rowIndex] = { ...nextRows[rowIndex], [colKey]: value };
            return { ...t, rows: nextRows };
          }),
        };
      })
    );
  };

  const handleAddRow = (docId: string, tableId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== docId) return doc;
        return {
          ...doc,
          tables: doc.tables.map((t) => {
            if (t.id !== tableId) return t;
            const newRow: Record<string, string> = {};
            t.columns.forEach((col) => {
              if (col.key === 'no') {
                newRow[col.key] = String(t.rows.length + 1);
              } else if (col.key === 'kodeMeja') {
                newRow[col.key] = `Meja ${String(t.rows.length + 1).padStart(2, '0')}`;
              } else {
                newRow[col.key] = '';
              }
            });
            return { ...t, rows: [...t.rows, newRow] };
          }),
        };
      })
    );
  };

  const handleRemoveLastRow = (docId: string, tableId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== docId) return doc;
        return {
          ...doc,
          tables: doc.tables.map((t) => {
            if (t.id !== tableId || t.rows.length <= 1) return t;
            return { ...t, rows: t.rows.slice(0, -1) };
          }),
        };
      })
    );
  };

  const handleCopyActiveToWord = async () => {
    const ok = await copyDocumentToClipboard(activeDoc, meta);
    if (ok) {
      setCopyFeedback('Tersalin! Siap ditempel (Ctrl+V) ke Word / Canva.');
      setTimeout(() => setCopyFeedback(null), 3500);
    }
  };

  const handleDownloadActiveWord = () => {
    const safeTitle = activeDoc.shortTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
    downloadWordDoc([activeDoc], meta, `Perangkat_Kelas5_SDN2Bojong_${safeTitle}.doc`);
  };

  const handleDownloadBundleWord = () => {
    downloadWordDoc(
      documents,
      meta,
      `Bundel_Lengkap_Perangkat_Wali_Kelas_V_SDN_2_Bojong_2026_2027.doc`
    );
  };

  const handleSaveActivePdf = () => {
    const safeTitle = activeDoc.shortTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Perangkat_Wali_Kelas_V_SDN2Bojong_${safeTitle}.pdf`;
    saveAsPdf([activeDoc], meta, filename);
    setCopyFeedback(`File PDF "${filename}" berhasil diunduh!`);
    setTimeout(() => setCopyFeedback(null), 4000);
  };

  const handleSaveBundlePdf = () => {
    const filename = `Bundel_Lengkap_Perangkat_Wali_Kelas_V_SDN_2_Bojong_2026_2027.pdf`;
    saveAsPdf(documents, meta, filename);
    setCopyFeedback(`Bundel PDF Lengkap (31 Dokumen A4) berhasil diunduh!`);
    setTimeout(() => setCopyFeedback(null), 4000);
  };

  const handlePrint = () => {
    setIsPrintPreviewOpen(true);
  };

  const handleResetAll = () => {
    setDocuments(ALL_INITIAL_DOCUMENTS);
    setMeta(INITIAL_SCHOOL_META);
    localStorage.removeItem(STORAGE_KEY_DOCS);
    localStorage.removeItem(STORAGE_KEY_META);
    setIsMetaModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* =====================================================================
          TOP BAR CONTRACT: Strict 1-Row, 3-Zone Header (Hidden in Print)
         ===================================================================== */}
      <header className="no-print sticky top-0 z-30 h-14 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveDocId('doc-00-cover');
            setViewMode('single');
          }}
          className="font-serif-doc text-lg font-bold tracking-tight text-slate-950 whitespace-nowrap shrink-0"
        >
          SDN 2 Bojong
        </a>

        {/* Zone 2: 4 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => {
              setNavMode('systematic');
              setViewMode('single');
            }}
            className={`py-1 transition-colors whitespace-nowrap ${
              navMode === 'systematic' && viewMode === 'single'
                ? 'text-blue-700 font-semibold underline underline-offset-4'
                : 'hover:text-slate-950'
            }`}
          >
            Alur Sistematis
          </button>
          <button
            type="button"
            onClick={() => {
              setNavMode('numeric');
              setViewMode('single');
            }}
            className={`py-1 transition-colors whitespace-nowrap ${
              navMode === 'numeric' && viewMode === 'single'
                ? 'text-blue-700 font-semibold underline underline-offset-4'
                : 'hover:text-slate-950'
            }`}
          >
            Indeks 29 Dokumen
          </button>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'bundle' ? 'single' : 'bundle')}
            className={`py-1 transition-colors whitespace-nowrap ${
              viewMode === 'bundle'
                ? 'text-blue-700 font-semibold underline underline-offset-4'
                : 'hover:text-slate-950'
            }`}
          >
            Bundel Lengkap A4
          </button>
          <button
            type="button"
            onClick={() => setIsMetaModalOpen(true)}
            className="py-1 hover:text-slate-950 transition-colors whitespace-nowrap"
          >
            Identitas & Kop
          </button>
        </nav>

        {/* Zone 3: 2 Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md"
            aria-label="Buka daftar dokumen"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={handleCopyActiveToWord}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            {copyFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tersalin ke Word</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Word/Canva</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak A4</span>
          </button>
        </div>
      </header>

      {/* =====================================================================
          MAIN WORKSPACE CANVAS: Sidebar + Document Viewport
         ===================================================================== */}
      <div className="flex-1 flex relative">
        {/* Left Navigation Sidebar (Hidden on Print) */}
        <aside
          aria-label="Daftar Perangkat Administrasi Wali Kelas"
          className={`no-print w-76 shrink-0 bg-white border-r border-slate-200 flex flex-col fixed lg:sticky top-14 h-[calc(100vh-3.5rem)] z-20 transition-transform duration-150 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Wali Kelas Identity Summary Banner */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/70">
            <div className="text-xs font-bold text-slate-900">
              Perangkat Wali Kelas {meta.kelas} (Fase {meta.fase})
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] text-slate-600">
              <span>{meta.namaWaliKelas}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">TP {meta.tahunPelajaran}</span>
            </div>

            {/* Search Filter */}
            <div className="mt-3 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dari 29 perangkat..."
                aria-label="Cari dokumen perangkat wali kelas"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Segmented Control: Urutan Sistematis vs Nomor 01-29 */}
            <div className="mt-2.5 grid grid-cols-2 gap-1 p-1 bg-slate-200/70 rounded-md">
              <button
                type="button"
                onClick={() => setNavMode('systematic')}
                className={`py-1 px-2 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                  navMode === 'systematic'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Urutan Bab (9 Tahap)
              </button>
              <button
                type="button"
                onClick={() => setNavMode('numeric')}
                className={`py-1 px-2 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                  navMode === 'numeric'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Nomor Urut (01–29)
              </button>
            </div>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {navMode === 'systematic' && !searchQuery ? (
              SECTION_GROUPS.map((group) => {
                const groupDocs = documents.filter((d) => d.groupId === group.id);
                return (
                  <div key={group.id}>
                    <div className="px-2 mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800">
                        {group.stepNumber}. {group.label}
                      </span>
                      <span className="text-[10px] font-mono-num text-slate-500">
                        {groupDocs.length} dok
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {groupDocs.map((doc) => {
                        const isActive = doc.id === activeDoc.id && viewMode === 'single';
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() => {
                              setActiveDocId(doc.id);
                              setViewMode('single');
                              setIsMobileSidebarOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between gap-2 transition-colors ${
                              isActive
                                ? 'bg-blue-700 text-white font-semibold'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="truncate">{doc.shortTitle}</span>
                            <span
                              className={`text-[10px] font-mono-num shrink-0 ${
                                isActive ? 'text-blue-100' : 'text-slate-400'
                              }`}
                            >
                              {doc.orientation === 'landscape' ? 'A4-L' : 'A4'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="space-y-1">
                {filteredDocuments.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    Tidak ada dokumen yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  filteredDocuments.map((doc) => {
                    const isActive = doc.id === activeDoc.id && viewMode === 'single';
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => {
                          setActiveDocId(doc.id);
                          setViewMode('single');
                          setIsMobileSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-md text-xs flex items-center justify-between gap-2 transition-colors ${
                          isActive
                            ? 'bg-blue-700 text-white font-semibold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{doc.shortTitle}</span>
                        <span
                          className={`text-[10px] font-mono-num shrink-0 ${
                            isActive ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          {doc.docNumber}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Sidebar Bottom Action: Download Full PDF & Word Bundle */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-1.5">
            <button
              type="button"
              onClick={handleSaveBundlePdf}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Simpan Bundel PDF (.pdf)</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadBundleWord}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors whitespace-nowrap"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-700" />
              <span>Unduh Bundel Word (.doc)</span>
            </button>
          </div>
        </aside>

        {/* Main Document Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Sequence Stepper Bar (Cover -> Identitas -> Administrasi Kelas -> ... -> Laporan) */}
          <div className="no-print max-w-[297mm] mx-auto mb-5 bg-white border border-slate-200 rounded-lg p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-900">
                  Urutan Perangkat Kurikulum Merdeka:
                </span>
                <span>
                  Tahap {activeGroup.stepNumber} dari 09 ({activeGroup.label})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMetaModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Ubah Data Sekolah / NIP</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveActivePdf}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Simpan PDF (.pdf)</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadActiveWord}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded transition-colors whitespace-nowrap"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Unduh Word (.doc)</span>
                </button>
              </div>
            </div>

            {/* 9-Stage Horizontal Stepper */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {SECTION_GROUPS.map((grp, idx) => {
                const isCurrentGroup = grp.id === activeDoc.groupId && viewMode === 'single';
                return (
                  <React.Fragment key={grp.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectGroup(grp.id)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        isCurrentGroup
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {grp.stepNumber}. {grp.label}
                    </button>
                    {idx < SECTION_GROUPS.length - 1 && (
                      <span className="text-slate-300 text-xs select-none" aria-hidden="true">
                        →
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Active Document Action Bar */}
          <div className="no-print max-w-[297mm] mx-auto mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{activeGroup.label}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">
                  Lembar {currentDocIndex + 1} dari {orderedDocuments.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Ukuran Cetak: {activeDoc.orientation === 'landscape' ? 'A4 Landscape' : 'A4 Portrait'}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {viewMode === 'bundle'
                  ? 'Pratinjau Bundel Lengkap Seluruh Perangkat Wali Kelas V (31 Lembar A4)'
                  : activeDoc.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'single' ? 'bundle' : 'single')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors whitespace-nowrap"
              >
                {viewMode === 'single' ? (
                  <>
                    <Layers className="w-3.5 h-3.5 text-blue-700" />
                    <span>Tampilkan Semua (31 Lembar)</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5 text-blue-700" />
                    <span>Tampilkan Per Lembar</span>
                  </>
                )}
              </button>

              {viewMode === 'single' && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrevDoc}
                    disabled={currentDocIndex <= 0}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 border border-slate-300 rounded-md transition-colors whitespace-nowrap"
                    aria-label="Dokumen sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextDoc}
                    disabled={currentDocIndex >= orderedDocuments.length - 1}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 border border-slate-300 rounded-md transition-colors whitespace-nowrap"
                    aria-label="Dokumen berikutnya"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Copy Toast Banner */}
          {copyFeedback && (
            <div
              role="status"
              className="no-print max-w-[210mm] mx-auto mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-md text-xs font-medium flex items-center justify-between"
            >
              <span>{copyFeedback}</span>
              <button
                type="button"
                onClick={() => setCopyFeedback(null)}
                className="text-emerald-700 hover:text-emerald-950 font-bold"
              >
                Tutup
              </button>
            </div>
          )}

          {/* A4 Document Sheet(s) */}
          {viewMode === 'single' ? (
            <DocumentSheet
              doc={activeDoc}
              meta={meta}
              onUpdateCell={handleUpdateCell}
              onAddRow={handleAddRow}
              onRemoveLastRow={handleRemoveLastRow}
            />
          ) : (
            <div className="space-y-8">
              {documents.map((doc) => (
                <DocumentSheet
                  key={doc.id}
                  doc={doc}
                  meta={meta}
                  onUpdateCell={handleUpdateCell}
                  onAddRow={handleAddRow}
                  onRemoveLastRow={handleRemoveLastRow}
                />
              ))}
            </div>
          )}

          {/* Quiet Footer (Hidden in Print) */}
          <footer className="no-print max-w-[210mm] mx-auto mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Perangkat Administrasi Wali Kelas V (Fase C) · {meta.namaSekolah} · TP {meta.tahunPelajaran}
            </span>
            <span>Wali Kelas: {meta.namaWaliKelas}</span>
          </footer>
        </main>
      </div>

      {/* School Metadata Settings Modal */}
      <SchoolMetaModal
        isOpen={isMetaModalOpen}
        meta={meta}
        onClose={() => setIsMetaModalOpen(false)}
        onUpdateMeta={setMeta}
        onResetAll={handleResetAll}
      />

      {/* Print Preview & Save as PDF Modal */}
      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        activeDoc={activeDoc}
        allDocs={documents}
        meta={meta}
        initialScope={viewMode}
      />
    </div>
  );
}
