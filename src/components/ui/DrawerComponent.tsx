import React, { ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSave?: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
  width?: string;
  showFooter?: boolean;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onSave,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  width = "sm:w-[480px]",
  showFooter = true,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 bg-opacity-50 z-[99999] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full ${width} bg-white shadow-2xl z-[100000] flex flex-col animate-slide-in`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-xl font-bold">×</span>
          </button>
        </div>

        {/* Header */}
        <div className="p-6 pt-16 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {showFooter && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {cancelButtonText}
              </button>
              {onSave && (
                <button
                  onClick={onSave}
                  className="flex-1 cursor-pointer px-6 py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
                  style={{ backgroundColor: "#d92335" }}
                >
                  {saveButtonText}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DrawerComponent;