
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Video, Type, Calendar } from 'lucide-react';

interface ContentPost {
  id: string;
  type: 'image' | 'video' | 'text';
  title: string;
  content: string;
  url?: string;
  createdAt: string;
}

const ContentFeed = () => {
  const [posts, setPosts] = useState<ContentPost[]>([]);

  useEffect(() => {
    const loadPosts = () => {
      const saved = localStorage.getItem('contentPosts');
      if (saved) {
        setPosts(JSON.parse(saved));
      }
    };

    loadPosts();
    
    // Listen for storage changes (when admin adds new posts)
    const handleStorageChange = () => {
      loadPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes every 5 seconds (for same-tab updates)
    const interval = setInterval(loadPosts, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-green-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'text':
        return <Type className="w-5 h-5 text-blue-600" />;
      default:
        return <Type className="w-5 h-5 text-gray-600" />;
    }
  };

  const renderMedia = (post: ContentPost) => {
    if (post.type === 'image' && post.url) {
      return (
        <div className="mt-4">
          <img
            src={post.url}
            alt={post.title}
            className="w-full max-h-96 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      );
    }
    
    if (post.type === 'video' && post.url) {
      return (
        <div className="mt-4">
          <video
            controls
            className="w-full max-h-96 rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          >
            <source src={post.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    
    return null;
  };

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Type className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
          <p className="text-gray-500 text-center">
            Check back later for updates from administrators
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="w-5 h-5" />
            <span>Latest Updates</span>
          </CardTitle>
          <CardDescription>
            Recent content shared by administrators
          </CardDescription>
        </CardHeader>
      </Card>

      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getTypeIcon(post.type)}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                post.type === 'text' 
                  ? 'bg-blue-100 text-blue-800'
                  : post.type === 'image'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {post.type}
              </span>
            </div>
            
            <div className="text-gray-700 text-base leading-relaxed">
              {post.content}
            </div>
            
            {renderMedia(post)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentFeed;
