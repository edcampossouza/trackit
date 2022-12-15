import { BrowserRouter, Route, Routes } from "react-router-dom";
import Habits from "./components/Habits";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Today from "./components/Today";
import GlobalStyle from "./styles/GlobalStyles";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const [user, setUser] = useState({});
  const [habits, setHabits] = useState([]);
  const [todayHabits, setTodayHabits] = useState([]);
  return (
    <AppContainer>
      <GlobalStyle />
      <UserContext.Provider
        value={{
          user,
          setUser,
          habits,
          setHabits,
          todayHabits,
          setTodayHabits,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Signin />} />
            <Route path="/habitos" element={<Habits />} />
            <Route path="/hoje" element={<Today />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

export default App;
