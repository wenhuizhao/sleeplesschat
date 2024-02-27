import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import api from '@/services/api';
import { Main } from '@/templates/Main';

interface BlogType {
  id: string;
  title: string;
  time_created: string;
}
const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response: { data: BlogType[] } = await api.get('/blogs');
        setBlogs(response.data);
      } catch (error: any) {
        console.log('fetch blog error:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <p />

      {blogs.map((blog) => (
        <div
          className="my-4 w-full rounded-md border-2 border-gray-400 px-2 py-1"
          key={blog.id}
        >
          <Link href={`/blog/${blog.id}`}>{`${blog.title}`}</Link>
        </div>
      ))}
    </Main>
  );
};

export default Blog;
