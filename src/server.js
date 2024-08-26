import express from 'express';

const app = express();

//Middelware to handle post requst as JSON
app.use(express.json());

//Behavior what to do
app.get('/hello', (req, res) => {
    res.send('hello gowsigan');
});

app.post('/hello', (req, res) => {
    console.log('post request bellow');
    console.log(req.body);
    res.send(`hello, this is a POST response for "${req.body.name}"`);
});

//URL parameters
app.get('/hello/:name', (req, res) => {
    //Request
    const { name } = req.params; //Object destructuring //const name = req.params.name;
    console.log(`URL parameters was ${name}`);

    //Response
    res.send(`Your URL parameter is "${name}"`);
});

app.put('/hello', (req, res) => {
    res.send('hello gowsigan this is a PUT response');
});

//Tell ower server to listen
app.listen(8000, () => {
    console.log('Server is listning on port 8000');
});

