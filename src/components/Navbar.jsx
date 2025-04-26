import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ searchTerm, setSearchTerm, sortBy, setSortBy }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
    if (location.pathname !== '/') navigate('/');
  };

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {/* Site title */}
      <Link
        to="/"
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: '#111827',
          flexShrink: 0,
        }}
      >
        The Potter Landing
      </Link>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={onSearch}
        style={{
          flex: '1',
          minWidth: '200px',
          maxWidth: '400px',
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {/* Sort + Create button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0,
        }}
      >
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
        </select>

        <button
          onClick={() => navigate('/create')}
          style={{
            backgroundColor: '#D3A625',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Create New Post
        </button>
      </div>
    </nav>
  );
}
