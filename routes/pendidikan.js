var express = require('express');
var router = express.Router();
var connection = require('../config/database');
const Model_Pendidikan = require('../model/model_Pendidikan');

// Route untuk menampilkan semua data pendidikan
router.get('/', async function(req, res, next) {
    try {
        let rows = await Model_Pendidikan.getAll(); // Mengambil semua data pendidikan
        res.render('pendidikan/index', { 
            data: rows
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal memuat data pendidikan');
        res.redirect('/pendidikan');
    }
});

// Route untuk menampilkan form tambah pendidikan
router.get('/create', async function(req, res, next) {
    try {
        res.render('pendidikan/create', { 
            nama_instansi: '',
            jurusan: '',
            tahun_masuk: '',
            tahun_lulus: '',
            nomor_jazah: '',
            id_mahasiswa: ''
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route untuk menyimpan data pendidikan baru
router.post('/store', async function(req, res, next) {
    try {
        let {
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_jazah,
            id_mahasiswa
        } = req.body;
        
        let data = { 
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_jazah,
            id_mahasiswa
        };
        
        await Model_Pendidikan.Store(data);
        req.flash('success', 'Berhasil menyimpan data pendidikan');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data pendidikan');
        res.redirect('/pendidikan');
    }
});

// Route untuk menampilkan form edit pendidikan
router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let pendidikan = await Model_Pendidikan.getById(id);
        res.render('pendidikan/edit', { 
            id_pendidikan: pendidikan[0].id_pendidikan,
            nama_instansi: pendidikan[0].nama_instansi,
            jurusan: pendidikan[0].jurusan,
            tahun_masuk: pendidikan[0].tahun_masuk,
            tahun_lulus: pendidikan[0].tahun_lulus,
            nomor_jazah: pendidikan[0].nomor_jazah,
            id_mahasiswa: pendidikan[0].id_mahasiswa
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route untuk menyimpan perubahan data pendidikan
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let {
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_jazah,
            id_mahasiswa
        } = req.body;
        
        let data = {
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_jazah,
            id_mahasiswa
        };
        
        await Model_Pendidikan.Update(id, data); 
        req.flash('success', 'Berhasil menyimpan perubahan data pendidikan');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data pendidikan');
        res.redirect('/pendidikan');
    }
});

// Route untuk menghapus data pendidikan
router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        await Model_Pendidikan.Delete(id); 
        req.flash('success', 'Berhasil menghapus data pendidikan');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data pendidikan');
        res.redirect('/pendidikan');
    }
});

module.exports = router;
