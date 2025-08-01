const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const loginRouter = require('./routers/loginRouter');
const feedRouter = require('./routers/feedRouter');
const postRouter = require('./routers/postRouter');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/login', loginRouter);
app.use('/api/feed', feedRouter);
app.use('/api/post', postRouter);
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login/login.html'));
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});