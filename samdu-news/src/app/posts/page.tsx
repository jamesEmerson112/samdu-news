import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/posts/PostCard';
import { mockPosts, getAllTags } from '@/data/posts';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'Browse all our latest news articles, insights, and stories. Stay informed with quality journalism and analysis.',
};

export default function PostsPage() {
  const allTags = getAllTags();

  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Posts
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Browse our complete collection of articles, insights, and stories.
              Find the content that matters most to you.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Latest Articles
              </h2>
              <p className="text-gray-600 mt-1">
                {mockPosts.length} articles found
              </p>
            </div>

            {/* Sort/Filter Options */}
            <div className="hidden md:flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Sort by Date</option>
                <option>Sort by Title</option>
                <option>Sort by Read Time</option>
              </select>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-16 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                disabled
                className="px-3 py-2 text-gray-400 border border-gray-300 rounded-md cursor-not-allowed"
              >
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white border border-blue-600 rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 text-blue-600 border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Never Miss a Story
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest articles delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
