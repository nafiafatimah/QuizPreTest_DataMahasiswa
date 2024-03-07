const connection = require('../config/database');


class Model_Keahlian {

    // Method untuk mengambil semua data dari tabel Keahlian.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Keahlian ORDER BY id_keahlian DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk menyimpan data ke dalam tabel Keahlian.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Keahlian SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel Keahlian.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Keahlian WHERE id_keahlian = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Keahlian.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Keahlian SET ? WHERE id_keahlian = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Keahlian berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Keahlian WHERE id_keahlian = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Keahlian;
