import { CopilotTextarea } from "@copilotkit/react-textarea";

export default function BlogPostEditor() {
  return (
    <div className="pb-4">
      <h2 className="text-2xl text-white font-bold mb-2">AI Blog Suggestion</h2>
      <hr className="border-white/20 my-6" />
      <CopilotTextarea
      className="bg-white/20 p-4 rounded-xl text-white relative group hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
      
  placeholder="Enter your blog here..."
  autosuggestionsConfig={{
    textareaPurpose: "Assist me in writing social media posts.",
    chatApiConfigs: {}
  }}
/>
    </div>
  );
}
