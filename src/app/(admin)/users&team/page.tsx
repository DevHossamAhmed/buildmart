
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Users,
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
} from "lucide-react";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import StatCard from "@/components/ui/StatCard";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import UsersTeamsFilterBar, {
  UsersTeamsFilters,
} from "./components/UsersTeamsFilterBar";
import { CreateUserModal, CreateTeamModal } from "./components/modals";

const UsersTeamsPage = () => {
  const [activeTab, setActiveTab] = useState<"users" | "teams">("teams");
  const [filters, setFilters] = useState<UsersTeamsFilters>({
    search: "",
    status: "all",
    department: "all",
    role: "all",
    team: "all",
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      entity: "Main Office",
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
      entity: "Supply Chain Division",
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
      entity: "Main Office",
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
      entity: "Corporate Headquarters",
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
      entity: "Technology Center",
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
      entity: "Main Office",
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
      entity: "Supply Chain Division",
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
      entity: "Corporate Headquarters",
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
      entity: "Technology Center",
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

  // Extract unique values for filter options
  const departmentOptions = useMemo(() => {
    const uniqueDepartments = Array.from(
      new Set(usersData.map((user) => user.department))
    );
    return uniqueDepartments.map((dept) => ({
      value: dept,
      label: dept,
    }));
  }, [usersData]);

  const roleOptions = useMemo(() => {
    const uniqueRoles = Array.from(
      new Set(usersData.map((user) => user.role))
    );
    return uniqueRoles.map((role) => ({
      value: role,
      label: role,
    }));
  }, [usersData]);

  const teamOptions = useMemo(() => {
    const uniqueTeams = Array.from(
      new Set(usersData.map((user) => user.team))
    );
    return uniqueTeams.map((team) => ({
      value: team,
      label: team,
    }));
  }, [usersData]);

  const statusFilterOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch =
        !filters.search ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.role.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || user.status === filters.status;
      const matchesDepartment =
        filters.department === "all" || user.department === filters.department;
      const matchesRole =
        filters.role === "all" || user.role === filters.role;
      const matchesTeam =
        filters.team === "all" || user.team === filters.team;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesRole &&
        matchesTeam
      );
    });
  }, [usersData, filters]);

  const filteredTeams = useMemo(() => {
    return teamsData.filter((team) =>
      !filters.search ||
      team.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }, [teamsData, filters]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, activeTab]);

  // Pagination logic
  const usersTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const teamsTotalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const totalPages = activeTab === "users" ? usersTotalPages : teamsTotalPages;

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const paginatedTeams = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTeams.slice(startIndex, endIndex);
  }, [filteredTeams, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExport = () => {
    console.log("Exporting data...", activeTab === "users" ? filteredUsers : filteredTeams);
  };

  const handleFiltersChange = (newFilters: UsersTeamsFilters) => {
    setFilters(newFilters);
  };

  // Stats for Users
  const usersStats = [
    {
      label: "Total Users",
      value: String(usersData.length),
      icon: Users,
      iconColor: "text-blue-500",
      trend: "up" as const,
    },
    {
      label: "Active Users",
      value: String(usersData.filter((u) => u.status === "active").length),
      icon: UserCheck,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "Inactive Users",
      value: String(usersData.filter((u) => u.status === "inactive").length),
      icon: UserX,
      iconColor: "text-gray-500",
      trend: "neutral" as const,
    },
    {
      label: "Admins",
      value: String(usersData.filter((u) => u.role === "Admin").length),
      icon: Shield,
      iconColor: "text-purple-500",
      trend: "neutral" as const,
    },
  ];

  // Stats for Teams
  const teamsStats = [
    {
      label: "Total Teams",
      value: String(teamsData.length),
      icon: Users,
      iconColor: "text-blue-500",
      trend: "up" as const,
    },
    {
      label: "Total Users",
      value: String(teamsData.reduce((sum, team) => sum + team.members, 0)),
      icon: UserCheck,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "Total Permissions",
      value: "20",
      icon: Building2,
      iconColor: "text-purple-500",
      trend: "neutral" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Tabs */}
      <PageHeaderWrapper
        title="Users & Teams"
        description="Manage your organization's users and teams"
        sticky={true}
        zIndex={40}
        actions={
          <>
            <Button
              variant="outline"
              size="md"
              leftIcon={<Upload className="w-4 h-4" />}
            >
              Import
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() =>
                activeTab === "teams"
                  ? setShowTeamModal(true)
                  : setShowUserModal(true)
              }
              style={{ backgroundColor: "#d92335" }}
            >
              {activeTab === "teams" ? "Create Team" : "Add User"}
            </Button>
          </>
        }
      >
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 -mb-4">
          {(["teams", "users"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium transition-colors cursor-pointer relative ${
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
      </PageHeaderWrapper>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {usersStats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                  trend={stat.trend}
                />
              ))}
            </div>

            {/* Professional Filter Bar */}
            <UsersTeamsFilterBar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onExport={handleExport}
              statusOptions={statusFilterOptions}
              departmentOptions={departmentOptions}
              roleOptions={roleOptions}
              teamOptions={teamOptions}
              activeTab={activeTab}
            />

            {/* Enhanced Users Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Entity
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-4 sm:px-6 py-12 sm:py-16 text-center"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Users className="w-12 h-12 text-gray-400 mb-3" />
                            <p className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                              No users found
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {filters.search || filters.status !== "all"
                                ? "Try adjusting your filters"
                                : "Create your first user"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
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
                          <td className="px-4 sm:px-6 py-4">
                            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {user.department}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="text-sm text-gray-600">
                              {user.entity}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              {user.team}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
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
                          <td className="px-4 sm:px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                user.status
                              )}`}
                            >
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="text-sm text-gray-600">
                              {user.lastActive}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-150"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={usersTotalPages}
                  totalItems={filteredUsers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={setItemsPerPage}
                  itemsPerPageOptions={[10, 25, 50, 100]}
                  showItemsPerPage={true}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {teamsStats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                  trend={stat.trend}
                />
              ))}
            </div>

            {/* Professional Filter Bar */}
            <UsersTeamsFilterBar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onExport={handleExport}
              statusOptions={statusFilterOptions}
              departmentOptions={departmentOptions}
              roleOptions={roleOptions}
              teamOptions={teamOptions}
              activeTab={activeTab}
            />

            {/* Enhanced Teams Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Entity
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Number of Permissions
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Count Users
                      </th>
                      <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTeams.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 sm:px-6 py-12 sm:py-16 text-center"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Users className="w-12 h-12 text-gray-400 mb-3" />
                            <p className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                              No teams found
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {filters.search
                                ? "Try adjusting your filters"
                                : "Create your first team"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedTeams.map((team) => (
                        <tr
                          key={team.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTeamColor(
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
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-sm text-gray-600 font-medium">
                              {team.entity}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="text-sm text-gray-600 max-w-xs">
                              {team.description}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-sm font-medium text-gray-900">
                              {team.NumberofRoles}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <p className="text-sm font-medium text-gray-900">
                                {team.members}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-150"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredTeams.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={teamsTotalPages}
                  totalItems={filteredTeams.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={setItemsPerPage}
                  itemsPerPageOptions={[10, 25, 50, 100]}
                  showItemsPerPage={true}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={(data) => {
          console.log("User created:", data);
          setShowUserModal(false);
        }}
        teamsData={teamsData}
      />

      <CreateTeamModal
        isOpen={showTeamModal}
        onClose={() => setShowTeamModal(false)}
        onSubmit={(data) => {
          console.log("Team created:", data);
          setShowTeamModal(false);
        }}
        usersData={usersData}
      />
    </div>
  );
};

export default UsersTeamsPage;
