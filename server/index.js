const express = require('express');
const app = express();
require("./db/conn")
const cors = require("cors")
const router = require('./routes/userRoutes');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
