import React from 'react'
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'
import Monaco from '@site/src/components/Monaco'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Monaco>" tag to our Monaco component
  // `Monaco` will receive all props that were passed to `<Monaco>` in MDX
  Monaco,
}
