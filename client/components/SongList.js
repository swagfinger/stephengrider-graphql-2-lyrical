import React, { Component } from 'react';
import { Link } from 'react-router';

import { graphql } from 'react-apollo';

import query from '../queries/fetchSongs';
import mutation from '../queries/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    //muatate is function from props
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li className="collection-item" key={id}>
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(mutation)(graphql(query)(SongList));
