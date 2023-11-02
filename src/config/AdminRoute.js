import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

import webApi from "../api/webApi";
import swal from "sweetalert";
import axiosWebClient from "../api/axiosWeb";

import AdminLayout from '../layouts/admin/AdminLayout';

const AdminRoute = ({...rest}) => {
    const history = useHistory();
    const [ Authen, setAuthen] = useState(false);
    const [loading, setLoading] = useState(true);

    const check = async () => {
        try{
            const result =await  webApi.checkLogin();
            if(result.status === 200){
                setAuthen(true);
            }
            setLoading(false)
        }catch(err){
            console.log(err);
        }

    }
    useEffect(() => {
        check();
        
        return () => {
            setAuthen(false);
        }
    }, []);


    axiosWebClient.interceptors.response.use(undefined, function reload(err){
        if(err.response.status === 401){
            swal('Unauthorized', err.response.data.message, 'warning')
            history.push('/')
        }
        return Promise.reject(err)
    })
    axiosWebClient.interceptors.response.use(function(response){
        return response
    }, function(err){
        if(err.response.status === 403){
            swal('Forbidden', err.response.data.message, 'warning')
            history.push('/403')
        }else if(err.response.status === 404){
            swal('404 Error',"Url not found", 'warning')
            history.push('/404')
        }
        else if(err.response.status === 400){
            swal('Error Validation', err.response.data.message, 'warning')

        }
        return Promise.reject(err)
    })
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <Route {...rest}
            render = {(props, location) => 
                Authen ? 
                ( <AdminLayout {...props}/>) :
                ( <Redirect to={{pathname:"/login", state:{from: location}}}/>)
            }
        />
    )
}

export default AdminRoute;