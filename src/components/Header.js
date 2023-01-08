import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import LanguageOptions from "./LanguageOptions";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <HeaderStyle data-test="header">
      <span>TrackIt</span>
      <LanguageOptions />
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

  > img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
  }
`;
