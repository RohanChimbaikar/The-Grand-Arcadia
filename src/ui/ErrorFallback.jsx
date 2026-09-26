import styled from "styled-components";
import {
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
  HiOutlineHome,
} from "react-icons/hi2";

const Page = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-50);

  display: grid;
  place-items: center;

  padding: 2rem;

  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    background-image: url("/sidebar-light.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    opacity: 0.14;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;

    background: rgba(255, 255, 255, 0.72);
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  .dark-mode & {
    background-color: var(--color-grey-900);
  }

  .dark-mode &::before {
    background-image: url("/sidebar-dark.png");
    opacity: 0.1;
  }

  .dark-mode &::after {
    background: rgba(15, 23, 42, 0.72);
  }
`;

const Card = styled.div`
  width: min(40rem, 100%);

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);

  padding: 3.2rem;

  text-align: center;

  box-shadow: var(--shadow-md);

  .dark-mode & {
    background: rgba(30, 41, 59, 0.9);
    border-color: var(--color-grey-700);
  }
`;

const IconWrapper = styled.div`
  width: 5rem;
  height: 5rem;

  margin: 0 auto 1.8rem;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background-color: rgba(79, 70, 229, 0.1);
  color: #4f46e5;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  .dark-mode & {
    background-color: rgba(129, 140, 248, 0.12);
    color: #a5b4fc;
  }
`;

const Eyebrow = styled.p`
  margin-bottom: 0.6rem;

  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.12rem;
  text-transform: uppercase;

  color: #4f46e5;

  .dark-mode & {
    color: #a5b4fc;
  }
`;

const Heading = styled.h1`
  margin-bottom: 0.8rem;

  font-size: 2.2rem;
  line-height: 1.25;

  color: var(--color-grey-800);

  .dark-mode & {
    color: var(--color-grey-100);
  }
`;

const Message = styled.p`
  max-width: 32rem;

  margin: 0 auto;

  font-size: 1.25rem;
  line-height: 1.6;

  color: var(--color-grey-500);

  .dark-mode & {
    color: var(--color-grey-400);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;

  gap: 0.8rem;

  margin-top: 2.4rem;
`;

const Button = styled.button`
  border-radius: var(--border-radius-sm);

  padding: 0.8rem 1.3rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.2s;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(Button)`
  border: none;

  background-color: #4f46e5;
  color: white;

  &:hover {
    background-color: #4338ca;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;

  color: var(--color-grey-700);

  border: 1px solid var(--color-grey-300);

  &:hover {
    background-color: var(--color-grey-100);
  }

  .dark-mode & {
    color: var(--color-grey-200);
    border-color: var(--color-grey-600);

    &:hover {
      background-color: var(--color-grey-700);
    }
  }
`;

const ErrorCode = styled.p`
  margin-top: 1.6rem;

  font-size: 1rem;
  color: var(--color-grey-400);

  .dark-mode & {
    color: var(--color-grey-500);
  }
`;

function ErrorFallback({ resetErrorBoundary, error }) {
  function handleHome() {
    resetErrorBoundary();
    window.location.href = "/dashboard";
  }

  return (
    <Page>
      <Card>
        <IconWrapper>
          <HiOutlineExclamationTriangle />
        </IconWrapper>

        <Eyebrow>Unexpected error</Eyebrow>

        <Heading>Something went wrong</Heading>

        <Message>
          We couldn't load this page correctly. Please try again or return to
          the dashboard.
          <span
            style={{
              fontFamily: "courier",
              fontSize: "1rem",
            }}
          >
            {error.message}
          </span>
        </Message>

        <Actions>
          <SecondaryButton onClick={handleHome}>
            <HiOutlineHome />
            Dashboard
          </SecondaryButton>

          <PrimaryButton onClick={resetErrorBoundary}>
            <HiOutlineArrowPath />
            Try again
          </PrimaryButton>
        </Actions>
      </Card>
    </Page>
  );
}

export default ErrorFallback;
