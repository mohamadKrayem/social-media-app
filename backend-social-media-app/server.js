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
// app.use(cors());

require('./mongo');
require('dotenv').config();


app.use(express.json({ limit: "50mb" }));

let corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(router)

console.log('hello world')


//just for test
app.get('/', cors(corsOptions),function(req,res){
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
		password: body.password,
		picture: body.picture,
		about: body.about
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
	 	.populate('following', '_id name')
		.populate('followers', '_id name')
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
app.put('/api/users/:userId/', async function(req, res, next){
	const body = req.body;
	const user={
		name: body.name,
		userUpdated: Date.now(),
		email: body.email,
		password: undefined,
		about: body.about
	}
	try{
		let user = await User.findByIdAndUpdate(req.params.userId, user, {new:true})
		.populate('following', '_id name')
		.populate('followers', '_id name')
		.exec()
		if(!user){
			console.log('error in app.put ')
			return res.status(400)
		}
		res.json(updatedUser);
	}catch(err){
		next(err)
	}
})

//delete user
app.delete('/api/users/:userId', function(req,res, next){
	User.findByIdAndRemove(req.params.userId)
		.populate('following', '_id name picture')
		.populate('followers', '_id name picture')
		.then(result => {res.status(204).end()})
		.catch(err => next(err))
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

const server = require('http').createServer(app);
const PORT = 3333;

server.listen(PORT, ()=>{
	console.log('listening to port', PORT);
})
