const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', require('./Routes/index').index);
app.get('/api/v1/youtube/download', require('./Routes/downloadVideo').index)
app.get('/api/v1/youtube/search', require('./Routes/search').index)

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});