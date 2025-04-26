import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './PostFeed.css';


export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from('posts').select('id, title, upvotes, created_at');

      if (sortBy === 'newest') query = query.order('created_at', { ascending: false });
      else query = query.order('upvotes', { ascending: false });

      if (searchTerm) query = query.ilike('title', `%${searchTerm}%`);

      const { data, error } = await query;
      if (error) console.error('Error fetching posts:', error);
      else setPosts(data);
    };
    fetchPosts();
  }, [searchTerm, sortBy]);

  return (
    <div className='page-container'>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className='post-container'>
      <main className="p-4">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <Link to={`/posts/${post.id}`}>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm">Upvotes: {post.upvotes}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

    </div>
    </div>
  );
}
