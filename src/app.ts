import express, { Application, Request, Response, NextFunction } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import fileUpload from "express-fileupload"
import router from './router';

class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console(),
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }));

        this.app.use((req,res,next)=>{
            const token = req.headers['key'];
            if(!token){
                res.status(403).json({error:"API key is missing."});
            }else if (token === `Bearer ${process.env.STATIC_AUTH}`) {
                next(); 
            } else {
                res.status(401).json({"error":"Invalid API key."});
            }
        })

        this.app.disable('x-powered-by')
        this.app.use(fileUpload())
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/user',router)
    }

    private initializeRoutes() {
        this.app.get('/health', (req: Request, res: Response) => {
            res.send("application ok's");
        });
    }

    private initializeErrorHandling() {
        this.app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console(),
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }));

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            winston.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send('Internal Server Error');
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

const port = +process.env.TSPORT
const server = new App(port);
server.listen();