import Role from '../models/Role';

export const createRoles = async()=>{
    //miramos si ya hay creado los roles, si no los creamos
try{
    const count = await Role.estimatedDocumentCount();

    if ( count>0 ) return;

    const values = await Promise.all([
        new Role({name:'user'}).save(),
        new Role({name:'moderator'}).save(),
        new Role({name:'admin'}).save()
    ]);

    console.log(values)
}catch(err){
    console.log(err)
}


};