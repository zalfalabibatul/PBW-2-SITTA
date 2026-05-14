var dataPengguna = [{
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@ut.ac.id",
        password: "rina123",
        role: "UPBJJ-UT",
        lokasi: "UPBJJ Jakarta"
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@ut.ac.id",
        password: "agus123",
        role: "UPBJJ-UT",
        lokasi: "UPBJJ Makassar"
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@ut.ac.id",
        password: "siti123",
        role: "Puslaba",
        lokasi: "Pusat"
    },
    {
        id: 4,
        nama: "Doni Setiawan",
        email: "doni@ut.ac.id",
        password: "doni123",
        role: "Fakultas",
        lokasi: "FISIP"
    },
    {
        id: 5,
        nama: "Admin SITTA",
        email: "admin@ut.ac.id",
        password: "admin123",
        role: "Administrator",
        lokasi: "Pusat"
    },
    {
        id: 6,
        nama: "Zalfa Labibatul Marzuqoh",
        email: "zalfa@ut.ac.id",
        password: "zalfa55",
        role: "mahasiswi",
        lokasi: "FST"
    }
];

var dataBahanAjar = [{
        kodeLokasi: "0TMP01",
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "BMP",
        edisi: "2",
        stok: 548,
        cover: "assets/pengantar_komunikasi.jpg"
    },
    {
        kodeLokasi: "0JKT01",
        kodeBarang: "EKMA4216",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "BMP",
        edisi: "3",
        stok: 392,
        cover: "assets/manajemen_keuangan.jpg"
    },
    {
        kodeLokasi: "0SBY02",
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "BMP",
        edisi: "1",
        stok: 278,
        cover: "assets/kepemimpinan.jpg"
    },
    {
        kodeLokasi: "0MLG01",
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "BMP",
        edisi: "2",
        stok: 165,
        cover: "assets/mikrobiologi.jpg"
    },
    {
        kodeLokasi: "0UPBJJBDG",
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "BMP",
        edisi: "4",
        stok: 204,
        cover: "assets/paud_perkembangan.jpeg"
    }
];

var dataTracking = {
    "2023001234": {
        nomorDO: "2023001234",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan: [{
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            },
        ]
    },
    "2023005678": {
        nomorDO: "2023005678",
        nama: "Agus Pranoto",
        status: "Diterima",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan: [{
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    },
    "20260429": {
        nomorDO: "20260429",
        nama: "Zalfa Labibatul Marzuqoh",
        status: "Dikirim",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-03-25",
        paket: "0MLG01",
        total: "Rp 350.000",
        perjalanan: [{
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Tegal"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota TEGAL"
            },

        ]
    }
};

var upbjjList = [{
        kode: "UPBJJ-JKT",
        nama: "UPBJJ Jakarta",
        kategoriList: ["Ekonomi", "Sains", "Pendidikan", "Hukum"]
    },
    {
        kode: "UPBJJ-BDG",
        nama: "UPBJJ Bandung",
        kategoriList: ["Ekonomi", "Kesehatan", "Sastra"]
    },
    {
        kode: "UPBJJ-SBY",
        nama: "UPBJJ Surabaya",
        kategoriList: ["Teknik", "Ekonomi", "Sains"]
    },
    {
        kode: "UPBJJ-MKS",
        nama: "UPBJJ Makassar",
        kategoriList: ["Pendidikan", "Sastra", "Hukum"]
    },
    {
        kode: "UPBJJ-PWT",
        nama: "UPBJJ Purwokerto",
        kategoriList: ["Ekonomi", "Pendidikan", "Sains"]
    },
    {
        kode: "UPBJJ-SMG",
        nama: "UPBJJ Semarang",
        kategoriList: ["Ekonomi", "Hukum", "Sastra"]
    }
];

var dataStokBahanAjar = [{
        id: 1,
        kode: "EKMA4216",
        judul: "Manajemen Keuangan",
        kategori: "Ekonomi",
        upbjj: "UPBJJ Jakarta",
        lokasiRak: "RAK-A1",
        qty: 25,
        safety: 20,
        harga: 95000,
        catatanHTML: "<em>Stok aman untuk 2 minggu.</em>"
    },
    {
        id: 2,
        kode: "EKMA4310",
        judul: "Kepemimpinan",
        kategori: "Ekonomi",
        upbjj: "UPBJJ Bandung",
        lokasiRak: "RAK-B2",
        qty: 8,
        safety: 12,
        harga: 88000,
        catatanHTML: "<strong>Perlu pantauan rutin.</strong>"
    },
    {
        id: 3,
        kode: "BIOL4211",
        judul: "Mikrobiologi Dasar",
        kategori: "Sains",
        upbjj: "UPBJJ Surabaya",
        lokasiRak: "RAK-C3",
        qty: 0,
        safety: 10,
        harga: 102000,
        catatanHTML: "Kosong, menunggu pengadaan."
    },
    {
        id: 4,
        kode: "PAUD4401",
        judul: "Perkembangan Anak Usia Dini",
        kategori: "Pendidikan",
        upbjj: "UPBJJ Makassar",
        lokasiRak: "RAK-D1",
        qty: 14,
        safety: 14,
        harga: 76000,
        catatanHTML: "Sesuai safety stock."
    },
    {
        id: 5,
        kode: "HKUM4302",
        judul: "Hukum Bisnis",
        kategori: "Hukum",
        upbjj: "UPBJJ Jakarta",
        lokasiRak: "RAK-E5",
        qty: 5,
        safety: 9,
        harga: 99000,
        catatanHTML: "<span style='color:#d97706;'>Segera reorder.</span>"
    }
];

var paketList = [{
        kodePaket: "PKT-001",
        namaPaket: "Paket Ekonomi Dasar",
        harga: 183000,
        daftarBahanAjar: ["EKMA4216 - Manajemen Keuangan", "EKMA4310 - Kepemimpinan"]
    },
    {
        kodePaket: "PKT-002",
        namaPaket: "Paket Sains Inti",
        harga: 210000,
        daftarBahanAjar: ["BIOL4211 - Mikrobiologi Dasar"]
    },
    {
        kodePaket: "PKT-003",
        namaPaket: "Paket Pendidikan Anak",
        harga: 156000,
        daftarBahanAjar: ["PAUD4401 - Perkembangan Anak Usia Dini"]
    }
];

var trackingDOList = [{
        nomorDO: "DO2026-001",
        nim: "1234567890",
        nama: "Rina Wulandari",
        ekspedisi: "JNE Regular",
        paketKode: "PKT-001",
        tanggalKirim: "2026-05-07",
        totalHarga: 183000,
        status: "Dalam Perjalanan"
    },
    {
        nomorDO: "DO2026-002",
        nim: "2345678901",
        nama: "Agus Pranoto",
        ekspedisi: "JNE Express",
        paketKode: "PKT-003",
        tanggalKirim: "2026-05-08",
        totalHarga: 156000,
        status: "Diproses"
    }
];