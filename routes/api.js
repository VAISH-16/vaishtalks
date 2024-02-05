import express from "express";
import { insertData,LoginData,insertMsg,FetchMsg,getContacts } from "../controllers/data.js";
const router = express.Router();
router.post("/data", insertData);
router.post("/login", LoginData);
router.post("/insertMsg", insertMsg);
router.post("/FetchMsg", FetchMsg);
router.post("/getContacts", getContacts);

export default router;
// , retrieveData, EditProfile, UpdateProfile, DeleteProfile