import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DocumentModule, SchoolMeta } from '../types/administrasi';
import {
  TUT_WURI_LOGO_URL,
  GARUT_LOGO_URL,
  formatKecamatanKabupaten,
} from '../components/DocumentWidgets';

let cachedTutWuriDataUrl: string | null = null;
let cachedGarutDataUrl: string | null = null;

async function preloadImageAsPngDataUrl(url: string): Promise<string | null> {
  try {
    return await new Promise<string | null>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 240;
          canvas.height = 240;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(null);
            return;
          }
          ctx.drawImage(img, 0, 0, 240, 240);
          resolve(canvas.toDataURL('image/png'));
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  } catch {
    return null;
  }
}

async function preloadLogos(): Promise<void> {
  if (!cachedTutWuriDataUrl) {
    cachedTutWuriDataUrl = await preloadImageAsPngDataUrl(TUT_WURI_LOGO_URL);
  }
  if (!cachedGarutDataUrl) {
    cachedGarutDataUrl = await preloadImageAsPngDataUrl(GARUT_LOGO_URL);
  }
}

// Kick off background preload immediately in browser
if (typeof window !== 'undefined') {
  preloadLogos();
}

function drawKopSurat(
  pdf: jsPDF,
  meta: SchoolMeta,
  pageWidth: number,
  logoDataUrl: string | null,
  rightLogoDataUrl: string | null
): number {
  const marginX = 15;
  let y = 14;

  // Left Emblem: Logo Tut Wuri Handayani
  if (logoDataUrl) {
    try {
      pdf.addImage(logoDataUrl, 'PNG', marginX + 1, y + 1, 16, 16);
    } catch {
      pdf.setDrawColor(15, 23, 42);
      pdf.setLineWidth(0.5);
      pdf.circle(marginX + 8, y + 8, 7.5, 'S');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6.5);
      pdf.text('TUT WURI', marginX + 8, y + 9, { align: 'center' });
    }
  } else {
    pdf.setDrawColor(15, 23, 42);
    pdf.setLineWidth(0.5);
    pdf.circle(marginX + 8, y + 8, 7.5, 'S');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.text('TUT WURI', marginX + 8, y + 9, { align: 'center' });
  }

  // Right Emblem: Lambang Kabupaten Garut
  if (rightLogoDataUrl) {
    try {
      pdf.addImage(rightLogoDataUrl, 'PNG', pageWidth - marginX - 17, y + 1, 16, 16);
    } catch {
      pdf.setDrawColor(15, 23, 42);
      pdf.setLineWidth(0.5);
      pdf.circle(pageWidth - marginX - 8, y + 8, 7.5, 'S');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6.5);
      pdf.text('GARUT', pageWidth - marginX - 8, y + 9, { align: 'center' });
    }
  } else {
    pdf.setDrawColor(15, 23, 42);
    pdf.setLineWidth(0.5);
    pdf.circle(pageWidth - marginX - 8, y + 8, 7.5, 'S');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.text('GARUT', pageWidth - marginX - 8, y + 9, { align: 'center' });
  }

  // Center Header Text
  const centerX = pageWidth / 2;
  const kabHeader =
    meta.kabupaten && !meta.kabupaten.toLowerCase().startsWith('kabupaten')
      ? `KABUPATEN ${meta.kabupaten.toUpperCase()}`
      : (meta.kabupaten || 'KABUPATEN GARUT').toUpperCase();
  const kecHeader =
    (meta.kecamatan || 'Pameungpeuk').replace(/^Kecamatan\s+/i, '').trim().toUpperCase() ||
    'PAMEUNGPEUK';

  pdf.setFont('times', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`PEMERINTAH DAERAH ${kabHeader}`, centerX, y + 2.5, { align: 'center' });
  pdf.text('DINAS PENDIDIKAN', centerX, y + 6.5, { align: 'center' });

  pdf.setFontSize(13.5);
  pdf.text(meta.namaSekolah.toUpperCase(), centerX, y + 12, { align: 'center' });

  pdf.setFontSize(9.5);
  pdf.text(`KECAMATAN ${kecHeader}`, centerX, y + 16, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(51, 65, 85);
  const addressLine = `Alamat: ${meta.alamatSekolah || 'Desa Bojong'} · ${formatKecamatanKabupaten(meta)}${
    meta.npsn ? ` · NPSN: ${meta.npsn}` : ''
  }`;
  pdf.text(addressLine, centerX, y + 20, { align: 'center' });

  // Double bottom border line
  y += 22.5;
  pdf.setDrawColor(15, 23, 42);
  pdf.setLineWidth(0.8);
  pdf.line(marginX, y, pageWidth - marginX, y);
  pdf.setLineWidth(0.25);
  pdf.line(marginX, y + 1, pageWidth - marginX, y + 1);

  return y + 6;
}

function drawSignatureBlock(
  pdf: jsPDF,
  meta: SchoolMeta,
  startY: number,
  pageWidth: number,
  pageHeight: number
) {
  let y = startY + 8;
  if (y + 38 > pageHeight - 12) {
    pdf.addPage();
    y = 20;
  }

  const leftColX = pageWidth * 0.27;
  const rightColX = pageWidth * 0.73;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(15, 23, 42);

  pdf.text('Mengetahui,', leftColX, y, { align: 'center' });
  pdf.text(meta.tempatTanggalTtd || 'Bojong, ...................... 2026', rightColX, y, {
    align: 'center',
  });

  y += 4.5;
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Kepala ${meta.namaSekolah}`, leftColX, y, { align: 'center' });
  pdf.text(`Wali Kelas ${meta.kelas}`, rightColX, y, { align: 'center' });

  y += 21;
  const ksName = meta.namaKepalaSekolah || '...................................................';
  const wkName = meta.namaWaliKelas || 'Hendra Purnama, S.Pd.';

  pdf.text(ksName, leftColX, y, { align: 'center' });
  pdf.text(wkName, rightColX, y, { align: 'center' });

  // Underline names
  const ksWidth = pdf.getTextWidth(ksName);
  const wkWidth = pdf.getTextWidth(wkName);
  pdf.setLineWidth(0.3);
  pdf.line(leftColX - ksWidth / 2, y + 0.8, leftColX + ksWidth / 2, y + 0.8);
  pdf.line(rightColX - wkWidth / 2, y + 0.8, rightColX + wkWidth / 2, y + 0.8);

  y += 4.5;
  pdf.setFont('courier', 'normal');
  pdf.setFontSize(8.5);
  pdf.text(
    `NIP. ${meta.nipKepalaSekolah || '..........................................'}`,
    leftColX,
    y,
    { align: 'center' }
  );
  pdf.text(
    `NIP. ${meta.nipWaliKelas || '..........................................'}`,
    rightColX,
    y,
    { align: 'center' }
  );
}

function drawCoverPage(pdf: jsPDF, meta: SchoolMeta, logoDataUrl: string | null) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  // Outer & Inner Frame Border
  pdf.setDrawColor(15, 23, 42);
  pdf.setLineWidth(1.0);
  pdf.rect(14, 14, pageWidth - 28, pageHeight - 28);
  pdf.setLineWidth(0.3);
  pdf.rect(16, 16, pageWidth - 32, pageHeight - 32);

  let y = 34;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(51, 65, 85);
  pdf.text('DOKUMEN ADMINISTRASI SATUAN PENDIDIKAN', centerX, y, { align: 'center' });

  y += 9;
  pdf.setFont('times', 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(15, 23, 42);
  pdf.text('PERANGKAT ADMINISTRASI WALI KELAS', centerX, y, { align: 'center' });

  y += 7;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10.5);
  pdf.text('IMPLEMENTASI KURIKULUM MERDEKA — JENJANG SEKOLAH DASAR (SD)', centerX, y, {
    align: 'center',
  });

  y += 6;
  pdf.setLineWidth(0.5);
  pdf.line(centerX - 35, y, centerX + 35, y);

  // Center Emblem Graphic: Logo Tut Wuri Handayani
  y += 26;
  if (logoDataUrl) {
    try {
      pdf.addImage(logoDataUrl, 'PNG', centerX - 18, y - 18, 36, 36);
    } catch {
      pdf.setLineWidth(0.8);
      pdf.circle(centerX, y, 20, 'S');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('TUT WURI HANDAYANI', centerX, y, { align: 'center' });
    }
  } else {
    pdf.setLineWidth(0.8);
    pdf.circle(centerX, y, 20, 'S');
    pdf.setLineWidth(0.3);
    pdf.circle(centerX, y, 17.5, 'S');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('FASE C', centerX, y - 2, { align: 'center' });
    pdf.setFontSize(9.5);
    pdf.text('KELAS V SD', centerX, y + 4, { align: 'center' });
    pdf.setFontSize(7.5);
    pdf.text('TUT WURI HANDAYANI', centerX, y + 9.5, { align: 'center' });
  }

  y += 32;
  pdf.setLineWidth(0.5);
  pdf.line(centerX - 48, y - 6, centerX + 48, y - 6);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(15);
  pdf.text(`KELAS ${meta.kelas.toUpperCase()} — FASE ${meta.fase.toUpperCase()}`, centerX, y, {
    align: 'center',
  });
  y += 6;
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(11);
  pdf.text(`TAHUN PELAJARAN ${meta.tahunPelajaran}`, centerX, y, { align: 'center' });
  pdf.line(centerX - 48, y + 4, centerX + 48, y + 4);

  // Identity Box Table
  y += 16;
  autoTable(pdf, {
    startY: y,
    margin: { left: 32, right: 32 },
    head: [['KOMPONEN IDENTITAS', 'KETERANGAN RESMI']],
    body: [
      ['Nama Satuan Pendidikan', meta.namaSekolah],
      ['Jenjang / Kelas / Fase', `${meta.jenjang} / Kelas ${meta.kelas} / Fase ${meta.fase}`],
      ['Tahun Pelajaran', meta.tahunPelajaran],
      ['Nama Wali Kelas', meta.namaWaliKelas],
      ['NIP / NI PPPK Wali Kelas', meta.nipWaliKelas || '................................................'],
    ],
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 9.5,
      cellPadding: 3.2,
      textColor: [15, 23, 42],
      lineColor: [51, 65, 85],
      lineWidth: 0.25,
    },
    headStyles: {
      fillColor: [241, 245, 249],
      textColor: [15, 23, 42],
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 52, fontStyle: 'bold', fillColor: [248, 250, 252] },
    },
  });

  // Bottom Institutional Footer
  const footerY = pageHeight - 34;
  pdf.setLineWidth(0.3);
  pdf.line(32, footerY - 6, pageWidth - 32, footerY - 6);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(13);
  pdf.setTextColor(15, 23, 42);
  pdf.text(meta.namaSekolah.toUpperCase(), centerX, footerY, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.text(formatKecamatanKabupaten(meta), centerX, footerY + 5.5, { align: 'center' });
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(9.5);
  pdf.text(`TAHUN PELAJARAN ${meta.tahunPelajaran}`, centerX, footerY + 11, { align: 'center' });
}

function drawSeatingChartDiagram(
  pdf: jsPDF,
  doc: DocumentModule,
  meta: SchoolMeta,
  startY: number,
  pageWidth: number
): number {
  const marginX = 15;
  const usableW = pageWidth - marginX * 2;
  let y = startY;

  pdf.setDrawColor(71, 85, 105);
  pdf.setLineWidth(0.3);
  pdf.rect(marginX, y, usableW, 66);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(
    `SKEMA DENAH TEMPAT DUDUK RUANG KELAS ${meta.kelas.toUpperCase()} — ${meta.namaSekolah.toUpperCase()}`,
    pageWidth / 2,
    y + 5,
    { align: 'center' }
  );

  // Front Row: Door, Whiteboard, Teacher Desk
  const frontY = y + 8;
  pdf.setLineWidth(0.25);
  pdf.rect(marginX + 3, frontY, 24, 7);
  pdf.setFontSize(6.5);
  pdf.text('PINTU MASUK', marginX + 15, frontY + 4.5, { align: 'center' });

  pdf.rect(marginX + 30, frontY, usableW - 72, 7);
  pdf.text('PAPAN TULIS (WHITEBOARD) KELAS V', marginX + 30 + (usableW - 72) / 2, frontY + 4.5, {
    align: 'center',
  });

  pdf.rect(pageWidth - marginX - 39, frontY, 36, 7);
  pdf.text('MEJA WALI KELAS', pageWidth - marginX - 21, frontY + 4.5, { align: 'center' });

  // 4x4 Grid of Desks
  const rows = doc.tables[0]?.rows || [];
  const gridStartY = frontY + 9.5;
  const colW = (usableW - 12) / 4;
  const rowH = 9.5;

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const idx = r * 4 + c;
      const desk = rows[idx] || {};
      const dx = marginX + 3 + c * (colW + 2);
      const dy = gridStartY + r * (rowH + 1.5);

      pdf.rect(dx, dy, colW, rowH);
      pdf.setFont('courier', 'bold');
      pdf.setFontSize(6);
      pdf.text(desk.kodeMeja || `Meja ${idx + 1}`, dx + 1.5, dy + 3);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(5.8);
      const kiri = (desk.siswaKiri || '........').slice(0, 14);
      const kanan = (desk.siswaKanan || '........').slice(0, 14);
      pdf.text(`A: ${kiri}`, dx + 1.5, dy + 6);
      pdf.text(`B: ${kanan}`, dx + 1.5, dy + 8.5);
    }
  }

  // Back Row: Pojok Baca, Papan Karya P5, Lemari Arsip
  const backY = gridStartY + 4 * (rowH + 1.5) + 0.5;
  const backW = (usableW - 10) / 3;
  ['POJOK BACA FASE C', 'PAPAN PAJANGAN P5', 'LEMARI ARSIP & UKS'].forEach((label, i) => {
    const bx = marginX + 3 + i * (backW + 2);
    pdf.rect(bx, backY, backW, 5.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6);
    pdf.text(label, bx + backW / 2, backY + 3.8, { align: 'center' });
  });

  return y + 70;
}

export function generatePdfInstance(docs: DocumentModule[], meta: SchoolMeta): jsPDF {
  const firstOrientation = docs[0]?.orientation === 'landscape' ? 'l' : 'p';
  const pdf = new jsPDF({
    orientation: firstOrientation,
    unit: 'mm',
    format: 'a4',
  });

  docs.forEach((doc, docIdx) => {
    const orientation = doc.orientation === 'landscape' ? 'l' : 'p';
    if (docIdx > 0) {
      pdf.addPage('a4', orientation);
    }

    if (doc.customWidget === 'cover') {
      drawCoverPage(pdf, meta, cachedTutWuriDataUrl);
      return;
    }

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 15;

    let currentY = drawKopSurat(
      pdf,
      meta,
      pageWidth,
      cachedTutWuriDataUrl,
      cachedGarutDataUrl
    );

    // Document Title & Metadata
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(71, 85, 105);
    const docBadge =
      doc.docNumber === 'Lampiran'
        ? 'LAMPIRAN BUKTI FISIK & VERIFIKASI'
        : `PERANGKAT ADMINISTRASI WALI KELAS · DOKUMEN ${doc.docNumber}`;
    pdf.text(docBadge, pageWidth / 2, currentY, { align: 'center' });

    currentY += 4.5;
    pdf.setFont('times', 'bold');
    pdf.setFontSize(12.5);
    pdf.setTextColor(15, 23, 42);
    pdf.text(doc.title.toUpperCase(), pageWidth / 2, currentY, { align: 'center' });

    currentY += 3;
    pdf.setDrawColor(203, 213, 225);
    pdf.setFillColor(248, 250, 252);
    pdf.rect(marginX, currentY, pageWidth - marginX * 2, 6, 'FD');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(30, 41, 59);
    const metaStrip = `Sekolah: ${meta.namaSekolah}  |  Jenjang/Kelas: ${meta.jenjang} / Kelas ${meta.kelas} (Fase ${meta.fase})  |  TP: ${meta.tahunPelajaran}  |  Wali Kelas: ${meta.namaWaliKelas}`;
    pdf.text(metaStrip, pageWidth / 2, currentY + 4, { align: 'center' });

    currentY += 9;

    // Intro Text
    if (doc.introText) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(51, 65, 85);
      const splitIntro = pdf.splitTextToSize(doc.introText, pageWidth - marginX * 2);
      pdf.text(splitIntro, marginX, currentY);
      currentY += splitIntro.length * 4 + 2;
    }

    // Optional Seating Chart Diagram
    if (doc.customWidget === 'seating_chart') {
      currentY = drawSeatingChartDiagram(pdf, doc, meta, currentY, pageWidth);
    }

    // Render Tables
    doc.tables.forEach((table) => {
      if (currentY > pageHeight - 35) {
        pdf.addPage('a4', orientation);
        currentY = 16;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
      pdf.text(table.title, marginX, currentY);
      currentY += 2;

      const headRow = table.columns.map((c) => c.label);
      const bodyRows = table.rows.map((r) =>
        table.columns.map((c) => {
          const v = r[c.key];
          return v && v.trim() !== '' ? v : '';
        })
      );

      const columnStyles: Record<number, { halign?: 'left' | 'center' | 'right' }> = {};
      table.columns.forEach((col, cIdx) => {
        columnStyles[cIdx] = { halign: col.align || 'left' };
      });

      autoTable(pdf, {
        startY: currentY,
        margin: { left: marginX, right: marginX },
        head: [headRow],
        body: bodyRows,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 8,
          cellPadding: 2.2,
          textColor: [15, 23, 42],
          lineColor: [71, 85, 105],
          lineWidth: 0.2,
          minCellHeight: 6.5,
        },
        headStyles: {
          fillColor: [241, 245, 249],
          textColor: [15, 23, 42],
          fontStyle: 'bold',
          lineColor: [51, 65, 85],
          lineWidth: 0.25,
        },
        alternateRowStyles: {
          fillColor: [252, 252, 253],
        },
        columnStyles,
      });

      const lastTable = (pdf as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable;
      currentY = (lastTable?.finalY || currentY + 20) + 4;

      if (table.footerNotes && table.footerNotes.length > 0) {
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(7.5);
        pdf.setTextColor(71, 85, 105);
        table.footerNotes.forEach((note) => {
          const splitNote = pdf.splitTextToSize(note, pageWidth - marginX * 2);
          pdf.text(splitNote, marginX, currentY);
          currentY += splitNote.length * 3.5 + 1;
        });
        currentY += 2;
      }
    });

    // If Verification Attachment Widget, add physical evidence frames in PDF
    if (doc.customWidget === 'verification_attachment') {
      if (currentY + 60 > pageHeight - 20) {
        pdf.addPage('a4', orientation);
        currentY = 16;
      }
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
      pdf.text(
        'LEMBAR TEMPEL FOTO DOKUMENTASI & BUKTI FISIK KEGIATAN TERVERIFIKASI',
        marginX,
        currentY
      );
      currentY += 3;

      const boxW = (pageWidth - marginX * 2 - 6) / 2;
      const boxH = 38;
      const titles = [
        'Bukti Fisik 1: Musyawarah & Kesepakatan Kelas V',
        'Bukti Fisik 2: Pembiasaan Literasi & Piket Kelas V',
        'Bukti Fisik 3: Rapat Paguyuban Orang Tua & Rapor',
        'Bukti Fisik 4: Gelar Karya Projek P5 Fase C',
      ];
      for (let i = 0; i < 4; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const bx = marginX + col * (boxW + 6);
        const by = currentY + row * (boxH + 4);
        pdf.setDrawColor(71, 85, 105);
        pdf.setLineWidth(0.25);
        pdf.rect(bx, by, boxW, boxH);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.text(titles[i], bx + 2, by + 4.5);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7);
        pdf.setTextColor(100, 116, 139);
        pdf.text('[ Area Tempel Foto Dokumentasi 3R / 4R Terverifikasi ]', bx + boxW / 2, by + 20, {
          align: 'center',
        });
        pdf.setTextColor(15, 23, 42);
        pdf.text('Status: Diverifikasi Wali Kelas   |   Paraf KS: .............', bx + 2, by + boxH - 2.5);
      }
      currentY += (boxH + 4) * 2 + 2;
    }

    drawSignatureBlock(pdf, meta, currentY, pageWidth, pageHeight);
  });

  return pdf;
}

export async function saveAsPdf(docs: DocumentModule[], meta: SchoolMeta, filename: string) {
  if (!cachedTutWuriDataUrl || !cachedGarutDataUrl) {
    await preloadLogos();
  }
  const pdf = generatePdfInstance(docs, meta);
  const cleanName = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  pdf.save(cleanName);
}
