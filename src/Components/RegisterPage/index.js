import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Loader from "react-loader-spinner";
import axios from "axios";


import Logo from './../../assets/logo.png'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  let registerData =
  {
    email,
    name,
    image,
    password
  }
  function register(event) {
    event.preventDefault();
  }


  function verifyData() {
    console.log(registerData);
    if (email && password && image && name && (/\S+@\S+/.test(email))) {
      setLoading(true);
      setDisable(true);

      const register = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', registerData);
      register.then(answer => {
        setTimeout(() => {
          setLoading(false);
          setDisable(false);
          navigate('/')
        }, 1000);

      })
      register.catch(answer => console.log(answer.response));
    }
  }
  return (

    <Login disable={disable}>
      <div className='login'>
        <img src={Logo} alt="Logo" />

        <form onSubmit={register}>
          <input type="email" disabled={disable} placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" disabled={disable} placeholder='senha' onChange={(e) => setPassword(e.target.value)} value={password} />
          <input type="text" disabled={disable} placeholder='nome' onChange={(e) => setName(e.target.value)} value={name} />
          <input type="url" disabled={disable} placeholder='foto' onChange={(e) => setImage(e.target.value)} value={image} />
          {
            loading ? <Loader type="ThreeDots" color="#52B6FF" height={60} width={60} /> : <button type='submit' onClick={() => verifyData()}>Cadastrar</button>
          }

        </form>

        <Link to="/">
          <p>Já tem uma conta? Faça login!</p>
        </Link>

      </div>
    </Login>
  )
}

const Login = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
form{
  display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
}
a{
  text-decoration: none;

  color:#52B6FF;
  margin-top: 30px;

}
input{
  all:unset;
  margin-bottom: 9px;

  background: #FFFFFF;
  border: 1px solid #D5D5D5;
  border-radius: 5px;

  width: 300px;
  height: 35px;

  padding-left: 16px;
  color: ${props => props.disable ? '#AFAFAF' : 'rgba(0, 0, 0, 0.6)'};
  ::-webkit-input-placeholder {
 color: #AFAFAF;
 }
}
button {
  all:unset;

  cursor:pointer;
  
  background: #52B6FF;
  border-radius: 5px;

  width: 300px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  color: white;

  font-size: 16px;
  font-weight: bold;
  font-family: 'Lexend Deca';
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 100px;

  img{
  margin-bottom: 32px;
} }`
