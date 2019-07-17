import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { signUp } from '../actions';
import SignUp from './SignUp';
import { makeSelectAuthLoading } from '../selectors';

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (evt, payload) => {
    evt.preventDefault();
    dispatch(signUp(payload));
  },
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectAuthLoading()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignUp);
export { mapDispatchToProps };
