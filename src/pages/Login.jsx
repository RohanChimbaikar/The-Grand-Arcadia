import styled from "styled-components";

import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3rem;

  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;