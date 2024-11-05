import app from "./app.js";
import ConnectDB from "./db/index.js";
const PORT = process.env.PORT
ConnectDB()
.then(()=>{
    app.on('error', (err)=>{
        console.log(err);
        throw err;
    })
    app.listen(PORT, ()=>{
        console.log(`Listening on ${PORT}`);
    })
})
.catch(err => console.log(err))