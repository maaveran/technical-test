import {Router} from "express"
import Joi from "joi"

const router =  Router();

router.post('/register',(req,res)=>{
    const userPostSchema = Joi.object().keys({
        name : Joi.string().required().min(5).max(75),
        address : Joi.string().required(),
        email : Joi.string().required().email(),
        password :  Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        creditcard_type : Joi.string().required(),
        creditcard_number : Joi.string().required().min(8).max(19),
        creditcard_name: Joi.string().required().min(5).max(75),
        creditcard_expired : Joi.string().required().pattern(/^((0[1-9])|(1[0-2]))\/(2[2-9]|[3-9][/d])$/),
        creditcard_cvv : Joi.string().required().max(3).min(3)
    })

    const validationResult = userPostSchema.validate(req.body);

    if (validationResult.error) {
        res.status(400).json(validationResult.error.message)
    }else{
        const uploadedFile = req.files.uploadedFile;
    }
})

export default router