import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Toolbar from './Toolbar.js';
import Documents from './Documents.js';
import FirstPage from './FirstPage.js';

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://jsramverk-editor-sijn20.azurewebsites.net/";

const socket = socketIOClient(ENDPOINT);


export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
        token: null,
        email: null
    };
  }
  log = () => {
    if (this.editorRef.current) {
      let text = this.editorRef.current.getContent();
      console.log(text);
    }
  };
  empty = () => {
    if (this.editorRef.current) {
      const inputId = document.getElementById('idDoc');
      inputId.value = "";
      const inputName = document.getElementById('nameDoc');
      inputName.value = "";
      this.editorRef.current.setContent("");
    }
  };
  save = (e) => {
      if (e.target[1].value) {
          e.preventDefault();
          fetch(`http://localhost:1337/documents/${e.target[1].value}`, {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpZ3JpZEBzaWdyaWQuc2UiLCJpYXQiOjE2MzMzNTE3ODYsImV4cCI6MTYzMzM1NTM4Nn0.QnDQ4_DjLehT3CsWdN98mPCJlMt_MCXf82jnzeHtrcQ'
              },
              body: JSON.stringify({
                  name: e.target[0].value,
                  text: this.editorRef.current.getContent(),
              })
          });
          alert("Uppdaterad!");
      }
      else {
        console.log(e.target[2].value);
          e.preventDefault();
          fetch('http://localhost:1337/documents', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: e.target[0].value,
                  text: this.editorRef.current.getContent(),
                  owner: "sigrid@sigrid.se",
                  allowed_users: [
                    e.target[2].value,
                  ],
              })
          })
          .then( function (response) {
              alert("Sparat!");
          });
      };
  };
  showText = (docId, name, text) => {
        const inputId = document.getElementById('idDoc');
        inputId.value = docId;
        const inputName = document.getElementById('nameDoc');
        inputName.value = name;
        this.editorRef.current.setContent(text);
        socket.emit("create", docId);
    };
  live = () => {
    socket.on("doc", (data) => {
      this.editorRef.current.setContent(data.html);
    });

    const inputId = document.getElementById('idDoc');
    let data = {
        _id: inputId.value,
        html: this.editorRef.current.getContent()
    };
    socket.emit("doc", data);
  };

  // login = (e) => {
  //   e.preventDefault();
  //         fetch('http://localhost:1337/login', {
  //             method: 'POST',
  //             headers: {
  //                 'Accept': 'application/json',
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //                 email: e.target[0].value,
  //                 password: e.target[1].value,
  //             })
  //         })
  //         .then( function (response) {
  //           return response.json();

  //         }).then(function(data) {
  //           console.log(data.data.token);
  //           this.setState({token: data.data.token});
  //         })
  // };
  // reg = (e) => {
  //   e.preventDefault();
  //         fetch('http://localhost:1337/register', {
  //             method: 'POST',
  //             headers: {
  //                 'Accept': 'application/json',
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //                 email: e.target[0].value,
  //                 password: e.target[1].value,
  //             })
  //         })
  //         .then( function (response) {
  //           // console.log(response);
  //         });
  // };
  render() {
    if (this.state.token == null) {
      return <FirstPage />
      // return <FirstPage loginUser={this.login}/>
    } 
    return (
      <>
      < Toolbar saveText={this.save} logText={this.log} emptyEditor={this.empty} />
        <Editor
          id="myTextarea"
          onInit={(evt, editor) => this.editorRef.current = editor}
          onKeyUp={this.live}
          initialValue=""
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <p>Inloggad användare: { this.state.email }</p>
        <div className="documents">
        <h3>Välj ett dokument att redigera:</h3>
          < Documents onTitleClick={this.showText} />
        </div>
      </>
    );
  }
}