import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import PostListItem from './PostListItem';
import { makeSelectUserLoggedIn } from "../Auth/selectors";

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    isLoggedIn: makeSelectUserLoggedIn(),
  })
)(PostListItem);
