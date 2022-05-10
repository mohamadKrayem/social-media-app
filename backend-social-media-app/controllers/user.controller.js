const express = require('express');
const jwt= require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user');
const controller = require('../controllers/auth.controller');
require('dotenv').config()
const router = express.Router();

async function addFollowing(req, res, next){
  try{
    await User.findByIdAndUpdate(req.body.userId,
      {$push: {following: req.body.followId}}
    )
    console.log(req.body)
    next();
  }catch(err){
    console.log('error in the addFollowing method: ', err)
    return res.status(400)
  }
}


async function addFollower(req, res){
  try{
    let result = await User.findByIdAndUpdate
    (
      req.body.followId,
      {$push: {followers: req.body.userId}},
      {new: true}
    ).populate('following', '_id name')
    .populate('followers', '_id name')
    .exec();

    result.password = undefined;
    res.json(result)
  }catch(err) {
    console.log('error in the addFollower function ', err)
    return res.status(400)
  }
}


async function removeFollowing(req, res, next){
  try{
    await User.findByIdAndUpdate(req.body.userId,
      {$pull: {following: req.body.unfollowId}}
    )
    next();
  }catch(err){
    console.log('error in the removeFollowing function ', err)
    res.status(400)
  }
}


async function removeFollower(req, res){
  try{
    let result = await User.findByIdAndUpdate(req.body.unfollowId,
      {$pull: {followers:req.body.userId}},
      {new: true}
    ).populate('following', '_id name')
    .populate('followers', '_id name')
    .exec()
    result.password = undefined;
    res.json(result)
    console.log(result)
  }catch(err){
    console.log('error in removeFollower function ', err)
    return res.status(400)
  }
}

async function findPeople(req, res){
  let following = req.profile.following;
  following.push(req.profile._id)
  try{
    let users = await User.find({_id:{ $nin: following }}).select('name')
    res.json(users)
  }catch(err){
    console.log('the error is in the function findPeople: ', err)
    return res.status(400)
  }
}

module.exports = {removeFollower, removeFollowing, addFollower, addFollowing, findPeople}
