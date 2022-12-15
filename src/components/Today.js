import { PageContainer } from "../styles/PageStyle";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import { useContext, useEffect } from "react";
import Footer from "./Footer";
import axios from "axios";
import { URL } from "../constants";
import styled from "styled-components";

export default function Today() {
  const { user, habits, todayHabits, setHabits, setTodayHabits } =
    useContext(UserContext);
  useEffect(() => {
    if (user && user.token && setHabits && setTodayHabits) {
      axios
        .get(`${URL}/habits/today`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setTodayHabits(res.data);
        })
        .catch((err) => alert(JSON.stringify(err.response.data)));
      axios
        .get(`${URL}/habits/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setHabits(res.data);
        })
        .catch((err) => alert(JSON.stringify(err.response.data)));
    }
  }, [user, setHabits]);

  console.log(todayHabits);
  const cntDoneoneHabits = todayHabits
    ? todayHabits.filter((h) => h.done).length
    : 0;
  const cntHabits = todayHabits ? todayHabits.length : 0;
  return (
    <PageContainer>
      <Header />
      <TitlesContainer>
        <DateTitle>Segunda, 17/05</DateTitle>
        <Subtitle done={cntDoneoneHabits}>
          {cntDoneoneHabits
            ? `${(cntDoneoneHabits * 100) / cntHabits} dos hábitos concluídos`
            : "Nenhum hábito concluído ainda"}
        </Subtitle>
      </TitlesContainer>
      <HabitsContainer>
        {todayHabits &&
          todayHabits.map((h) => (
            <HabitCard done={h.done}>
              <div>
                <h1>{h.name}</h1>
                <p>{`Sequência atual: ${h.currentSequence} dias`}</p>
                <p>{`Seu recorde: ${h.highestSequence} dias`}</p>
              </div>
              <ion-icon name="checkbox"></ion-icon>
            </HabitCard>
          ))}
      </HabitsContainer>

      <Footer />
    </PageContainer>
  );
}

const HabitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
`;

const HabitCard = styled.div`
  max-width: 340px;
  width: 100%;
  height: 94px;
  border-radius: 5px;
  display: flex;
  background-color: #ffffff;
  div {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 10px;
    color: #666666;
    h1 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    p {
      font-size: 13px;
    }
  }
  ion-icon {
    width: 20%;
    height: 100%;
    color: ${(props) => (props.done ? "#8fc549" : "#E7E7E7")};
  }
`;

const TitlesContainer = styled.div`
  width: 100%;
  padding-left: 20px;
`;
const DateTitle = styled.div`
  color: #126ba5;
  font-size: 23px;
`;
const Subtitle = styled.div`
  color: ${(props) => (props.done > 0 ? "#8FC549" : "#BABABA")};
  font-size: 18px;
`;
