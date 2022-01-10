import React, { useState, useContext, useEffect } from 'react'
import HeaderPage from '../Header'
import Top from '../Top'
import axios from 'axios';
import UserContext from "../../context/UserContext";
import styled from 'styled-components';
import plus from '../../assets/plus.png'
import trash from '../../assets/trash.png'
import { useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner'

export default function Habits() {
  const [habits, setHabits] = useState(null);
  const { info } = useContext(UserContext);
  const [newHabit, setNewHAbit] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitDays, setHabitDays] = useState([]);
  const [isSelected, setIsSelected] = useState([false, false, false, false, false, false, false]);
  const habitObj = {
    name: habitName,
    days: habitDays
  }
  const navigate = useNavigate();
  const [habitsUser, setHabitsUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const eu = ['comer', 'dormir']

  useEffect(() => {
    if (info) {
      const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
        { headers: { 'Authorization': `Bearer ${info.token}` } });
      promise.then(answer => { setHabits(answer.data); console.log(answer) });
      promise.catch(answer => console.log(answer));
    }
  }, []);

  function selectHabitDays(day) {
    if (habitDays.includes(day)) {
      habitDays.splice(day, 1);
    } else {
      setHabitDays([...habitDays, day]);
    }
    console.log(habitDays);
    console.log(isSelected[day]);
    if (isSelected[day] === false) {
      isSelected[day] = true;
    } else {
      isSelected[day] = false;
    }

    setIsSelected([...isSelected]);
  }

  useEffect(() => {
    const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
      {
        headers: { 'Authorization': `Bearer ${info.token}` }
      });
    promise.then(answer => { setHabitsUser(answer.data) });
    promise.catch(answer => console.log(answer));
  }, [])



  function UserHabits({ habit }) {
    console.log("OLa");
    console.log(habit);
    return (
      <>
        {
          <CreatedHabits>
            <div className='habit-description'>
              <p>{habit.name} Ler um livro</p>
              <div className='daysWeek'>
                <DayLetter isSelected={false}> D </DayLetter>
                <DayLetter isSelected={false}> S </DayLetter>
                <DayLetter isSelected={true}> T </DayLetter>
                <DayLetter isSelected={false}> Q </DayLetter>
                <DayLetter isSelected={false}> Q </DayLetter>
                <DayLetter isSelected={true}> S </DayLetter>
                <DayLetter isSelected={false}> S </DayLetter>
              </div>
            </div>
            <img src={trash} alt="trash symbol" />
          </CreatedHabits>
        }
      </>


    )
  }

  function sendHabit(event) {
    event.preventDefault();
    if (habitObj.name && habitObj.days) {
      setLoading(true);
      const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
        habitObj,
        { headers: { 'Authorization': `Bearer ${info.token}` } });

      promise.then(answer => { console.log(answer); setLoading(false); setNewHAbit(false); });
      promise.catch(() => alert("Você deve preencher os campos corretamente"));
      setIsSelected([false, false, false, false, false, false, false]);
    } else {
      alert("Você deve preencher os campos corretamente");
    }

  }


  function AddHabit() {
    setNewHAbit(true);
    return (

      <CreateHabit onSubmit={sendHabit}>

        <div className="habit-area">
          <input disabled={loading} type="text" placeholder='Adicionar um novo Hábito...' className='input' onChange={(e) => setHabitName(e.target.value)} value={habitName} />
          <div className='day'>
            <DayLetter disabled={loading} onClick={() => selectHabitDays(0)} isSelected={isSelected[0]}> D </DayLetter>
            <DayLetter disabled={loading} onClick={() => selectHabitDays(1)} isSelected={isSelected[1]}> S </DayLetter>
            <DayLetter disabled={loading} onClick={() => selectHabitDays(2)} isSelected={isSelected[2]}> T </DayLetter>
            <DayLetter disabled={loading} onClick={() => selectHabitDays(3)} isSelected={isSelected[3]}> Q </DayLetter>
            <DayLetter disabled={loading} onClick={() => selectHabitDays(4)} isSelected={isSelected[4]}> Q </DayLetter>
            <DayLetter disabled={loading} onClick={() => selectHabitDays(5)} isSelected={isSelected[5]}> S </DayLetter>
            <DayLetter disabled={loading} onClick={() => selectHabitDays(6)} isSelected={isSelected[6]}> S </DayLetter>
          </div>
          <div className='bottom'>
            <p onClick={() => setNewHAbit(false)}>Cancelar</p>
            {loading ? <Loader type="ThreeDots" color="#52B6FF" height={40} width={40} /> : <button type="submit" >Salvar</button>}
          </div>
        </div>

      </CreateHabit >
    )
  }
  return (

    <HabitsContainer>
      <HeaderPage />
      <Upper>
        <p>Meus Hábitos</p>
        <img src={plus} alt="plus symbol" onClick={() => AddHabit()} />
      </Upper>
      <HabitCreation>
        {
          newHabit && <AddHabit />
        }
        {
          (habits !== null && habits.length !== 0) ?

            // eu.map(habit => {
            <UserHabits habit={habitsUser} />
            // })

            : <p className='no-habits'>Você não tem nenhum hábito cadastrado ainda.
              Adicione um hábito para começar a trackear!</p>
        }
      </HabitCreation>

    </HabitsContainer>

  )
}

const HabitsContainer = styled.div` 
  background-color:#f2f2f2;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

 

.no-habits{
  font-size: 18px;
  color: #666666;
  padding: 12px;


}
`
const CreateHabit = styled.form` 
width: 370px;
height: 180px;


background: white;
border-radius: 10px;
display: flex;
justify-content: center;

box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);

.habit-area{
  display: flex;
  flex-direction: column;
}
.input{
  margin: 20px 0 5px 0;
}
.day{
  display: flex;
  justify-content: center;
  align-items: center;

  color: #DBDBDB;
}
.bottom{
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 40px;

  cursor: pointer;

  p{
    color:#52B6FF;

    cursor: pointer;

    margin-right: 20px;
  }

 
}

button{
  cursor: pointer;
  all:unset;
  width: 84px;
  height: 35px;

  background-color:#52B6FF;
  margin-left: 26px;

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
}


div{
  display: flex;
}



input{

  all:unset;
  background: #FFFFFF;
  border: 1px solid #D5D5D5;
  box-sizing: border-box;
  border-radius: 5px;
  
  color:rgba(0, 0, 0, 0.5);
  font-size: 16px;
  padding-left: 12px;
 
  width: 300px;
  height: 30px;
  border:5px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);

  cursor: pointer;
}

`
const HabitCreation = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

`
const DayLetter = styled.div` 
width: 30px;
height: 30px;

color:${props => props.isSelected ? 'white' : 'rgba(0, 0, 0, 0.25)'};
background-color:${props => props.isSelected ? 'rgba(0, 0, 0, 0.25)' : 'white'};

display: flex;
justify-content: center;
align-items: center;

font-size: 20px;

border-radius: 5px;
border: 1px solid rgba(0, 0, 0, 0.25);

margin: 3px;

cursor:pointer;
`
const Upper = styled.div` 
display: flex;
justify-content: space-between;
align-items: center;
padding-top: 100px;

img{
  width:40px;
  height:35px;
  margin-right: 12px;

  cursor:pointer;
}
p{
    font-size: 23px;
     color: #126BA5;

     margin-left: 12px;
  }
`
const CreatedHabits = styled.div` 
width: 340px;
height:91px;

background-color: white;

box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);

display: flex;
justify-content: space-between;
align-items: flex-start;
padding: 12px;

p{

  font-size: 20px;
  font-weight: 500;
  color: #666666;
  padding: 0 0 5px 5px;
}

.habit-description{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  
}
.daysWeek{
    display: flex;
  }
  img{
    cursor:pointer;
  }
`