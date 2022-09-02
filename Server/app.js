const express = require("express");
const app = express();

app.get('/', require('./Routes/index').index);
app.get('/api/v1/youtube/download', require('./Routes/downloadVideo').index)

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});