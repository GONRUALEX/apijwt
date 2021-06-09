import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';


export const signUp = async (req,res)=>{

    const {username,email,password,roles} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles){
        
        const foundRole =   await Role.find({name:{$in:roles}});
        newUser.roles = foundRole.map(role=>role._id);
    }else{
        const role = await Role.findOne({name:"user"});
        newUser.roles = [role._id];
    }
    
    const savedUser = await newUser.save();

    const token = jwt.sign({id:savedUser._id},config.SECRET,{
        expiresIn:86400
    })
    console.log(newUser)

    res.status(200).json({token})
}


export const signin = async (req, res)=>{
    const {email, password} = req.body;
    //lo que consigo con populate es que me traiga todo el objeto de la tabla roles
    const user = await User.findOne({email:email}).populate("roles");
    console.log(user)
    if (!user){
        res.status(400).json({message:"Error el usuario no existe"})
    }
    const match = await User.comparePassword(password, user.password);
    if (match){
        const token = jwt.sign({id:user._id},config.SECRET,{expiresIn:86400});

        res.status(200).json({token});
    }else{
        res.status(401).json({message:"password incorrecto"})
    }
}

