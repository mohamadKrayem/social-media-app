import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import EditProfile from './EditProfile';
import Profile from './Profile';
import Signin from './Signin';
import Signup from './Signup';
import Users from './Users';
import Welcom from './Welcom';

const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<Home />} />
          <Route path='/welcom' element={<Welcom />} />
          <Route path='/community' element={<Users />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/user/:userId' element={<Profile />} />
          <Route path='/user/edit/:userId' element={<EditProfile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default HomePage;