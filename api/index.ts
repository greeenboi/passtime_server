const express = require("express");
import {createClient} from '@supabase/supabase-js'
require('dotenv').config()

const app = express();
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

app.get('/list', async (req, res) => {
    const { data, error } = await supabase
        .from('EmailingList')
        .select('*')
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
});

app.post('/add', async (req, res) => {
    const { emailid, name, desc, hmm } = req.body
    const { data, error } = await supabase
        .from('EmailingList')
        .insert({ 
            email_id: emailid,
            name: name,
            desc: desc,
            hmm: hmm
        })
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("You are lost my friend.");
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;