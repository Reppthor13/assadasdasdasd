const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mozi_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function screenings() {
    const query = 'SELECT vetitesek.id, vetitesek.film_cim, vetitesek.datum, vetitesek.jegyar, mozik.nev, mozik.varos FROM vetitesek INNER JOIN mozik ON vetitesek.mozi_id = mozik.id;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function screeningsPost(film_cim, datum, jegyar, mozi_id) {
    const query = 'INSERT INTO vetitesek (film_cim, datum, jegyar, mozi_id) VALUES (?,?,?,?);';
    const [rows] = await pool.execute(query, [film_cim, datum, jegyar, mozi_id]);
    return rows;
}

async function screeningsDelete(id) {
    const query = 'DELETE FROM vetitesek WHERE id = ?;';
    const [rows] = await pool.execute(query, [id]);
    return rows;
}

async function cinemas(){
    const query = 'SELECT * FROM mozik;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function cinemasSummary(){
    const query = 'SELECT mozik.nev, mozik.varos, COUNT(vetitesek.id) AS vetitesekSzama, AVG(vetitesek.jegyar) AS atlagJegyar FROM mozik INNER JOIN vetitesek ON mozik.id = vetitesek.mozi_id GROUP BY mozik.nev, mozik.varos;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function screeningsByCity(varos) {
    const query = 'SELECT vetitesek.*, mozik.nev, mozik.varos FROM vetitesek INNER JOIN mozik ON vetitesek.mozi_id = mozik.id WHERE mozik.varos = ?;';
    const [rows] = await pool.execute(query, [varos]);
    return rows;
}

//!Export
module.exports = {
    selectall,
    screenings,
    screeningsPost,
    screeningsDelete,
    cinemas,
    cinemasSummary,
    screeningsByCity
};
