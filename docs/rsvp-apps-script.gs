// Google Apps Script: penyimpan RSVP & ucapan ke Google Sheets
const SHEET = 'RSVP';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(['Waktu', 'Nama', 'Grup', 'WhatsApp', 'Kehadiran', 'Ucapan']);
    sh.getRange('B:F').setNumberFormat('@'); // teks biasa (mencegah rumus disuntikkan)
  }
  return sh;
}
function clean_(v, max) { return String(v || '').trim().slice(0, max); }
function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const nama = clean_(d.nama, 60);
    if (!nama) return out_({ ok: false });
    const att = ['Hadir', 'Tidak Hadir', 'Masih Ragu'].indexOf(d.kehadiran) > -1 ? d.kehadiran : 'Masih Ragu';
    sheet_().appendRow([new Date(), nama, clean_(d.grup, 40), clean_(d.wa, 25), att, clean_(d.ucapan, 500)]);
    return out_({ ok: true });
  } finally { lock.releaseLock(); }
}

function doGet() {
  const rows = sheet_().getDataRange().getValues().slice(1).reverse().slice(0, 100)
    .map(r => ({ t: new Date(r[0]).getTime(), nama: r[1], grup: r[2], kehadiran: r[4], ucapan: r[5] }));
  return out_({ ok: true, data: rows }); // nomor WhatsApp tidak ikut ditampilkan ke publik
}
