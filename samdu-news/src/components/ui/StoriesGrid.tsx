'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Post } from '@/types';
import StoriesViewer from './StoriesViewer';

interface StoriesGridProps {
  posts: Post[];
  title?: string;
  className?: string;
}

export default function StoriesGrid({ posts, title = "Stories", className = "" }: StoriesGridProps) {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const openStories = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const closeStories = () => {
    setSelectedStoryIndex(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className={`w-full ${className}`}>
        {title && (
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">Tap any story to start browsing</p>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className="relative aspect-[9/16] cursor-pointer group"
              onClick={() => openStories(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Story background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                {/* Content overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white rounded-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold leading-tight line-clamp-3">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs opacity-75">
                      <span>{post.author.name}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Read time badge */}
              <div className="absolute -bottom-1 -right-1 bg-white text-gray-900 text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                {post.readTime}m
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Stories Available</h3>
            <p className="text-gray-600">Check back later for new content!</p>
          </div>
        )}

        {/* Usage hint */}
        {posts.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Swipe through stories or use keyboard arrows for navigation
            </p>
          </div>
        )}
      </div>

      {/* Stories Viewer Modal */}
      {selectedStoryIndex !== null && (
        <StoriesViewer
          posts={posts}
          initialIndex={selectedStoryIndex}
          onClose={closeStories}
          onStoryChange={setSelectedStoryIndex}
        />
      )}
    </>
  );
}
