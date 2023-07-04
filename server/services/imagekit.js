import ImageKit from "imagekit";
import dotenv from 'dotenv';

dotenv.config();

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_ENDPOINT,
});

export const uploadImage = (file, filename, folder) => 
    imagekit.upload({
        file : file,
        fileName : filename,
        useUniqueFileName: false,
        folder: `/recipilation/${folder}/`
    }).then(res=>({imageId:res.fileId, image:res.url}))
    .catch(err=>{console.log(err);console.log(filename)});