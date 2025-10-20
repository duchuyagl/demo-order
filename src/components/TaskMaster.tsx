import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const TaskMaster: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const tasks = [
    { id: 1, name: '設計作業', category: '開発', unitPrice: 50000, unit: '時間', description: 'システム設計作業' },
    { id: 2, name: 'コーディング', category: '開発', unitPrice: 40000, unit: '時間', description: 'プログラミング作業' },
    { id: 3, name: 'テスト', category: '品質管理', unitPrice: 30000, unit: '時間', description: 'システムテスト作業' },
    { id: 4, name: 'デザイン制作', category: 'デザイン', unitPrice: 35000, unit: '時間', description: 'UI/UXデザイン作業' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">作業マスタ</h1>
        <p className="text-gray-600 mt-2">作業項目情報を管理します</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">作業一覧</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>新規作業追加</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作業名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  単価
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  単位
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  説明
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ¥{task.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {task.description}
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
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">新規作業追加</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="作業名"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]">
                <option value="">カテゴリを選択</option>
                <option value="dev">開発</option>
                <option value="design">デザイン</option>
                <option value="qa">品質管理</option>
                <option value="consulting">コンサルティング</option>
              </select>
              <input
                type="number"
                placeholder="単価"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]">
                <option value="">単位を選択</option>
                <option value="時間">時間</option>
                <option value="日">日</option>
                <option value="式">式</option>
                <option value="個">個</option>
              </select>
              <textarea
                placeholder="説明"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
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

export default TaskMaster;
