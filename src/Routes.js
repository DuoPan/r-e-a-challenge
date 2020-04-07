import React from 'react';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import HomePage from 'View/HomePage';
import {TObject} from 'Lib/Core/prop_types';
import {URI} from './uri';

function Routes(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Switch>
          <Route path={URI.HOME} exact component={HomePage}/>
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

Routes.propTypes = {
  history: TObject.isRequired,
};

export default (Routes);
