import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import { db, connectToDb } from './db.js';

const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json()); //Middelware to handle post requst as JSON

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }, //$set: { upvotes: 20 },
    });
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        //res.send(`The article has now ${article.upvotes} votes.`)
        res.json(article);
    } else {
        res.send(`There is no article with name ${name}.`)
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: {postedBy, text} }
    });
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.send(`There is no article with name ${name}.`)
    }
});

connectToDb(()=> {
    console.log('Successfully connected to the database');
    app.listen(8000, () => {
        console.log('Server is listning on port 8000');
    });
})