import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';


export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <main>
                    <Route exact={true} path="/" component={App} />
                </main>
            </div>
        </BrowserRouter>

    );
}

