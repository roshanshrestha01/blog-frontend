import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { signIn } from '../actions';
import SignIn from './SignIn';
import { makeSelectAuthLoading } from '../selectors';

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (evt, payload) => {
    evt.preventDefault();
    dispatch(signIn(payload));
  },
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectAuthLoading()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignIn);
