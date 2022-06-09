import ErrorResponse from "../utils/ErrorResponse.js";
import SingleFileUpload from '../models/SingleFileUpload.js'
import MultiFiles from '../models/MultiFiles.js'

export const getfileUpload = async (req, res, next)=>{
    try{
        const fileUploaded = await SingleFileUpload.find()
        res.status(200).json({success: true, data: fileUploaded})
    }catch(error){
        return next(error)
    }
}
export const getMultiFileUpload = async (req, res, next)=>{
    try{
        const fileUploaded = await MultiFiles.find()
        res.status(200).json({success: true, data: fileUploaded})
    }catch(error){
        return next(error)
    }
}
export const fileUpload = async (req, res, next)=>{
    try{

        const file = new SingleFileUpload({
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            filePath: req.file.path,
            fileSize: getSizeFile(req.file.size, 2),
        })
        const fileUploaded = await file.save()
        res.status(201).json({message: 'the file upload success', fileUploaded})
    }catch(error){
        return next(error)
    }
}
export const multiFileUpload = async (req, res, next)=>{
    try{
        const arrFile = []
        req.files.forEach((element)=> {
            const file = {
                fileName: element.originalname,
                fileType: element.mimetype,
                filePath: element.path,
                fileSize: getSizeFile(element.size, 2),
            }
            arrFile.push(file)
        });
        const multi = new MultiFiles({
            title: req.body.title,
            files: arrFile
        })
        const multifilesUp = await multi.save()
        res.status(201).json({message: 'the file upload success', multifilesUp})
    }catch(error){
        return next(error)
    }
}

const getSizeFile = (bytes, decimals)=>{
    if(decimals === 0) return '0 Bytes'
    const dm = decimals || 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'] 
    const index = Math.floor(Math.log(bytes) / Math.log(1000))
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
}