//untuk login
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    if (!form) return;

    function getAllUsers() {
        const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const defaultUsers = Array.isArray(window.dataPengguna) ? window.dataPengguna : [];
        return [...defaultUsers, ...storedUsers];
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const emailInput = document.getElementById("emai") || document.querySelector("input[type='text']");
        const passwordInput = document.getElementById("password") || document.querySelector("input[type='password']");
        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";

        if (!email || !password) {
            alert("Email dan password wajib diisi.");
            return;
        }

        const pengguna = getAllUsers().find(user => user.email.toLowerCase() === email && user.password === password);

        if (pengguna) {
            alert(`Selamat datang, ${pengguna.nama}!`);
            localStorage.setItem("penggunaAktif", JSON.stringify(pengguna));
            window.location.href = "dashboard.html";
        } else {
            alert("⚠️Email atau password salah!");
        }
    });

    const forgotModal = document.getElementById("forgot-modal");
    const registerModal = document.getElementById("register-modal");
    const openForgot = document.getElementById("open-forgot");
    const openRegister = document.getElementById("open-register");
    const closeForgot = document.getElementById("close-forgot");
    const closeRegister = document.getElementById("close-register");
    const submitForgot = document.getElementById("submit-forgot");
    const submitRegister = document.getElementById("submit-register");

    const closeModal = (modal) => {
        if (modal) modal.style.display = "none";
    };
    const openModal = (modal) => {
        if (modal) modal.style.display = "flex";
    };

    openForgot?.addEventListener("click", (event) => {
        event.preventDefault();
        openModal(forgotModal);
    });

    openRegister?.addEventListener("click", (event) => {
        event.preventDefault();
        openModal(registerModal);
    });

    closeForgot?.addEventListener("click", () => closeModal(forgotModal));
    closeRegister?.addEventListener("click", () => closeModal(registerModal));

    submitForgot?.addEventListener("click", () => {
        const emailInput = document.getElementById("forgot-email");
        const email = emailInput?.value.trim().toLowerCase();
        if (!email) {
            alert("Masukkan email terlebih dahulu.");
            return;
        }

        const pengguna = getAllUsers().find((user) => user.email.toLowerCase() === email);
        if (!pengguna) {
            alert("Email tidak ditemukan di sistem.");
            return;
        }

        alert("Link reset password berhasil dikirim ke email Anda.");
        if (emailInput) emailInput.value = "";
        closeModal(forgotModal);
    });

    submitRegister?.addEventListener("click", () => {
        const namaInput = document.getElementById("reg-nama");
        const emailInput = document.getElementById("reg-email");
        const passwordInput = document.getElementById("reg-password");

        const nama = namaInput?.value.trim();
        const email = emailInput?.value.trim().toLowerCase();
        const password = passwordInput?.value.trim();

        if (!nama || !email || !password) {
            alert("Semua data akun harus diisi.");
            return;
        }

        const semuaUser = getAllUsers();
        const emailDipakai = semuaUser.some((user) => user.email.toLowerCase() === email);
        if (emailDipakai) {
            alert("Email sudah terdaftar. Gunakan email lain.");
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        storedUsers.push({
            id: Date.now(),
            nama,
            email,
            password,
            role: "Mahasiswa",
            lokasi: "-"
        });
        localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

        alert("Akun berhasil dibuat. Silakan login.");
        if (namaInput) namaInput.value = "";
        if (emailInput) emailInput.value = "";
        if (passwordInput) passwordInput.value = "";
        closeModal(registerModal);
    });

    window.addEventListener("click", (event) => {
        if (event.target === forgotModal) closeModal(forgotModal);
        if (event.target === registerModal) closeModal(registerModal);
    });
});

// Greeting berdasarkan waktu lokal
function setGreeting() {
    const greetingElement = document.getElementById("greeting");
    if (!greetingElement) return;
    const now = new Date();
    const hour = now.getHours();
    let greetingText = "";

    if (hour >= 5 && hour < 11) {
        greetingText = "Selamat Pagi 🌅";
    } else if (hour >= 11 && hour < 15) {
        greetingText = "Selamat Siang ☀️";
    } else if (hour >= 15 && hour < 18) {
        greetingText = "Selamat Sore 🌇";
    } else {
        greetingText = "Selamat Malam 🌙";
    }

    // Ambil data pengguna dari localStorage
    const penggunaAktif = JSON.parse(localStorage.getItem("penggunaAktif"));

    if (penggunaAktif) {
        const namaPengguna = penggunaAktif.nama;
        greetingElement.textContent = `${greetingText} ${namaPengguna}!`;
    } else {
        greetingElement.textContent = `${greetingText} Pengguna!`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setGreeting();
});

// Dropdown interaktif
document.addEventListener("DOMContentLoaded", () => {
    setGreeting();

    const reportLink = document.getElementById("report");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    if (!reportLink || !dropdownMenu) return;

    reportLink.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
    });

    // Tutup dropdown jika klik di luar
    document.addEventListener("click", (e) => {
        if (!reportLink.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
});

// tracking
document.addEventListener("DOMContentLoaded", function() {
    const btnCari = document.getElementById("btn-lacak");
    const btnReset = document.getElementById("btn-reset");
    const inputDO = document.getElementById("input-id");
    const resultArea = document.getElementById("result-area");
    if (!btnCari || !btnReset || !inputDO || !resultArea) return;

    const originalDataTracking = JSON.parse(JSON.stringify(dataTracking));


    btnCari.addEventListener("click", function() {
        const nomorDO = inputDO.value.trim();

        if (!nomorDO) {
            resultArea.innerHTML = "<p>⚠️ Silakan masukkan delivery order/billing! </p>";
            return;
        }

        const data = dataTracking[nomorDO];

        if (!data) {
            resultArea.innerHTML = `<p>❌ nomor delivery order/billing tidak ditemukan! (Silahkan ulang) <strong>${nomorDO}</strong></p>`;
            return;
        }

        // Simulasi progress bar status
        let progressValue = 0;
        let statusColor = "#ccc";

        switch (data.status.toLowerCase()) {
            case "diterima":
            case "delivered":
            case "delivery":
                progressValue = 100;
                statusColor = "#4caf50";
                break;
            case "dalam perjalanan":
            case "on the way":
            case "dikirim":
                progressValue = 60;
                statusColor = "#2196f3";
                break;
            case "menunggu proses":
            case "waiting the process":
                progressValue = 30;
                statusColor = "#ff9800";
                break;
            default:
                progressValue = 10;
                statusColor = "#f44336";
        }

        const stokData = JSON.parse(localStorage.getItem("dataBahanAjar")) || window.dataBahanAjar || [];
        const paketInfo = stokData.find(p => p.kodeLokasi === data.paket);
        const namaPaket = paketInfo ? paketInfo.namaBarang : "Tidak diketahui";
        const jenisPaket = paketInfo ? paketInfo.jenisBarang : "-";

        // Riwayat perjalanan
        let perjalananHTML = "<ul>";
        data.perjalanan.forEach(item => {
            perjalananHTML += `<li><strong>${item.waktu}</strong>: ${item.keterangan}</li>`;
        });
        perjalananHTML += "</ul>";

        // Gabungkan semua ke dalam result-area
        resultArea.innerHTML = `
      <div class="hasil-tracking">
        <h3>📦 Informasi Pengiriman</h3>
        <p><strong>Nama Mahasiswa:</strong> ${data.nama}</p>
        <p><strong>Nomor DO:</strong> ${data.nomorDO}</p>
        <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
        <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
        <p><strong>Jenis Paket:</strong> ${jenisPaket}</p>
        <p><strong>Nama Paket:</strong> ${namaPaket}</p>
        <p><strong>Total Pembayaran:</strong> ${data.total}</p>

        <div style="margin: 10px 0;">
          <label><strong>Status Pengiriman:</strong> ${data.status}</label>
          <div style="background-color: #eee; border-radius: 5px; overflow: hidden; height: 20px;">
            <div style="width: ${progressValue}%; background-color: ${statusColor}; height: 100%;"></div>
          </div>
        </div>

        <h4>📍 Riwayat Perjalanan</h4>
        ${perjalananHTML}
      </div>
    `;
    });
    //untuk mereset data
    btnReset.addEventListener("click", function() {
        inputDO.value = "";
        resultArea.innerHTML = "";
        dataTracking = JSON.parse(JSON.stringify(originalDataTracking));
    });

});


// informasi bahan ajar
document.addEventListener("DOMContentLoaded", function() {
    // Ambil data dari localStorage jika ada, kalau tidak pakai dari data.js
    let dataBahanAjar = JSON.parse(localStorage.getItem("dataBahanAjar")) || window.dataBahanAjar;

    const inputCari = document.getElementById("cari-id");
    const btnCari = document.getElementById("btn-cari");
    const btnHapus = document.getElementById("btn-hapus");
    const judulBuku = document.getElementById("judul-buku");
    const coverBuku = document.getElementById("cover-buku");
    const kodeLokasi = document.getElementById("kode-lokasi");
    const kodeBarang = document.getElementById("kode-barang");
    const namaBarangEl = document.getElementById("nama-barang");
    const jenisBarang = document.getElementById("jenis-barang");
    const edisiBarang = document.getElementById("edisi-barang");
    const stokBarang = document.getElementById("stok-barang");
    if (!inputCari || !btnCari || !btnHapus || !judulBuku || !coverBuku || !kodeLokasi || !kodeBarang || !namaBarangEl || !jenisBarang || !edisiBarang || !stokBarang) return;

    btnCari.addEventListener("click", function() {
        const kode = inputCari.value.trim().toUpperCase();
        const bahan = dataBahanAjar.find(item => item.kodeBarang === kode);

        if (bahan) {
            judulBuku.textContent = bahan.namaBarang;
            coverBuku.src = bahan.cover;
            kodeLokasi.textContent = bahan.kodeLokasi;
            kodeBarang.textContent = bahan.kodeBarang;
            namaBarangEl.textContent = bahan.namaBarang;
            jenisBarang.textContent = bahan.jenisBarang;
            edisiBarang.textContent = bahan.edisi;
            stokBarang.textContent = bahan.stok;
        } else {
            judulBuku.textContent = "❌ Data tidak ditemukan";
            coverBuku.src = "assets/UT.png";
            kodeLokasi.textContent = "-";
            kodeBarang.textContent = "-";
            namaBarangEl.textContent = "-";
            jenisBarang.textContent = "-";
            edisiBarang.textContent = "-";
            stokBarang.textContent = "-";
        }
    });

    btnHapus.addEventListener("click", function() {
        inputCari.value = "";
        judulBuku.textContent = "";
        coverBuku.src = "";
        kodeLokasi.textContent = "";
        kodeBarang.textContent = "";
        namaBarangEl.textContent = "";
        jenisBarang.textContent = "";
        edisiBarang.textContent = "";
        stokBarang.textContent = "";
    });

    // Fitur tambah stok baru
    const btnTambahStok = document.getElementById("btn-tambah-stok");
    const inputKodeLokasi = document.getElementById("input-kode-lokasi");
    const inputKodeBarang = document.getElementById("input-kode-barang");
    const inputNamaBarang = document.getElementById("input-nama-barang");
    const inputJenisBarang = document.getElementById("input-jenis-barang");
    const inputEdisiBarang = document.getElementById("input-edisi-barang");
    const inputStokBarang = document.getElementById("input-stok-barang");
    if (!btnTambahStok) return;
    if (!inputKodeLokasi || !inputKodeBarang || !inputNamaBarang || !inputJenisBarang || !inputEdisiBarang || !inputStokBarang) return;

    btnTambahStok.addEventListener("click", function() {
        const kodeLokasi = inputKodeLokasi.value.trim();
        const kodeBarang = inputKodeBarang.value.trim().toUpperCase();
        const namaBarang = inputNamaBarang.value.trim();
        const jenisBarang = inputJenisBarang.value.trim();
        const edisi = inputEdisiBarang.value.trim();
        const stok = inputStokBarang.value.trim();

        if (!kodeLokasi || !kodeBarang || !namaBarang || !jenisBarang || !edisi || !stok) {
            alert("⚠️ Semua field harus diisi!");
            return;
        }

        // Cek apakah kodeBarang sudah ada
        const sudahAda = dataBahanAjar.some(item => item.kodeBarang === kodeBarang);
        if (sudahAda) {
            alert("⚠️ Kode Barang sudah ada. Gunakan kode unik!");
            return;
        }

        // Tambahkan data baru
        const dataBaru = {
            kodeLokasi,
            kodeBarang,
            namaBarang,
            jenisBarang,
            edisi,
            stok,
            cover: "assets/UT.png"
        };

        dataBahanAjar.push(dataBaru);
        localStorage.setItem("dataBahanAjar", JSON.stringify(dataBahanAjar));

        alert("✅ Stok baru berhasil ditambahkan!");

        // Reset form input
        inputKodeLokasi.value = "";
        inputKodeBarang.value = "";
        inputNamaBarang.value = "";
        inputJenisBarang.value = "";
        inputEdisiBarang.value = "";
        inputStokBarang.value = "";
    });
});

// reset data informasi ba
const btnResetData = document.getElementById("btn-reset-data");
if (btnResetData) {
    btnResetData.addEventListener("click", function() {
        localStorage.removeItem("dataBahanAjar");
        location.reload();
    });
}