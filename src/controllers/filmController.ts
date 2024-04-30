import { Request, Response } from 'express';
import Film from '../models/film';

class FilmController {
    async getAllFilms(req: Request, res: Response) {
        try {
            const films = await Film.find();
            res.send(films);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async deleteFilm(req: Request, res: Response) {
        try {
            const film = await Film.findByIdAndDelete(req.params.id);
            if (!film) {
                return res.status(500).send("Não encontrado");
            }
            res.send(film);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateFilm(req: Request, res: Response) {
        try {
            const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(film);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createFilm(req: Request, res: Response) {
        try {
            const film = new Film(req.body);
            await film.save();
            res.send(film);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default FilmController