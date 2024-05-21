import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createInventory = async (req, res) =>{
    let {cards, idUser} = req.body
    const inventory = await prisma.inventory.create({data : {cards,idUser}})
    .then(inventory => {res.status(200).json(inventory);})
    .catch(
        console.log("error"),
        error => res.status(400).json(error));
}

const getInventory = (req, res) => {
    prisma.inventory.findMany()
    .then(inventory => {res.status(200).json(inventory);})
    .catch(error => res.status(400).json(error));
}

const getInventoryUser = (req, res) => {
    console.log(req.headers)
    prisma.inventory.findUnique({where : {idUser : JSON.parse(req.headers.iduser)}})
    .then(inventory => {res.status(200).json(inventory);})
    .catch(error =>  res.status(400).json(error));
}

const addCard = (req, res) => {
    const {idUser, card} = req.body;
    console.log(idUser);
    
    prisma.inventory.findUnique({where : {idUser : parseInt(idUser)}})
    .then(inventory => {
        if(inventory.cards == ""){
            let updatedCards = [card];  
            updatedCards = JSON.stringify(updatedCards);
            return prisma.inventory.update({ where: { idUser : parseInt(idUser) }, data: { cards: updatedCards } });
        }
        else {
            let inv = JSON.parse(inventory.cards);
            let updatedCards = [...inv, card];
            updatedCards = JSON.stringify(updatedCards);
            console.log(updatedCards);
            return prisma.inventory.update({ where: { idUser : parseInt(idUser) }, data: { cards: updatedCards } });
        }
    })
    .then(inventory => {res.status(200).json(inventory);})
    .catch(error => res.status(400).json(error));
}

const deletecard = 0;

const recupLastCard = (req, res) => {
    prisma.inventory.findMany({
        where: {idUser : req.headers.idUser},
        orderBy: {id : 'desc'}, take: 1
    })
    .then(inventory => {res.status(200).json(inventory);})
    .catch(error => res.status(400).json(error));
}

export {createInventory, getInventory, getInventoryUser, addCard, recupLastCard};