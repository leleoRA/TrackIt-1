import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import UserContext from "../../context/UserContext";

import logo from "../../assets/TrackIt.png"

export default function HeaderPage() {
  const { info } = useContext(UserContext);
  return (
    <Header>
      <img src={logo} alt="mini logo" className="logo" />
      {
        info && <img src={info.image} alt="mini logo" className='user' />
      }

    </Header>
  )
}
const Header = styled.header`
display: flex;
align-items: center;
justify-content: space-between;

position: fixed;
top: 0;
left: 0;
width: 100%;
height:70px;

background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

.logo{
  margin-left: 12px;
}
.user{
  margin: 12px 12px 12px 0;
  border-radius: 50%;
  width:51px;
  height:51px;
}
`
