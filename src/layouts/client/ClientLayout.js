import React from 'react';
import { Switch, Route} from 'react-router-dom';


import publicClientRoute from '../../config/Routes';
import Header from './header/Header';
const ClientLayout = () => {
    return (
       
        <div>
            <Header />
            <Switch>
                {
                    publicClientRoute.map((data, i) => {
                        return(
                            data.component &&(
                                
                                <Route 
                                    key={i}
                                    path={data.path}
                                    exact={data.exact}
                                    name={data.name}
                                    onEnter={data.onEnter}
                                    render={(props) => (
                                        <data.component {...props}/>
                                    )}
                                />
                            )
                        )
                    })
                }
            </Switch>

        </div>
        
        

    )
}

export default ClientLayout;
