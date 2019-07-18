/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import './style.scss';
import PostsList from 'components/PostsList';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const {
      loading, error, onSubmitForm, posts, query
    } = this.props;

    const {
      search
    } = this.state;

    const postsListProps = {
      loading,
      posts,
      error,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Simple post sharing portal." />
        </Helmet>
        <div className="home-page">
          <section>
            <form onSubmit={(e) => onSubmitForm(this, e, search)}>
              <input
                className="form-control form-control-lg"
                id="search"
                type="text"
                placeholder="Search posts @ with their title."
                value={query}
                onChange={this.handleChange}
              />
            </form>
            <PostsList {...postsListProps} />
            {posts.length === 0 && <p>No posts found.</p>}
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  fetchPosts: PropTypes.func,
  query: PropTypes.string,
};
