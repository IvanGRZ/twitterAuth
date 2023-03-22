import express from "express";
import session from "express-session";
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv'
import _ from "lodash";
import compression from "compression";
import { createServer } from 'http';
import { Server } from "socket.io";
import passport from "passport";
import md5 from "md5";
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as TwitterStrategy} from 'passport-twitter'

import mongooseConnect from './src/services/models/connect.js';
import router from './src/routes/index.js'
import { getStoreConfig } from './src/services/session/config.js';
import loggerMiddleware from "./src/middlewares/loggerMiddleware.js";

import { AuthDao } from "./src/daos/index.js";


dotenv.config();

const app = express();
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'default';

const http = new createServer(app);
const io = new Server(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'));
app.use(loggerMiddleware);
app.use(compression());

mongooseConnect();

app.use(cookieParser(COOKIE_SECRET));

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

app.set('view engine', 'ejs');
app.set('views', './public/views');

passport.use('twitter', new TwitterStrategy({
    consumerKey:"DH98IJEVZjecdPig5BRdiEG5U",
    consumerSecret: "g2CsuAfcOKRB8gx5JFg55GmwT6sbqBZjB6vtgUu0QgsuSfKNI0",
    callbackURL: "http://localhost:3005/auth/twitter/callback"
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));


passport.use('login' ,new LocalStrategy(async (username, password, done) => {
    const user = await AuthDao.login(username, md5(password))

    if(!user){
        return done(null, false);
    }
    else{
        return done(null, user)
    }
}));

passport.use('signup', new LocalStrategy({ passReqToCallback: true},
    async (req, username, password, done) => {

        if (_.isNil(username) || _.isNil(password) || _.isNil(req.body.name)) {
            return res.status(400).json({
              success: false,
              message: `${httpStatus[400]}: Username, password or name missing`,
            });
        }

        else {
            const existUser = await AuthDao.signUp(
                username, 
                md5(password), 
                req.body.address, 
                req.body.age, 
                req.body.picture,
                req.body.name, 
                req.body.phone,
            );
            if(typeof existUser == 'boolean'){
                return done(null, false);
            }
            else{
                return done(null, existUser);
            }
        }
}));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await AuthDao.findById(id)
    done(null, user);
});


app.use(router);
//app.use(express.static('./public'));
//app.use(express.static('./public/messageCenter'));

const products = []
const messages = []
const fakeProducts = []

io.on('connection', (socket) => {

    socket.emit('UPDATE_DATA', messages);
    socket.emit('PRODUCT', products);
    socket.emit('UPDATEFAKEPRODUCT', fakeProducts);


    socket.on('NEW_MESSAGE_TO_SERVER', (data, mail) => {
        messages.push(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data);
    });

    socket.on('NEW_PRODUCT', data => {
        products.push(data)
        io.sockets.emit('PRODUCT', products)
    });

    socket.on('FAKEPRODUCT', data => {
        fakeProducts.push(...data)
        io.sockets.emit('UPDATEFAKEPRODUCT', fakeProducts)
    });
})




export default app;