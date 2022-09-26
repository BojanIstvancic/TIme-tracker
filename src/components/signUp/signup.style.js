import styled from "styled-components";

const SignUpStyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  background: linear-gradient(
    180deg,
    rgba(103, 189, 255, 0.1292892156862745) 0%,
    rgba(255, 255, 255, 1) 100%
  );

  h1 {
    font-size: 22px;
    margin-bottom: 20px;
    color: var(--blue);
  }

  form {
    padding: 20px;
    border: 1px solid var(--gray);
    border-radius: 5px;

    div {
      margin-bottom: 10px;
      display: flex;

      &:last-child {
        margin-bottom: 0;
      }
    }

    input {
      width: 100%;

      &.submit {
        margin: 15px auto 0;
        width: 150px;
        background: var(--blue);
        color: var(--white);
        border: none;
        padding: 10px;
        font-size: 18px;
      }
    }

    p {
      margin-right: 10px;
    }
  }
`;

export { SignUpStyledWrapper };
