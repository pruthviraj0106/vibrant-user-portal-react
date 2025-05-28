import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Image, Video, Type } from 'lucide-react';

interface ContentPost {
  id: string;
  type: 'image' | 'video' | 'text';
  title: string;
  content: string;
  url?: string;
  createdAt: string;
}

const ContentManager = () => {
  const [posts, setPosts] = useState<ContentPost[]>(() => {
    const saved = localStorage.getItem('contentPosts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newPost, setNewPost] = useState({
    type: 'text' as 'image' | 'video' | 'text',
    title: '',
    content: '',
    url: ''
  });

  const savePost = () => {
    if (!newPost.title || !newPost.content) return;
    
    const post: ContentPost = {
      id: Date.now().toString(),
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      url: newPost.url || undefined,
      createdAt: new Date().toISOString()
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('contentPosts', JSON.stringify(updatedPosts));
    
    setNewPost({ type: 'text', title: '', content: '', url: '' });
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('contentPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="space-y-6">
      {/* Create New Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create New Post</span>
          </CardTitle>
          <CardDescription>
            Share images, videos, or text content with users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Post Type Selection */}
          <div className="flex space-x-4">
            <Button
              variant={newPost.type === 'text' ? 'default' : 'outline'}
              onClick={() => setNewPost({ ...newPost, type: 'text' })}
              className="flex items-center space-x-2"
            >
              <Type className="w-4 h-4" />
              <span>Text</span>
            </Button>
            <Button
              variant={newPost.type === 'image' ? 'default' : 'outline'}
              onClick={() => setNewPost({ ...newPost, type: 'image' })}
              className="flex items-center space-x-2"
            >
              <Image className="w-4 h-4" />
              <span>Image</span>
            </Button>
            <Button
              variant={newPost.type === 'video' ? 'default' : 'outline'}
              onClick={() => setNewPost({ ...newPost, type: 'video' })}
              className="flex items-center space-x-2"
            >
              <Video className="w-4 h-4" />
              <span>Video</span>
            </Button>
          </div>

          {/* Title Input */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="Enter post title..."
            />
          </div>

          {/* URL Input for images/videos */}
          {(newPost.type === 'image' || newPost.type === 'video') && (
            <div>
              <Label htmlFor="url">{newPost.type === 'image' ? 'Image URL' : 'Video URL'}</Label>
              <Input
                id="url"
                value={newPost.url}
                onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
                placeholder={`Enter ${newPost.type} URL...`}
              />
            </div>
          )}

          {/* Content Input */}
          <div>
            <Label htmlFor="content">
              {newPost.type === 'text' ? 'Content' : 'Description'}
            </Label>
            <Textarea
              id="content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder={
                newPost.type === 'text' 
                  ? 'Write your content here...' 
                  : 'Add a description for your media...'
              }
              rows={4}
            />
          </div>

          <Button onClick={savePost} className="w-full">
            Publish Post
          </Button>
        </CardContent>
      </Card>

      {/* Existing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Published Posts ({posts.length})</CardTitle>
          <CardDescription>Manage your published content</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts yet. Create your first post above!</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      {post.type === 'text' && <Type className="w-4 h-4 text-blue-600" />}
                      {post.type === 'image' && <Image className="w-4 h-4 text-green-600" />}
                      {post.type === 'video' && <Video className="w-4 h-4 text-purple-600" />}
                      <h3 className="font-medium">{post.title}</h3>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{post.content}</p>
                  {post.url && (
                    <p className="text-xs text-blue-600 break-all">{post.url}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;
