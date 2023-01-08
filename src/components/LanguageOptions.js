import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function LanguageOptions() {
  const { useEn, usePt } = useContext(UserContext);

  return (
    <LangsContainer>
      <LangOption onClick={usePt}>
        <img src="https://flagcdn.com/32x24/br.png" alt="brazil-flag" />
        pt-BR
      </LangOption>
      <LangOption onClick={useEn}>
        <img src="https://flagcdn.com/32x24/us.png" alt="usa-flag" />
        en
      </LangOption>
    </LangsContainer>
  );
}

const LangsContainer = styled.div`
  display: flex;
`;
const LangOption = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 20px;
    height: 14px;
  }
  font-size: 12px;
  color: #e7e7e7;
  cursor: pointer;
`;

export { LangsContainer, LangOption };
