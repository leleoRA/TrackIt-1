import React from 'react'
import styled from 'styled-components'
import plus from '../../assets/plus.png'

export default function Top({ text, action }) {
  return (
    <Upper>
      <p>{text}</p>
      {text === 'Meus Hábitos' && <img src={plus} alt="plus symbol" onClick={action} />}
    </Upper>
  )
}
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
