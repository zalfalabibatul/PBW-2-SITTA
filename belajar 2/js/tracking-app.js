window.addEventListener('load', function () {
  new Vue({
    el: '#trackingApp',
    data: {
      upbjjList: app.upbjjList,
      pengirimanList: app.pengirimanList,
      paketList: app.paket,
      trackingList: Object.assign({}, app.tracking),

      tahun: new Date().getFullYear(),
      sequence: 1,
      nim: '',
      nama: '',
      ekspedisi: '',
      paketDipilih: '',
      tanggalKirim: '',
      nomorDO: '',
      hasilTracking: null,
      pesanError: ''
    },
    computed: {
      nomorDOBaru() {
        return `DO${this.tahun}-${String(this.sequence).padStart(4, '0')}`;
      },
      detailPaket() {
        return this.paketList.find(p => p.kode === this.paketDipilih);
      },
      progressBar() {
        if (!this.hasilTracking) return { value: 0, color: '#ccc' };
        const status = this.hasilTracking.status.toLowerCase();
        if (status === 'dikirim') return { value: 100, color: '#4caf50' };
        if (status === 'dalam perjalanan') return { value: 60, color: '#2196f3' };
        if (status === 'menunggu') return { value: 30, color: '#ff9800' };
        return { value: 10, color: '#f44336' };
      }
    },
    methods: {
      simpanDO() {
        if (!this.nim || !this.nama || !this.ekspedisi || !this.paketDipilih) {
          this.pesanError = '❌ Semua field wajib diisi.';
          return;
        }

        const nomor = this.nomorDOBaru;
        const isiPaket = this.detailPaket?.isi || [];

        this.trackingList[nomor] = {
          nim: this.nim,
          nama: this.nama,
          ekspedisi: this.ekspedisi,
          tanggalKirim: this.tanggalKirim || new Date().toISOString().slice(0, 10),
          paket: this.paketDipilih,
          total: this.detailPaket?.harga || 0,
          status: 'Menunggu',
          perjalanan: [
            {
              waktu: this.tanggalKirim || new Date().toISOString(),
              keterangan: 'Pesanan diterima'
            }
          ]
        };

        this.sequence++;
        this.nomorDO = nomor;
        this.hasilTracking = this.trackingList[nomor];
        this.pesanError = '';
      },
      lacakDO() {
        const hasil = this.trackingList[this.nomorDO.trim()];
        if (hasil) {
          this.hasilTracking = hasil;
          this.pesanError = '';
        } else {
          this.hasilTracking = null;
          this.pesanError = `❌ Data tidak ditemukan untuk Nomor DO: ${this.nomorDO}`;
        }
      },
      resetForm() {
        this.nim = '';
        this.nama = '';
        this.ekspedisi = '';
        this.paketDipilih = '';
        this.tanggalKirim = '';
        this.nomorDO = '';
        this.hasilTracking = null;
        this.pesanError = '';
      }
    },
    watch: {
      nomorDO(newVal) {
        if (newVal.length >= 6) {
          this.lacakDO();
        }
      },
      paketDipilih(newVal) {
        if (newVal) {
          this.pesanError = '';
        }
      }
    }
  });
});