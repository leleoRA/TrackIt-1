import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Loader from "react-loader-spinner";
import axios from "axios";
import UserContext from "../../context/UserContext";
import Logo from './../../assets/logo.png'


export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(false)
  const { setInfo } = useContext(UserContext);
  const navigate = useNavigate();
  let loginData =
  {
    email: email,
    password: password
  }

  function logIn(event) {
    event.preventDefault();
  }

  function verifyData() {

    if (email && password && (/\S+@\S+/.test(email))) {
      setLoading(true);
      setDisable(true);

      const logIn = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', loginData);
      logIn.then(answer => {
        console.log(answer);
        setInfo(answer.data);
        navigate('/hoje')
      })
      logIn.catch(answer => {
        alert("Email ou Senha incorretos!");
        window.location.reload();
      });
    }

  }
  return (
    <Login disable={disable}>
      <div className='login'>
        <img src={Logo} alt="Logo" />

        <form onSubmit={logIn}>
          <input type="email" disabled={disable} placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" disabled={disable} placeholder='senha' onChange={(e) => setPassword(e.target.value)} value={password} />
          {
            loading ? <Loader type="ThreeDots" color="#52B6FF" height={60} width={60} /> : <button type='submit' onClick={() => verifyData()}>Entrar</button>
          }

        </form>

        <Link to="/cadastro">
          <p>Não tem uma conta? Cadastre-se</p>
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
    color: ${props => props.disable ? '#AFAFAF' : 'rgba(0, 0, 0, 0.59)'};
    ::-webkit-input-placeholder {
   color: #AFAFAF;
   }
  }
  button {
    all:unset;

    cursor:pointer;
    
    background: #52B6FF;
    border-radius: 5px;
    border:0px solid black;
    box-shadow:1px 2px 2px rgba(255, 255, 255, 0.1);
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
  }
  }
  
  `