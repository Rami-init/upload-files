import express from "express";
import { fileUpload, multiFileUpload, getMultiFileUpload, getfileUpload } from "../controller/fileUpload.js";
import upload from "../helpers/fileHelper.js";

const router = express.Router()

router.route('/single').post(upload.single('image'), fileUpload).get(getfileUpload)
router.route('/multi').post(upload.array('images'), multiFileUpload).get(getMultiFileUpload)

export default router