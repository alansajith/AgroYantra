"use client";

import { useState } from "react";
import {
  Users,
  Info,
  PlusCircle,
  Send,
  MessageCircle,
  ThumbsUp,
  UserCircle,
} from "lucide-react";
import { Geist, Roboto_Slab, Pacifico } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const mockPosts = [
  {
    id: 1,
    user: "Amit Kumar",
    initials: "AK",
    time: "2h ago",
    title: "Best practices for organic farming?",
    content: "What are some effective organic fertilizers for tomatoes?",
    likes: 5,
    comments: 2,
  },
  {
    id: 2,
    user: "Priya Singh",
    initials: "PS",
    time: "4h ago",
    title: "Pest control in rice fields",
    content: "How do you manage pests without chemicals? Any natural remedies?",
    likes: 3,
    comments: 1,
  },
  {
    id: 3,
    user: "Ravi Patel",
    initials: "RP",
    time: "1d ago",
    title: "Irrigation tips for summer",
    content: "Share your best tips for conserving water during hot months!",
    likes: 7,
    comments: 4,
  },
];

function PostCreation({
  onPost,
}: {
  onPost: (title: string, content: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <PlusCircle className="h-5 w-5 text-green-600" /> Start a Discussion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full min-h-[80px] rounded-md border border-gray-300 dark:border-gray-700 p-2 text-base focus:outline-none focus:ring-2 focus:ring-green-200 dark:bg-gray-900/30"
          placeholder="Share your question, tip, or experience..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          className="w-full mt-2"
          onClick={() => {
            if (title && content) {
              onPost(title, content);
              setTitle("");
              setContent("");
            }
          }}
          disabled={!title || !content}
        >
          <Send className="h-4 w-4 mr-2" /> Post
        </Button>
      </CardContent>
    </Card>
  );
}

function CommunityFeed({ posts }: { posts: typeof mockPosts }) {
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <Users className="h-5 w-5 text-blue-600" /> Community Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex gap-4 items-start border-b last:border-b-0 pb-4 last:pb-0"
          >
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-700">
                {post.initials}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {post.user}
                </span>
                <span className="text-xs text-gray-500">{post.time}</span>
              </div>
              <div className="font-semibold text-lg text-green-700 mb-1">
                {post.title}
              </div>
              <div className="text-gray-700 dark:text-gray-200 mb-2">
                {post.content}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" /> {post.likes} Like
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors">
                  <MessageCircle className="h-4 w-4" /> {post.comments} Comment
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CommunityTips() {
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <Info className="h-5 w-5 text-blue-500" /> Community Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2 text-blue-900 dark:text-blue-100">
          <li>Be respectful and supportive to all members.</li>
          <li>Share helpful, relevant, and accurate information.</li>
          <li>No spam, self-promotion, or advertisements.</li>
          <li>Report inappropriate content to moderators.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockPosts);
  const handlePost = (title: string, content: string) => {
    setPosts([
      {
        id: posts.length + 1,
        user: "You",
        initials: "U",
        time: "just now",
        title,
        content,
        likes: 0,
        comments: 0,
      },
      ...posts,
    ]);
  };
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 ${geist.variable} ${robotoSlab.variable} ${pacifico.variable}`}
    >
      {/* Hero/Header Section */}
      <div className="relative overflow-hidden pt-8 pb-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center font-[var(--font-pacifico)] bg-gradient-to-r from-blue-600 via-green-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Community & Support
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-6 font-[var(--font-roboto-slab)] flex items-center justify-center gap-2">
          <Info className="size-5 text-blue-500" />
          Connect, share, and learn with fellow farmers and experts.
        </p>
      </div>
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6">
        <PostCreation onPost={handlePost} />
        <CommunityFeed posts={posts} />
        <CommunityTips />
      </div>
      <footer className="mt-8 mb-4 text-gray-500 text-sm text-center font-[var(--font-geist-sans)]">
        &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
      </footer>
    </div>
  );
}
