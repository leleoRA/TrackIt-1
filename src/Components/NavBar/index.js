
import styled from "styled-components"
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function NavBar() {

  const { info, setInfo } = useContext(UserContext);

  const percentage = 24;


  return (
    <Nav>
      <Link to="/habitos">
        <h1>Hábitos</h1>
      </Link>
      <Link to="/hoje">
        <Progress>
          <h1 className="text">Hoje</h1>
          <CircularProgressbar
            value={percentage}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              pathColor: "#FFFFFF",
              textColor: "#FFFFFF",
              trailColor: "transparent"
            })}
          />
        </Progress>
      </Link>
      <Link to="/historico">
        <h1>Histórico</h1>
      </Link>
    </Nav>
  )

}

const Nav = styled.nav`

width: 100%;
height: 70px;

background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

position:fixed;
bottom: 0px;
left: 0px;
z-index:10;

padding: 0px 18px;

display: flex;
align-items: center;
justify-content: space-between;

a{
  text-decoration: none;
}
.text{
  position: absolute;
font-style: normal;
font-weight: normal;
font-size: 17.976px;
line-height: 22px;
text-align: center;
color: #FFFFFF !important;

bottom: 34px;
left:25px;
}

h1{
  font-style: normal;
font-weight: normal;
font-size: 17.976px !important;
line-height: 22px;
text-align: center;

color: #52B6FF !important;
}

`
const Progress = styled.div`

width: 91px;
height: 91px;
position: relative;
bottom: 20px;


`

