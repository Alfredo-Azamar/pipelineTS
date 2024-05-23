import { Request, Response } from 'express';
import AbstractController from './AbstractController';
import db from '../models';

class CharacterController extends AbstractController {
    // Singleton
    // Atributos de clase
    private static _instance: CharacterController;

    // Métodos de clase
    public static get instance(): AbstractController {
        if (!this._instance) {
            this._instance = new CharacterController("character");
        }
        return this._instance;
    }

    protected initRoutes(): void {
        this.router.get('/test', this.getTest.bind(this));
        this.router.get('/consultarPersonaje', this.consultarPersonaje.bind(this));
        this.router.post('/crearPersonaje', this.crearPersonaje.bind(this));
    }

    private getTest(req: Request, res: Response) {
        try {
            console.log("Test");
            res.status(200).send('Hello world');
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }

    private async consultarPersonaje(req: Request, res: Response) {
        try {
            const personajes = await db.Personaje.findAll();
            res.status(200).send(personajes);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }

    private async crearPersonaje(req: Request, res: Response) {
        try {
            console.log(req.body);
            await db.Personaje.create(req.body);
            console.log("Personaje creado");
            res.status(201).send({ message: 'Personaje creado' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }

}

export default CharacterController;