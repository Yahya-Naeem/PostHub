import { PostsList } from "@/components/posts-list"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to PostHub
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover amazing posts from our community. Click on any post to read the full content.
          </p>
        </div>
        <PostsList />
      </main>
    </div>
  )
}
