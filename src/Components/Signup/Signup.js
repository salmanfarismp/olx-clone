import React,{useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import {useForm} from 'react-hook-form';
import './Signup.css';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';
const phoneRegExp = /^1?\d{9,15}$/

export default function Signup() {
  const history = useHistory()
  const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  password: yup.string().min(8).max(12).required(),
})  
  const {firebase} = useContext(FirebaseContext)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
const submitForm = (data) => {
 
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then((result)=>{
    result.user.updateProfile({displayName: data.username}).then(()=>{
      firebase.firestore().collection('users').add({
        id :result.user.uid,
        username : data.username,
        phone : data.phone

      }).then(()=>{
        history.push('/login')
      })
    })
  })
}
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit(submitForm)} action="">
          <label htmlFor="fname">Username</label>
          <br />
          <input type="text" className="input" id="fname" name="name"   {...register('username')}  /> <p className='displayError'>{errors.username?.message}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input type="email"  className="input"  name='email' {...register('email')}   /> <p className='displayError'>{errors.email?.message}</p>
          
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input type="text" className="input"  name='phone' {...register('phone')}  /> <p className='displayError'>{errors.phone?.message}</p>
           
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input type="password" className="input" name='password' {...register('password')} /> <p className='displayError'>{errors.password?.message}</p>
           
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
