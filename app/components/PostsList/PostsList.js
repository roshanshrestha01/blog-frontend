import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import PostListItem from 'containers/PostListItem';
// import MyEventListItem from 'containers/MyEventListItem';

const PostList = ({
  loading, error, posts, userPosts
}) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }
  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (posts === undefined) {
    return <List component={LoadingIndicator} />;
  }

  // if (userPosts === true) {
  //   return <List items={posts} component={MyEventListItem}/>;
  // }

  if (posts !== false) {
    // const { results } = posts;
    return <List items={posts} component={PostListItem} />;
  }

  return null;
};

PostList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  posts: PropTypes.any,
  userPosts: PropTypes.bool,
};

export default PostList;
