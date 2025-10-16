import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  code: string;
  description: string;
  userCount: number;
  permissions: number[];
}

const RoleMaster: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const availablePermissions = [
    { id: 1, name: '見積作成', code: 'QUOTE_CREATE', category: '見積管理' },
    { id: 2, name: '見積承認', code: 'QUOTE_APPROVE', category: '見積管理' },
    { id: 3, name: '受注登録', code: 'ORDER_CREATE', category: '受注管理' },
    { id: 4, name: '受注編集', code: 'ORDER_EDIT', category: '受注管理' },
    { id: 5, name: '売上確定', code: 'SALES_CONFIRM', category: '売上管理' },
    { id: 6, name: '請求書発行', code: 'INVOICE_CREATE', category: '請求管理' },
    { id: 7, name: 'マスタ編集', code: 'MASTER_EDIT', category: 'システム' },
    { id: 8, name: 'ユーザー管理', code: 'USER_MANAGE', category: 'システム' },
  ];

  const roles: Role[] = [
    { id: 1, name: 'システム管理者', code: 'ADMIN', description: 'システム全体の管理権限', userCount: 2, permissions: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: 2, name: '営業マネージャー', code: 'SALES_MGR', description: '営業部門の管理権限', userCount: 3, permissions: [1, 2, 3, 4, 5] },
    { id: 3, name: '営業担当', code: 'SALES', description: '営業業務の実行権限', userCount: 12, permissions: [1, 3] },
    { id: 4, name: '経理担当', code: 'ACCOUNTING', description: '経理業務の実行権限', userCount: 5, permissions: [5, 6] },
  ];

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setSelectedPermissions(role.permissions);
    setShowModal(true);
  };

  const handleAddRole = () => {
    setEditingRole(null);
    setSelectedPermissions([]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRole(null);
    setSelectedPermissions([]);
  };

  const togglePermission = (permissionId: number) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const getPermissionsByRole = (rolePermissions: number[]) => {
    return availablePermissions
      .filter(p => rolePermissions.includes(p.id))
      .map(p => p.name)
      .join(', ');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ロールマスタ</h1>
        <p className="text-gray-600 mt-2">ロール情報を管理します</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">ロール一覧</h2>
            <button
              onClick={handleAddRole}
              className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>新規ロール追加</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ロール名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ロールコード
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  説明
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  権限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ユーザー数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {role.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {role.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {role.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs">
                      <span className="text-gray-600">{getPermissionsByRole(role.permissions)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {role.userCount}名
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRole(role)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingRole ? 'ロール編集' : '新規ロール追加'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ロール名
                  </label>
                  <input
                    type="text"
                    defaultValue={editingRole?.name}
                    placeholder="ロール名"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ロールコード
                  </label>
                  <input
                    type="text"
                    defaultValue={editingRole?.code}
                    placeholder="ロールコード"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  defaultValue={editingRole?.description}
                  placeholder="説明"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  権限設定
                </label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {Object.entries(
                      availablePermissions.reduce((acc, permission) => {
                        if (!acc[permission.category]) {
                          acc[permission.category] = [];
                        }
                        acc[permission.category].push(permission);
                        return acc;
                      }, {} as Record<string, typeof availablePermissions>)
                    ).map(([category, permissions]) => (
                      <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
                        <div className="space-y-2">
                          {permissions.map((permission) => (
                            <label
                              key={permission.id}
                              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                            >
                              <input
                                type="checkbox"
                                checked={selectedPermissions.includes(permission.id)}
                                onChange={() => togglePermission(permission.id)}
                                className="w-4 h-4 text-[#051C2C] border-gray-300 rounded focus:ring-[#051C2C]"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {permission.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {permission.code}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  選択中の権限: {selectedPermissions.length}個
                </div>
              </div>
            </form>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                {editingRole ? '更新' : '追加'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleMaster;
