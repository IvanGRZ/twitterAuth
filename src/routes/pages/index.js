import express from "express";
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/home', authMiddleware, (req, res) => {
    res.render('home');
});

export default router;
