import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectError, makeSelectLoading, makeSelectRepos } from 'containers/App/selectors';
import { changeUsername, loadPosts } from './actions';
import { makePosts, makeSelectQuery, makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';


const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  fetchPosts: () => dispatch(loadPosts()),
  onSubmitForm: (scope, evt, query) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    scope.props.history.push({
      search: `?search=${query}`,
    });
    dispatch(loadPosts());
  }
});

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  posts: makePosts(),
  username: makeSelectUsername(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
