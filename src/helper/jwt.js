const jwt = require('jsonwebtoken');

module.exports = {
    // isi data dari login
    createToken: (payload, exp = '24h') => jwt.sign(payload, 'JoeyTribiani', {
        expiresIn: exp
    }),

    readToken: (request, response, next) => {
        jwt.verify(request.token, 'JoeyTribiani', (error, decript) => {
            if (error) {
                return response.status(401).send({
                    success: false,
                    message: 'Authenticate failed'
                })
            }
    
            request.decript = decript; // meneruskan hasil terjemahan ke middleware berikutnya 
            next();
        })
    }
}