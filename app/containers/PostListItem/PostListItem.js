import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import { IssueIcon } from 'components/Icons';
import './style.scss';
import { Link } from 'react-router-dom';
import PostLike from "../PostLike/PostLike";

export default class PostListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item, isLoggedIn } = this.props;
    const content = (
      <div className="collection-item row">
        <div className="col m9">
          <h2 className="post-list-title">
            <Link className="router-link" to={`/post/detail/${item.slug}`}>
              {item.title}
            </Link>
          </h2>
          <p className="post-sub-info">
            {item.source}
          </p>
          <PostLike likeCount={item.likes} isLoggedIn={isLoggedIn} hasLiked={item.has_liked} postSlug={item.slug} />
        </div>
      </div>
    );

    return (
      <ListItem class="collection-item" key={`post-list-item-${item.id}`} item={content} />
    );
  }
}

PostListItem.propTypes = {
  isLoggedIn: PropTypes.bool,
  item: PropTypes.object,
};
