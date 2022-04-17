import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
const Swal = require('sweetalert2')
const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  const [error,setError] = useState({name: '',category:'',price:''})
  const [name, setname] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState('')
  const date = new Date()
  const handleSubmit = (e)=> {
    if(name ===''){
      setError(err=>{return({...err,'name':'Name Cannot be empty'})})
    }
    else if(category ===''){
      setError(err=>{return({...err,'category':'Category cannot be empty'})})
      
    }
    else if(price === ''){
      setError(err=>{return({...err,'price':'Price cannot be empty'})})

    }
    else{
      firebase.storage().ref(`/image/${file.name}`).put(file).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url)
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString(),
          })
          Swal.fire(
            'Good job!',
            'Product Added!',
            'success'
          ).then(() => {
            history.push('/')
          })
          
          
        })
      })
    }
    

  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{ return(
                setname(e.target.value),
                name !=='' && setError(err=>{return({...err,'name':''})})
  
              )}}
            />
            <p className='displayError'>{error.name?error.name:''}</p>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{ return(
                setCategory(e.target.value),
                category !=='' && setError(err=>{return({...err,'category':''})})
  
              )}}
            />
            <p className='displayError'>{error.category?error.category:''}</p>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e)=>{ return(
                setPrice(e.target.value),
                price !=='' && setError(err=>{return({...err,'price':''})})
  
              )}} className="input" type="number" id="fname" name="Price" />
            <p className='displayError'>{error.price?error.price:''}</p>
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={file? URL.createObjectURL(file):''}></img>
          
            <br />
            <input onChange={(e)=>setFile(e.target.files[0])}
               
  
              type="file" />
            
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
