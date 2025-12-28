/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { TableColumn, TableProps } from "@/types";
import Button from "./Button";

interface DataTableProps<T = any> extends Omit<TableProps<T>, 'columns'> {
  columns: TableColumn<T>[];
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  showActions = true,
  isLoading = false,
  emptyMessage = "No data available",
  pagination,
}: DataTableProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                #
              </th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider ${
                    column.width ? `w-[${column.width}]` : ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 2 : 1)}
                  className="px-4 sm:px-6 py-12 sm:py-16 text-center"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 2 : 1)}
                  className="px-4 sm:px-6 py-12 sm:py-16 text-center text-sm sm:text-base text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-900">
                    {pagination
                      ? (pagination.currentPage - 1) * 10 + rowIndex + 1
                      : rowIndex + 1}
                  </td>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base ${
                        column.className || "text-gray-600"
                      }`}
                    >
                      {column.render
                        ? column.render(
                            typeof column.accessor === "string"
                              ? row[column.accessor]
                              : row[column.accessor as keyof T],
                            row
                          )
                        : typeof column.accessor === "string"
                        ? row[column.accessor]
                        : row[column.accessor as keyof T]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(row)}
                            className="p-1 sm:p-1.5"
                            title="View"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(row)}
                            className="p-1 sm:p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50"
                            title="Edit"
                          >
                            <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(row)}
                            className="p-1 sm:p-1.5 text-error hover:text-error-dark hover:bg-error-light"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-500">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;