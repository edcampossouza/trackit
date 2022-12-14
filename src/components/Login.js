import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { URL } from "../constants";
import { ContainerStyle } from "../styles/AuthPages";
import Dots from "./Dots";

export default function Login() {
  const navigate = useNavigate();
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
        console.log(res.data);
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
        />
        <input
          placeholder="senha"
          name="password"
          value={loginInfo.password}
          type="password"
          required
          onChange={onChange}
          disabled={loading}
        />
        <button type="submit">{loading ? <Dots /> : "Entrar"}</button>
      </form>
      <a href="/cadastro">Não tem uma conta? Cadastre-se!</a>
    </ContainerStyle>
  );
}
