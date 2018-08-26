import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Link } from "react-router-dom";
import client from "./client";
import Landing from "./Landing";
import ViewBlog from "./ViewBlog";
import DraftEditor from "./DraftEditor";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Draft JS awesome blogger site</h1>
          </header>
          <br />
          <BrowserRouter>
            <div className="container">
              <div className="container navs">
                <Link to="/" className="btn btn-primary btn-custom home">
                  Home
                </Link>
                <Link to="/create" className="btn btn-primary btn-custom">
                  New Post
                </Link>
              </div>

              <Route exact path="/" component={Landing} />
              <Route path="/create" component={DraftEditor} />
              <Route path="/view/:id" component={ViewBlog} />
            </div>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
