import express from 'express';
import { db, connectToDb } from './db.js';

//GET http://localhost:8000/api/articles/learn-react/
//POST http://localhost:8000/api/articles/learn-react/comments { "postedBy": "second comments", "text": "hello react?" }
//PUT http://localhost:8000/api/articles/learn-react/upvote

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
        res.send(`The article has now ${article.upvotes} votes.`)
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
        res.json(article.comments);
    } else {
        res.send(`There is no article with name ${name}.`)
    }
});

connectToDb(()=> {
    //Server wont start until its conneted to the db
    console.log('Successfully connected to the database');
    app.listen(8000, () => {
        console.log('Server is listning on port 8000');
    });
})