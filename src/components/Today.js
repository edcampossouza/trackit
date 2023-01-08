import { PageContainer, Row, MainTitle } from "../styles/PageStyle";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import { URL } from "../constants";
import styled from "styled-components";
export default function Today() {
  const { user, todayHabits, setTodayHabits, fetchTodaysHabits, lang } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchTodaysHabits();
  }, []);

  function setCheck(h) {
    if (loading) return;
    setLoading(true);
    axios
      .post(
        `${URL}habits/${h.id}/${h.done ? "uncheck" : "check"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setTodayHabits(
          todayHabits.map((hab) =>
            h.id === hab.id ? { ...hab, done: !h.done } : { ...hab }
          )
        );
        setLoading(false);
        fetchTodaysHabits(setLoading);
      })
      .catch((err) => {
        alert(`Erro: ${JSON.stringify(err.response.data)}`);
        setLoading(false);
      });
  }

  const cntDoneoneHabits = todayHabits
    ? todayHabits.filter((h) => h.done).length
    : 0;
  const cntHabits = todayHabits ? todayHabits.length : 0;
  const weekdays = [
    lang.SUNDAY,
    lang.MONDAY,
    lang.TUESDAY,
    lang.WEDNESDAY,
    lang.THURSDAY,
    lang.FRIDAY,
    lang.SATURDAY,
  ];
  function getDate() {
    const date = new Date();
    return (
      weekdays[date.getDay()] +
      ", " +
      date.toLocaleDateString(lang.LOCALE_STRING)
    );
  }
  return (
    <PageContainer>
      <Header />
      <Row>
        <TitlesContainer>
          <MainTitle data-test="today">{getDate()}</MainTitle>
          <Subtitle done={cntDoneoneHabits} data-test="today-counter">
            {cntDoneoneHabits
              ? `${((cntDoneoneHabits * 100) / cntHabits).toFixed(
                  0
                )}% ${lang.OF_HABITS_COMPLETED}`
              : lang.NO_HABITS_COMPLETED}
          </Subtitle>
        </TitlesContainer>
      </Row>
      <Row>
        <HabitsContainer>
          {todayHabits &&
            todayHabits.map((h) => (
              <HabitCard
                done={h.done}
                key={h.id}
                data-test="today-habit-container"
              >
                <div>
                  <h1 data-test="today-habit-name">{h.name}</h1>
                  <p data-test="today-habit-sequence">
                    {lang.CURRENT_SEQUENCE}:&nbsp;
                    <SequenceText highlight={h.done}>{`${
                      h.currentSequence
                    } ${h.currentSequence === 1 ? lang.DAY : lang.DAYS}`}</SequenceText>
                  </p>
                  <p data-test="today-habit-record">
                    Seu recorde:&nbsp;
                    <SequenceText
                      highlight={h.currentSequence === h.highestSequence}
                    >{` ${h.highestSequence} ${
                      h.highestSequence === 1 ? lang.DAY : lang.DAYS
                    }`}</SequenceText>
                  </p>
                </div>
                <button
                  onClick={() => setCheck(h)}
                  data-test="today-habit-check-btn"
                >
                  <ion-icon name="checkmark-outline"></ion-icon>
                </button>
              </HabitCard>
            ))}
        </HabitsContainer>
      </Row>

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
  margin-bottom: 10px;
  align-items: center;
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
      display: flex;
    }
  }
  button {
    background-color: #ffffff;
    width: 20%;
    height: 80%;
    border-radius: 5px;
    border-width: 0;
    background-color: ${(props) => (props.done ? "#8fc549" : "#E7E7E7")};
    color: white;
    ion-icon {
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0);
      color: "#ffffff";
    }
  }
`;

const SequenceText = styled.p`
  color: ${(props) => (props.highlight ? "#8FC549" : "#666666")};
`;

const TitlesContainer = styled.div`
  width: 100%;
  padding-left: 5px;
`;

const Subtitle = styled.div`
  color: ${(props) => (props.done > 0 ? "#8FC549" : "#BABABA")};
  font-size: 18px;
`;
