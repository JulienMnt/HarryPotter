import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// import body from '../js.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const signUp = async (req, res) => {
    const {email, pseudo, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de fois que le mot de passe va être crypté / Ne pas oublier le await
    prisma.user.create({data : {email, pseudo, password : hashedPassword}},)
    .then(user => { res.status(200).json(user);})
    .catch(error => { res.status(400).json(error); });
    // Mettre un truc qui nous donne le token
}

const logIn = async (req, res) => {
    console.log(req.body);
    prisma.user.findUnique({where: {email : req.body.email},})
    .then(data => {
        console.log("data", data);
        if (!data) res.status(400).send({message: "User not found"});
        const valid = bcrypt.compareSync(req.body.password, data.password);
        if (!valid) res.status(400).send({message: "Invalid password"});
        console.log("data2");
        const token = jwt.sign({id:data.id , email: data.email}, process.env.JWT_SECRET, {expiresIn : "5h"});
        console.log("token");
        res.send({token: token});
    }).catch(error => { res.status(400).json(error); });
}


export { signUp, logIn };