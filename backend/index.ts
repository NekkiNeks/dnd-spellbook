import express, { Request, Response } from "express"
import cors from 'cors'
import spellsRouter from "./src//routers/spells"

const app: express.Application = express()
const port = 3333

// Настройки CORS для приложения (Имеют смысл только при запуске через webview)
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['content-Type', 'Authorization']
    }))

app.use('/spells', spellsRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



