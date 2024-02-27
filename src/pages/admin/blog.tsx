import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

// import { useAuth } from '@/hooks/useAuth';
import { Meta } from '@/layouts/Meta';
import api from '@/services/api';
import { Main } from '@/templates/Main';

const Blog = () => {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState('');
  const router = useRouter();
  // const { user } = useAuth();

  const handleSubmit = async () => {
    const content = editorRef.current ? editorRef.current?.getContent() : null;
    try {
      const resp = await api.post('/blog', {
        title,
        content,
      });
      console.log('content:', content, ' title:', title, 'response:', resp);
    } catch (error: any) {
      if (error.response.status === 401) {
        console.log('permissin denied');
        router.push('/');
      }
    }
  };

  return (
    <Main meta={<Meta title="create post" description="create new blog" />}>
      <h1 className="capitalize">Create blog</h1>
      <input
        id="title"
        className="mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Editor
        apiKey="viqh24y5crzz31eghw96jwq39y15sia6iwe85rg9fupgr4f4"
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          plugins:
            ' anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (_request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject(new Error('See docs to implement AI Assistant')),
            ),
        }}
        initialValue="Welcome to TinyMCE!"
      />
      <button type="button" onClick={() => handleSubmit()}>
        Submit
      </button>
    </Main>
  );
};
export default Blog;
