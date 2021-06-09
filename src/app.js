import express from 'express';
import morgan from 'morgan';
import { author } from '../package.json';
import productRouter from './routes/product.routes'

import authRoutes from './routes/auth.routes'
import {createRoles} from './libs/initialSetup';
import userRoutes from './routes/user.routes';




const app = express();
createRoles();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res)=>{
    console.log("Accediendo a ruta principal");
    res.json({message:"bienvenido",author})
})

app.post('/', (req, res)=>{
    console.log(req.body);
    res.send("ok")
})

app.use('/products',productRouter);
app.use('/auth',authRoutes);
app.use('/user',userRoutes);

app.set('port',process.env.PORT || 3000);

export default app;