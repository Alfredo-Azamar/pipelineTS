import e, { Request, Response } from 'express';
import AbstractController from './AbstractController';
import db from '../models';
import ReservacionModel from '../modelsNOSQL/reservacionNOSQL';

class ReservacionController extends AbstractController {
    // Singleton
    // Atributos de clase
    private static _instance: ReservacionController;

    // Métodos de clase
    public static get instance(): AbstractController {
        if (!this._instance) {
            this._instance = new ReservacionController("reservacion");
        }
        return this._instance;
    }

    protected initRoutes(): void {
        this.router.get('/test', this.getTest.bind(this));
        this.router.get('/consultarReservacion', this.consultarReservacion.bind(this));
        this.router.post('/crearReservacion', this.crearReservacion.bind(this));
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

    private async consultarReservacion(req: Request, res: Response) {
        try {
            const reservaciones = await ReservacionModel.scan().exec().promise();
            console.log(reservaciones)
            res.status(200).send(reservaciones[0].Items);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }

    private async crearReservacion(req: Request, res: Response) {
        try {
            console.log(req.body);
            await ReservacionModel.create(req.body);
            console.log("Reservacion creado");
            res.status(201).send({ message: 'Reservacion creado' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }

}

export default ReservacionController;