import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json()); //Middelware to handle post requst as JSON

app.listen(8000, () => {
    console.log('Server is listning on port 8000');
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db');
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }, //$set: { upvotes: 20 },
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        //article.upvotes += 1; //redundent possible bug since its updated db
        res.send(`The article has now ${article.upvotes} votes.`)
    } else {
        res.send(`There is no article with name ${name}.`)
    }
});

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const article = articleInfo.find(a => a.name === name);

    if (article) {
        const { postedBy, text } = req.body;
        console.log(articleInfo.find(a => a.name === name).comments);
        article.comments.push({ postedBy, text});
        res.send(article.comments);
    } else {
        res.send(`There is no article with name ${name}.`)
    }
});