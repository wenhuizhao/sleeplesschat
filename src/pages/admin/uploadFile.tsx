import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Meta } from '@/layouts/Meta';
import api from '@/services/api';
import { Main } from '@/templates/Main';

const UploadFile = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [url, setUrl] = useState();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    try {
      const res: any = await api.post('/upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res', res);
      setUrl(res.data.file);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.response?.data);
    }
  };

  return (
    <Main meta={<Meta title="create post" description="create new blog" />}>
      <h1 className="capitalize">Upload File</h1>
      <div>{errorMessage}</div>
      <div>Uploaded file url:{url}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register('file')} />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Main>
  );
};
export default UploadFile;
