"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [showAuthorInput, setShowAuthorInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const commentsPerPage = 5;
  const { language, setLanguage, t } = useLanguage();

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);


  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    // Show author input if not provided
    if (!authorName.trim()) {
      setShowAuthorInput(true);
      return;
    }
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: authorName.trim(),
          content: newComment.trim(),
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Add new comment to local state
        const newCommentObj: Comment = {
          id: result.data.id,
          author: result.data.author,
          content: result.data.content,
          timestamp: result.data.timestamp
        };
        
        setComments([newCommentObj, ...comments]);
        setNewComment("");
        setCurrentPage(1);
        
        // Store author name in localStorage for future comments
        localStorage.setItem('commentAuthor', authorName);
        
        // Optionally refresh comments from server to get exact data
        // fetchComments();
      } else {
        alert('Error posting comment: ' + result.error);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  };
  
  // Fetch comments from API
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/comments');
      const result = await response.json();
      
      if (result.success) {
        const formattedComments = result.data.map((comment: Record<string, unknown>) => ({
          id: comment.id,
          author: comment.author,
          content: comment.content,
          timestamp: comment.timestamp
        }));
        setComments(formattedComments);
      } else {
        console.error('Failed to fetch comments:', result.error);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load stored author name and fetch comments on component mount
  React.useEffect(() => {
    const storedAuthor = localStorage.getItem('commentAuthor');
    if (storedAuthor) {
      setAuthorName(storedAuthor);
    }
    fetchComments();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="comments" 
      className="snap-section min-h-screen py-16 sm:py-20 px-4 sm:px-6 light-effect-4 subtle-shadows relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto content-overlay">
        {/* Header */}
        <div className={`bg-white/70 backdrop-blur-sm rounded-t-lg px-4 sm:px-6 py-3 sm:py-4 border border-white/30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <h2 className="text-gray-800 font-semibold text-base sm:text-lg">{t("comments.title")}</h2>
        </div>

        {/* Comments Container */}
        <div className={`bg-white/50 backdrop-blur-sm border-x border-white/30 min-h-[350px] sm:min-h-[400px] transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
          {/* Add Comment Section */}
          <div className="p-4 sm:p-6 border-b border-white/30">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/images/avt.jpg" 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                {/* Author Name Input (shown when needed) */}
                {(showAuthorInput || !authorName) && (
                  <div className="mb-2 sm:mb-3">
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder={t("comments.form.namePlaceholder")}
                      className="w-full bg-white/60 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      maxLength={100}
                    />
                  </div>
                )}
                
                {/* Comment Textarea */}
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("comments.form.commentPlaceholder")}
                  className="w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-orange-500 transition-colors"
                  rows={3}
                  maxLength={1000}
                />
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {authorName && (
                      <span>Posting as: <strong>{authorName}</strong></span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {authorName && (
                      <button
                        onClick={() => {
                          setAuthorName("");
                          setShowAuthorInput(true);
                          localStorage.removeItem('commentAuthor');
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                      >
                        {t("comments.form.changeName")}
                      </button>
                    )}
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                    >
                      {t("comments.form.submitBtn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="p-6 space-y-6">
            {loading ? (
              <div className="text-center py-12 text-gray-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-lg">Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <p className="text-lg">No comments yet.</p>
                <p className="text-sm mt-2">Be the first to share your thoughts!</p>
              </div>
            ) : (
              currentComments.map((comment, index) => (
                <div 
                  key={comment.id} 
                  className={`flex items-start space-x-3 group transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: isVisible ? `${0.4 + index * 0.1}s` : '0s' }}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/images/avt.jpg" 
                      alt="User Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-gray-700 font-medium hover:text-gray-800 cursor-pointer transition-colors">
                        {comment.author}
                      </h4>
                      <span className="text-gray-500 text-sm">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`text-gray-500 hover:text-gray-700 transition-colors ${
                    currentPage === 1 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                >
                  ← 
                </button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`text-sm transition-colors ${
                        currentPage === index + 1
                          ? 'text-blue-600 font-semibold'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`text-gray-500 hover:text-gray-700 transition-colors ${
                    currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`bg-white/70 backdrop-blur-sm rounded-b-lg px-6 py-3 border border-white/30 border-t-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
             style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}>
          <div className="flex items-center justify-center">
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;