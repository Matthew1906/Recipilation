import useAuth from "../hooks/useAuth";
import { Route, Navigate }  from "react-router-dom";

const AuthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuth()
    console.log(`AuthenticatedRoute: ${isAuthenticated}`)
    return (
      <Route
        {...props}
        render={routeProps =>
          isAuthenticated ? <C {...routeProps} /> : <Navigate to="/login" />
        }
      />
    )
};

export default AuthenticatedRoute;