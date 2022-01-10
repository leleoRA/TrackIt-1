import React, { useContext } from 'react'
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'

import HeaderPage from '../Header'
import Top from '../Top'
import NavBar from '../NavBar';

export default function TodayPage() {
  const { info, setInfo } = useContext(UserContext);

  let today = dayjs().locale('pt-br').format('dddd, DD/MM')

  return (
    <Today>
      <HeaderPage />
      <Top text={today} />
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
