import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const onLight = async (req,res) => {
    console.log(req.headers.house);
    prisma.light.findMany({
        where: {house : req.headers.house}
    })
    .then(light => res.json(light))
    .catch(error => {
        console.log(error);
        res.status(400).json(error); 
    });
}

const postCard = async (req, res) => {
    const {house, name} = req.body;
    prisma.card.create({data : {house, name}})
    .then(card => res.status(200).json(card))
    .catch(error => res.status(400).json(error));
}

// Il faut que j'exporte toute l'api et pas juste un light 
export {onLight, postCard};