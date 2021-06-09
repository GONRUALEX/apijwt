   import { ROLES }from '../models/Role'
   import User from '../models/User';
   
   export const checkRolesExisted = (req, res, next)=>{
        if (req.body.roles){
            for (let i = 0; i< req.body.roles.length;i++){
                console.log(req.body.roles[i])
                if (!ROLES.includes(req.body.roles[i])){
                    return res.status(400).json({
                        message: `Role ${req.body.roles[i]} no existe`
                    });
                }
            }
        }
        next();
    }


    export const checkDuplicateUsernameOrEmail =async (req, res, next)=>{
        const user = await User.findOne({username:req.body.username});
        if (user) return res.status(400).json({message:'the user ya existe'});
        const email = await User.findOne({email:req.body.username});
        if (email) return res.status(400).json({messsage:"El email ya existe"})
        next();

    }