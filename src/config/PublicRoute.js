import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

import ClientLayout from '../layouts/client/ClientLayout';
import webApi from '../api/webApi';
import axiosWebClient from '../api/axiosWeb';


function PublicRoute ({...rest}){
    return (
        <Route {...rest} render = {(props) => <ClientLayout {...props}/>}/>
    )
}

export default PublicRoute;