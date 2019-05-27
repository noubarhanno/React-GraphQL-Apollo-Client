import React, { Component } from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { optimistic } from "apollo-client/optimistic-data/store";

class LyricList extends Component {
    onLike(id, likes){
        this.props.mutate({ 
          variables: { id },
          // optimisticResponse will only guess what will be the Result of the call back 
          // it's type of make the UI work faster but if we guess wrongly like we put likes: likes + 12 or 13 or 100 then in the same time
          // we press on like the number will increase 12 or 13 or 100 but when the mutation is done the call back will update the UI truly with the correct result
          optimisticResponse: {
            __typename: 'Mutation',
            likeLyric: {
              id: id,
              __typename: 'LyricType',
              likes: likes + 1
            }
          }
        });
    }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
          <i onClick={() => this.onLike(id, likes)} className="material-icons right">thumb_up</i>
          <i className="right">({likes})</i>
        </li>
      );
    });
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutate = gql`
mutation LikeLyric($id: ID!){
  likeLyric(id: $id){
    id
    likes
  }
}
`;

export default graphql(mutate)(LyricList);
