import { createSelector } from 'reselect';

const selectHome = (state) => state.home;

const selectRoute = (state) => state.route;

const makeSelectQuery = () => createSelector(
  selectHome,
  (homeState) => homeState.search
);

const makeSelectRouteQuery = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').get('location').get('search'),
);

const makePosts = () => createSelector(
  selectHome,
  (homeState) => homeState.posts,
);

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.username
);


export {
  selectHome,
  makeSelectQuery,
  makeSelectRouteQuery,
  makePosts,
  makeSelectUsername,
};
