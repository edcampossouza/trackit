import styled from "styled-components";

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 60px;
    margin-bottom: 40px;
    width: 180px;
    height: 180px;
  }
  input,
  button {
    width: 303px;
    height: 45px;
    font-size: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
  button {
    background-color: #52b6ff;
    border-width: 0;
    font-size: 21px;
    color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  input {
    padding: 8px;
    border: 1px solid #dbdbdb;
    &::placeholder {
      color: #dbdbdb;
    }
    border-width: 1px;
  }
  a {
    margin-top: 20px;
    color: #52b6ff;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
