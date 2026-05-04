const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const requireAuth = require('../middleware/authMiddleware');

// Middleware to check for Admin role
const requireAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) return res.status(401).json({ error: 'Invalid token' });

    // STRICT CHECK based on email or role in profiles
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

    if (profile?.role !== 'admin' && user.email !== 'aganyawiseman@gmail.com') {
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    req.user = user;
    next();
};

// Get all users
router.get('/users', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { data: { users }, error } = await supabase.auth.admin.listUsers();

        if (error) throw error;

        res.json({ users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Delete user
router.delete('/users/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.auth.admin.deleteUser(id);
        if (error) throw error;
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Update user role (updates public.profiles)
router.put('/users/:id/role', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Update public.profiles
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', id);

        if (profileError) throw profileError;

        // Optionally update app_metadata logic if needed, but we rely on profiles table

        res.json({ message: 'User role updated successfully' });
    } catch (err) {
        console.error('Error updating user role:', err);
        res.status(500).json({ error: 'Failed to update user role' });
    }
});

module.exports = { router, requireAdmin };
