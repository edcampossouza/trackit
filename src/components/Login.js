import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { URL } from "../constants";
import { ContainerStyle } from "../styles/AuthPages";
import { UserContext } from "../contexts/UserContext";
import Dots from "./Dots";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({ password: "", email: "" });
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function userLogin(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${URL}/auth/login`, loginInfo)
      .then((res) => {
        const user = res.data;
        setUser(user);
        setLoading(false);
        navigate("/hoje");
      })
      .catch((err) => {
        const msg =
          err.response.data.message || JSON.stringify(err.response.data);
        alert("Erro: " + msg);
        setLoading(false);
      });
  }
  return (
    <ContainerStyle>
      <img src={logo} alt="site-logo" />
      <form onSubmit={userLogin}>
        <input
          placeholder="email"
          name="email"
          value={loginInfo.email}
          type="email"
          required
          onChange={onChange}
          disabled={loading}
          data-test="email-input"
        />
        <input
          placeholder="senha"
          name="password"
          value={loginInfo.password}
          type="password"
          required
          onChange={onChange}
          disabled={loading}
          data-test="password-input"
        />
        <button data-test="login-btn" type="submit">
          {loading ? <Dots /> : "Entrar"}
        </button>
      </form>
      <a data-test="signup-link" href="/cadastro">
        Não tem uma conta? Cadastre-se!
      </a>
    </ContainerStyle>
  );
}
