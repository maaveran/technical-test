import { SequelizeOptions } from "sequelize-typescript"
import path from 'path';

const modelsPath = ()=>{
    if(process.env.NXTS_ENV != "development") return path.resolve('dist/models')
    else return path.resolve('models') 
}

export const nextrans_public  = function() :SequelizeOptions {
    const configuration : SequelizeOptions = {
        username: process.env.NXTS_DB_USER,
        host: process.env.NXTS_DB_HOST,
        password: process.env.NXTS_DB_PASSWORD,
        database: process.env.NXTS_DB_NAME,
        dialect: "mysql",
        logging : false,
        pool: {
            max :5,
            min:0,
        },
        define:{
            timestamps: true,
            underscored : true,
            paranoid: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at"
        },
        dialectOptions :{
            supportBigNumbers: true,
            bigNumberStrings: true,
        },
        models : [ modelsPath()]
    }
    return configuration
}