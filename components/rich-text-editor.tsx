"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, List, ListOrdered, Quote, Code, Eye, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatText = (type: string) => {
    switch (type) {
      case "bold":
        insertText("**", "**")
        break
      case "italic":
        insertText("*", "*")
        break
      case "underline":
        insertText("<u>", "</u>")
        break
      case "code":
        insertText("`", "`")
        break
      case "quote":
        insertText("> ")
        break
      case "list":
        insertText("- ")
        break
      case "orderedList":
        insertText("1. ")
        break
    }
  }

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
      .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(
        /^> (.+)$/gm,
        '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-slate-600">$1</blockquote>',
      )
      .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/\n/g, "<br>")
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border rounded-t-lg bg-slate-50">
        <div className="flex items-center space-x-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("bold")} className="h-8 w-8 p-0">
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("italic")} className="h-8 w-8 p-0">
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText("underline")}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-slate-300 mx-1" />
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("list")} className="h-8 w-8 p-0">
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText("orderedList")}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("quote")} className="h-8 w-8 p-0">
            <Quote className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("code")} className="h-8 w-8 p-0">
            <Code className="h-4 w-4" />
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center space-x-1"
        >
          {isPreview ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="text-xs">{isPreview ? "Edit" : "Preview"}</span>
        </Button>
      </div>

      {/* Editor/Preview */}
      <div className="min-h-[200px] border rounded-b-lg">
        {isPreview ? (
          <Card className="p-4 min-h-[200px] border-0 rounded-t-none">
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: renderPreview(value) }} />
            {!value && <p className="text-slate-400 italic">Nothing to preview yet...</p>}
          </Card>
        ) : (
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] border-0 rounded-t-none resize-none focus-visible:ring-0"
          />
        )}
      </div>

      {/* Help Text */}
      <div className="text-xs text-slate-500 space-y-1">
        <p>{"Formatting tips:"}</p>
        <p>{"**bold** *italic* `code` &gt; quote - list 1. numbered list"}</p>
      </div>
    </div>
  )
}
