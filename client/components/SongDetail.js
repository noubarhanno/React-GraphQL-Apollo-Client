import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
 
class SongDetail extends Component{
    render(){
        const { song } = this.props.data;

        if(!song){
            return <div className="container">Loading...</div>;
        }


        return (
            <div className="container">
                <Link to="/">Back</Link>
                <h3>{ song.title }</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={song.id} />
            </div>
        );
    }
}


export default graphql(fetchSong, {
    options: (props) => { return {variables: {id: props.params.id}}}
})(SongDetail);
// the code above will start fetching the song immediately but actually we don't want to do that immediately we need to pass the id first 
// so to do so we will pass another argument to getchsong
