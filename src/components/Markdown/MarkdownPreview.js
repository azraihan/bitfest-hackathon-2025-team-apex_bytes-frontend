import React from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;
function MarkdownPreview() {
  return (
    <MarkdownEditor.Markdown source={mdStr} height="200px" />
  );
}

export default MarkdownPreview;