import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import { adminRoutes } from '../../config/Routes';

import Header from './header/Header';
import Sitebar from './sidebar/Sidebar';
const AdminLayout = () => {
    return (

        <div className="AdminLayout">
        <Header />

        <div style={{display: 'flex'}}>
        
            <Sitebar />
            <Switch>
                {
                    adminRoutes.map((route, i) => {
                        return(
                            route.component && (
                                <Route 
                                    key={i}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props) => (
                                        <route.component {...props} />
                                    )}
                                
                                />
                            )
                        )
                    })
                }

            </Switch>
        </div>
        </div>
    )
}

export default AdminLayout;