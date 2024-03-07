const connection = require('../config/database');

class Model_Mahasiswa {

    // Method untuk mengambil semua data dari tabel Mahasiswa.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Mahasiswa ORDER BY id_mahasiswa DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk menyimpan data ke dalam tabel Mahasiswa.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Mahasiswa SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel Mahasiswa.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Mahasiswa WHERE id_mahasiswa = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Mahasiswa.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Mahasiswa SET ? WHERE id_mahasiswa = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Mahasiswa berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Mahasiswa WHERE id_mahasiswa = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Mahasiswa;
