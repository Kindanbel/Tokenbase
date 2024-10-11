import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import routes from './routes.js'



const app = express()
const port = process.env.PORT || 3001;


//MiddleWare 
app.use(cors())
app.use(express.json())


//Calling all the routes and software system structure

app.use("/api/v1", routes)





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})