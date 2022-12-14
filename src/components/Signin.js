import logo from "../assets/logo.png";
import { ContainerStyle } from "../styles/AuthPages";

export default function Signin() {
  return (
    <ContainerStyle>
      <img src={logo} alt="site-logo" />
      <input placeholder="email" />
      <input placeholder="senha" />
      <input placeholder="nome" />
      <input placeholder="foto" />
      <button>Cadastrar</button>
      <a href="/">Já tem uma conta? Faça login!</a>
    </ContainerStyle>
  );
}
