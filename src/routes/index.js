import express from "express";
import passport from "passport";

import authRoutes from './auth/index.js';
import pagesRouter from './pages/index.js';

import productsRoutes from './products/index.js'
import messagesRoutes from './messages/index.js'

import twitterRoutes from './twitterAuth/index.js'

import infoRoutes from './info/index.js'
import randomRoutes from './random/index.js'

const router = express.Router();


router.use(pagesRouter)
router.use('/api/auth', authRoutes);

router.use('/api', productsRoutes)
router.use('/api', messagesRoutes);
router.use('/api', infoRoutes)
router.use('/api', randomRoutes)

router.use('/api/auth/twitter',twitterRoutes)

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/signin'}));

export default router;