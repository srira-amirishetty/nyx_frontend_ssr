
import { Editor } from "@tinymce/tinymce-react";
function TinyEditor(){
  return <Editor
  apiKey="odq5q5zj90k6d373gtj5q3dkp2ahmln3vzp4aai41pi32qqs"
  initialValue="<p>This is the initial content of the editor.</p>"
  init={{
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
    ],
    language: "hi_IN",
    toolbar:
      "undo redo | blocks | " +
      "bold italic forecolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
    toolbar_mode: "floating",
    skin: "oxide-dark",
    statusbar: false,
    content_style:
      "body { background-color:#3B236F !important;color: white;}",
  }}
/>
}

export default TinyEditor;