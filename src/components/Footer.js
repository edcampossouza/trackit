import styled from "styled-components";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

export default function Footer() {
  return (
    <FooterStyle>
      <ButtonRectangle>Hábitos</ButtonRectangle>
      <ButtonCircular>
        <CircularProgressbarWithChildren
          minValue={0}
          maxValue={10}
          value={7}
          styles={{
            root: {
              verticalAlign: "middle",
            },
            path: {
              stroke: `rgba(255, 255, 255)`,
            },
          }}
        >
          Hoje
        </CircularProgressbarWithChildren>
      </ButtonCircular>
      <ButtonRectangle>Histórico</ButtonRectangle>
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
`;
