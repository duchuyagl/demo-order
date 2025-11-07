import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface CostMaster {
  id: string;
  item_name: string;
  cost_type: string;
  amount: number;
}

const CostMaster: React.FC = () => {
  const [costs, setCosts] = useState<CostMaster[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    item_id: '',
    item_name: '',
    item_type: '商品',
    cost_type: '材料',
    amount: 0,
  });

  const handleSave = () => {
    if (editingId) {
      setCosts(costs.map(c => c.id === editingId ? { ...c, item_name: formData.item_name, cost_type: formData.cost_type, amount: formData.amount } : c));
    } else {
      setCosts([...costs, { id: Date.now().toString(), item_name: formData.item_name, cost_type: formData.cost_type, amount: formData.amount }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setCosts(costs.filter(c => c.id !== id));
  };

  const resetForm = () => {
    setFormData({
      item_id: '',
      item_name: '',
      item_type: '商品',
      cost_type: '材料',
      amount: 0,
    });
    setEditingId(null);
  };

  const filteredCosts = costs.filter(c =>
    c.item_name.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">原価マスタ</h1>
        <p className="text-gray-600 mt-2">原価情報を管理します</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="品名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>新規原価追加</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">品名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">原価タイプ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">金額</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCosts.map((cost) => (
                <tr key={cost.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{cost.item_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{cost.cost_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    ¥{cost.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                    <button
                      onClick={() => {
                        setFormData({
                          item_id: '',
                          item_name: cost.item_name,
                          item_type: '商品',
                          cost_type: cost.cost_type,
                          amount: cost.amount,
                        });
                        setEditingId(cost.id);
                        setShowModal(true);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cost.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingId ? '原価編集' : '新規原価追加'}
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="品名"
                value={formData.item_name}
                onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <select
                value={formData.item_type}
                onChange={(e) => setFormData({ ...formData, item_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              >
                <option value="商品">商品</option>
                <option value="作業">作業</option>
                <option value="外注">外注</option>
              </select>
              <select
                value={formData.cost_type}
                onChange={(e) => setFormData({ ...formData, cost_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              >
                <option value="材料">材料</option>
                <option value="人件費">人件費</option>
                <option value="その他">その他</option>
              </select>
              <input
                type="number"
                placeholder="金額"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
            </form>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]"
              >
                {editingId ? '更新' : '追加'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostMaster;
