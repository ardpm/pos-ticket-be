const multer = require('multer');
const fs = require('fs');

const uploader = (directory, filePrefix) => {
    //define default directory storage (ke folder public nyimpen)
    let defaultDir = './src/public';

    //multer config:
    //1. CONFIG STORAGE LOCATION 
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const storeDir = directory ? defaultDir + directory : defaultDir;
            console.log(storeDir);
            if(fs.existsSync(storeDir)){
                console.log(`Directory ${storeDir} exist ✅🪶`);
                cb(null, storeDir);
            }else{
                fs.mkdir(storeDir, {recursive:true}, (error)=> {
                    if(error){
                        console.log('Error create directory 🪶:', error);
                    }
                    cb(error, storeDir); 
                })
            }
        },
        filename: (req, file, cb) => {
            console.log('Cek original name 🪶: ', file.originalname);
            let ext = file.originalname.split('.')[ file.originalname.split('.').length - 1 ];
            console.log("check extenstion 🪶: ", ext);
            let newName = filePrefix + Date.now() + '.' + ext;
            console.log("New name 🪶: ", newName);
            cb(null, newName);
        }
    });

    //2. CONFIG FILE FILTER 
    const fileFilter = (req, file, cb) => {
        const extFilter = /\.(jpg|jpeg|png|webp)/;
        let checkExt = file.originalname.toLowerCase().match(extFilter);
        if(checkExt){
            cb(null, true);
        }else{
            cb(new Error("Your file ext denied"), false);
        }
    };

    //3. MERETURN MULTER
    return multer({storage, fileFilter});

}

module.exports = uploader; //krn hanya mau upload 1 function (export) ga pake kurung kurawal