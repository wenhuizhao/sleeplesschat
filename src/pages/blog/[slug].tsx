import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import api from '@/services/api';

type IBlogUrl = {
  slug: string;
};

type IBlog = {
  id: string,
  title: string,
  content?: string,
  time_created?: string,
}

// export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
//   const blogs: IBlog[] = await api.get("/blogs");
//   return {
//     paths: blogs.map((blog) => ({
//       params: { slug: `${blog.id}` },
//     })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<IBlogUrl, IBlogUrl> = async ({
//   params,
// }) => {
//   return {
//     props: {
//       slug: params!.slug,
//     },
//   };
// };

// const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
//   return (
//     <Main meta={<Meta title={props.slug} description="Lorem ipsum" />}>
//       <h1 className="capitalize">{props.slug}</h1>
//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eos
//         earum doloribus, quibusdam magni accusamus vitae! Nisi, sunt! Aliquam
//         iste expedita cupiditate a quidem culpa eligendi, aperiam saepe dolores
//         ipsum!
//       </p>
//     </Main>
//   );
// };

const Blog = () => {
  const [blog, setBlog] = useState<IBlog>();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response: { data: IBlog } = await api.get(`/blog/${slug}`);
        setBlog(response.data);
      } catch (error: any) {
        console.log("fetch blog error:", error);
      }
    };
    fetchBlog();

  }, [])
  return (
    <Main meta={<Meta title={"title"} description="Lorem ipsum" />}>
      { blog &&
      <div>
      <h1 className="capitalize">{blog?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content}}></div>
      </div>
      }
    </Main>
  )
}
export default Blog;
