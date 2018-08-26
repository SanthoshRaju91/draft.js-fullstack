import React, { Component } from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Editor from "draft-js-plugins-editor";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createImagePlugin from "draft-js-image-plugin";
import "draft-js-emoji-plugin/lib/plugin.css";
import "./styles.css";

const emojiPlugin = createEmojiPlugin();
const imagePlugin = createImagePlugin();
const { EmojiSuggestions } = emojiPlugin;

const CREATE_BLOG = gql`
  mutation createBlog($title: String!, $content: String!) {
    createBlog(title: $title, content: $content) {
      success
      message
    }
  }
`;

class DraftEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      title: ""
    };
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not handled";
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  submitPost = callback => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    callback({
      variables: {
        title: this.state.title,
        content: JSON.stringify(convertToRaw(contentState))
      }
    });
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };
  render() {
    const { editorState } = this.state;
    const { readOnly = false } = this.props;
    return (
      <Mutation mutation={CREATE_BLOG}>
        {(createBlog, { data }) => (
          <div className="draft-editor">
            <button
              className="btn btn-primary"
              onClick={() => this.submitPost(createBlog)}
            >
              Submit Post
            </button>
            <br />
            <br />
            <input
              className="form-control"
              placeholder="Title"
              onChange={this.handleTitleChange}
            />
            <Editor
              readOnly={readOnly}
              editorState={editorState}
              textAlignment={"align-left"}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              plugins={[emojiPlugin, imagePlugin]}
            />

            <EmojiSuggestions />
          </div>
        )}
      </Mutation>
    );
  }
}

export default DraftEditor;
