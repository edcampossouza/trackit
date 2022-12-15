import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { URL } from "../constants";
import { UserContext } from "../contexts/UserContext";
import { PageContainer } from "../styles/PageStyle";
import Dots from "./Dots";
import Footer from "./Footer";
import Header from "./Header";
const DOWS = ["D", "S", "T", "Q", "Q", "S", "S"];
export default function Habits() {
  const { user, habits, setHabits } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user && user.token && setHabits) {
      buscarHabitos();
    }
  }, [user]);

  function buscarHabitos() {
    setLoading(true);
    axios
      .get(`${URL}/habits`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
        setLoading(false);
      });
  }

  function deleteHabit(habit) {
    axios
      .delete(`${URL}habits/${habit.id}`, {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        buscarHabitos();
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
      });
  }

  return (
    <PageContainer>
      <Header />
      <Row>
        <DateTitle>
          <span>Meus hábitos</span> <AddButton>+</AddButton>
        </DateTitle>
      </Row>
      {loading ? (
        <Dots />
      ) : (
        habits &&
        habits.map((habit) => (
          <Row key={habit.id}>
            <HabitCard>
              <Row>
                {habit.name}
                <ion-icon
                  name="trash-outline"
                  onClick={() => deleteHabit(habit)}
                ></ion-icon>
              </Row>
              <Row>
                <DaysContainer>
                  {DOWS.map((d, i) => (
                    <DayOfWeek key={i} set={habit.days.includes(i)}>
                      {d}
                    </DayOfWeek>
                  ))}
                </DaysContainer>
              </Row>
            </HabitCard>
          </Row>
        ))
      )}
      <Footer />
    </PageContainer>
  );
}

const DateTitle = styled.div`
  color: #126ba5;
  font-size: 23px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  width: 40px;
  height: 35px;
  background-color: #52b6ff;
  font-size: 27px;
  color: #ffffff;
  border-width: 0;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin-bottom: 10px;
`;

const HabitCard = styled.div`
  padding: 5px 10px;
  width: 100%;
  background-color: #ffffff;
  color: #666666;
  font-size: 20px;
  ion-icon {
    font-size: 15px;
    cursor: pointer;
  }
`;

const DayOfWeek = styled.button`
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 20px;
  color: ${(props) => (props.set ? "#ffffff" : "#d8d8d8")};
  background-color: ${(props) => (props.set ? "#d8d8d8" : "#ffffff")};
  width: 30px;
  height: 30px;
`;

const DaysContainer = styled.div`
  ${DayOfWeek} {
    margin-right: 5px;
  }
  ${DayOfWeek}:last-child {
    margin-left: 0;
  }
`;
