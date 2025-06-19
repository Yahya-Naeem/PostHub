"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { createPost, updatePost } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "./rich-text-editor"

interface PostFormProps {
  post?: any
  onSuccess: () => void
  onCancel: () => void
}

export function PostForm({ post, onSuccess, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [body, setBody] = useState(post?.body || "")
  const [userId] = useState(post?.userId || 1)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      toast({
        title: "Success",
        description: "Post created successfully",
      })
      onSuccess()
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["post", post?.id] })
      toast({
        title: "Success",
        description: "Post updated successfully",
      })
      onSuccess()
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !body.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const postData = { title, body, userId }

    if (post) {
      updateMutation.mutate({ id: post.id, data: postData })
    } else {
      createMutation.mutate(postData)
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body" className="text-sm font-medium">
              Content *
            </Label>
            <RichTextEditor value={body} onChange={setBody} placeholder="Write your post content..." />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
