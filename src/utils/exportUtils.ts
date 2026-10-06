import { DocumentModule, SchoolMeta } from '../types/administrasi';
import {
  TUT_WURI_LOGO_URL,
  GARUT_LOGO_URL,
  formatKecamatanKabupaten,
} from '../components/DocumentWidgets';

export function buildDocumentHtml(doc: DocumentModule, meta: SchoolMeta): string {
  const kabHeader =
    meta.kabupaten && !meta.kabupaten.toLowerCase().startsWith('kabupaten')
      ? `KABUPATEN ${meta.kabupaten.toUpperCase()}`
      : (meta.kabupaten || 'KABUPATEN GARUT').toUpperCase();

  const kopHtml =
    doc.customWidget === 'cover'
      ? ''
      : `
    <table border="0" cellspacing="0" cellpadding="4" style="width: 100%; border-bottom: 3px double #0f172a; padding-bottom: 8px; margin-bottom: 16px; font-family: 'Times New Roman', Georgia, serif; border-collapse: collapse;">
      <tr>
        <td style="width: 72px; text-align: center; vertical-align: middle; border: none;">
          <img src="${TUT_WURI_LOGO_URL}" alt="Logo Tut Wuri Handayani" width="58" height="58" style="width: 58px; height: 58px; object-fit: contain;" />
        </td>
        <td style="text-align: center; vertical-align: middle; border: none;">
          <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
            PEMERINTAH DAERAH ${kabHeader}
          </div>
          <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">
            DINAS PENDIDIKAN
          </div>
          <div style="font-size: 15pt; font-weight: bold; text-transform: uppercase; margin: 2px 0 1px 0;">
            ${meta.namaSekolah}
          </div>
          <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; margin-bottom: 2px;">
            KECAMATAN ${(meta.kecamatan || 'Pameungpeuk').replace(/^Kecamatan\s+/i, '').trim() || 'Pameungpeuk'}
          </div>
          <div style="font-size: 9.5pt; color: #334155;">
            Alamat: ${meta.alamatSekolah || 'Desa Bojong'} · ${formatKecamatanKabupaten(meta)}${meta.npsn ? ` · NPSN: ${meta.npsn}` : ''}
          </div>
        </td>
        <td style="width: 72px; text-align: center; vertical-align: middle; border: none;">
          <img src="${GARUT_LOGO_URL}" alt="Lambang Kabupaten Garut" width="58" height="58" style="width: 58px; height: 58px; object-fit: contain;" />
        </td>
      </tr>
    </table>
  `;

  if (doc.customWidget === 'cover') {
    return `
      <div style="text-align:center; padding: 36px 20px; border: 2px solid #0f172a; font-family: 'Times New Roman', Georgia, serif;">
        <div style="font-size: 13pt; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
          PERANGKAT ADMINISTRASI WALI KELAS
        </div>
        <div style="font-size: 11pt; margin-top: 4px; text-transform: uppercase;">
          IMPLEMENTASI KURIKULUM MERDEKA
        </div>
        <hr style="margin: 18px auto; width: 60%; border: 1px solid #0f172a;" />
        <div style="margin: 22px auto;">
          <img src="${TUT_WURI_LOGO_URL}" alt="Logo Tut Wuri Handayani" width="120" height="120" style="width: 120px; height: 120px; object-fit: contain;" />
        </div>
        <div style="font-size: 18pt; font-weight: bold; margin: 18px 0 6px 0;">
          JENJANG ${meta.jenjang} — KELAS ${meta.kelas} (FASE ${meta.fase})
        </div>
        <div style="font-size: 13pt; font-weight: bold; margin-bottom: 28px;">
          TAHUN PELAJARAN ${meta.tahunPelajaran}
        </div>
        <table border="1" cellspacing="0" cellpadding="8" style="width: 80%; margin: 24px auto; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 10.5pt;">
          <tr>
            <td style="width: 38%; font-weight: bold; background: #f1f5f9;">Satuan Pendidikan</td>
            <td>${meta.namaSekolah}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f1f5f9;">Jenjang / Kelas / Fase</td>
            <td>${meta.jenjang} / Kelas ${meta.kelas} / Fase ${meta.fase}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f1f5f9;">Tahun Pelajaran</td>
            <td>${meta.tahunPelajaran}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f1f5f9;">Nama Wali Kelas</td>
            <td><strong>${meta.namaWaliKelas}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f1f5f9;">NIP Wali Kelas</td>
            <td>${meta.nipWaliKelas || '........................................'}</td>
          </tr>
        </table>
        <div style="margin-top: 36px; font-size: 12pt; font-weight: bold; text-transform: uppercase;">
          ${meta.namaSekolah}<br/>
          <span style="font-size: 10.5pt; font-weight: normal; text-transform: none;">${formatKecamatanKabupaten(meta)}</span><br/>
          TAHUN PELAJARAN ${meta.tahunPelajaran}
        </div>
      </div>
    `;
  }

  const metaStripHtml = `
    <div style="text-align:center; margin-bottom: 14px; font-family: Arial, sans-serif;">
      <div style="font-size: 12.5pt; font-weight: bold; text-transform: uppercase; color: #0f172a;">
        ${doc.docNumber !== 'Lampiran' ? `DOKUMEN ${doc.docNumber} — ` : ''}${doc.title.toUpperCase()}
      </div>
      <div style="font-size: 9.5pt; color: #334155; margin-top: 3px;">
        Satuan Pendidikan: <strong>${meta.namaSekolah}</strong> | Jenjang: <strong>${meta.jenjang}</strong> | Kelas/Fase: <strong>${meta.kelas} (Fase ${meta.fase})</strong> | TP: <strong>${meta.tahunPelajaran}</strong>
      </div>
    </div>
  `;

  const introHtml = doc.introText
    ? `<p style="font-family: Arial, sans-serif; font-size: 10pt; color: #1e293b; margin-bottom: 12px; line-height: 1.5;">${doc.introText}</p>`
    : '';

  const tablesHtml = doc.tables
    .map((table) => {
      const headers = table.columns
        .map(
          (col) =>
            `<th style="border: 1px solid #334155; background-color: #f1f5f9; padding: 6px 8px; font-size: 9.5pt; text-align: ${
              col.align || 'left'
            };">${col.label}</th>`
        )
        .join('');

      const rows = table.rows
        .map((row) => {
          const cells = table.columns
            .map((col) => {
              const val = row[col.key] ?? '';
              return `<td style="border: 1px solid #334155; padding: 6px 8px; font-size: 9.5pt; text-align: ${
                col.align || 'left'
              }; min-height: 18px;">${val || '&nbsp;'}</td>`;
            })
            .join('');
          return `<tr>${cells}</tr>`;
        })
        .join('');

      const notes =
        table.footerNotes && table.footerNotes.length > 0
          ? `<div style="font-size: 8.5pt; color: #475569; margin-top: 5px; font-style: italic;">${table.footerNotes.join('<br/>')}</div>`
          : '';

      return `
        <div style="margin-bottom: 16px; font-family: Arial, sans-serif;">
          <div style="font-size: 10pt; font-weight: bold; margin-bottom: 6px; color: #0f172a;">${table.title}</div>
          <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; border-collapse: collapse; border: 1px solid #334155;">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
          ${notes}
        </div>
      `;
    })
    .join('');

  const signatureHtml = `
    <table border="0" style="width: 100%; margin-top: 28px; font-family: Arial, sans-serif; font-size: 10pt; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; text-align: center; vertical-align: top;">
          Mengetahui,<br/>
          Kepala ${meta.namaSekolah}<br/><br/><br/><br/>
          <strong><u>${meta.namaKepalaSekolah || '...................................................'}</u></strong><br/>
          NIP. ${meta.nipKepalaSekolah || '..........................................'}
        </td>
        <td style="width: 50%; text-align: center; vertical-align: top;">
          ${meta.tempatTanggalTtd || 'Bojong, ...................... 2026'}<br/>
          Wali Kelas ${meta.kelas}<br/><br/><br/><br/>
          <strong><u>${meta.namaWaliKelas}</u></strong><br/>
          NIP. ${meta.nipWaliKelas || '..........................................'}
        </td>
      </tr>
    </table>
  `;

  return `
    <div style="background: #ffffff; color: #000000; padding: 10px;">
      ${kopHtml}
      ${metaStripHtml}
      ${introHtml}
      ${tablesHtml}
      ${signatureHtml}
    </div>
  `;
}

export async function copyDocumentToClipboard(doc: DocumentModule, meta: SchoolMeta): Promise<boolean> {
  const htmlContent = buildDocumentHtml(doc, meta);

  // Build plain text representation for Canva/Notepad fallback
  const lines: string[] = [];
  lines.push(`${meta.namaSekolah.toUpperCase()} — PERANGKAT WALI KELAS ${meta.kelas} (FASE ${meta.fase})`);
  lines.push(`Tahun Pelajaran: ${meta.tahunPelajaran} | Wali Kelas: ${meta.namaWaliKelas}`);
  lines.push(`====================================================================`);
  lines.push(`${doc.docNumber !== 'Cover' ? `[${doc.docNumber}] ` : ''}${doc.title}`);
  if (doc.introText) lines.push(doc.introText);
  lines.push('');

  doc.tables.forEach((t) => {
    lines.push(t.title);
    lines.push(t.columns.map((c) => c.label).join('\t'));
    t.rows.forEach((r) => {
      lines.push(t.columns.map((c) => r[c.key] || '........').join('\t'));
    });
    lines.push('');
  });

  lines.push(`Mengetahui Kepala ${meta.namaSekolah}: ${meta.namaKepalaSekolah || '...........................'}`);
  lines.push(`Wali Kelas ${meta.kelas}: ${meta.namaWaliKelas}`);

  const plainText = lines.join('\n');

  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
      const textBlob = new Blob([plainText], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        }),
      ]);
      return true;
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(plainText);
      return true;
    }
  } catch {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(plainText);
      return true;
    }
  }
  return false;
}

export function downloadWordDoc(docs: DocumentModule[], meta: SchoolMeta, filename: string) {
  const sectionsHtml = docs
    .map(
      (doc, idx) => `
      <div class="doc-section">
        ${buildDocumentHtml(doc, meta)}
      </div>
      ${idx < docs.length - 1 ? '<br clear="all" style="page-break-before:always; mso-break-type:section-break" />' : ''}
    `
    )
    .join('\n');

  const fullWordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Perangkat Wali Kelas V - ${meta.namaSekolah}</title>
      <style>
        @page Section1 {
          size: 21.0cm 29.7cm;
          margin: 1.5cm 1.8cm 1.5cm 1.8cm;
          mso-header-margin: 1.0cm;
          mso-footer-margin: 1.0cm;
        }
        div.Section1 { page: Section1; }
        body { font-family: Arial, sans-serif; font-size: 10pt; color: #000000; }
        table { border-collapse: collapse; width: 100%; }
      </style>
    </head>
    <body>
      <div class="Section1">
        ${sectionsHtml}
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', fullWordHtml], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function triggerPrintViaIframe(docs: DocumentModule[], meta: SchoolMeta) {
  const isLandscape = docs.length === 1 && docs[0]?.orientation === 'landscape';
  const sectionsHtml = docs
    .map(
      (doc, idx) => `
      <div class="print-page ${doc.orientation === 'landscape' ? 'landscape-page' : 'portrait-page'}" style="${
        idx < docs.length - 1 ? 'page-break-after: always; break-after: page;' : ''
      }">
        ${buildDocumentHtml(doc, meta)}
      </div>
    `
    )
    .join('\n');

  const printHtml = `
    <!doctype html>
    <html lang="id">
    <head>
      <meta charset="utf-8" />
      <title>Cetak A4 - Perangkat Wali Kelas V - ${meta.namaSekolah}</title>
      <style>
        @page {
          size: A4 ${isLandscape ? 'landscape' : 'portrait'};
          margin: 12mm 15mm;
        }
        body {
          font-family: Arial, Helvetica, sans-serif;
          color: #000000;
          background: #ffffff;
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          word-wrap: break-word;
        }
      </style>
    </head>
    <body>
      ${sectionsHtml}
    </body>
    </html>
  `;

  try {
    const existingFrame = document.getElementById('a4-isolated-print-frame') as HTMLIFrameElement | null;
    if (existingFrame) {
      existingFrame.remove();
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'a4-isolated-print-frame';
    iframe.title = 'Bingkai Cetak A4';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const frameDoc = iframe.contentWindow?.document;
    if (frameDoc && iframe.contentWindow) {
      frameDoc.open();
      frameDoc.write(printHtml);
      frameDoc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          window.print();
        }
      }, 250);
    } else {
      window.print();
    }
  } catch {
    window.print();
  }
}

