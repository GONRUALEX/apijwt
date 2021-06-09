import jwt from 'jsonwebtoken';
import config from '../config';
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req,res,next)=>{
   try {const token = req.headers["x-access-token"];
   console.log(token);
    if (!token) return res.status(403).json({message:"error con el token, no existe"});

    const decoded = jwt.verify(token, config.SECRET);
    console.log(decoded);
    req.userId = decoded.id;
    const user = await User.findById(decoded.id,{password:0});
    console.log(user)
    if (!user) return res.status(404).json({message:"El usuario en el token no está"});
    
    
    next();
}catch(err){
    console.log(err);
    return res.status(404).json({message:err});
}
}

export const isModerator = async (req, res, next)=>{
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id:{$in:user.roles }});

    console.log("roles", roles);
    for (let i=0; i<roles.length;i++){
         if (roles[i].name=="moderator"){
             next();
             return;
         }

    }
    return res.status(403).json({message:"No tienes el rol adecuado moderator"})


    
}

export const isAdmin = async (req, res, next)=>{
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id:{$in:user.roles }});

    console.log("roles", roles);
    for (let i=0; i<roles.length;i++){
         if (roles[i].name=="user"){
             next();
             return;
         }

    }
    return res.status(403).json({message:"No tienes el rol adecuado admin"})


}