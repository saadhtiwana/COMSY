"use client"
import PostForm from "@/components/feed/posts/PostForm";
import PostList from "@/components/feed/posts/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/redux/posts/postsSlice';
import { fetchUserDetails } from '@/redux/auth/authSlice';
import AuthRedirect from '@/components/AuthRedirect';
import { BsFillPostcardFill } from "react-icons/bs";
import { motion } from 'framer-motion';
import { FiRefreshCw, FiEdit3, FiBookOpen } from "react-icons/fi";

const MyPosts = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts.posts);
  const userPosts = posts.filter((post) => post.user._id === userDetails._id);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <AuthRedirect>
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50 pt-6">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="p-3 bg-blue-100 rounded-xl"
                >
                  <BsFillPostcardFill className="text-blue-600 text-2xl" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Your Creative Space</h1>
                  <p className="text-gray-600">Share your thoughts with fellow COMSians</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(getAllPosts())}
                className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <FiRefreshCw size={20} />
              </motion.button>
            </motion.div>
          </div>

          {/* Post Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PostForm />
          </motion.div>

          {/* Posts List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {userPosts.length > 0 ? (
              <PostList posts={userPosts} />
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="p-4 bg-blue-100 rounded-full mb-4">
                    <FiEdit3 className="text-blue-600 text-4xl" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Start Sharing!</h2>
                  <p className="text-gray-600 max-w-md mb-6">
                    Share your academic journey, campus experiences, or ask questions to connect with your fellow students.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                  >
                    <FiBookOpen />
                    <span>Create Your First Post</span>
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </AuthRedirect>
  );
};

export default MyPosts;