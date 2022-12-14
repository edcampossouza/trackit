import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ContainerStyle } from "../styles/AuthPages";

export default function Login() {
  const navigate = useNavigate();
  return (
    <ContainerStyle>
      <img src={logo} alt="site-logo" />
      <input placeholder="email" />
      <input placeholder="senha" />
      <button onClick={() => navigate("/habitos")}>Entrar</button>
      <a href="/cadastro">Não tem uma conta? Cadastre-se!</a>
    </ContainerStyle>
  );
}
