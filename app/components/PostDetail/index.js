import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserLoggedIn } from '../../containers/Auth/selectors';
import PostDetail from './PostDetail';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectUserLoggedIn(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(PostDetail);
