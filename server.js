import express from 'express';
import {sequelize} from './src/models/index.js';
import moviesController from './src/movies/movies.controller.js';
import userController from './src/user/user.controller.js';
import authMiddleware from "./src/middleware/authMiddleware.js";
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'pages')));

app.get('/user/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});
app.get('/user/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});
app.get('/uploadFile', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'upload.html'));
});


app.use('/user', userController);
app.use('/movies', authMiddleware, moviesController);

sequelize.sync({force: true}).then(() => {
    console.log('Database Connected!');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
