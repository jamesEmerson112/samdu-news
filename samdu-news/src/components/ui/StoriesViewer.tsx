'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/types';

interface StoriesViewerProps {
  posts: Post[];
  initialIndex?: number;
  onClose: () => void;
  onStoryChange?: (index: number) => void;
}

export default function StoriesViewer({
  posts,
  initialIndex = 0,
  onClose,
  onStoryChange
}: StoriesViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentPost = posts[currentIndex];
  const STORY_DURATION = 5000; // 5 seconds per story

  const nextStory = useCallback(() => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, posts.length, onClose]);

  const prevStory = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  const goToStory = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  // Auto-advance progress
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (STORY_DURATION / 50));
        if (newProgress >= 100) {
          nextStory();
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, nextStory]);

  // Notify parent of story changes
  useEffect(() => {
    onStoryChange?.(currentIndex);
  }, [currentIndex, onStoryChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          nextStory();
          break;
        case 'ArrowLeft':
          prevStory();
          break;
        case 'Escape':
          onClose();
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStory, prevStory, onClose]);

  const handlePanEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevStory();
    } else if (info.offset.x < -swipeThreshold) {
      nextStory();
    }
  };

  const handleTap = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;

    if (x < width / 3) {
      prevStory();
    } else if (x > (2 * width) / 3) {
      nextStory();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (!currentPost) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
        {posts.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: index < currentIndex ? '100%' : '0%' }}
              animate={{
                width: index < currentIndex
                  ? '100%'
                  : index === currentIndex
                    ? `${progress}%`
                    : '0%'
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-16 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {currentPost.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">{currentPost.author.name}</p>
            <p className="text-white/70 text-xs">{formatDate(currentPost.publishedAt)}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Story content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-full h-full max-w-md mx-auto relative"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onPanEnd={handlePanEnd}
          onTap={handleTap}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-center text-center rounded-2xl">
            <div className="space-y-6">
              {/* Featured badge */}
              {currentPost.featured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center justify-center"
                >
                  <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </motion.div>
              )}

              {/* Title */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-bold text-white leading-tight"
              >
                {currentPost.title}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-sm leading-relaxed max-w-sm mx-auto line-clamp-4"
              >
                {currentPost.excerpt}
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {currentPost.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Read time */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-xs"
              >
                {currentPost.readTime} min read
              </motion.div>
            </div>
          </div>

          {/* Read full article button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-8 right-8"
          >
            <Link
              href={`/posts/${currentPost.id}`}
              className="block w-full py-3 px-4 bg-white text-center text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setIsPaused(true)}
            >
              Read Full Article
            </Link>
          </motion.div>

          {/* Navigation hints */}
          <div className="absolute inset-y-0 left-0 w-1/3 cursor-pointer" />
          <div className="absolute inset-y-0 right-0 w-1/3 cursor-pointer" />
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-white/60 text-xs">
          Tap sides to navigate • Swipe or use arrow keys • Space to pause
        </p>
      </div>
    </motion.div>
  );
}
