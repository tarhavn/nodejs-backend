import express from 'express';

let articleInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comments: [],
}, {
    name: 'learn-mongodb',
    upvotes: 0,
    comments: [],
}, {
    name: 'learn-node',
    upvotes: 0,
    comments: [],
}];

const app = express();
app.use(express.json()); //Middelware to handle post requst as JSON

app.listen(8000, () => {
    console.log('Server is listning on port 8000');
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

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articleInfo.find(a => a.name === name); //Its not a cp but passed by reference
    //articleInfo.find(a => a.name === name).upvotes++;
    if (article) {
        article.upvotes += 1;
        res.send(`The article has now ${article.upvotes} votes.`)
    } else {
        res.send(`There is no article with name ${name}.`)
    }
    console.log(articleInfo);
});

app.post('/hello', (req, res) => {
    console.log('post request bellow');
    console.log(req.body);
    res.send(`hello, this is a POST response for "${req.body.name}"`);
});