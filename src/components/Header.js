import styled from "styled-components";
import logo from "../assets/logo.png";
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(LoginContext);

  return (
    <HeaderStyle>
      <span>TrackIt</span>
      <img src={user.image} alt="user-avatar" />
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 10px;
  background-color: #126ba5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-family: "Playball", cursive;
    font-size: 40px;
    color: #ffffff;
  }

  box-sizing: border-box;

  img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
  }
`;