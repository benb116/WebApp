// Route controller for the API
// Does not include user auth routes

const router = require('express').Router();

const authenticate = require('../../middleware/authenticate');

// Build the router by stacking feature routers required here

// Routes that do not require auth come before using the auth middleware

// For all else, require authentication
router.use(authenticate);

// Routes that do require auth come after the auth middleware

module.exports = router;
