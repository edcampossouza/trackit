import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { URL } from "../constants";
import { UserContext } from "../contexts/UserContext";
import { PageContainer, SubTitle } from "../styles/PageStyle";
import Dots from "./Dots";
import Footer from "./Footer";
import Header from "./Header";
const DOWS = ["D", "S", "T", "Q", "Q", "S", "S"];
export default function Habits() {
  const { user, habits, fetchHabits, fetchTodaysHabits } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    fetchHabits(setLoading);
  }, []);

  function deleteHabit(habit) {
    if (!window.confirm("Gostaria realmente de apagar o hábito?")) return;
    axios
      .delete(`${URL}habits/${habit.id}`, {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchTodaysHabits();
        fetchHabits();
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
      });
  }

  function saveHabit(habit, onSuccess, onFailure) {
    axios
      .post(`${URL}habits`, habit, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (onSuccess) onSuccess();
        setAdding(false);
        fetchHabits();
        fetchTodaysHabits();
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
        if (onFailure) onFailure();
      });
  }

  return (
    <PageContainer>
      <Header />
      <Row>
        <TopTitle>
          <span>Meus hábitos</span>{" "}
          <AddButton
            onClick={() => setAdding(!adding)}
            data-test="habit-create-btn"
          >
            +
          </AddButton>
        </TopTitle>
      </Row>
      <Row hide={!adding}>
        <AddHabit setShow={setAdding} onSave={saveHabit} />
      </Row>
      {loading ? (
        <Dots />
      ) : habits && habits.length > 0 ? (
        habits.map((habit) => (
          <Row key={habit.id}>
            <HabitCard data-test="habit-container">
              <Row>
                <span data-test="habit-name">{habit.name}</span>
                <ion-icon
                  name="trash-outline"
                  onClick={() => deleteHabit(habit)}
                  data-test="habit-delete-btn"
                ></ion-icon>
              </Row>
              <Row>
                <DaysContainer>
                  {DOWS.map((d, i) => (
                    <DayOfWeek
                      key={i}
                      set={habit.days.includes(i)}
                      data-test="habit-day"
                    >
                      {d}
                    </DayOfWeek>
                  ))}
                </DaysContainer>
              </Row>
            </HabitCard>
          </Row>
        ))
      ) : (
        <SubTitle>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </SubTitle>
      )}
      <Footer />
    </PageContainer>
  );
}

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  margin-bottom: 10px;
  display: ${(props) => (props.hide ? "none" : "flex")};
`;

const TopTitle = styled.div`
  color: #126ba5;
  font-size: 23px;
  width: 100%;
  margin-bottom: 5px;
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

const HabitCard = styled.div`
  padding: 5px 10px;
  width: 100%;
  border-radius: 5px;
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

const AddHabitStyle = styled(HabitCard)`
  padding-top: 15px;
  input {
    width: 95%;
    height: 45px;
    font-size: 20px;
    border-radius: 5px;
    border-width: 1px;
    padding: 0 8px;
    border: 1px solid #dbdbdb;
    &::placeholder {
      color: #dbdbdb;
    }
  }
`;
const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
`;

const MenuButton = styled.button`
  width: 84px;
  height: 35px;
  border-radius: 5px;
  border-width: 0;
  font-size: 16px;
  background-color: #52b6ff;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;

const CancelButton = styled(MenuButton)`
  background-color: #ffffff;
  color: #52b6ff;
`;

function AddHabit({ setShow, onSave }) {
  const [habitName, setHabitName] = useState("");
  const [habitDays, setHabitDays] = useState([]);
  const [loading, setLoading] = useState(false);
  function setDay(index) {
    const newState = habitDays.includes(index)
      ? habitDays.filter((d) => d !== index)
      : [...habitDays, index];
    setHabitDays(newState);
  }
  function submitHabit(e) {
    e.preventDefault();
    setLoading(true);
    onSave(
      {
        name: habitName,
        days: habitDays,
      },
      onSuccess,
      onFailure
    );
  }
  function onSuccess() {
    setHabitName("");
    setHabitDays([]);
    setLoading(false);
  }
  function onFailure() {
    setLoading(false);
  }
  return (
    <AddHabitStyle data-test="habit-create-container">
      <form onSubmit={submitHabit}>
        <Row>
          <input
            placeholder="nome do hábito"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            disabled={loading}
            data-test="habit-name-input"
          />
        </Row>
        <Row>
          <DaysContainer>
            {DOWS.map((d, i) => (
              <DayOfWeek
                key={i}
                set={habitDays.includes(i)}
                onClick={() => setDay(i)}
                disabled={loading}
                type="button"
                data-test="habit-day"
              >
                {d}
              </DayOfWeek>
            ))}
          </DaysContainer>
        </Row>
        <Row>
          <ButtonContainer>
            <CancelButton
              type="button"
              onClick={() => setShow(false)}
              data-test="habit-create-cancel-btn"
            >
              Cancelar
            </CancelButton>
            <MenuButton type="submit" data-test="habit-create-save-btn">
              Salvar
            </MenuButton>
          </ButtonContainer>
        </Row>
      </form>
    </AddHabitStyle>
  );
}
