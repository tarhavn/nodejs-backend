import express from 'express';

const app = express();

//Behavior what to do
app.get('/hello', (req, res) => {
    res.send('hello gowsigan');
});

//Tell ower server to listen
app.listen(8000, () => {
    console.log('Server is listning on port 8000');
});

