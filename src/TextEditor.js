import { React, useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Documents from './Documents.js';

export default function TextEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      let text = editorRef.current.getContent();
      console.log(text);
  }
  };
  const save = (e) => {
      if (editorRef.current || e.target[0].value) {
          e.preventDefault();
          fetch('http://localhost:1337/documents', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                  name: e.target[0].value,
                  text: editorRef.current.getContent()
              })
          })
          .then( function (response) {
              alert(response);
              // console.log(response);
          });
    }
  };
  function showText(name, text) {
      console.log(name);
      console.log(text);
      const inputName = document.getElementById('nameDoc')
      inputName.value = name;
      editorRef.current.setContent(text);
  };
  return (
    <>
    <div className="toolbar">
        <button className="log" onClick={log}>Logga</button>
    </div>
    <form onSubmit={save}>
        <label>Namn på dokument</label><br />
        <input type="text" id="nameDoc" />
        <input type="submit" value="Spara" />
    </form>
      <Editor
        id="myTextarea"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
        init={{
          height: 400,
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
      < Documents onTitleClick={showText} />
    </>
  );
}
