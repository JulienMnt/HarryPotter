import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createInventory = async (req, res) =>{
    const {cards, idUser} = req.body;
    const inventory = await prisma.inventory.create({data : {cards, idUser}})
    .then(inventory => {res.status(200).json(inventory);})
    .catch(error => res.status(400).json(error));
}

const getInventory = (req, res) => {
    prisma.inventory.findMany()
    .then(inventory => {res.status(200).json(inventory);})
    .catch(error => res.status(400).json(error));
}

const addCard = (req, res) => {
    const {id, card} = req.body;
    prisma.inventory.update({where : {id}, data : {cards : {push : card}}})
    .then(inventory => {res.status(200).json(inventory);})
    .catch(error => res.status(400).json(error));
}

const deletecard = 0;

const recupLastCard = (req, res) => {
    
}

export {createInventory};