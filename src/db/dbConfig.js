import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.mongo_url)
        const connection= mongoose.connection;
        connection.on('connected',()=>{
            console.log('Mongo DB Connected Succesfully')
        })
        connection.on('error',(err)=>{
            console.log('mongo db connection error please connect it and asuure the running of it'+err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong");
        console.log(error)
    }
}