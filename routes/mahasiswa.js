var express = require('express');
var router = express.Router();

var connection = require('../config/database');
const Model_Mahasiswa = require('../model/model_Mahasiswa'); 

router.get('/', async function(req, res, next){
   try {
      let rows = await Model_Mahasiswa.getAll(); // Mengambil semua data mahasiswa
      res.render('mahasiswa/index', { 
         data: rows
      });
   } catch (error) {
      console.error("Error:", error);
      req.flash('error', 'Gagal memuat data mahasiswa');
      res.redirect('/mahasiswa');
   }
});

router.get('/create', function(req, res, next){
    res.render('mahasiswa/create', { 
        nrp: '',
        nama_depan: '',
        nama_belakang: '',
        jenis_kelamin: '',
        agama: '',
        umur: '',
        tinggi_badan: '',
        gol_darah: '',
        alamat: '',
        hobi: '',
        email: '',
        no_telpon: ''
    });
});

router.post('/store', async function(req, res, next){
    try {
        let {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon
        } = req.body;
        
        let Data = { 
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon
        };
        
        await Model_Mahasiswa.Store(Data);
        req.flash('success', 'Berhasil menyimpan data mahasiswa');
        res.redirect('/mahasiswa');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data mahasiswa');
        res.redirect('/mahasiswa');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Mahasiswa.getById(id);
        res.render('mahasiswa/edit', { 
            id_mahasiswa: rows[0].id_mahasiswa,
            nrp: rows[0].nrp,
            nama_depan: rows[0].nama_depan,
            nama_belakang: rows[0].nama_belakang,
            jenis_kelamin: rows[0].jenis_kelamin,
            agama: rows[0].agama,
            umur: rows[0].umur,
            tinggi_badan: rows[0].tinggi_badan,
            gol_darah: rows[0].gol_darah,
            alamat: rows[0].alamat,
            hobi: rows[0].hobi,
            email: rows[0].email,
            no_telpon: rows[0].no_telpon
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



router.post('/update/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        let {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon
        } = req.body;
        
        let Data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon
        };
        
        await Model_Mahasiswa.Update(id, Data); 
        req.flash('success', 'Berhasil menyimpan perubahan data mahasiswa');
        res.redirect('/mahasiswa');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data mahasiswa');
        res.redirect('/mahasiswa');
    }
});

router.get('/delete/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Mahasiswa.Delete(id); 
        req.flash('success', 'Berhasil menghapus data mahasiswa');
        res.redirect('/mahasiswa');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data mahasiswa');
        res.redirect('/mahasiswa');
    }
});

module.exports = router



