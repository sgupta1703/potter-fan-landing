// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostFeed from './components/PostFeed';
import CreatePostForm from './components/CreatePostForm';
import PostDetail from './PostDetail';
import EditPostForm from './components/EditPostForm';
import './App.css';

function App() {
  return (
    <div className='page-content'>
    <Router>
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="/create" element={<CreatePostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<EditPostForm />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
