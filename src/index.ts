import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
// import http from 'http';
import cors from 'cors';
import authRoutes from "./routes/authRoutes";
// import {User} from "./entity/User";

createConnection().then(()=> {

   console.log("Connected to DB");
   // create and setup express app
    const app = express();
    // const server = http.createServer(app);

    app.use(express.json());
    app.use(cors());
    const userRoutes = require('./routes/userRoutes')
    app.use('/tasks', userRoutes);
    app.use('/auth',authRoutes);
    const port = 8080;
    app.listen(port, () => {
      console.log('Server is up at -> ' + `http://localhost:${port}/`);
    });

}).catch(error => console.log(error));
