import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import { useDarkMode } from "../../context/DarkModeContext";

const LoginCard = styled.div`
  width: min(100%, 96rem);
  min-height: 56rem;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background: var(--color-grey-50);

  border: 1px solid var(--color-grey-300);
  border-radius: 1.6rem;

  overflow: hidden;

  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.25);
`;

const BrandLogo = styled.img`
  width: 20rem;
  height: auto;

  display: block;
  margin: auto;
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 6rem;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
`;

const BrandWrapper = styled.div`
  width: 32rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 7rem 8rem;

  background: var(--color-grey-100);
`;

const FormContent = styled.div`
  width: 100%;
  max-width: 36rem;

  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3.5rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;

  color: var(--color-grey-800);

  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  margin-top: 0.8rem;

  font-size: 1.4rem;
  line-height: 1.6;

  color: var(--color-grey-600);
`;

const LoginFormRow = styled(FormRowVertical)`
  label {
    color: var(--color-grey-700);
    font-weight: 500;
  }
`;

const LoginInput = styled(Input)`
  background: var(--color-grey-50);

  border: 1px solid var(--color-grey-300);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: var(--color-grey-400);
  }

  &:focus {
    border-color: var(--color-brand-500);

    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  &:disabled {
    background: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;

  margin-top: 1rem;

  border-radius: var(--border-radius-md);

  box-shadow: 0 0.8rem 1.6rem rgba(79, 70, 229, 0.2);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);

    box-shadow: 0 1rem 2rem rgba(79, 70, 229, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggingIn, login } = useLogin();

  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/login-dark.png" : "/login-light.png";
  const logo = isDarkMode ? "/Logo-Dark.svg" : "/Logo-Light.svg";

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onError: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <LoginCard>
      <BrandSection style={{ backgroundImage: `url(${src})` }}>
        <BrandWrapper>
          <BrandLogo src={logo} alt="The Grand Arcadia" />
        </BrandWrapper>
      </BrandSection>
      <FormSection>
        <FormContent>
          <Header>
            <Title>Welcome back</Title>

            <Subtitle>Sign in to continue to your account.</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
              <Input
                type="email"
                id="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoggingIn}
              />
            </FormRowVertical>

            <FormRowVertical label="Password">
              <Input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoggingIn}
              />
            </FormRowVertical>

            <FormRowVertical>
              <LoginButton size="large" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <SpinnerMini />
                  </>
                ) : (
                  "Login"
                )}
              </LoginButton>
            </FormRowVertical>
          </Form>
        </FormContent>
      </FormSection>
    </LoginCard>
  );
}

export default LoginForm;
