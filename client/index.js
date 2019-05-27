import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import SongCreate from './components/SongCreate';
// ApolloClient doesn't care what front end you're dealing with
import ApolloClient from 'apollo-client';
// ApolloProvider are dealing with our frontend to send the data to Apollo Store
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';


const client = new ApolloClient({
  dataIdFromObject: o => o.id
  // dataIdFromObject in ApolloClient in Apollo react tells Apollo to indentify every signle piece of record and pass its id to ApolloClient
  // in the other mean dataIdFormObject will let apollo to identify each and every single record got fetched by its id
  // this step which solved the issue of refetching the records that has been added by a form in the same component that is listing the records 
  // for example Song has lyrics in the same component we have Song Detail with Lyric Create form and Lyric list when we add a lyric by the form automatically
  // it will be added to the list
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
        </Route>
        <Route path="songs/new" component={SongCreate} />
        <Route path="song/:id" component={SongDetail} />
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
