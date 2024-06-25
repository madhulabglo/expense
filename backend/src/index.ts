// src/index.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import loginRoutes from './router/loginRouter';
import otpRoutes from "./router/otpRouter"
import expenseRoutes from "./router/expenseRouter"
import onlyexpenseRoutes from "./router/onlyexpenseRouter"
import roommateRoutes from "./router/roommateRouter"
import cors from "cors"

import connectToDB from './config/dbConfig';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
// app.use('/api', userRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

connectToDB()
// app.use("/api",loginRoutes)
app.use(otpRoutes)
app.use(expenseRoutes)
app.use(onlyexpenseRoutes)
app.use(roommateRoutes)


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
   