import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import GlobalStyle from "./styles/GlobalStyles";

function App() {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
