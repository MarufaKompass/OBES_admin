import { Navigate } from "react-router-dom";
import { useAdminObeContext } from "../contextProvider/AdminContextProvider";

export default function PrivateRoutes({children}) {
    const {user} = useAdminObeContext();

    if(user) {
        return children;
    }
    return <Navigate to="/auth/sign-in" replace={true} />;
}