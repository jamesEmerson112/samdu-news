import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Samdu News</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Stay informed with the latest news, insights, and stories that matter.
              Your trusted source for quality journalism and analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  All Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@samdu-news.com" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  contact@samdu-news.com
                </a>
              </li>
              <li>
                <span className="text-gray-600 text-sm">Follow us on social media</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Samdu News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
