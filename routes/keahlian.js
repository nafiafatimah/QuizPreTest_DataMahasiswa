var express = require('express');
var router = express.Router();
var connection = require('../config/database');
const Model_Keahlian = require('../model/model_Keahlian'); 

router.get('/', async function(req, res, next){
   try {
      let rows = await Model_Keahlian.getAll(); // Mengambil semua data keahlian
      res.render('keahlian/index', { 
         data: rows
      });
   } catch (error) {
      console.error("Error:", error);
      req.flash('error', 'Gagal memuat data keahlian');
      res.redirect('/keahlian');
   }
});

router.get('/create', async function(req, res, next){
    try {
        res.render('keahlian/create', { 
            nama_keahlian: '',
            tingkat_keahlian: '',
            id_mahasiswa: ''
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/store', async function(req, res, next){
    try {
        let {
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        } = req.body;
        
        let Data = { 
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        };
        
        await Model_Keahlian.Store(Data);
        req.flash('success', 'Berhasil menyimpan data keahlian');
        res.redirect('/keahlian');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data keahlian');
        res.redirect('/keahlian');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let keahlian = await Model_Keahlian.getById(id);
        res.render('keahlian/edit', { 
            id_keahlian: keahlian[0].id_keahlian,
            nama_keahlian: keahlian[0].nama_keahlian,
            tingkat_keahlian: keahlian[0].tingkat_keahlian,
            id_mahasiswa: pendidikan[0].id_mahasiswa
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
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        } = req.body;
        
        let Data = {
            nama_keahlian,
            tingkat_keahlian,
            id_mahasiswa
        };
        
        await Model_Keahlian.Update(id, Data); 
        req.flash('success', 'Berhasil menyimpan perubahan data keahlian');
        res.redirect('/keahlian');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data keahlian');
        res.redirect('/keahlian');
    }
});

router.get('/delete/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Keahlian.Delete(id); 
        req.flash('success', 'Berhasil menghapus data keahlian');
        res.redirect('/keahlian');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data keahlian');
        res.redirect('/keahlian');
    }
});

module.exports = router;
