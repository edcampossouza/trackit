import styled from "styled-components";
import Header from "./Header";

export default function Habits() {
  return (
    <PageStyle>
      <Header />
    </PageStyle>
  );
}

const PageStyle = styled.div`
  padding-top: 70px;
`;
