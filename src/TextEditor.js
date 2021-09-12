import { React, useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

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
      < GetDocuments />
    </>
  );
}


function GetDocuments() {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("http://localhost:1337/documents")
        .then(res => res.json())
        .then(data => setData(data))
    }, [])

    let allDocs = [];

    for (let i = 0; i < data.length; i++) {
        allDocs.push(<div onClick={() => doSomething(data[i].text)}>{data[i].name}</div>);
    }

    return (
        allDocs
    )
}


function doSomething(text) {
    console.log(text);
}
