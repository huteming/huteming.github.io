import React from 'react'
import * as monaco from 'monaco-editor'

const languageMap = {
  'language-ts': 'typescript',
}

interface Props {
  className: string
  code: string
}

const Monaco: React.FC<Props> = (props) => {
  const { code, className } = props
  const editorRef = React.useRef(null)

  React.useEffect(() => {
    // doc: https://microsoft.github.io/monaco-editor/docs.html
    const myEditor = monaco.editor.create(editorRef.current, {
      value: code,
      language: languageMap[className] || 'javascript',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      fontSize: 16,
    })

    return () => myEditor.dispose()
  }, [code])

  return <div ref={editorRef} style={{ height: '400px' }} />
}

export default Monaco
