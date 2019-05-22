import React, { Component } from 'react';
import gql from 'graphql-tag';
// wrap the Component with the helper Method below to be able to pass a query Variables to our GraphQL Query
import { graphql } from 'react-apollo';

class SongCreate extends Component{
    constructor(props){
        super(props);

        this.state = { title: ''};
    }

    onSubmit = event => {
        event.preventDefault();

        console.log(this.props);
    }

    render(){
        return(
            <div>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Song Title:</label>
                    <input 
                        onChange={(event) => this.setState({title: event.target.value})}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title) {
            title
        }
    }
`;

// for the ability to pass the query params from React component to the mutation
export default graphql(mutation)(SongCreate);