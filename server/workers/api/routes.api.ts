// Route controller for the API
// Does not include user auth routes

import express from 'express';

import authenticate from '../../middleware/authenticate';

const router = express.Router();

// Routes that do not require auth come before using the auth middleware

// For all else, require authentication
router.use(authenticate);
// Build the router by stacking feature routers required here

export default router;
