import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SwipeView from './views/swipe-view/swipe-view';
import SavedListView from './saved-list-view';
import SingleCardView from './single-card-view';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/" component={SwipeView} exact/>
      <Route path="/saved" component={SavedListView}/>
      <Route path="/card" component={SingleCardView}/>
    </Switch>
  );
}

export default Main;
