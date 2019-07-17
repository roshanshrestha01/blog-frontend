import React, {Component} from 'react';
import request from 'utils/request';
// import Materialize from 'material-css';
import config from '../../../config';
import {NotificationManager} from 'react-notifications';
import LoadingIndicator from '../../../components/LoadingIndicator';

class EventForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      source: '',
      link: '',
      loading: false,
    };
  }

  componentDidMount() {
    const {match: {params: {id}}} = this.props;
    const requestURL = `${config.baseURL}/posts/${id}/`;
    if (id) {
      this.setState({loading: true});
      request(requestURL)
        .then((data) => {
          this.setState(data);
          this.setState({loading: false});
        })
        .catch(e => console.log(e));
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };


  isUpdate = () => {
    const {match: {params: {id}}} = this.props;
    return !!id;
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const {match: {params: {id}}} = this.props;
    const requestURL = this.isUpdate() ? `${config.baseURL}/posts/${id}/` : `${config.baseURL}/posts/`;
    const user = localStorage.getItem('user');
    const parseUser = JSON.parse(user);
    const {auth_token} = parseUser;
    let payload = Object.assign({}, this.state);
    const METHOD = this.isUpdate() ? 'PUT' : 'POST';
    this.setState({loading: true});

    request(requestURL, {
      method: METHOD,
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${auth_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => {
        NotificationManager.success('Event created');
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(e => {
        let error;
        try {
          error = e.response.json();
        } catch (e) {
          error = {errors: [{detail: `${e.name}: ${e.message}`}]};
        }
        NotificationManager.error(error.message);
      });
  };

  render() {
    const {
      loading,
      title,
      source,
      link,

    } = this.state;

    const button = loading ? <LoadingIndicator/> :
      <button className="btn btn-primary mt-3 pink lighten-1 z-depth-0">{this.isUpdate() ? 'Update' : 'Create'}</button>;

    return (
      <div className="container" key="1">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Event Form</h5>
          <div className="input-field">
            <label htmlFor="title" className="active">Title*</label>
            <input type="text" className="form-control" placeholder="Title" id="title" value={title} onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="source" className="active">Source*</label>
            <input type="text" className="form-control" placeholder="Source" id="source" value={source} onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="link" className="active">Link*</label>
            <input type="text" className="form-control" placeholder="Link" id="link" value={link} onChange={this.handleChange} required/>
          </div>

          <div className="input-field">
            {button}
          </div>
        </form>
      </div>
    );
  }
}

export default EventForm;
