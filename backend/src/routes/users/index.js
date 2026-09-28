const express = require('express');
const router = express.Router();
const dataBase = require('../../db');

router.get('/users', async(req, res) => {

    try {
        const sql = 'SELECT * FROM users WHERE 1=1';
        const [result] = await dataBase.query(sql);
        res.status(201).json(result)

    } catch (error) {
        return res.status(500).json({
            error: err,
            message: " error 500 from getUsers! "
        })
    }
});

module.exports = router;