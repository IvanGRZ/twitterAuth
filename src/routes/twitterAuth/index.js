import express from "express";
import md5  from "md5";
import passport from 'passport';

const router = express.Router();

router.post('/auth/twitter/signup', passport.authenticate('signup', {failureRedirect: '/error'}), async (req, res) => {
    console.log(req.user);
    res.redirect('/home');
});

router.post('/auth/twitter/signin', passport.authenticate('login', {failureRedirect: '/error'}), async (req, res) => {
    console.log(req.user);
    res.redirect('/home');
});

router.get('/auth/twitter/signout', (req, res) => {
    req.logout(() => {
        res.redirect('/signin');
    })
});

export default router;
