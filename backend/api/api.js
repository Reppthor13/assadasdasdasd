const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/screenings', async(req, res) => {
    try{
        const screenings = await database.screenings();
        res.status(200).json({
            message: 'Ez a végpont működik.',
            results: screenings
        });
    }catch (error) {
        res.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/screeningsPost', async(req, res) => {
    try{
        await database.screeningsPost(req.body.film_cim, req.body.datum, req.body.jegyar, req.body.mozi_id);
        res.status(200).json({
            message: 'Ez a végpont működik.',
        });
    }catch (error) {
        res.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.delete('/screenings/:id', async(req, res) => {
    try{
        const screenings = req.params.id;
        const asdd = await database.screeningsDelete(screenings);
        res.status(200).json({
            message: 'Ez a végpont működik.',
            results: screenings
        });
    }catch (error) {
        res.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/cinemas', async(req, res) => {
    try{
        const cinemas = await database.cinemas();
        res.status(200).json({
            message: 'Ez a végpont működik.',
            results: cinemas
        });
    }catch (error) {
        res.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/cinemas/summary', async(req, res) => {
    try{
        const cinemas = await database.cinemasSummary();
        res.status(200).json({
            message: 'Ez a végpont működik.',
            results: cinemas
        });
    }catch (error) {
        res.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/screeningsByCity/:varos', async(req, res) => {
    try{
        const screenings = await database.screeningsByCity(req.params.varos);
        res.status(200).json({
            message: 'Ez a végpont működik.',
            results: screenings
        });
    }catch (error) {
        res.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

module.exports = router;
