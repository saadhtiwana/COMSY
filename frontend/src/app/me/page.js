"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { FiMapPin, FiMail, FiLink, FiBook, FiInfo, FiEdit3 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import AuthRedirect from '@/components/AuthRedirect';

const UserProfile = () => {
  const { userDetails } = useSelector((state) => state.auth);

  // Helper function to safely parse email parts
  const getEmailParts = (email) => {
    try {
      if (!email) return { batch: 'FA23', department: 'BCS', rollNumber: '000' };
      
      const [emailPart] = email.split('@');
      if (!emailPart) return { batch: 'FA23', department: 'BCS', rollNumber: '000' };

      const parts = emailPart.split('-');
      if (parts.length !== 3) return { batch: 'FA23', department: 'BCS', rollNumber: '000' };

      return {
        batch: parts[0].toUpperCase(),
        department: parts[1].toUpperCase(),
        rollNumber: parts[2]
      };
    } catch (error) {
      console.error('Error parsing email:', error);
      return { batch: 'FA23', department: 'BCS', rollNumber: '000' };
    }
  };

  const { batch, department, rollNumber } = getEmailParts(userDetails?.email);

  const defaultBio = "🎓 Studying at COMSATS University Islamabad\n📚 Learning and growing with fellow COMSians\n💡 Sharing knowledge and experiences";

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          >
            {/* Cover Photo */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
              <img
                src={userDetails?.coverImage || "https://via.placeholder.com/1200x300"}
                alt="Cover"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Department Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-sm font-medium text-blue-600">
                  {department}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col items-center -mt-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    src={userDetails?.profilePicture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg"
                  >
                    <FiEdit3 size={16} />
                  </motion.button>
                </motion.div>

                <div className="mt-4 text-center">
                  <h1 className="text-2xl font-bold text-gray-800">{userDetails?.fullName || "Your Name"}</h1>
                  <p className="text-blue-600 font-medium">@{userDetails?.username || "username"}</p>
                  <p className="mt-2 text-gray-600 max-w-md whitespace-pre-line">
                    {userDetails?.bio || defaultBio}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Academic Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <FiBook className="mr-3 text-blue-500" />
                <span className="font-medium">Batch: </span>
                <span className="ml-2">{batch}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FiMail className="mr-3 text-blue-500" />
                <span className="font-medium">Email: </span>
                <span className="ml-2 text-sm">{userDetails?.email || "your.email@isbstudent.comsats.edu.pk"}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FiMapPin className="mr-3 text-blue-500" />
                <span className="font-medium">Campus: </span>
                <span className="ml-2">Islamabad</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AuthRedirect>
  );
};

export default UserProfile;