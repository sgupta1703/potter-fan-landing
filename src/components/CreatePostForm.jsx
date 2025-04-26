import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          image: imageUrl,
          upvotes: 0,
        },
      ])
      .select();

    if (error) {
      console.error('Error creating post:', error);
    } else if (data && data.length > 0) {
      console.log('Post created:', data[0]);
      navigate('/');
    }

    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        padding: '20px',
        backgroundColor: '#f8f9fa',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
          boxSizing: 'border-box',
        }}
      >
        {/* Back to Home Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#e5e7eb',
            color: '#111827',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            marginBottom: '24px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ← Back to Home
        </button>

        <h2 style={{ marginBottom: '24px' }}>Create a New Post</h2>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Post Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical',
            }}
          ></textarea>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="imageUrl" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Image URL (optional)
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#D3A625',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
