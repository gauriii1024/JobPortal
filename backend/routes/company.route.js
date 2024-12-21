import express from "express";
//import { register, updateProfile, login, logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
//import bcrypt from 'bcryptjs';
import { getCompany, registerCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";


const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").post(isAuthenticated, getCompanyById);
router.route("/update/:id").post(isAuthenticated ,updateCompany);

export default router;