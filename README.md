# Undangan Pernikahan Ayu & Dwiki

Website statis (HTML + CSS + JS), tanpa build step. Siap deploy ke Vercel.

## Struktur
```
index.html            -> semua halaman (edit data di blok CONFIG, awal <script>)
vercel.json           -> konfigurasi Vercel
assets/               -> gambar + music.mp3
docs/rsvp-apps-script.gs -> script Google Sheets untuk RSVP (tidak ikut di-deploy)
```

## Halaman
Opening · Quotes · Couple · Acara · Lokasi · Mengundang · RSVP · Thanks.
Pindah halaman lewat menu bawah (bisa digeser), swipe, scroll mouse, atau panah keyboard.

## Edit isi
- **Nama keluarga "Turut Mengundang":** `CONFIG.family` (pria / wanita) di `index.html`.
- **Nama orang tua di Thanks & Couple:** cari teks "Bapak anu anu anu" di `index.html`.
- **Nama tamu:** tambahkan `?to=Nama Tamu` di akhir link.
- **Musik:** ganti `assets/music.mp3`.

## Mengaktifkan RSVP (Google Sheets)
1. Buka sheets.google.com, buat Spreadsheet baru, beri nama "RSVP Undangan".
2. Menu **Extensions -> Apps Script**.
3. Hapus isi editor, tempel seluruh isi `docs/rsvp-apps-script.gs`, lalu **Save**.
4. Klik **Deploy -> New deployment**, ikon roda gigi -> pilih **Web app**.
5. Isi: *Execute as* = **Me**, *Who has access* = **Anyone**. Klik **Deploy**.
6. Klik **Authorize access**, pilih akun Google, **Advanced -> Go to ... (unsafe) -> Allow**.
7. Salin **Web app URL** (berakhiran `/exec`).
8. Di `index.html`, isi `rsvpEndpoint:"URL_TADI"` pada `CONFIG`. Simpan, lalu deploy ulang ke Vercel.
9. Tes: buka undangan -> RSVP -> kirim ucapan. Data muncul di sheet bernama `RSVP`.

Catatan: setiap kali script diubah, buat **New deployment** baru (atau Manage deployments -> Edit -> New version), URL tetap sama. Nomor WhatsApp hanya tersimpan di Sheet, tidak tampil di undangan. Selama `rsvpEndpoint` kosong, RSVP berjalan dalam mode demo (hanya tersimpan di perangkat sendiri).
