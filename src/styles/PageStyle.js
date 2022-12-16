import styled from "styled-components";

export const PageContainer = styled.div`
  padding-top: 90px;
  padding-bottom: 100px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  margin-bottom: 10px;
  display: ${(props) => (props.hide ? "none" : "flex")};
`;
