import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log(`DB is connnected`);
        console.log(`Connection instance : `)
        console.dir(connectionInstance.connection.host);
    } catch (error) {
        console.log(`Connection failed for mongodb : `,error);
        process.exit(1)
    }
}

export {connectDB}