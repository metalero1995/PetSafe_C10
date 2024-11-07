import formatoChat from '@/libs/formatoChat';
import React from 'react';
import ImageCarousel from './ImageCarousel';

const PostItem = ({
    post,
}) => {
  console.log(post);
  return (
    <div className="px-2 border-b-2">
      <header
        className="flex items-center gap-2"
      >
        <img
          src={post?.photo ? post?.photo : '/imagenes/blank_profile.png'}
          alt='profile image'
          className='rounded-full w-14 h-14'
        />
        <div
          className="flex flex-col gap-1"
        >
          <p
            className="font-bold"
          >{post?.org?.nombre_organizacion}</p>
          <p
            className="text-gray-400 text-xs"
          >
            {formatoChat(post?.created_at)}
          </p>
        </div>
      </header>
      <div
        className="mt-2 font-bold"
      >
        {post?.contenido}
      </div>
      <ImageCarousel
        images={post?.imagenes}
      />
    </div>
  );
};

export default PostItem;