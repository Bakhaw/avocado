import express from 'express';
import cors from 'cors';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

import config from './config';
import dbConnection from './db';
import passport from './passport';

// Routes
import authRouter from './routes/auth';
import favRouter from './routes/favoris';
import libRouter from './routes/library';
import productsRouter from './routes/products';
import recettesRouter from './routes/recettes';
import usersRouter from './routes/users';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'hellodude',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/recipes', recettesRouter);
app.use('/favoris', favRouter);
app.use('/users', usersRouter);
app.use('/library', libRouter);

app.listen(config.port, () => console.log(`Avocado back running on port ${config.port}...`));