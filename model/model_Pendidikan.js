const connection = require('../config/database');

class Model_Pendidikan {

    // Method untuk mengambil semua data dari tabel Pendidikan.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Pendidikan ORDER BY id_pendidikan DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk menyimpan data ke dalam tabel Pendidikan.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Pendidikan SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel Pendidikan.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Pendidikan WHERE id_pendidikan = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Pendidikan.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Pendidikan SET ? WHERE id_pendidikan = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Pendidikan berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Pendidikan WHERE id_pendidikan = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Pendidikan;
