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
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
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
          <StyledNavLink to="/account">
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
