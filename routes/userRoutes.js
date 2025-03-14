import express from 'express';
import { register, googleLogin, assignHospital } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/google-login', googleLogin);
router.post('/assign-hospital', assignHospital);

export default router;