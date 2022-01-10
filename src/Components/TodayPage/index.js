import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'

import axios from 'axios';

import HeaderPage from '../Header'
import Top from '../Top'
import NavBar from '../NavBar';
import checkGreen from "../../assets/checkgreen.png"
import checkGray from "../../assets/check.png"


export default function TodayPage() {
  const { info } = useContext(UserContext);
  const [habit, setHabit] = useState(null);
  const [selected, setSelected] = useState(false);

  let today = dayjs().locale('pt-br').format('dddd, DD/MM');

  useEffect(() => {
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
      { headers: { 'Authorization': `Bearer ${info.token}` } });
    promise.then(answer => { setHabit(answer.data); console.log(answer.data) });
    promise.catch(answer => console.log(answer));
  }, [])

  function TodayHabits() {
    console.log(habit);
    function select() {
      selected ? setSelected(false) : setSelected(true);
    }
    return (
      <>
        {habit &&
          <div className='center'>
            <Habits>
              <div className='habit-description'>
                <h1>{habit[0].name}</h1>
                <p>Sequencia Atual de {habit[0].currentSequence} dias</p>
                <p>Seu Recorde é de {habit[0].highestSequenc} dias</p>
              </div>
              <div className='image'>
                {
                  selected ? <img src={checkGreen} alt="check symbol" onClick={() => select()} /> : <img src={checkGray} alt=" check symbol" onClick={() => select()} />
                }
              </div>
            </Habits>
          </div>
        }

      </>
    )
  }
  return (
    <Today>
      <HeaderPage />
      <Top text={today} />
      <TodayHabits />
      <NavBar />
    </Today>
  )
}
const Today = styled.div` 
background-color: #f7f7f7;
position: fixed;
left: 0;
bottom: 0;
width: 100%;
height: 100%;
z-index: 0;
`
const Habits = styled.div` 
width:340px;
height: 90px;
background-color: white;
box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);

display: flex;
justify-content: space-between;
align-items: center;

.center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

padding: 12px;
h1{
 
font-size: 20px;
line-height: 25px;
color: #666666;

padding: 12px;


}
p{
  font-size: 13px;
  color: #666666;
  }
  img{
    width: 40px;
    height: 40px;

    cursor: pointer;
  }
  

`
