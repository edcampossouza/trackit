import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { URL } from "../constants";
import { ContainerStyle } from "../styles/AuthPages";
import Dots from "./Dots";

export default function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  function userSignIn(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${URL}/auth/sign-up`, userInfo)

      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        const msg =
          err.response.data.message || JSON.stringify(err.response.data);
        alert("Erro: " + msg);
        setLoading(false);
      });
  }

  function onChange(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <ContainerStyle>
      <form onSubmit={userSignIn}>
        <img src={logo} alt="site-logo" />
        <input
          placeholder="email"
          name="email"
          type="email"
          value={userInfo.email}
          required
          disabled={loading}
          onChange={onChange}
          data-test="email-input"
        />
        <input
          placeholder="senha"
          name="password"
          value={userInfo.password}
          type="password"
          required
          disabled={loading}
          onChange={onChange}
          data-test="password-input"
        />
        <input
          placeholder="nome"
          name="name"
          value={userInfo.name}
          required
          disabled={loading}
          onChange={onChange}
          data-test="user-name-input"
        />
        <input
          placeholder="foto"
          name="image"
          value={userInfo.image}
          required
          disabled={loading}
          onChange={onChange}
          data-test="user-image-input"
        />
        <button data-test="signup-btn" type="submit" disabled={loading}>
          {loading ? <Dots /> : "Cadastrar"}
        </button>
        <a data-test="login-link" href="/">
          Já tem uma conta? Faça login!
        </a>
      </form>
    </ContainerStyle>
  );
}
