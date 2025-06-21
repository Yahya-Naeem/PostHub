"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Calendar, User } from "lucide-react"
import Link from "next/link"
import { fetchPosts } from "@/lib/api"

export function PostsList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-64">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load posts. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
                  Post #{post.id}
                </Badge>
                <div className="flex items-center text-xs text-slate-500">
                  <User className="w-3 h-3 mr-1" />
                  User {post.userId}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight line-clamp-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed">{post.body}</p>
              <div className="mt-4 flex items-center text-xs text-slate-400">
                <Calendar className="w-3 h-3 mr-1" />
                Just now
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
