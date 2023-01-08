import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { URL } from "../constants";
import { ContainerStyle } from "../styles/AuthPages";
import Dots from "./Dots";
import { UserContext } from "../contexts/UserContext";
import LanguageOptions from "./LanguageOptions";

export default function Signin() {
  const navigate = useNavigate();
  const { lang } = useContext(UserContext);
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
      .post(`${URL}auth/sign-up`, userInfo)

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
      <LanguageOptions />
      <img src={logo} alt="site-logo" />
      <form onSubmit={userSignIn}>
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
          placeholder={lang.PASSWORD}
          name="password"
          value={userInfo.password}
          type="password"
          required
          disabled={loading}
          onChange={onChange}
          data-test="password-input"
        />
        <input
          placeholder={lang.NAME}
          name="name"
          value={userInfo.name}
          required
          disabled={loading}
          onChange={onChange}
          data-test="user-name-input"
        />
        <input
          placeholder={lang.PICTURE}
          name="image"
          value={userInfo.image}
          required
          disabled={loading}
          onChange={onChange}
          data-test="user-image-input"
        />
        <button data-test="signup-btn" type="submit" disabled={loading}>
          {loading ? <Dots /> : lang.SIGNUP_BTN}
        </button>
        <Link to="/">
          <a data-test="login-link">{lang.LOGIN_LINK}</a>
        </Link>
      </form>
    </ContainerStyle>
  );
}
