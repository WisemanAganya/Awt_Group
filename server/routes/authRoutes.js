const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');

// Endpoint to verify token and get user role (if stored in metadata or separate table)
router.get('/me', requireAuth, async (req, res) => {
    try {
        // We can fetch additional user profile data here if needed
        // const { data, error } = await supabase.from('profiles').select('*').eq('id', req.user.id).single();

        res.json({
            user: req.user,
            // profile: data 
        });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
