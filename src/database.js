import mongoose from "mongoose";
(async () => {
    try {
        // const URI = `mongodb://127.0.0.1:${process.env.LOCAL_MONGO_HOST}/${process.env.LOCAL_MONGO_DATABASE}`
const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`
await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error)
    }
})()