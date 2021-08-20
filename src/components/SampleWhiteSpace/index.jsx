import React, { useState } from 'react'
import styles from './styles.module.css'

const html = `
  Hi&nbsp;&nbsp;,
  This   is a incomprehensibilities long word.
  <br />
  <br />
  你好&nbsp;&nbsp;,
  这   是一个空格分割的长单词
  <br />
  <br />
  你好&nbsp;&nbsp;,
  这---是一个短横线分割的长单词
  <br />
  <br />
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`

export const HTMLInPre = () => {
  return (
    <pre
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></pre>
  )
}

export default function SampleWhiteSpace() {
  const [whiteSpace, setWhiteSpace] = useState('normal')
  const [wordBreak, setWordBreak] = useState('normal')
  const [overflowWrap, setOverflowWrap] = useState('normal')

  return (
    <div>
      下面的选项会改变右边框框的样式，左边框框的样式不会变 <br />
      <div>
        <div
          className={styles.box}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></div>

        <div
          id="example"
          className={styles.box}
          style={{
            whiteSpace,
            wordBreak,
            overflowWrap,
          }}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></div>

        <div
          style={{
            clear: 'both',
          }}
        ></div>
      </div>
      <br />
      <div>
        white-space:
        <select
          id="s1"
          value={whiteSpace}
          onChange={(eve) => {
            setWhiteSpace(eve.target.value)
          }}
        >
          <option value="normal">normal</option>
          <option value="nowrap">nowrap</option>
          <option value="pre">pre</option>
          <option value="pre-wrap">pre-wrap</option>
          <option value="pre-line">pre-line</option>
        </select>
      </div>
      <div>
        word-break:
        <select
          id="s2"
          value={wordBreak}
          onChange={(eve) => {
            setWordBreak(eve.target.value)
          }}
        >
          <option value="normal">normal</option>
          <option value="keep-all">keep-all</option>
          <option value="break-all">break-all</option>
          <option value="break-word">break-word</option>
        </select>
      </div>
      <div>
        overflow-wrap:
        <select
          id="s3"
          value={overflowWrap}
          onChange={(eve) => {
            setOverflowWrap(eve.target.value)
          }}
        >
          <option value="normal">normal</option>
          <option value="break-word">break-word</option>
        </select>
      </div>
    </div>
  )
}
