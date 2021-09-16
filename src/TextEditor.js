import { React, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Toolbar from './Toolbar.js';
import Documents from './Documents.js';


export default function TextEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      let text = editorRef.current.getContent();
      console.log(text);
    }
  };
  const empty = () => {
    if (editorRef.current) {
      const inputId = document.getElementById('idDoc');
      inputId.value = "";
      const inputName = document.getElementById('nameDoc');
      inputName.value = "";
      editorRef.current.setContent("");
    }
  };
  const save = (e) => {
      if (e.target[1].value) {
          e.preventDefault();
          fetch(`https://jsramverk-editor-sijn20.azurewebsites.net/documents/${e.target[1].value}`, {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: e.target[0].value,
                  text: editorRef.current.getContent(),
              })
          });
          alert("Uppdaterad!");
      }
      else {
          e.preventDefault();
          fetch('https://jsramverk-editor-sijn20.azurewebsites.net/documents', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: e.target[0].value,
                  text: editorRef.current.getContent(),
              })
          })
          .then( function (response) {
              alert("Sparat!");
          });
      };
  };
  function showText(docId, name, text) {
      const inputId = document.getElementById('idDoc');
      inputId.value = docId;
      const inputName = document.getElementById('nameDoc');
      inputName.value = name;
      editorRef.current.setContent(text);
  };
  return (
    <>
    < Toolbar saveText={save} logText={log} emptyEditor={empty} />
      <Editor
        id="myTextarea"
        onInit={(evt, editor) => editorRef.current = editor}
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
      <div className="documents">
      <h3>Välj ett dokument att redigera:</h3>
        < Documents onTitleClick={showText} />
      </div>
    </>
  );
}