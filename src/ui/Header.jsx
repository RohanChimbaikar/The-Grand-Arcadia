import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  position: relative;

  background-color: var(--color-grey-50);
  padding: 1.2rem 4.8rem;
  border-bottom: solid 1px var(--color-grey-200);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background-image: url("/header-light.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    opacity: 0.65;
    pointer-events: none;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  .dark-mode &::before {
    background-image: url("/header-dark.png");
  }
`;
const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
