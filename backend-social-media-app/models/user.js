const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	name:{
		type: String,
		trim: true,
		required: [true ,'Name is required']
	},
	email:{
		type: String,
		trim: true,
		unique: true,
		validate: [isEmail, 'invalid email'],
		lowercase: true,
		required: [true,'Email is required']
	},
	userCreated: {
		type: Date,
		default: Date.now()
	},
	userUpdated: Date,
	password: {
		type: String,
		required: [true, 'Password is required']
	}
});

UserSchema.pre('save', function(next){
	const user = this;
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);

			user.password = hash;
			next();
		})
	})
})

UserSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	return userObject;
}

UserSchema.statics.findByCredentials = async function(email, password){
	const user = await User.findOne({email});
	if(!user) throw new Error('invalid email or password');

	const isMatch = await bcrypt.compare(password, user.password);
	if(!isMatch) throw new Error('invalid email or password');
	return user;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;