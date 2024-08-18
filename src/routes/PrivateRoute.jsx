import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Audio, Hourglass } from 'react-loader-spinner';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    //data from context api
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        />
    }

    if(user){
        return children
    }
    return (
       <><Navigate to={'/login'}></Navigate></>
    );
};

export default PrivateRoute;