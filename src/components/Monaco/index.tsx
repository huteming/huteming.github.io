import React from 'react'
// import * as monaco from 'monaco-editor'
import Editor from '@monaco-editor/react'

const languageMap = {
  'language-ts': 'typescript',
}

interface Props {
  className: string
  code: string
}

const Monaco: React.FC<Props> = (props) => {
  const { code, className } = props
  // const editorRef = React.useRef(null)

  // React.useEffect(() => {
  //   // doc: https://microsoft.github.io/monaco-editor/docs.html
  //   const myEditor = monaco.editor.create(editorRef.current, {
  //     value: code,
  //     language: languageMap[className] || 'javascript',
  //     automaticLayout: true,
  //     scrollBeyondLastLine: false,
  //   })
  //   return myEditor.dispose
  // }, [code])

  // return <div ref={editorRef} style={{ height: '300px' }} />

  return <Editor height='300px' value={code} language={languageMap[className] || 'javascript'} />
}

export default Monaco
