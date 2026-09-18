import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-50);
  padding: 1.2rem 4.8rem;
  border-bottom: solid 1px var(--color-grey-200);
`;

const Header = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
