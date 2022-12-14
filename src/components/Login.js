import logo from "../assets/logo.png";
import { ContainerStyle } from "../styles/AuthPages";

export default function Login() {
  return (
    <ContainerStyle>
      <img src={logo} alt="site-logo" />
      <input placeholder="email" />
      <input placeholder="senha" />
      <button>Entrar</button>
      <a href="/cadastro">Não tem uma conta? Cadastre-se!</a>
    </ContainerStyle>
  );
}
