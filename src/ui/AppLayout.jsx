import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
  height: 100vh;
`;

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  overflow: hidden;

  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
