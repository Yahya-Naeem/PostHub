import { PostDetail } from "@/components/post-detail"
import { Header } from "@/components/header"

interface PostPageProps {
  params: {
    id: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PostDetail postId={Number.parseInt(params.id)} />
      </main>
    </div>
  )
}
