import React, { Component } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Editor from "draft-js-plugins-editor";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createImagePlugin from "draft-js-image-plugin";
import "draft-js-emoji-plugin/lib/plugin.css";
import "./styles.css";

const emojiPlugin = createEmojiPlugin();
const imagePlugin = createImagePlugin();
const { EmojiSuggestions } = emojiPlugin;

const GET_BLOG = gql`
  query getBlog($id: ID!) {
    getBlog(id: $id) {
      title
      content
    }
  }
`;

class ViewBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readOnly: true
    };
  }

  getContent = data => {
    if (data) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(data.content))
      );
    } else {
      return EditorState.createEmpty();
    }
  };

  render() {
    const { readOnly } = this.state;
    const id = this.props.match.params.id;
    return (
      <Query query={GET_BLOG} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading";

          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <Editor
                readOnly={readOnly}
                editorState={this.getContent(data.getBlog)}
                textAlignment={"align-left"}
                onChange={() => {}}
                plugins={[emojiPlugin, imagePlugin]}
              />

              <EmojiSuggestions />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ViewBlog;
