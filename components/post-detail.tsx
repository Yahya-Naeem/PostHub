"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, User, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"
import { fetchPost, fetchComments } from "@/lib/api"

interface PostDetailProps {
  postId: number
}

export function PostDetail({ postId }: PostDetailProps) {
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  })

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  })

  if (postLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-32 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (postError || !post) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Link>
        </Button>
        <Alert variant="destructive">
          <AlertDescription>Post not found or failed to load.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-6 hover:bg-indigo-50">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Link>
      </Button>

      <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600">Post #{post.id}</Badge>
            <div className="flex items-center text-sm text-slate-500">
              <User className="w-4 h-4 mr-1" />
              User {post.userId}
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl leading-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {post.title}
          </CardTitle>
          <div className="flex items-center text-sm text-slate-400 mt-2">
            <Calendar className="w-4 h-4 mr-1" />
            Published just now
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed text-lg">{post.body}</p>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <MessageCircle className="w-5 h-5 mr-2 text-indigo-600" />
            Comments ({comments?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {commentsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border-l-4 border-indigo-200 pl-4">
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {comments?.map((comment) => (
                <div key={comment.id} className="border-l-4 border-indigo-200 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{comment.name}</h4>
                    <span className="text-xs text-slate-400">{comment.email}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
