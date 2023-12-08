import React from 'react';
import { Route} from 'react-router-dom';

import ClientLayout from '../layouts/client/ClientLayout';



function PublicRoute ({...rest}){
    return (
        <Route {...rest} render = {(props) => <ClientLayout {...props}/>}/>
    )
}

export default PublicRoute;