import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import GetDocuments from './Documents.js';

export default function TextEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      let withTags = editorRef.current.getContent();
      let withOneTag = withTags.replace('<p>', '');
      console.log(withOneTag.replace('</p>', ''));
  }
  };
  return (
    <>
    <div className="toolbar">
        <button className="log" onClick={log}>Logga</button>
    </div>
    <form>
        <label>Namn på dokument</label><br />
        <input type="text" id="name" />
        <input type="submit" value="Spara" />
    </form>
      <Editor
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
      <GetDocuments />
    </>
  );
}
