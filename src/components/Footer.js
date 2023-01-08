import styled from "styled-components";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { todayHabits, lang } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <FooterStyle data-test="menu">
      <ButtonRectangle
        onClick={() => navigate("/habitos")}
        data-test="habit-link"
      >
        {lang.HABITS}
      </ButtonRectangle>
      <ButtonCircular onClick={() => navigate("/hoje")} data-test="today">
        <CircularProgressbarWithChildren
          minValue={0}
          maxValue={todayHabits ? todayHabits.length : 0}
          value={todayHabits ? todayHabits.filter((h) => h.done).length : 0}
          styles={{
            root: {
              verticalAlign: "middle",
            },
            path: {
              stroke: `rgba(255, 255, 255)`,
            },
          }}
        >
          {lang.TODAY}
        </CircularProgressbarWithChildren>
      </ButtonCircular>
      <ButtonRectangle
        onClick={() => navigate("/historico")}
        data-test="history-link"
      >
        {lang.HISTORY}
      </ButtonRectangle>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  height: 70px;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  background-color: #ffffff;
  justify-content: space-between;
`;
const ButtonRectangle = styled.button`
  border-width: 0;
  color: #52b6ff;
  background-color: #ffffff;
  font-size: 18px;
  width: 50%;
  max-width: 150px;
  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`;

const ButtonCircular = styled.button`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border-width: 0;
  font-size: 18px;
  background-color: #52b6ff;
  color: #ffffff;
  position: absolute;
  left: calc(50% - 45px);
  bottom: 10px;
  box-sizing: border-box;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
  }
`;
