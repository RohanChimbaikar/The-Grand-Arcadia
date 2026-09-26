import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HomeIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &,
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;

    padding: 1.2rem 2.4rem;
    border-radius: var(--border-radius-md);

    transition:
      color 0.2s ease,
      background-color 0.2s ease;
  }

  &:hover {
    color: var(--color-brand-600);
    background-color: rgba(255, 255, 255, 0.12);
  }

  &.active {
    color: var(--color-brand-600);

    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;

    color: var(--color-grey-400);

    transition: color 0.2s ease;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HomeIcon /> Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <CalendarDaysIcon />
            Bookings
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HomeModernIcon />
            Cabins
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <UsersIcon />
            Users
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <Cog6ToothIcon />
            Settings
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
