import dynamodb from "../services/dynamoService";
import joi from 'joi';
import {PREFIX_NAME} from '../config';

const ReservacionModel = dynamodb.define('reservacion',{
    hashKey:'ReservacionId',
    timestamps:false,
    schema:{
        ReservacionId:dynamodb.types.uuid(),
        Fecha:joi.date(),
        Precio:joi.number(),
        Habitacion:joi.string(),
    },
    tableName:`Reservacion${PREFIX_NAME}`
});

dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log('Tabla creada exitosamente')
})

export default ReservacionModel;