const { check, validationResult } = require('express-validator');

module.exports = {
    checkUser: async (req, res, next) => {
        try {
            console.log("req path : ", req.path);
            if (req.path == '/register') { 
                await check("username").notEmpty().isAlphanumeric().run(req);
                await check("email").notEmpty().isEmail().run(req);
            } else if (req.path == '/auth') {
                await check("email").optional({ nullable: true }).isEmail().run(req);
            } else if (req.path == '/forgot'){
                await check("email").notEmpty().isEmail().run(req);
            }
            await check("password").notEmpty().isStrongPassword({ 
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0
            }).withMessage('Your password is to short / requirement are not met') 
                .run(req);

            const validation = validationResult(req); 
            console.log("Validation result : ", validation);
            if (validation.isEmpty()) { 
                next()
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'Validation Invalid',
                    error: validation.errors
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}