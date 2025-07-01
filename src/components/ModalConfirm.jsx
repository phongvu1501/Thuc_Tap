export default function ModalConfirm({ show, onConfirm, onCancel, message }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <p className="mb-4">{message || 'Bạn chắc chắn muốn xoá?'}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}
