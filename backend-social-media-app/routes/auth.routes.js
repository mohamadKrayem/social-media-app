const express = require('express');
const jwt= require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user');
const controller = require('../controllers/auth.controller');
require('dotenv').config()
const router = express.Router();

router.post('/auth/signin',
	async function(req, res){
		try{
			console.log(req.body)
			const {email, password} = req.body;
			const user = await User.findByCredentials(email, password);
			await user.save();
			const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
			res.cookie('t', token, {expire: new Date() + 9999});
			return res.json({
				token,
				user: {
					_id: user._id,
					name: user.name,
					email: user.email
				}
			}).status(200);
		}catch(e){
			res.status(400).json(e.message);
		}
	}
)

router.get('/auth/signout', function(req, res){
	res.clearCookie('t');
	return res.status(200).json({
		message: 'signed out'
	})
})

router.route('/api/users/:userId')
	.get(controller.requireSignin)
	.put(controller.requireSignin, controller.hasAuthorization)

module.exports = router;
