import express from 'express';
const router = express.Router();

import {
    signupHandler,
    signinHandler
} from '../handlers/authHandler.js'

router.post('/register',signupHandler);
router.post('/login',signinHandler);

export { router as default };