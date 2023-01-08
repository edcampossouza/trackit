import { MainTitle, PageContainer, Row, SubTitle } from "../styles/PageStyle";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Footer from "./Footer";
import Header from "./Header";

export default function History() {
  const {lang} = useContext(UserContext)
  return (
    <PageContainer>
      <Header />
      <Row>
        <MainTitle>{lang.HISTORY}</MainTitle>
      </Row>
      <Row>
        <SubTitle>
          {lang.HISTORY_PLACEHOLDER}
        </SubTitle>
      </Row>
      <Footer />
    </PageContainer>
  );
}
