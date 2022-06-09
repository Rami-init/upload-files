import mongoose from "mongoose";

const MultiFilesSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    files: {
        required: true,
        type: [Object]
    }
}, {
    timestamps: true
})
const MultiFiles = mongoose.model('multi', MultiFilesSchema)
export default MultiFiles