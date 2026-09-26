import styled from "styled-components";

// Components
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  position: relative;
  overflow: hidden;

  padding: 3.2rem 2.4rem;

  background: var(--color-grey-50);
  border-right: 1px solid var(--color-grey-200);

  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 3rem;

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background-image: url("/sidebar-light.png");
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
    background-image: url("/sidebar-dark.png");
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
