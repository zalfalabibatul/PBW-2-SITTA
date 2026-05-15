const { createApp } = Vue;

const defaultPaket = [
{ kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
{ kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
];

const defaultPengiriman = [
    { kode: "REG", nama: "Reguler (3-5 hari)" },
    { kode: "EXP", nama: "Ekspres (1-2 hari)" }
];

createApp({
    data() {
        return {
            trackingList: [],
            paketList: [],
            stokList: [],
            pengirimanList: [],
            newDO: {
                nim: "",
                nama: "",
                ekspedisi: "",
                paketKode: "",
                tanggalKirim: new Date().toISOString().slice(0, 10)
            },
            formErrors: {},
            saveMessage: ""
        };
    },
    mounted() {
        if (typeof window.dataStokBahanAjar !== "undefined") {
            this.stokList = JSON.parse(JSON.stringify(window.dataStokBahanAjar));
        }

        if (typeof app !== "undefined" && app.paket) {
            this.paketList = JSON.parse(JSON.stringify(app.paket));
        } else {
            this.paketList = defaultPaket;
        }

        if (typeof app !== "undefined" && app.pengirimanList) {
            this.pengirimanList = JSON.parse(JSON.stringify(app.pengirimanList));
        } else {
            this.pengirimanList = defaultPengiriman;
        }

        const saved = localStorage.getItem("trackingDOVue");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    this.trackingList = parsed;
                    return;
                }
            } catch (error) { /* fallback ke data awal */ }
        }

        if (typeof window.trackingDOList !== "undefined" && window.trackingDOList.length) {
            this.trackingList = JSON.parse(JSON.stringify(window.trackingDOList));
        } else {
            this.trackingList = [];
        }
    },
    computed: {
        selectedPaket() {
            return this.paketList.find(function (item) {
                return item.kode === this.newDO.paketKode;
            }, this) || null;
        },
        nextDoNumber() {
            const year = new Date().getFullYear();
            const prefix = "DO" + year + "-";
            let maxSeq = 0;
            this.trackingList.forEach(function (item) {
                if (item.nomorDO && item.nomorDO.startsWith(prefix)) {
                    const seq = Number(item.nomorDO.split("-")[1]);
                    if (!Number.isNaN(seq) && seq > maxSeq) maxSeq = seq;
                }
            });
            return prefix + String(maxSeq + 1).padStart(3, "0");
        },
        doSummaryText() {
            return "Total " + this.trackingList.length + " Delivery Order terdaftar";
        }
    },
    watch: {
        trackingList: {
            deep: true,
            handler: function (newValue) {
                localStorage.setItem("trackingDOVue", JSON.stringify(newValue));
            }
        },
        "newDO.nim": function (val) {
            if (!val) return;
            if (val.length >= 8 && !/^\d{8,15}$/.test(val.trim())) {
                this.formErrors = Object.assign({}, this.formErrors, { nim: "NIM harus 8-15 digit angka." });
            } else if (this.formErrors.nim) {
                const next = Object.assign({}, this.formErrors);
                delete next.nim;
                this.formErrors = next;
            }
        },
        "newDO.paketKode": function () {
            this.saveMessage = "";
        }
    },
    methods: {
        toRupiah: function (value) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            }).format(Number(value) || 0);
        },
        labelBahanHtml: function (kode) {
            const item = this.stokList.find(function (s) { return s.kode === kode; });
            if (!item) return kode;
            const judul = item.judul || item.namaBarang || kode;
            if (item.catatanHTML) {
                return "<strong>" + kode + "</strong> - " + judul + " <em>(" + item.catatanHTML.replace(/<[^>]+>/g, "") + ")</em>";
            }
            return "<strong>" + kode + "</strong> - " + judul;
        },
        statusClass: function (status) {
            const normalized = String(status || "").toLowerCase();
            if (normalized.includes("diproses")) return "status-diproses";
            if (normalized.includes("dalam") && normalized.includes("perjalanan")) return "status-dalam-perjalanan";
            if (normalized.includes("diterima") || normalized.includes("selesai")) return "status-diterima";
            if (normalized.includes("kirim")) return "status-dikirim";
            return "status-default";
        },
        validateForm: function () {
            const errors = {};
            if (!this.newDO.nim.trim()) errors.nim = "NIM wajib diisi.";
            else if (!/^\d{8,15}$/.test(this.newDO.nim.trim())) errors.nim = "NIM harus 8-15 digit angka.";
            if (!this.newDO.nama.trim()) errors.nama = "Nama wajib diisi.";
            if (!this.newDO.ekspedisi) errors.ekspedisi = "Pilih ekspedisi.";
            if (!this.newDO.paketKode) errors.paketKode = "Pilih paket bahan ajar.";
            if (!this.newDO.tanggalKirim) errors.tanggalKirim = "Tanggal kirim wajib diisi.";
            if (this.newDO.paketKode && !this.selectedPaket) errors.paketKode = "Paket tidak valid.";
            this.formErrors = errors;
            return Object.keys(errors).length === 0;
        },
        addDO: function () {
            if (!this.validateForm()) return;
            this.trackingList.push({
                nomorDO: this.nextDoNumber,
                nim: this.newDO.nim.trim(),
                nama: this.newDO.nama.trim(),
                ekspedisi: this.newDO.ekspedisi,
                paketKode: this.newDO.paketKode,
                tanggalKirim: this.newDO.tanggalKirim,
                totalHarga: this.selectedPaket.harga,
                status: "Diproses",
                perjalanan: []
            });
            this.resetForm();
            this.saveMessage = "Delivery Order berhasil ditambahkan.";
        },
        resetForm: function () {
            this.formErrors = {};
            this.newDO = {
                nim: "",
                nama: "",
                ekspedisi: "",
                paketKode: "",
                tanggalKirim: new Date().toISOString().slice(0, 10)
            };
        }
    }
}).mount("#tracking-app");
