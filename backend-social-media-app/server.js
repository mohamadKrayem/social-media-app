const express = require('express');
const app = express();
const cors = require('cors');
const compress = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const router = require('./routes/auth.routes')
const controller= require('./controllers/auth.controller');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(router)
require('./mongo');
require('dotenv').config();

let corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
}

console.log('hello world')

//just for test
app.get('/', cors(corsOptions), function(req,res){
	res.status(200).send('hello react');
	res.end()
})

app.get('/api/users', function(req, res){
	User.find({}).then(users=>{
		console.log(users)
		res.json(users);
	})
})


//signup through a post request
app.post('/api/users', function(req,res,next){
	const body = req.body;
	const user= new User({
		name: body.name,
		userUpdated: Date.now(),
		email: body.email,
		password: body.password
	})

	user.save().then(
		savedUser=>{
		console.log(savedUser)
		res.status(201).json(savedUser)
	}).catch(error=> console.log(error))

})


//can't get a user without authorization
app.get('/api/users/:userId',

	function(req,res,next){
	 User.findById(req.params.userId)
		.then(user=>{
			if(user && controller.requireSignin) {
				console.log('auth done')
				return res.status(200).json(user)
			}
			else {
				console.log('cant find a user')
				return res.status(404).end()
			};
		})
		.catch(err => {console.log(err)})
	}
)

//edit user
app.put('/api/users/:userId/', function(req,res, next){
	const body = req.body;
	const user={
		name: body.name,
		userUpdated: Date.now(),
		email: body.email,
		password: undefined
	}

	User.findByIdAndUpdate(req.params.userId, user, {new:true})
	.then(updatedUser => {
		res.json(updatedUser)
	})
	.catch(error=>next(error))
})

//delete user
app.delete('/api/users/:userId', function(req,res, next){
	User.findByIdAndRemove(req.params.userId)
		.then(result => {res.status(204).end()})
		.catch(err => next(err))
})

const server = require('http').createServer(app);
const PORT = 3333;

server.listen(PORT, ()=>{
	console.log('listening to port', PORT);
})