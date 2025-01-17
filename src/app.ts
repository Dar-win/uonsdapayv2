import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan'
import {createConnection} from "typeorm";
import { buildSchema } from 'type-graphql';
import {graphqlHTTP} from 'express-graphql'
import "reflect-metadata";
import "./config"; 
import database from "./config/database";
import controllers from "./services"
import { UserResolver } from './services/user/user.resolver';
import { CampusResolver } from './services/user/campus.resolver';
import { PaymentItemResolver } from './services/transaction/payment_item.resolver';
import { PledgeResolver } from './services/transaction/pledge.resolver';
import { ContributionTransactionResolver } from './services/transaction/transaction_contribution.resolver';
import { PaymentTransactionResolver } from './services/transaction/transaction_payment.resolver';
import { ContributionResolver } from './services/transaction/contribution.resolver';
import { QuickUserResolver } from './services/user/quick_user.resolver';
import errorHandler from './middleware/error.middleware';
const app:express.Application = express();


(async () => {
    let connection: any;
    try {
      connection = await createConnection(database);
      console.log("Database connected")
    } catch (error) {
        console.log("Error connecting to database")
        console.log(error)
    }
  

    app.use(morgan('dev'))
    app.use(express.json())

    const schema = await buildSchema({
      resolvers: [
        UserResolver, 
        CampusResolver, 
        PaymentItemResolver, 
        PledgeResolver, 
        ContributionTransactionResolver, 
        PaymentTransactionResolver,
        ContributionResolver,
        QuickUserResolver
      ]

    })
    app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true
    }))

   

    const setControllers = controllers.map((controller) => new controller());
    setControllers.forEach((controller) => {
      app.use("/", controller.router);
    });

    app.use(errorHandler)

    // let campusController:any = controllers[0];
    // campusController = new campusController();

    // app.use('/campus', campusController)
    // await refreshGrants()




    app.listen(3000, ()=>{
          console.log("Listening on port 3000");
          
      });
  })();

// app.listen(3000, ()=>{
//     console.log(process.env.MYSQL_PASSWORD)
//     console.log("Listening on port 3000");
    
// })

// app.get('/', (req, res)=>{
//     res.send("Hello world")
// })