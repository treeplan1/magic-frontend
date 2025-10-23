import { useState, useEffect } from 'react';
import { Sparkles, Copy, Download, Trash2, History, Plus, User, LogOut } from 'lucide-react';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PromptPage = () => {
  const { user, logout } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Professional');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [postHistory, setPostHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [userStats, setUserStats] = useState(null);

  const tones = [
    { value: 'Founder', label: 'Founder', description: 'Inspirational and visionary' },
    { value: 'Freelancer', label: 'Freelancer', description: 'Practical and actionable' },
    { value: 'Professional', label: 'Professional', description: 'Polished and professional' }
  ];

  useEffect(() => {
    loadPostHistory();
  }, []);

  const loadPostHistory = async () => {
    try {
      const response = await apiService.getPostHistory();
      if (response.success) {
        setPostHistory(response.posts);
        setUserStats({
          postsGenerated: response.count,
          remainingPosts: user?.accountType === 'premium' ? 'unlimited' : (user?.postLimit - user?.postsGenerated)
        });
      }
    } catch (error) {
      console.error('Failed to load post history:', error);
    }
  };

  const handleGeneratePost = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.generatePost(prompt, tone);
      if (response.success) {
        setGeneratedPost(response.post.content);
        loadPostHistory(); // Refresh history
      } else {
        setError(response.message || 'Failed to generate post');
      }
    } catch (error) {
      setError(error.message || 'Failed to generate post');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(generatedPost);
    // You could add a toast notification here
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await apiService.deletePost(postId);
      if (response.success) {
        loadPostHistory();
        if (generatedPost && postHistory.find(p => p.id === postId)) {
          setGeneratedPost('');
        }
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleLoadFromHistory = (post) => {
    setPrompt(post.prompt);
    setTone(post.tone);
    setGeneratedPost(post.content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">MagicPen</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
                {userStats && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {userStats.remainingPosts === 'unlimited' ? '∞' : userStats.remainingPosts} posts left
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-purple-600 transition"
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your LinkedIn Post</h2>
              
              <form onSubmit={handleGeneratePost} className="space-y-6">
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                    What would you like to write about?
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Share your thoughts, experiences, or insights..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                    Choose your tone
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {tones.map((toneOption) => (
                      <label
                        key={toneOption.value}
                        className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition ${
                          tone === toneOption.value
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tone"
                          value={toneOption.value}
                          checked={tone === toneOption.value}
                          onChange={(e) => setTone(e.target.value)}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{toneOption.label}</div>
                          <div className="text-sm text-gray-600 mt-1">{toneOption.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Post</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Generated Post */}
            {generatedPost && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Generated Post</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopyPost}
                      className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-purple-600 transition"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                    {generatedPost}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Post History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Posts</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-purple-600 hover:text-purple-700 transition"
                >
                  {showHistory ? 'Hide' : 'Show All'}
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {postHistory.slice(0, showHistory ? postHistory.length : 3).map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {post.tone}
                      </span>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.prompt}</p>
                    <button
                      onClick={() => handleLoadFromHistory(post)}
                      className="text-xs text-purple-600 hover:text-purple-700 transition"
                    >
                      Load this post
                    </button>
                  </div>
                ))}
                
                {postHistory.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <History className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No posts yet</p>
                    <p className="text-sm">Generate your first post!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
