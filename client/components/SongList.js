import React, { Component } from "react";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
import '../style/style.css';

class SongList extends Component {

    onDeleteSong(id){
        this.props.mutate({ variables: { id }})
            .then(() => this.props.data.refetch());
            // this.props.data.refetch is added automatically by the graphql in apollo-client
    }

    renderSongs(){
        if (this.props.data.loading){
            return <div>Loading...</div>
        }
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/song/${id}`}>
                    {title}
                    </Link>
                    <i className="material-icons right" onClick={() => this.onDeleteSong(id) }>delete</i>
                </li>
            )
        })
    };

    

  render() {
    return (
        <div>
        <ul className="collection">
            {this.renderSongs()}
        </ul>
        <Link
         to="/songs/new"
         className="btn-floating btn-larg red right" >
             <i className="material-icons">add</i>
        </Link>
        </div>
    );
  }
}

const mutate = gql`
mutation DeleteSong($id: ID){
    deleteSong(id: $id){
      id
    }
  }
`;

export default graphql(mutate)(
    graphql(query)(SongList)
);
