import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

const makeSelectUsername = () => createSelector(
  selectAuth,
  (authState) => authState.user.email
);

const makeSelectToken = () => createSelector(
  selectAuth,
  (authState) => authState.user.token
);

const makeSelectGoingEvents = () => createSelector(
  selectAuth,
  (authState) => {
    if (authState !== undefined) {
      return authState.user.going_events;
      // return authState.get('user')
      //   .get('email');
    }
  },
);

const makeSelectUserLoggedIn = () => createSelector(
  selectAuth,
  (authState) => {
    if (authState) {
      try {
        return authState.user
          .get('isLoggedIn');
      } catch {
        return authState.user.isLoggedIn;
      }
    }
  },
);

const makeSelectAuthLoading = () => createSelector(
  selectAuth,
  (authState) => {
    return authState.authLoading;
  },
);


export {
  selectAuth,
  makeSelectGoingEvents,
  makeSelectAuthLoading,
  makeSelectUserLoggedIn,
};
