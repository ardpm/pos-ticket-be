const { check, validationResult } = require("express-validator");
//check melakukan pengecekan, val result itu dptin result hasil pengecekan, keterangan hover di check

//siapin middleware:
module.exports = {
    checkUser: async (req, res, next) => {
        try {
            console.log("request path", req.path); //routing api mana yg sedang diakses user
            if (req.path == '/register'){
                await check("username").notEmpty().isAlphanumeric().withMessage("Invalid username 😥 please try again").run(req); //urutan dia cek username dlu baru email (krn await)
                await check("email").notEmpty().isEmail().withMessage("Invalid email 😥 please try again").run(req);
            } else if(req.path == '/auth'){
                await check("email").notEmpty({nullable:true}).isEmail().withMessage("Invalid email 😥 please try again").run(req);
            } //setelah selesai baru lanjur cek password
            await check("password").notEmpty().isStrongPassword({
                //tergolong password strong/bagus apa engga, dan parameternya apa aja dicustom harus ada apa aja minimum length characters 9, min
                minLength: 6,
                minLowercase: 1,
                minNumbers: 1,
                minUppercase: 1,
                minSymbols: 0,
            })
            .withMessage( //kalo tidak memenuhi kriteria keluar message bisa tambahin smua yang lain jg!
                "Your password is to short or requirments has not been met 😥"
              )
              .run(req);
            const validation = validationResult(req); //cek pake validationresult untuk mastiin resultnya apa dr masing" pengecekan
            console.log("Validation result : ", validation);

            if(validation.isEmpty()){
                    //kalo errornya kosong lanjut ke middleware berikutnya
                next() // pindah ke middleware berikutnya
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Validation invalid",
                    error: validation.errors,
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}