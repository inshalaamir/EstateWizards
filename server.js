const express =require('express');
const bodyParser=require('body-parser');
const cors =require('cors');
const router =require('./routes/users.js')
const connectDB = require('./config/db')
const postrouter =require('./routes/posts.js')
const predictrouter =require('./routes/prediction.js')
const hostingrouter = require ("./routes/hostings.js")
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const projectRoute = require("./routes/project")

const app = express();
connectDB()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/user', router);
app.use('/post', postrouter);
app.use('/predict',predictrouter);
app.use('/host', hostingrouter)
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/project", projectRoute)
const PORT= process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))