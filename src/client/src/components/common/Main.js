import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './home/Home';
import Price from './price/Price';
import Error from './error/Error';

const Main = () => {
    <div>
        <Switch> //объект роутинга
            <Route path="/" component={Home}/>
            <Route path="/price" component={Price}/>
            <Route path="*" component={Error}/>
        </Switch>
    </div>
}

export default Main;