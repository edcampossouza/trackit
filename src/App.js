import { BrowserRouter, Route, Routes } from "react-router-dom";
import Habits from "./components/Habits";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Today from "./components/Today";
import GlobalStyle from "./styles/GlobalStyles";
import { LoginContext } from "./contexts/LoginContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  return (
    <div>
      <GlobalStyle />
      <LoginContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Signin />} />
            <Route path="/habitos" element={<Habits />} />
            <Route path="/hoje" element={<Today />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
