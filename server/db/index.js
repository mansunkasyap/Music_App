import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
dotenv.configDotenv({path: './.env'})

async function ConnectDB(){
try{
    console.log('Came Inside...', `${process.env.COMPASS_URI}/${process.env.DB_NAME}`);
    await mongoose.connect(`${process.env.COMPASS_URI}/${process.env.DB_NAME}`)
    console.log('Connected ...');
}catch(err){
    console.log("Disconnected...", err);
}
}
export default ConnectDB