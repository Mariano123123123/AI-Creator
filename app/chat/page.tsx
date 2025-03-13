import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">AI Chat</h1>
          <p className="text-muted-foreground">Chat with AI models and your custom characters</p>
        </div>

        <ChatInterface />
      </div>
    </div>
  )
}

