"use client";
import React, { useState } from "react";
import { X, Mail, Edit2, Trash2, Users, Check } from "lucide-react";
import Logo from "../../../../public/assets/images/logo.jpg";
import Image from "next/image";
import { useRouter } from 'next/navigation';


const SetupAccountPage = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([
    { id: 1, email: "ahmed.mohamed@company.com" },
    { id: 2, email: "sara.ali@company.com" },
    { id: 3, email: "omar.hassan@company.com" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editEmail, setEditEmail] = useState("");

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      setShowPopup(false);
      setTeamName("");
    }
  };

  const handleSendInvite = () => {
    if (emailInput.trim() && emailInput.includes("@")) {
      setInvitedUsers([...invitedUsers, { id: Date.now(), email: emailInput }]);
      setEmailInput("");
    }
  };

  //@ts-expect-error:id
  const handleDeleteUser = (id) => {
    setInvitedUsers(invitedUsers.filter((user) => user.id !== id));
  };

  //@ts-expect-error:id,email
  const handleEditUser = (id, email) => {
    setEditingId(id);
    setEditEmail(email);
  };

  //@ts-expect-error:id
  const handleSaveEdit = (id) => {
    if (editEmail.trim() && editEmail.includes("@")) {
      setInvitedUsers(
        invitedUsers.map((user) =>
          user.id === id ? { ...user, email: editEmail } : user
        )
      );
      setEditingId(null);
      setEditEmail("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className=" rounded-2xl flex items-center justify-center shadow-lg">
            <Image
              src={Logo}
              alt="Logo"
              width={100}
              height={30}
              className="w-auto h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Setup Your Account
        </h1>

        {/* Create Team Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowPopup(true)}
            className="w-full md:w-auto bg-[#d92335] text-white py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Users size={20} />
            Create Team
          </button>
        </div>

        {/* Add Users Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add Users
          </h2>

          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendInvite()}
                placeholder="Enter email address"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleSendInvite}
              className="bg-[#d92335] text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Send
            </button>
          </div>

          {/* Invited Users List */}
          {invitedUsers.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                Invited Users ({invitedUsers.length})
              </h3>
              {invitedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all"
                >
                  {editingId === user.id ? (
                    <>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 "
                      />
                      <div className="flex gap-2 ml-3">
                        <button
                          onClick={() => handleSaveEdit(user.id)}
                          className="p-2 bg-green-500 cursor-pointer text-white rounded-lg hover:bg-green-600 transition-all"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-gray-400 cursor-pointer text-white rounded-lg hover:bg-gray-500 transition-all"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#d92335] to-[#ff1930] rounded-full flex items-center justify-center text-white font-semibold">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-700">{user.email}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(user.id, user.email)}
                          className="p-2 bg-blue-100 text-blue-600 cursor-pointer rounded-lg hover:bg-blue-200 transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 bg-red-100 text-red-600 cursor-pointer rounded-lg hover:bg-red-200 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <button
          onClick={() => router.push("/add-categories")}
          className="bg-[#d92335] text-white py-3 px-8 cursor-pointer rounded-xl font-semibold  transition-all duration-300 shadow-lg hover:shadow-xl">
            Next →
          </button>
        </div>
      </div>

      {/* Create Team Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all animate-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create Team</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:border-transparent transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-gray-100 cursor-pointer text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeam}
                className="flex-1 bg-[#d92335] cursor-pointer text-white py-3 px-6 rounded-xl font-semibold  transition-all duration-300 shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupAccountPage;
