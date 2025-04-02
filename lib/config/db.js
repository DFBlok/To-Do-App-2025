import mongoose from "mongoose"

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://duwayneblok01:cWvrJy2IGHLESTW8@cluster0.m5cenvk.mongodb.net/todo-app');
    console.log("DB Connected");
}