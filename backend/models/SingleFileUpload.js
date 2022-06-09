import mongoose from "mongoose";

const SingleFileUploadShema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
})

const SingleFileUpload = mongoose.model('Single', SingleFileUploadShema)

export default SingleFileUpload