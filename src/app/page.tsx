import BlogPostEditor from '@/components/BlogPostEditor'
import React from 'react'
import { CopilotKit } from "@copilotkit/react-core";

export default function page() {
  return (
    <div>
      <CopilotKit runtimeUrl='http://localhost:3000/api/copilotkit'>
      <BlogPostEditor />
      </CopilotKit>
    </div>
  )
}

