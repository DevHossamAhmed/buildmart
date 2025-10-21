"use client";

import React, { useState } from "react";
import {
  Users,
  
  Search,
  Filter,
 
  Edit2,
  Trash2,
  Mail,
  Phone,
  Building2,
  Shield,
  Eye,
  Download,
  Upload,
  
  UserCheck,
  UserX,
  
  Plus,
  X,
} from "lucide-react";

const UsersTeamsPage = () => {
  const [activeTab, setActiveTab] = useState("teams");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Sample Users Data
  const usersData = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed.mohamed@company.com",
      phone: "+966 50 123 4567",
      role: "Project Manager",
      team: "Engineering Team",
      status: "active",
      avatar: "AM",
      department: "Engineering",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara.ali@company.com",
      phone: "+966 55 234 5678",
      role: "Procurement Officer",
      team: "Procurement Team",
      status: "active",
      avatar: "SA",
      department: "Procurement",
      joinDate: "2024-02-20",
      lastActive: "5 mins ago",
    },
    {
      id: 3,
      name: "Mahmoud Ahmed",
      email: "mahmoud.ahmed@company.com",
      phone: "+966 50 345 6789",
      role: "Senior Engineer",
      team: "Engineering Team",
      status: "active",
      avatar: "MA",
      department: "Engineering",
      joinDate: "2023-11-10",
      lastActive: "1 day ago",
    },
    {
      id: 4,
      name: "Fatima Hassan",
      email: "fatima.hassan@company.com",
      phone: "+966 54 456 7890",
      role: "Finance Manager",
      team: "Finance Team",
      status: "inactive",
      avatar: "FH",
      department: "Finance",
      joinDate: "2024-03-05",
      lastActive: "1 week ago",
    },
    {
      id: 5,
      name: "Omar Khalid",
      email: "omar.khalid@company.com",
      phone: "+966 56 567 8901",
      role: "Admin",
      team: "IT Team",
      status: "active",
      avatar: "OK",
      department: "IT",
      joinDate: "2023-09-12",
      lastActive: "30 mins ago",
    },
  ];

  // Sample Teams Data
  const teamsData = [
    {
      id: 1,
      name: "Engineering Team",
      description:
        "Responsible for project execution and technical implementation",
      members: 12,
      NumberofRoles: 5,

      projects: 8,
      status: "active",
      color: "blue",
    },
    {
      id: 2,
      name: "Procurement Team",
      description: "Handles all procurement and supplier management activities",
      members: 6,
      NumberofRoles: 5,

      projects: 15,
      status: "active",
      color: "green",
    },
    {
      id: 3,
      name: "Finance Team",
      description: "Manages financial operations and budget control",
      members: 5,
      NumberofRoles: 5,

      projects: 20,
      status: "active",
      color: "purple",
    },
    {
      id: 4,
      name: "IT Team",
      description: "Provides technical support and system administration",
      members: 4,
      NumberofRoles: 5,

      projects: 3,
      status: "active",
      color: "orange",
    },
  ];

//@ts-expect-error:status
  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-gray-100 text-gray-700 border-gray-300";
  };
//@ts-expect-error:color
  const getTeamColor = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-700 border-blue-300",
      green: "bg-green-100 text-green-700 border-green-300",
      purple: "bg-purple-100 text-purple-700 border-purple-300",
      orange: "bg-orange-100 text-orange-700 border-orange-300",
      red: "bg-red-100 text-red-700 border-red-300",
    };
    //@ts-expect-error:color
    return colors[color] || colors.blue;
  };

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && user.status === "active") ||
      (selectedFilter === "inactive" && user.status === "inactive");

    return matchesSearch && matchesFilter;
  });

  const filteredTeams = teamsData.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Users & Teams
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your organization&lsquo;s users and teams
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={() =>
                  activeTab === "teams"
                    ? setShowUserModal(true)
                    : setShowTeamModal(true)
                }
                className="px-4 py-2 text-white cursor-pointer rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
                style={{ backgroundColor: "#d92335" }}
              >
                <Plus className="w-4 h-4" />
                {activeTab === "teams" ?  "Create Team": "Add User"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6 border-b border-gray-200">
              {["teams", "users"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 text-sm  font-medium transition-colors cursor-pointer relative ${
                    activeTab === tab
                      ? "text-red-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "teams" ? "Teams" : "Users"}
                  {activeTab === tab && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "#d92335" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none text-sm w-64"
                />
              </div>
              {activeTab === "users" && (
                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  {showFilterMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <button
                        onClick={() => {
                          setSelectedFilter("all");
                          setShowFilterMenu(false);
                        }}
                        className="w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50"
                      >
                        All Users
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFilter("active");
                          setShowFilterMenu(false);
                        }}
                        className="w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50"
                      >
                        Active Only
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFilter("inactive");
                          setShowFilterMenu(false);
                        }}
                        className="w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50"
                      >
                        Inactive Only
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {activeTab === "users" && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.length}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.filter((u) => u.status === "active").length}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <UserX className="w-5 h-5 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-600">Inactive Users</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.filter((u) => u.status === "inactive").length}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">Admins</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.filter((u) => u.role === "Admin").length}
                </p>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Team
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: "#d92335" }}
                            >
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{user.team}</p>
                          <p className="text-xs text-gray-500">
                            {user.department}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {user.lastActive}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                              <Edit2 className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg cursor-pointer transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-12 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Total Teams</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {teamsData.length}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {teamsData.reduce((sum, team) => sum + team.members, 0)}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">total permissions</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">20</p>
              </div>
            </div>

            {/* Teams Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Number of Permissions
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Count Users
                      </th>

                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTeams.map((team) => (
                      <tr key={team.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTeamColor(
                                team.color
                              )}`}
                            >
                              <Users className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">
                              {team.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600 max-w-xs truncate">
                            {team.description}
                          </p>
                        </td>
                        <td className="px-6 py-4 ">
                          <span className="text-sm text-gray-600 max-w-xs truncate font-medium ">
                            {team.NumberofRoles}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <p className="text-sm font-medium text-gray-900">
                              {team.members}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 cursor-pointer rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">
                Add New User
              </h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="user@company.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+966 XX XXX XXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="w-full relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team
                </label>
                <div className="relative">
                  <select className="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none bg-white pr-10">
                    <option value="">Select team</option>
                    {teamsData.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>

                  {/* السهم */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          View Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can view all projects
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Create Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can create new projects
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Edit Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can edit project details
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Delete Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can delete projects
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Manage RFBs
                        </p>
                        <p className="text-xs text-gray-500">
                          Can create and manage RFBs
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Approve Requests
                        </p>
                        <p className="text-xs text-gray-500">
                          Can approve material requests
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Manage Users
                        </p>
                        <p className="text-xs text-gray-500">
                          Can add and edit users
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          View Reports
                        </p>
                        <p className="text-xs text-gray-500">
                          Can access all reports
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Manage Documents
                        </p>
                        <p className="text-xs text-gray-500">
                          Can upload and delete documents
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Financial Access
                        </p>
                        <p className="text-xs text-gray-500">
                          Can view financial data
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 cursor-pointer text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                style={{ backgroundColor: "#d92335" }}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Team
              </h2>
              <button
                onClick={() => setShowTeamModal(false)}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter team name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter team description"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          View Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can view all projects
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Create Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can create new projects
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Edit Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can edit project details
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Delete Projects
                        </p>
                        <p className="text-xs text-gray-500">
                          Can delete projects
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Manage RFBs
                        </p>
                        <p className="text-xs text-gray-500">
                          Can create and manage RFBs
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Approve Requests
                        </p>
                        <p className="text-xs text-gray-500">
                          Can approve material requests
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Manage Users
                        </p>
                        <p className="text-xs text-gray-500">
                          Can add and edit users
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          View Reports
                        </p>
                        <p className="text-xs text-gray-500">
                          Can access all reports
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Manage Documents
                        </p>
                        <p className="text-xs text-gray-500">
                          Can upload and delete documents
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Financial Access
                        </p>
                        <p className="text-xs text-gray-500">
                          Can view financial data
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Members
                </label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="space-y-2">
                    {usersData.map((user) => (
                      <label
                        key={user.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-red-600 focus:ring-red-500 rounded"
                        />
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                          style={{ backgroundColor: "#d92335" }}
                        >
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowTeamModal(false)}
                className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 cursor-pointer text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                style={{ backgroundColor: "#d92335" }}
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTeamsPage;
