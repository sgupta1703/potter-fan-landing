import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';



export default function EditPostForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image);
      }
    };
    loadPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({ title, content, image: imageUrl })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      navigate(`/posts/${id}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block">Title *</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="border rounded w-full px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="border rounded w-full px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Image URL</label>
          <input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="border rounded w-full px-2 py-1"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Post
          </button>
        </div>
      </form>
    </div>
  );
}
