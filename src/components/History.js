import { MainTitle, PageContainer, Row, SubTitle } from "../styles/PageStyle";
import Footer from "./Footer";
import Header from "./Header";

export default function History() {
  return (
    <PageContainer>
      <Header />
      <Row>
        <MainTitle>Histórico</MainTitle>
      </Row>
      <Row>
        <SubTitle>
          Em breve você poderá ver o histórico dos seus hábitos aqui!
        </SubTitle>
      </Row>
      <Footer />
    </PageContainer>
  );
}
