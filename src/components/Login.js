import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { URL } from "../constants";
import { ContainerStyle } from "../styles/AuthPages";
import { UserContext } from "../contexts/UserContext";
import LanguageOptions from "./LanguageOptions";
import Dots from "./Dots";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, lang } = useContext(UserContext);
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
      .post(`${URL}auth/login`, loginInfo)
      .then((res) => {
        const user = res.data;
        setUser(user);
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
      <LanguageOptions />
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
          placeholder={lang.PASSWORD}
          name="password"
          value={loginInfo.password}
          type="password"
          required
          onChange={onChange}
          disabled={loading}
          data-test="password-input"
        />
        <button data-test="login-btn" type="submit" disabled={loading}>
          {loading ? <Dots /> : lang.LOGIN_BTN}
        </button>
      </form>
      <Link to="/cadastro">
        <a data-test="signup-link">{lang.SIGNUP_LINK}</a>
      </Link>
    </ContainerStyle>
  );
}
