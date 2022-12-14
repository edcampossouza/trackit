import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import styled from "styled-components";
import Habits from "./components/Habits";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Today from "./components/Today";
import GlobalStyle from "./styles/GlobalStyles";
import History from "./components/History";
import { fetchTodaysHabits, fetchHabits } from "./data-fetch/data-fetch";
import { en, pt } from "./assets/strings";

function App() {
  const [user, setUser] = useState({});
  const [habits, setHabits] = useState([]);
  const [todayHabits, setTodayHabits] = useState([]);
  const [lang, setLang] = useState(en);

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
          lang,
          useEn: () => setLang(en),
          usePt: () => setLang(pt),
          setTodayHabits,
          fetchTodaysHabits: () => fetchTodaysHabits(user, setTodayHabits),
          fetchHabits: (setLoading) => fetchHabits(user, setHabits, setLoading),
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Signin />} />
            <Route path="/habitos" element={<Habits />} />
            <Route path="/hoje" element={<Today />} />
            <Route path="/historico" element={<History />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
`;

export default App;
