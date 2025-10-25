"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  GitBranch,
  Users,
  CheckCircle,
  Send,
  FileText,
  Save,
  ChevronDown,
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const ApprovalWorkflowPage = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Create MR",
      type: "start",
      team: "Team 1 - Procurement",
      action: null,
    },
  ]);

  const [showSettings, setShowSettings] = useState(false);

  const [projectData, setProjectData] = useState({
    id: "",
    name: "",
    code: "",
    location: "",
    manager: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (projectId) {
      const allProjects = [
        {
          id: "PRJ-001",
          name: "Building A Construction",
          code: "BA-2025",
          location: "Downtown, Cairo",
          manager: "Mahmoud Ahmed",
          status: "active",
          progress: 65,
          startDate: "2025-01-15",
          endDate: "2025-06-30",
          budget: 5000000,
          spent: 3250000,
          totalRequests: 45,
          pendingRequests: 12,
          team: 25,
        },
        {
          id: "PRJ-002",
          name: "Office Renovation",
          code: "OR-2025",
          location: "New Cairo",
          manager: "Sara Ali",
          status: "active",
          progress: 40,
          startDate: "2025-02-01",
          endDate: "2025-04-15",
          budget: 1500000,
          spent: 600000,
          totalRequests: 28,
          pendingRequests: 8,
          team: 12,
        },
        {
          id: "PRJ-003",
          name: "Shopping Mall Phase 2",
          code: "SM-2025",
          location: "6th October City",
          manager: "Ahmed Hassan",
          status: "planning",
          progress: 15,
          startDate: "2025-03-01",
          endDate: "2025-12-31",
          budget: 15000000,
          spent: 2250000,
          totalRequests: 18,
          pendingRequests: 15,
          team: 45,
        },
        {
          id: "PRJ-004",
          name: "Residential Complex",
          code: "RC-2024",
          location: "Nasr City",
          manager: "Fatima Mohamed",
          status: "completed",
          progress: 100,
          startDate: "2024-06-01",
          endDate: "2024-12-31",
          budget: 8000000,
          spent: 7800000,
          totalRequests: 95,
          pendingRequests: 0,
          team: 35,
        },
        {
          id: "PRJ-005",
          name: "School Building",
          code: "SB-2025",
          location: "Heliopolis",
          manager: "Omar Khalil",
          status: "on-hold",
          progress: 25,
          startDate: "2025-01-20",
          endDate: "2025-08-30",
          budget: 3000000,
          spent: 750000,
          totalRequests: 15,
          pendingRequests: 5,
          team: 18,
        },
      ];

      const project = allProjects.find((p) => p.id === projectId) || {
        id: projectId,
        name: "Unknown Project",
        code: projectId,
        location: "N/A",
        manager: "N/A",
        status: "N/A",
        startDate: "N/A",
        endDate: "N/A",
      };

      setProjectData(project);

      const savedWorkflow = localStorage.getItem(`workflow_${projectId}`);
      if (savedWorkflow) {
        setSteps(JSON.parse(savedWorkflow));
      }
    }
  }, [projectId]);

  const teams = [
    "Team 1 - Procurement",
    "Team 2 - Finance",
    "Team 3 - Operations",
    "Team 4 - Management",
  ];

  const actions = [
    { value: "edit&approve", label: "Edit & Approve" },
    { value: "review&approve", label: "Review & Approve" },
  ];
  //@ts-expect-error:index
  const handleAddStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, {
      id: Date.now(),
      title: "Under Review",
      type: "review",
      team: teams[0],
      //@ts-expect-error:index
      action: actions[0].value,
    });
    setSteps(newSteps);
  };
  //@ts-expect-error:index
  const handleRemoveStep = (index) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };
  //@ts-expect-error:index
  const handleUpdateStep = (index, field, value) => {
    const newSteps = [...steps];
    //@ts-expect-error:index
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleSaveWorkflow = () => {
    localStorage.setItem(`workflow_${projectId}`, JSON.stringify(steps));
    console.log("Workflow saved:", { projectId, projectData, steps });
    alert("Workflow saved successfully!");
  };
  //@ts-expect-error:index
  const getStepIcon = (type) => {
    switch (type) {
      case "start":
        return <FileText className="w-5 h-5" />;
      case "review":
        return <CheckCircle className="w-5 h-5" />;
      case "end":
        return <Send className="w-5 h-5" />;
      default:
        return <GitBranch className="w-5 h-5" />;
    }
  };
  //@ts-expect-error:index
  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-700 border-green-300",
      planning: "bg-blue-100 text-blue-700 border-blue-300",
      "on-hold": "bg-yellow-100 text-yellow-700 border-yellow-300",
      completed: "bg-purple-100 text-purple-700 border-purple-300",
    };
    //@ts-expect-error:index
    return colors[status] || colors.active;
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-6 py-6">
          <div className="flex flex-col gap-4">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-red-100 rounded-lg">
                  <GitBranch className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Approval Workflow
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure approval steps for {projectData.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                    projectData.status
                  )}`}
                >
                  {projectData.status.charAt(0).toUpperCase() +
                    projectData.status.slice(1).replace("-", " ")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveWorkflow}
                  className="flex items-center justify-center cursor-pointer gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Workflow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Project Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Project Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {projectData.name}
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    {projectData.code}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-sm font-medium text-gray-900">
                    {projectData.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-sm font-medium text-gray-900">
                    {projectData.startDate} - {projectData.endDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-600">Project Manager</p>
                  <p className="text-sm font-medium text-gray-900">
                    {projectData.manager}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step Card */}
                  <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-red-300 transition-all duration-200">
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3 border-b border-gray-200 rounded-t-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              {getStepIcon(step.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {step.title}
                              </h3>
                              <p className="text-xs text-gray-600">
                                Step {index + 1}
                              </p>
                            </div>
                          </div>
                          {step.type !== "start" && (
                            <button
                              onClick={() => handleRemoveStep(index)}
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Remove Step"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 space-y-3">
                        {/* Team Selection */}
                        <div>
                          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
                            <Users className="w-3.5 h-3.5" />
                            Assigned Team
                          </label>
                          <div className="relative">
                            <select
                              value={step.team}
                              onChange={(e) =>
                                handleUpdateStep(index, "team", e.target.value)
                              }
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white pr-10"
                            >
                              {teams.map((team) => (
                                <option key={team} value={team}>
                                  {team}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Action Selection (Only for review steps) */}
                        {step.type === "review" && (
                          <div>
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Action Required
                            </label>
                            <div className="relative">
                              <select
                                //@ts-expect-error:index
                                value={step.action}
                                onChange={(e) =>
                                  handleUpdateStep(
                                    index,
                                    "action",
                                    e.target.value
                                  )
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white pr-10"
                              >
                                {actions.map((action) => (
                                  <option
                                    key={action.value}
                                    value={action.value}
                                  >
                                    {action.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-400 my-2" />

                  {/* Add Step Button */}
                  <div className="my-2">
                    <button
                      onClick={() => handleAddStep(index)}
                      className="group relative w-10 h-10 cursor-pointer rounded-full border-2 border-dashed border-gray-300 hover:border-red-500 bg-white hover:bg-red-50 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                      title="Add Review Step"
                    >
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                    </button>
                  </div>

                  {/* Connector Line before next step */}
                  {index !== steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-400 my-2" />
                  )}
                </React.Fragment>
              ))}

              {/* Final Connector Line */}
              <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-400 my-2" />

              {/* Final Step - Send RFPs */}
              <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-md border-2 border-green-200 hover:border-green-300 transition-all duration-200">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-green-200 rounded-t-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Send className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Send RFPs
                        </h3>
                        <p className="text-xs text-gray-600">Final Step</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
                        <Users className="w-3.5 h-3.5" />
                        Assigned Team
                      </label>
                      <div className="relative">
                        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white pr-10">
                          {teams.map((team) => (
                            <option key={team} value={team}>
                              {team}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <GitBranch className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  Workflow Summary
                </h4>
                <p className="text-sm text-blue-700">
                  This workflow for <strong>{projectData.name}</strong> contains{" "}
                  <strong>{steps.length + 1}</strong> steps with{" "}
                  <strong>
                    {steps.filter((s) => s.type === "review").length}
                  </strong>{" "}
                  review points. Make sure all teams and actions are properly
                  configured before saving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalWorkflowPage;
