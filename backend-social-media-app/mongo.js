const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.MONGO_URL_USER}:${process.env.MONGO_URL_PASS}@cluster0.k8ou6.mongodb.net/social-media-app?retryWrites=true&w=majority`, ()=>{
	console.log('connected to mongodb')
}).catch(e=> console.log(e))
