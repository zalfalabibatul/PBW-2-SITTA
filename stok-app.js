const {
    createApp
} = Vue;
createApp({
    data() {
        return {
            stockList: [],
            filters: {
                keyword: "",
                upbjj: "",
                kategori: "",
                onlyLow: false,
                onlyZero: false,
                sortBy: "judul"
            },
            editingId: null,
            editForm: {
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ""
            },
            newItem: {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ""
            },
            formErrors: {},
            editErrors: {},
            showAdvancedFilters: true,
            saveMessage: ""
        };
    },
    mounted() {
        const saved = localStorage.getItem("stokBahanAjarVue");
        const fallback = () => JSON.parse(JSON.stringify(window.dataStokBahanAjar || []));
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    this.stockList = parsed;
                } else {
                    this.stockList = fallback();
                }
            } catch (error) {
                this.stockList = fallback();
            }
        } else {
            this.stockList = fallback();
        }
    },
    computed: {
        upbjjOptions() {
            return [...new Set((window.upbjjList || []).map(item => item.nama))];
        },
        allKategoriOptions() {
            const set = new Set();
            (window.upbjjList || []).forEach(entry => (entry.kategoriList || []).forEach(k => set.add(k)));
            return [...set].sort();
        },
        kategoriOptions() {
            if (!this.filters.upbjj) return [];
            const selected = (window.upbjjList || []).find(item => item.nama === this.filters.upbjj);
            return selected ? selected.kategoriList : [];
        },
        filteredAndSortedStock() {
            let result = [...this.stockList];
            const keyword = this.filters.keyword.trim().toLowerCase();
            if (keyword) {
                result = result.filter(item => {
                    const k = String(item.kode || "").toLowerCase();
                    const j = String(item.judul || "").toLowerCase();
                    return k.includes(keyword) || j.includes(keyword);
                });
            }
            if (this.filters.upbjj) result = result.filter(item => item.upbjj === this.filters.upbjj);
            if (this.filters.kategori) result = result.filter(item => item.kategori === this.filters.kategori);
            if (this.filters.onlyLow) result = result.filter(item => Number(item.qty) < Number(item.safety));
            if (this.filters.onlyZero) result = result.filter(item => Number(item.qty) === 0);
            result.sort((a, b) => {
                if (this.filters.sortBy === "judul") {
                    return String(a.judul || "").localeCompare(String(b.judul || ""));
                }
                return Number(a[this.filters.sortBy]) - Number(b[this.filters.sortBy]);
            });
            return result;
        },
        stockSummaryText() {
            const total = this.stockList.length;
            const shown = this.filteredAndSortedStock.length;
            return `Menampilkan ${shown} dari ${total} data stok`;
        },
        hasActiveFilters() {
            return !!(this.filters.keyword.trim() || this.filters.upbjj || this.filters.kategori || this.filters.onlyLow || this.filters.onlyZero);
        },
        activeFilterHint() {
            let count = 0;
            if (this.filters.keyword.trim()) count++;
            if (this.filters.upbjj) count++;
            if (this.filters.kategori) count++;
            if (this.filters.onlyLow) count++;
            if (this.filters.onlyZero) count++;
            return `Filter aktif — ${count} kriteria dipakai`;
        }
    },
    watch: {
        "filters.upbjj" () {
            this.filters.kategori = "";
        },
        "newItem.kode"(val) {
            if (!val || val.length < 3) {
                if (this.formErrors.kode && this.formErrors.kode.includes("sudah")) delete this.formErrors.kode;
                return;
            }
            const dup = this.stockList.some(item => String(item.kode || "").toLowerCase() === val.trim().toLowerCase());
            if (dup) this.formErrors = { ...this.formErrors, kode: "Kode mata kuliah sudah ada." };
            else if (this.formErrors.kode) {
                const next = { ...this.formErrors };
                delete next.kode;
                this.formErrors = next;
            }
        },
        stockList: {
            deep: true,
            handler(newValue) {
                localStorage.setItem("stokBahanAjarVue", JSON.stringify(newValue));
            }
        }
    },
    methods: {
        scrollToTable() {
            this.$refs.tableWrap?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        },
        toRupiah(value) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            }).format(Number(value) || 0);
        },
        statusInfo(item) {
            if (Number(item.qty) === 0) return {
                label: "Kosong",
                className: "kosong",
                icon: "⛔"
            };
            if (Number(item.qty) < Number(item.safety)) return {
                label: "Menipis",
                className: "menipis",
                icon: "⚠️"
            };
            return {
                label: "Aman",
                className: "aman",
                icon: "✅"
            };
        },
        resetFilters() {
            this.filters = {
                keyword: "",
                upbjj: "",
                kategori: "",
                onlyLow: false,
                onlyZero: false,
                sortBy: "judul"
            };
            this.saveMessage = "";
        },
        validateNewItem() {
            const errors = {};
            if (!String(this.newItem.kode || "").trim()) errors.kode = "Kode wajib diisi.";
            if (!String(this.newItem.judul || "").trim()) errors.judul = "Judul wajib diisi.";
            if (!this.newItem.kategori) errors.kategori = "Pilih kategori.";
            if (!this.newItem.upbjj) errors.upbjj = "Pilih UT-Daerah.";
            if (!String(this.newItem.lokasiRak || "").trim()) errors.lokasiRak = "Lokasi rak wajib diisi.";
            if (!String(this.newItem.catatanHTML || "").trim()) errors.catatanHTML = "Catatan wajib diisi.";
            if (this.newItem.qty < 0 || this.newItem.safety < 0 || this.newItem.harga < 0) errors.qty = "Qty, safety, dan harga tidak boleh negatif.";
            const exists = this.stockList.some(item => String(item.kode || "").toLowerCase() === this.newItem.kode.trim().toLowerCase());
            if (exists) errors.kode = "Kode mata kuliah sudah ada.";
            this.formErrors = errors;
            return Object.keys(errors).length === 0;
        },
        startEdit(item) {
            this.editingId = item.id;
            this.editForm = {
                qty: Number(item.qty),
                safety: Number(item.safety),
                harga: Number(item.harga),
                catatanHTML: item.catatanHTML || ""
            };
        },
        cancelEdit() {
            this.editingId = null;
        },
        saveEdit(id) {
            this.editErrors = {};
            if (this.editForm.qty < 0 || this.editForm.safety < 0 || this.editForm.harga < 0) {
                this.editErrors = { general: "Nilai qty, safety, dan harga tidak boleh negatif." };
                return;
            }
            const idx = this.stockList.findIndex(item => item.id === id);
            if (idx === -1) return;
            this.stockList[idx] = {...this.stockList[idx],
                ...this.editForm
            };
            this.editingId = null;
            this.saveMessage = "Perubahan stok berhasil disimpan.";
        },
        addItem() {
            if (!this.validateNewItem()) return;
            this.stockList.push({
                id: Date.now(),
                kode: this.newItem.kode.trim().toUpperCase(),
                judul: this.newItem.judul.trim(),
                kategori: this.newItem.kategori.trim(),
                upbjj: this.newItem.upbjj,
                lokasiRak: this.newItem.lokasiRak.trim(),
                qty: Number(this.newItem.qty),
                safety: Number(this.newItem.safety),
                harga: Number(this.newItem.harga),
                catatanHTML: this.newItem.catatanHTML.trim()
            });
            this.resetNewForm();
            this.saveMessage = "Stok baru berhasil ditambahkan.";
        },
        resetNewForm() {
            this.formErrors = {};
            this.newItem = {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ""
            };
        }
    }
}).mount("#stok-app");
