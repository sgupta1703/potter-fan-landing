import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "./supabaseClient";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
    } else {
      setPost(data);
      setUpdatedPost({ 
        title: data.title, 
        content: data.content, 
        image: data.image || "" 
      });
    }
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: id, content: newComment }]);

    if (error) {
      console.error("Error submitting comment:", error);
    } else {
      setNewComment("");
      fetchComments();
    }
  }

  async function handleDeletePost() {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error);
    } else {
      navigate("/");
    }
  }

  async function handleDeleteComment(commentId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("comments").delete().eq("id", commentId);

    if (error) {
      console.error("Error deleting comment:", error);
    } else {
      fetchComments();
    }
  }

  async function handlePostUpdate(e) {
    e.preventDefault();

    if (!updatedPost.title.trim() || !updatedPost.content.trim()) {
      alert("Both title and content are required.");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .update({
        title: updatedPost.title,
        content: updatedPost.content,
        image: updatedPost.image,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
    } else {
      setIsEditing(false);
      fetchPost();
    }
  }

  function handleUpdateChange(e) {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  }

  async function handleUpvote() {
    const updatedPostData = {
      upvotes: post.upvotes + 1,
    };

    const { error } = await supabase
      .from("posts")
      .update(updatedPostData)
      .eq("id", id);

    if (error) {
      console.error("Error upvoting post:", error);
    } else {
      setPost((prevPost) => ({ ...prevPost, upvotes: prevPost.upvotes + 1 }));
    }
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          width: '100%',
          padding: '24px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: '#0077cc', marginBottom: '16px', display: 'inline-block' }}>
          ← Back to Home
        </Link>

        {isEditing ? (
          <div>
            <h3>Edit Post</h3>
            <form onSubmit={handlePostUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={updatedPost.title}
                onChange={handleUpdateChange}
                required
                placeholder="Enter new title"
              />

              <label>Content</label>
              <textarea
                name="content"
                value={updatedPost.content}
                onChange={handleUpdateChange}
                required
                placeholder="Enter new content"
              />

              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={updatedPost.image}
                onChange={handleUpdateChange}
                placeholder="Enter new image URL"
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit">Update Post</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && (
              <div style={{ marginTop: '16px' }}>
                <img
                  src={post.image}
                  alt="Post"
                  style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: '6px' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={handleUpvote}>Upvote ({post.upvotes})</button>
              <button onClick={() => setIsEditing(true)}>Edit Post</button>
              <button onClick={handleDeletePost}>Delete Post</button>
            </div>

            <hr style={{ margin: '24px 0' }} />

            <div>
              <h3>Comments</h3>
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    <span>{c.content}</span>
                    <button onClick={() => handleDeleteComment(c.id)}>✕</button>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}

              <form onSubmit={handleCommentSubmit} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="comment">Add a Comment:</label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="3"
                  placeholder="Add a comment..."
                />
                <button type="submit">Submit Comment</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
