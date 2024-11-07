import EditPublicacionModal from '@/Components/Modals/EditPublicacionModal';
import PublicacionFormModal from '@/Components/Modals/PublicacionFormModal';
import PostItem from '@/Components/PostItem';
import OrgLayout from '@/Layouts/OrgLayout'
import { Head } from '@inertiajs/react';
import React, { useState } from 'react'

const Dashboard = ({
  posts,
}) => {

  const [publicacionModal, setPublicacionModal] = useState(false);
  const [editPublicacionModal, setEditPublicacionModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  return (
    <>
      <Head
        title="Inicio"
      />
      <PublicacionFormModal
        open={publicacionModal}
        onClose={() => setPublicacionModal(false)}
      />
      <EditPublicacionModal
        open={editPublicacionModal}
        onClose={() => {
          setEditPublicacionModal(false);
          setCurrentPost(null);
        }}
        post={currentPost}
      />
      {/*<div className="py-12">
        <button
          className=""
          onClick={() => setPublicacionModal(true)}
        >Realizar publicación</button>
      </div>*/}
      <div
        className="max-w-[1056px] mx-auto pt-6 bg-white border-t-2"
      >
        {posts.map((i) => (
          <PostItem
            post={i}
            key={i.id}
          />
        ))}
      </div>
    </>
  )
}

Dashboard.layout = page => (
  <OrgLayout
    children={page}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
  />
);

export default Dashboard;