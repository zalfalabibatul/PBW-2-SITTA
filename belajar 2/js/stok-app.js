window.addEventListener('load', function () {
  new Vue({
    el: '#stokApp',
    data: {
      upbjjList: app.upbjjList,
      kategoriList: app.kategoriList,
      stok: app.stok,
      filter: {
        upbjj: '',
        kategori: '',
        reorderOnly: false,
        kosongOnly: false
      },
      sortBy: '',
      stokForm: {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        qty: 0,
        safety: 0,
        catatanHTML: ''
      },
      formMode: 'tambah',

      // ✅ Properti tambahan untuk pencarian dan input stok baru
      kodeCari: '',
      hasilCari: null,
      pesanError: '',
      stokBaru: {
        kodeLokasi: '',
        kodeBarang: '',
        namaBarang: '',
        jenisBarang: '',
        edisi: '',
        stok: 0
      }
    },
    computed: {
      stokTersaring() {
        let hasil = [...this.stok];

        if (this.filter.upbjj) {
          hasil = hasil.filter(item => item.upbjj === this.filter.upbjj);
        }
        if (this.filter.kategori) {
          hasil = hasil.filter(item => item.kategori === this.filter.kategori);
        }
        if (this.filter.reorderOnly) {
          hasil = hasil.filter(item => item.qty < item.safety);
        }
        if (this.filter.kosongOnly) {
          hasil = hasil.filter(item => item.qty === 0);
        }
        if (this.sortBy) {
          hasil.sort((a, b) => {
            if (this.sortBy === 'judul') return a.judul.localeCompare(b.judul);
            if (this.sortBy === 'qty') return b.qty - a.qty;
            if (this.sortBy === 'harga') return b.harga - a.harga;
          });
        }
        return hasil;
      }
    },
    methods: {
      statusText(item) {
        if (item.qty === 0) return '❌ Kosong';
        if (item.qty < item.safety) return '⚠️ Menipis';
        return '✅ Aman';
      },
      statusClass(item) {
        if (item.qty === 0) return 'status-kosong';
        if (item.qty < item.safety) return 'status-menipis';
        return 'status-aman';
      },
      resetFilter() {
        this.filter = {
          upbjj: '',
          kategori: '',
          reorderOnly: false,
          kosongOnly: false
        };
        this.sortBy = '';
      },
      editStok(item) {
        this.stokForm = Object.assign({}, item);
        this.formMode = 'edit';
      },
      simpanStok() {
        const f = this.stokForm;
        if (!f.kode || !f.judul || !f.kategori || !f.upbjj || !f.lokasiRak || f.qty < 0 || f.safety < 0) {
          alert("⚠️ Semua field wajib diisi dengan benar.");
          return;
        }
        if (this.formMode === 'edit') {
          const index = this.stok.findIndex(s => s.kode === f.kode);
          if (index !== -1) this.$set(this.stok, index, Object.assign({}, f));
        } else {
          if (this.stok.some(s => s.kode === f.kode)) {
            alert("⚠️ Kode sudah ada.");
            return;
          }
          this.stok.push(Object.assign({}, f));
        }
        this.resetForm();
        this.resetFilter(); // ✅ tampilkan semua data setelah simpan
        this.$nextTick(() => {
          const tabel = document.querySelector("table");
          if (tabel) tabel.scrollIntoView({ behavior: "smooth" });
        });
      },
      resetForm() {
        this.stokForm = {
          kode: '',
          judul: '',
          kategori: '',
          upbjj: '',
          lokasiRak: '',
          qty: 0,
          safety: 0,
          catatanHTML: ''
        };
        this.formMode = 'tambah';
      },
cariBahanAjar() {
  const kode = this.kodeCari.trim().toUpperCase();
  if (!kode) {
    this.pesanError = '⚠️ Masukkan kode terlebih dahulu.';
    this.hasilCari = null;
    return;
  }

  const hasil = this.stok.find(item => item.kode.toUpperCase() === kode);
  if (hasil) {
    this.hasilCari = hasil;
    this.pesanError = '';
  } else {
    this.hasilCari = null;
    this.pesanError = '❌ Data tidak ditemukan.';
  }
},
resetCari() {
  this.kodeCari = '';
  this.hasilCari = null;
  this.pesanError = '';
},
      tambahStok() {
        const s = this.stokBaru;
        if (!s.kodeLokasi || !s.kodeBarang || !s.namaBarang || !s.jenisBarang || !s.edisi || s.stok <= 0) {
          alert("⚠️ Semua field harus diisi dengan benar.");
          return;
        }
        if (this.stok.some(item => item.kode === s.kodeBarang)) {
          alert("⚠️ Kode Barang sudah ada.");
          return;
        }
        const dataBaru = {
          kode: s.kodeBarang,
          judul: s.namaBarang,
          kategori: s.jenisBarang,
          upbjj: 'Belum Ditentukan',
          lokasiRak: s.kodeLokasi,
          harga: 0,
          qty: s.stok,
          safety: 10,
          catatanHTML: s.edisi,
          cover: "assets/default.jpg"
        };
        this.stok.push(dataBaru);
        alert("✅ Stok baru berhasil ditambahkan!");
        this.resetFormStok();
        this.resetFilter();
      },
      resetFormStok() {
        this.stokBaru = {
          kodeLokasi: '',
          kodeBarang: '',
          namaBarang: '',
          jenisBarang: '',
          edisi: '',
          stok: 0
        };
      }
    },
    watch: {
      'stokForm.kode'(val) {
        if (val.length >= 6 && this.formMode === 'tambah') {
          const sudahAda = this.stok.some(item => item.kode === val);
          if (sudahAda) {
            alert("⚠️ Kode sudah digunakan.");
          }
        }
      },
      'filter.upbjj'(val) {
        if (!val) {
          this.filter.kategori = '';
        }
      }
    }
  });
});