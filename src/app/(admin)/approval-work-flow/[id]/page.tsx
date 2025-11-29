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
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const ApprovalWorkflowPage = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  // States
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Create MR",
      type: "start",
      team: "Team 1 - Procurement",
      action: null,
      hasDecision: false,
      decisionData: null,
    },
  ]);

  const [editingStepId, setEditingStepId] = useState(null);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingDecisionId, setEditingDecisionId] = useState(null);

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

  // Data
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

  const categories = [
    { value: "construction", label: "Construction" },
    { value: "renovation", label: "Renovation" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
  ];

  // Effects
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

  // Handlers
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
      hasDecision: true,
      //@ts-expect-error:data
      decisionData: {
        id: Date.now() + 1,
        title: "Decision Point",
        team: teams[0],
        branches: ["Approved", "Rejected"],
      },
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

  const handleLoadPreviousWorkflow = () => {
    if (selectedCategory) {
      console.log("Loading workflow for category:", selectedCategory);
      alert(`Loading workflow from ${selectedCategory} category`);
      setShowPreviousModal(false);
      setSelectedCategory("");
    } else {
      alert("Please select a category first");
    }
  };

  //@ts-expect-error:index
  const getStepIcon = (type) => {
    switch (type) {
      case "start":
        return <FileText className="w-5 h-5" />;
      case "review":
        return <CheckCircle className="w-5 h-5" />;
      case "decision":
        return <GitBranch className="w-5 h-5" />;
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

  // Render
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
                  onClick={() => setShowPreviousModal(true)}
                  className="flex items-center justify-center cursor-pointer gap-2 px-6 py-2.5 bg-white text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Choose from previous</span>
                </button>
                <button
                  onClick={handleSaveWorkflow}
                  className="flex items-center justify-center cursor-pointer gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Create new workflow</span>
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
                  {/* Step Card with Decision Branch */}
                  <div className="w-full flex items-start justify-center gap-8 relative">
                    {/* Decision Card (Left Side) */}
                    {step.hasDecision && step.decisionData && (
                      <div className="w-64 relative">
                        {/* Horizontal Line from main card */}
                        <div className="absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-purple-400 to-gray-300"></div>
                        
                        <div className="bg-white rounded-xl shadow-md border-2 border-purple-200 hover:border-purple-300 transition-all duration-200">
                          {/* Card Header */}
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-purple-200 rounded-t-xl">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                  <GitBranch className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  {
                                  //@ts-expect-error:id
                                  editingDecisionId === step.decisionData.id ? (
                                    <input
                                      type="text"
                                      //@ts-expect-error:index
                                      value={step.decisionData.title}
                                      onChange={(e) => {
                                        const newSteps = [...steps];
                                        //@ts-expect-error:index
                                        newSteps[index].decisionData.title = e.target.value;
                                        setSteps(newSteps);
                                      }}
                                      onBlur={() => setEditingDecisionId(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          setEditingDecisionId(null);
                                        }
                                      }}
                                      autoFocus
                                      className="w-full px-2 py-1 font-semibold text-gray-900 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                  ) : (
                                    <h3
                                      className="font-semibold text-gray-900 cursor-pointer hover:text-purple-600 transition-colors"
                                      //@ts-expect-error:index
                                      onClick={() => setEditingDecisionId(step.decisionData.id)}
                                    >
                                      {
                                      //@ts-expect-error:title
                                      step.decisionData.title}
                                    </h3>
                                  )}
                                  <p className="text-xs text-gray-600">Decision Branch</p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  const newSteps = [...steps];
                                  newSteps[index].hasDecision = false;
                                  newSteps[index].decisionData = null;
                                  setSteps(newSteps);
                                }}
                                className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                                title="Remove Decision"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
                                  //@ts-expect-error:index
                                  value={step.decisionData.team}
                                  onChange={(e) => {
                                    const newSteps = [...steps];
                                    //@ts-expect-error:index
                                    newSteps[index].decisionData.team = e.target.value;
                                    setSteps(newSteps);
                                  }}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none appearance-none bg-white pr-10"
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

                            {/* Decision Branches */}
                            <div>
                              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
                                <GitBranch className="w-3.5 h-3.5" />
                                Decision Paths
                              </label>
                              <div className="space-y-2">
                                {
                                //@ts-expect-error:branch
                                step.decisionData.branches.map((branch: string, branchIndex: number) => (
                                  <div key={branchIndex} className="flex items-center gap-2 p-2 bg-purple-50 rounded border border-purple-200">
                                    <div className={`w-3 h-3 rounded-full ${branchIndex === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-xs font-medium text-gray-700 flex-1">{branch}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Main Step Card (Center) */}
                    <div className="w-full max-w-md">
                    <div className={`bg-white rounded-xl shadow-md border-2 ${
                      step.type === "decision" 
                        ? "border-purple-200 hover:border-purple-300" 
                        : "border-gray-200 hover:border-red-300"
                    } transition-all duration-200`}>
                      {/* Card Header */}
                      <div className={`${
                        step.type === "decision"
                          ? "bg-gradient-to-r from-purple-50 to-pink-50"
                          : "bg-gradient-to-r from-red-50 to-orange-50"
                      } px-4 py-3 border-b border-gray-200 rounded-t-xl`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              {getStepIcon(step.type)}
                            </div>
                            <div className="flex-1">
                              {editingStepId === step.id ? (
                                <input
                                  type="text"
                                  value={step.title}
                                  onChange={(e) =>
                                    handleUpdateStep(
                                      index,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  onBlur={() => setEditingStepId(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      setEditingStepId(null);
                                    }
                                  }}
                                  autoFocus
                                  className="w-full px-2 py-1 font-semibold text-gray-900 border border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                              ) : (
                                <h3
                                  className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors"
                                  onClick={
                                    //@ts-expect-error:id
                                    () => setEditingStepId(step.id)}
                                >
                                  {step.title}
                                </h3>
                              )}
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

      {/* Previous Workflow Modal */}
      {showPreviousModal && (
        <div className="fixed inset-0 bg-black/2 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Choose Previous Workflow
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Select a category to load a previous workflow
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowPreviousModal(false);
                    setSelectedCategory("");
                  }}
                  className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Project Name Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {projectData.name}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      {projectData.code}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <GitBranch className="w-4 h-4" />
                  Workflow Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white pr-10"
                  >
                    <option value="">Select a category...</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex gap-3">
              <button
                onClick={() => {
                  setShowPreviousModal(false);
                  setSelectedCategory("");
                }}
                className="flex-1 px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLoadPreviousWorkflow}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Save Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalWorkflowPage;