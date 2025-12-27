"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Paperclip,
  Send,
  Clock,
  MoreVertical,
  Reply,
  Smile,
  Image as ImageIcon,
  FileText,
  X,
  Filter,
} from "lucide-react";
import Button from "@/components/ui/Button";

export interface Activity {
  id: number | string;
  user: string;
  action: string;
  message: string;
  timestamp: string;
  type: "comment" | "system" | "activity";
  attachments?: Array<{ name: string; size: string; type: string }>;
}

interface CommunicationTabProps {
  activities: Activity[];
  onAddComment?: (comment: string, attachments?: File[]) => void;
  onReply?: (activityId: number | string, replyText: string) => void;
  currentUser?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  className?: string;
  showFilter?: boolean;
  emptyStateMessage?: string;
}

const CommunicationTab: React.FC<CommunicationTabProps> = ({
  activities,
  onAddComment,
  onReply,
  currentUser = { name: "User", initials: "U" },
  className = "",
  showFilter = true,
  emptyStateMessage = "No activity yet. Start the conversation by adding a comment",
}) => {
  const [newComment, setNewComment] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "comment" | "system" | "activity">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitComment = () => {
    if (newComment.trim() || selectedFiles.length > 0) {
      onAddComment?.(newComment, selectedFiles);
      setNewComment("");
      setSelectedFiles([]);
    }
  };

  const handleReply = (activityId: number | string) => {
    if (replyText.trim()) {
      onReply?.(activityId, replyText);
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const emojis = ["👍", "❤️", "😊", "🎉", "✅", "👏", "💯", "🔥"];

  const formatTimeAgo = (timestamp: string) => {
    return timestamp;
  };

  // Close filter menu when clicking outside
  const filterMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter activities based on search and filter type
  const filteredActivities = activities.filter((activity) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      activity.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    const matchesType =
      filterType === "all" || activity.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              Communication & Activity
            </h3>
            <p className="text-sm text-gray-600 mt-1.5">
              Track comments, updates, and activity
            </p>
          </div>
          {showFilter && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-1 sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                />
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              {/* Filter Dropdown */}
              <div className="relative" ref={filterMenuRef}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  leftIcon={<Filter className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Filter {filterType !== "all" && `(${filterType})`}
                </Button>
                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={() => {
                        setFilterType("all");
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        filterType === "all" ? "bg-gray-50 text-red-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      All Activities
                    </button>
                    <button
                      onClick={() => {
                        setFilterType("comment");
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        filterType === "comment" ? "bg-gray-50 text-red-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      Comments Only
                    </button>
                    <button
                      onClick={() => {
                        setFilterType("system");
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        filterType === "system" ? "bg-gray-50 text-red-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      System Updates
                    </button>
                    <button
                      onClick={() => {
                        setFilterType("activity");
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        filterType === "activity" ? "bg-gray-50 text-red-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      Activities
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Activities Timeline */}
        <div className="space-y-6 mb-8">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                No activity yet
              </p>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                {emptyStateMessage}
              </p>
            </div>
          ) : (
            filteredActivities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {/* Timeline connector */}
                {index < filteredActivities.length - 1 && (
                  <div className="absolute left-5 sm:left-6 top-12 sm:top-14 bottom-0 w-0.5 bg-gray-200" />
                )}

                <div className="flex gap-4 sm:gap-5">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base shadow-md">
                      {activity.user.charAt(0)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-5 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm sm:text-base font-semibold text-gray-900">
                            {activity.user}
                          </p>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {activity.action}
                          </span>
                          {activity.type === "system" && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              System
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                          {activity.type !== "system" && (
                            <div className="relative">
                              <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {activity.message}
                      </p>

                      {/* Attachments */}
                      {activity.attachments && activity.attachments.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {activity.attachments.map((attachment, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                              <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-700 truncate max-w-[200px]">
                                {attachment.name}
                              </span>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                ({attachment.size})
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Section */}
                      {replyingTo === activity.id ? (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm sm:text-base"
                            rows={2}
                          />
                          <div className="flex items-center justify-end gap-2 mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleReply(activity.id)}
                              style={{ backgroundColor: "#d92335" }}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      ) : (
                        activity.type !== "system" && (
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              onClick={() => setReplyingTo(activity.id)}
                              className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
                            >
                              <Reply className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              Reply
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Section */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8">
          <div className="flex gap-4 sm:gap-5">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md text-sm sm:text-base">
                {currentUser.initials || currentUser.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg border border-gray-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 transition-all">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment or mention someone..."
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-transparent border-0 rounded-lg focus:outline-none resize-none text-sm sm:text-base"
                  rows={4}
                />
                <div className="px-4 sm:px-5 pb-3 pt-4 sm:pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    {/* File Upload */}
                    <label className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                      <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileSelect}
                      />
                    </label>

                    {/* Image Upload */}
                    <label className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                      <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                      />
                    </label>

                    {/* Emoji Picker */}
                    <div className="relative">
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      {showEmojiPicker && (
                        <div className="absolute bottom-full left-0 mb-2 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-wrap gap-2 z-10 min-w-[200px]">
                          {emojis.map((emoji, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setNewComment((prev) => prev + emoji);
                                setShowEmojiPicker(false);
                              }}
                              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-lg sm:text-xl"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Send className="w-4 h-4" />}
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() && selectedFiles.length === 0}
                    style={{ backgroundColor: "#d92335" }}
                    className="w-full sm:w-auto"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Selected Files Preview */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-blue-900 font-medium truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-blue-600 whitespace-nowrap">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Tips */}
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>Tip:</strong> Use @ to mention team members, or attach
                  files to provide more context
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationTab;

