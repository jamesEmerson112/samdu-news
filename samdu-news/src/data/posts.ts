import { Post } from '@/types';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-web-development-2024',
    excerpt: 'Explore the cutting-edge technologies and frameworks that are shaping the future of web development, from AI integration to serverless architectures.',
    content: `
# The Future of Web Development: Trends to Watch in 2024

The web development landscape is constantly evolving, and 2024 promises to bring exciting new developments that will reshape how we build and interact with web applications.

## 1. AI-Powered Development Tools

Artificial intelligence is revolutionizing how developers write code. From intelligent code completion to automated testing, AI tools are becoming indispensable in the modern developer toolkit.

## 2. Serverless Architecture Evolution

Serverless computing continues to mature, offering developers unprecedented scalability and cost-effectiveness. The latest serverless platforms provide better performance and easier deployment options.

## 3. Enhanced User Experience

Progressive Web Apps (PWAs) and advanced CSS features are enabling developers to create native-like experiences directly in the browser.

## Conclusion

The future of web development is bright, with new technologies making it easier than ever to create fast, accessible, and engaging web experiences.
    `,
    author: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg'
    },
    publishedAt: '2024-01-15T10:00:00Z',
    tags: ['Web Development', 'Technology', 'AI', 'Serverless'],
    featured: true,
    readTime: 8
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: Best Practices',
    slug: 'scalable-react-applications',
    excerpt: 'Learn essential patterns and techniques for building React applications that can grow with your business needs while maintaining performance and code quality.',
    content: `
# Building Scalable React Applications: Best Practices

Creating React applications that can scale effectively requires careful planning and adherence to proven patterns and practices.

## Component Architecture

Well-structured components are the foundation of scalable React applications. Focus on creating reusable, composable components with clear responsibilities.

## State Management

Choose the right state management solution for your application's complexity. From React's built-in state to Redux and Zustand, each has its place.

## Performance Optimization

Implement code splitting, lazy loading, and memoization strategies to ensure your application performs well at scale.
    `,
    author: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg'
    },
    publishedAt: '2024-01-12T14:30:00Z',
    tags: ['React', 'JavaScript', 'Performance', 'Architecture'],
    featured: false,
    readTime: 6
  },
  {
    id: '3',
    title: 'TypeScript in 2024: Advanced Features and Patterns',
    slug: 'typescript-advanced-features-2024',
    excerpt: 'Dive deep into TypeScript\'s latest features and discover advanced patterns that will make your code more robust and maintainable.',
    content: `
# TypeScript in 2024: Advanced Features and Patterns

TypeScript continues to evolve, bringing powerful new features that enhance developer productivity and code safety.

## Template Literal Types

Template literal types provide incredible flexibility for creating type-safe string manipulation and API design.

## Conditional Types

Master conditional types to create flexible, reusable type definitions that adapt to different use cases.

## Utility Types

Learn to leverage TypeScript's built-in utility types and create your own to reduce boilerplate and improve code quality.
    `,
    author: {
      name: 'Emily Rodriguez',
      avatar: '/avatars/emily.jpg'
    },
    publishedAt: '2024-01-10T09:15:00Z',
    tags: ['TypeScript', 'Programming', 'Advanced'],
    featured: true,
    readTime: 10
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    slug: 'css-grid-vs-flexbox',
    excerpt: 'Understanding the strengths and use cases of CSS Grid and Flexbox will help you choose the right layout method for your projects.',
    content: `
# CSS Grid vs Flexbox: When to Use Which

Both CSS Grid and Flexbox are powerful layout tools, but they excel in different scenarios.

## Flexbox: The One-Dimensional Solution

Flexbox is perfect for arranging items in a single direction, whether that's in a row or column.

## CSS Grid: Two-Dimensional Layouts

CSS Grid shines when you need to control both rows and columns simultaneously, making it ideal for complex page layouts.

## Making the Right Choice

Learn the decision criteria for choosing between these two powerful CSS features.
    `,
    author: {
      name: 'David Kim',
      avatar: '/avatars/david.jpg'
    },
    publishedAt: '2024-01-08T11:45:00Z',
    tags: ['CSS', 'Layout', 'Design', 'Frontend'],
    featured: false,
    readTime: 5
  },
  {
    id: '5',
    title: 'The Rise of Edge Computing in Web Applications',
    slug: 'edge-computing-web-applications',
    excerpt: 'Explore how edge computing is transforming web application performance and user experience by bringing computation closer to users.',
    content: `
# The Rise of Edge Computing in Web Applications

Edge computing represents a paradigm shift in how we think about web application architecture and deployment.

## What is Edge Computing?

Edge computing brings computation and data storage closer to users, reducing latency and improving performance.

## Benefits for Web Applications

- Reduced latency
- Improved reliability
- Better user experience
- Enhanced security

## Implementation Strategies

Learn practical approaches to implementing edge computing in your web applications.
    `,
    author: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg'
    },
    publishedAt: '2024-01-05T16:20:00Z',
    tags: ['Edge Computing', 'Performance', 'Architecture', 'Cloud'],
    featured: false,
    readTime: 7
  }
];

// Utility functions
export function getPostById(id: string): Post | undefined {
  return mockPosts.find(post => post.id === id);
}

export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return mockPosts.filter(post => post.featured);
}

export function getPostsByTag(tag: string): Post[] {
  return mockPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allTags = mockPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags));
}
