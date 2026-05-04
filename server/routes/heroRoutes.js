const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const { requireAdmin } = require('./adminRoutes');

// Initialize Supabase Client (Server-side)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET active hero
router.get('/active', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('hero_banners')
            .select('*')
            .eq('is_active', true)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        res.json(data || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create new hero (Admin only)
router.post('/', requireAdmin, async (req, res) => {
    try {
        const { title, subtitle, image_url, is_active } = req.body;
        const { data, error } = await supabase
            .from('hero_banners')
            .insert([{ title, subtitle, image_url, is_active }])
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE hero (Admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
    try {
        const { error } = await supabase
            .from('hero_banners')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
