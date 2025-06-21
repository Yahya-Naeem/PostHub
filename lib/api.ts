const API_BASE = "https://jsonplaceholder.typicode.com"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE}/posts`)
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

export async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`${API_BASE}/posts/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch post")
  }
  return response.json()
}

export async function fetchComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${API_BASE}/posts/${postId}/comments`)
  if (!response.ok) {
    throw new Error("Failed to fetch comments")
  }
  return response.json()
}

export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  const response = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error("Failed to create post")
  }
  return response.json()
}

export async function updatePost(id: number, post: Partial<Post>): Promise<Post> {
  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error("Failed to update post")
  }
  return response.json()
}

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete post")
  }
}
