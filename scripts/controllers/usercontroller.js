import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

const getUser = async (req, res) => {
    try{
        const token = req.headers['x-acces-token'];
        if (!token) window.location.href='../Pages/register.html' // Le 403 fait parti du tableau des status (pas obligatoire)
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // jwt.verify permet de vérifier si le token est valide && 
            if (err) return res.status(403).send({auth: false ,message: 'Failed to authenticate token'});
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.id // decoded.id est l'id du token
                }
            }).then(data => {
                res.send(data);  // Ici data est l'user 
                console.log(data);
            }).catch(error => {
                res.send(error);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export { getUser };