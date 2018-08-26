import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import "./styles.css";

const GET_BLOGS = gql`
  {
    getBlogs {
      id
      title
      content
      status
    }
  }
`;

class Landing extends Component {
  render() {
    return (
      <Query query={GET_BLOGS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return "Error! ${error.message}";

          return (
            <div className="landing">
              <h4>Recent Blogs</h4>

              <div className="blogs">
                {data.getBlogs.map(blog => (
                  <div className="card" key={blog.id}>
                    <div className="card-body">
                      <Link to={`/view/${blog.id}`}>{blog.title}</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Landing;
