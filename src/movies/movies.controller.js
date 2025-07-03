import express from "express";
import {Actor, Movie} from "../models/index.js";
import multer from 'multer';
import {Op} from "sequelize";
import {parseMovies} from "../utils/fileParse.js";

const router = express.Router();
const upload = multer();



router.post('/add', async (req, res) => {
    const {title, year, format, actors} = req.body;

    try {
        const movie = await Movie.create({title, year, format});

        for (const actorName of actors) {
            const [actor] = await Actor.findOrCreate({
                where: {name: actorName}
            });
            await movie.addActor(actor);
        }

        res.status(201).send('Movie with actors created!');
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to create movie'});
    }
});

router.get('/', async (req, res) => {
    const { actor, title, sort, order } = req.query;

    try {
        const where = {};
        const actorFilter = actor ? { name: { [Op.like]: `%${actor}%` } } : undefined;

        if (title) {
            where.title = { [Op.like]: `%${title}%` };
        }

        const validSortFields = ['title', 'year'];
        const sortField = validSortFields.includes(sort) ? sort : null;

        const sortOrder = (order === 'desc') ? 'DESC' : 'ASC';

        const movies = await Movie.findAll({
            where,
            include: {
                model: Actor,
                where: actorFilter,
                through: { attributes: [] },
                attributes: ['name'],
                required: !!actor
            },
            order: sortField ? [[sortField, sortOrder]] : undefined
        });

        const result = movies.map(movie => ({
            title: movie.title,
            year: movie.year,
            format: movie.format,
            actors: movie.Actors.map(a => a.name)
        }));

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Помилка при отриманні фільмів');
    }
});


router.get('/:id', async (req, res) => {
    const movie = await Movie.findByPk(req.params.id, {
        include: {
            model: Actor,
            through: {attributes: []}
        }
    });
    res.send(movie);
})

router.patch('/:id', async (req, res) => {
    const movie = await Movie.findByPk(req.params.id);
    await movie.update(req.body);
    res.send('Movie updated!');
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.send('Movie deleted!');
})


router.post('/import', upload.single('file'), async (req, res) => {
    try {
        const buffer = req.file.buffer;
        const text = buffer.toString('utf-8');

        const movies = parseMovies(text);


        for (const movie of movies) {
            const [createdMovie] = await Movie.findOrCreate({
                where: { title: movie.title, year: movie.year },
                defaults: {
                    format: movie.format
                }
            });

            for (const actorName of movie.stars) {
                const [actor] = await Actor.findOrCreate({ where: { name: actorName } });
                await createdMovie.addActor(actor);
            }
        }
        res.send('Movies imported!');

    } catch (err) {
        console.error(err);
        res.status(500).send('Помилка при обробці файлу');
    }
});

export default router;