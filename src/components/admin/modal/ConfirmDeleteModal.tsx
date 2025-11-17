"use client";

interface Props {
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  title = "Are you sure?",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onCancel} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
