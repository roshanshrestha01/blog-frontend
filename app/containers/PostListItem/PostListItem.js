import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import { IssueIcon } from 'components/Icons';
import './style.scss';
import { Link } from 'react-router-dom';

export default class PostListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item } = this.props;
    const content = (
      <div className="collection-item row">
        <div className="col m9">
          <h2 className="post-list-title">
            <Link className="router-link" to={`/post/detail/${item.slug}`}>
              {item.title}
            </Link>
          </h2>
          <p className="post-sub-info">{item.source}
          </p>
        </div>
      </div>
    );

    return (
      <ListItem class="collection-item" key={`post-list-item-${item.id}`} item={content} />
    );
  }
}

PostListItem.propTypes = {
  item: PropTypes.object,
};
