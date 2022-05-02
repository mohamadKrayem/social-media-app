const jwt= require('jsonwebtoken');
const expressjwt = require('express-jwt');
const expressJwt = expressjwt.expressjwt;
const User = require('../models/user');
require('dotenv').config();

console.log(expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256']
}))

function signin(req, res){

}

function signout(req, res){}

//check if we have a true jwt in the authorization header
const requireSignin = expressJwt
({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	userProperty: 'auth'
})

//check for authorization in the request
function hasAuthorization(req, res, next){
	const authorized = req.profile && req.auth && req.profile._id == req.auth._id
	if(!authorized){
		return res.status(403).json({
			error: 'user is not authorized'
		})
	}
	next();
};

module.exports={signin, signout, requireSignin, hasAuthorization}