import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost/taskDB',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true,
    useCreateIndex:true
}).
then((db)=>{
    console.log("Conectado a la bd");
}).
catch((err)=>{
    console.log("problemas al conectar a la bd",err);
});