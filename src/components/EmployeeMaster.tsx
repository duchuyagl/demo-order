import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const EmployeeMaster: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const employees = [
    { id: 1, name: '山田一郎', employeeNo: 'E001', department: '営業部', position: '部長', email: 'yamada@example.com', phone: '090-1234-5678', hireDate: '2015-04-01' },
    { id: 2, name: '佐藤二郎', employeeNo: 'E002', department: '開発部', position: '課長', email: 'sato@example.com', phone: '090-2345-6789', hireDate: '2017-07-01' },
    { id: 3, name: '鈴木三郎', employeeNo: 'E003', department: '営業部', position: '主任', email: 'suzuki@example.com', phone: '090-3456-7890', hireDate: '2019-10-01' },
    { id: 4, name: '田中花子', employeeNo: 'E004', department: '総務部', position: '担当', email: 'tanaka@example.com', phone: '090-4567-8901', hireDate: '2020-04-01' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">社員マスタ</h1>
        <p className="text-gray-600 mt-2">社員情報を管理します</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">社員一覧</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>新規社員追加</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  社員番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  氏名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  部署
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  役職
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  メールアドレス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  電話番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  入社日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.employeeNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.hireDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">新規社員追加</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="社員番号"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
                <input
                  type="text"
                  placeholder="氏名"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]">
                  <option value="">部署を選択</option>
                  <option value="sales">営業部</option>
                  <option value="dev">開発部</option>
                  <option value="admin">総務部</option>
                </select>
                <input
                  type="text"
                  placeholder="役職"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>
              <input
                type="email"
                placeholder="メールアドレス"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <input
                type="tel"
                placeholder="電話番号"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <input
                type="date"
                placeholder="入社日"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
            </form>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                追加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeMaster;
