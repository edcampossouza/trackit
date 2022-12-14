import { PageContainer } from "../styles/PageStyle";
import { LoginContext } from "../contexts/LoginContext";
import Header from "./Header";
import { useContext } from "react";
import Footer from "./Footer";

export default function Today() {
  const { user } = useContext(LoginContext);
  return (
    <PageContainer>
      <Header />
      {JSON.stringify(user)}
      <Footer />
    </PageContainer>
  );
}
