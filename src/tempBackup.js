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

//Test post
app.post('/hello', (req, res) => {
    console.log('post request bellow');
    console.log(req.body);
    res.send(`hello, this is a POST response for "${req.body.name}"`);
});

//Test mongodb
app.get('/api-test', async (req, res) => {
    //react-blog-db is the name of mongodb 
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('myNewDatabase'); //use myNewDatabase
    const document = await db.collection('myCollection').findOne({});
    console.log(document);
    res.json(document);
});

// app.get('/api/articles/:name', async (req, res) => {
    // const { name } = req.params;
    // const article = await db.collection(articles).findOne({ name });


