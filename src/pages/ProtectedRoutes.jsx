import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { Navigate } from "react-router-dom";

const PageLayout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoutes = ({ children }) => {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading)
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isAuthenticated) return children;
};

export default ProtectedRoutes;
