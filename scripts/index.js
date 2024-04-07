import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router.js';
import ip from 'ip';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(router);

console.log(ip.address());


app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
});

console.log("Hello world!");