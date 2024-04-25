import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const onLight = async (req,res) => {
    prisma.light.findUnique({where : {house : req.headers["house"]}})
    .then(light => res.status(200).json(light))
    .catch(error => res.status(400).json(error));
}

export {onLight};