import styled from "styled-components";

import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 4.8rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/Logo-Dark.svg" : "/Logo-Light.svg";

  return (
    <StyledLogo>
      <Img
        src={src}
        alt="Logo"
        style={{
          width: "auto",
        }}
      />
    </StyledLogo>
  );
}

export default Logo;
