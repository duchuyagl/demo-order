import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Outsourcing {
  id: string;
  code: string;
  name: string;
  supplier: string;
  unit_price: number;
}

const OutsourcingMaster: React.FC = () => {
  const [outsourcing, setOutsourcing] = useState<Outsourcing[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '外注先',
    category: '',
    unit: '式',
    standard_price: 0,
    supplier_id: '',
  });

  const handleSave = () => {
    if (editingId) {
      setOutsourcing(outsourcing.map(o => o.id === editingId ? { ...o, ...formData, unit_price: formData.standard_price } : o));
    } else {
      setOutsourcing([...outsourcing, { id: Date.now().toString(), ...formData, unit_price: formData.standard_price, code: formData.code, name: formData.name, supplier: formData.supplier_id }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setOutsourcing(outsourcing.filter(o => o.id !== id));
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      type: '外注先',
      category: '',
      unit: '式',
      standard_price: 0,
      supplier_id: '',
    });
    setEditingId(null);
  };

  const filteredOutsourcing = outsourcing.filter(o =>
    o.code.includes(searchTerm) || o.name.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">外注マスタ</h1>
        <p className="text-gray-600 mt-2">外注情報を管理します</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="コード、名前で検索"
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
              <span>新規外注追加</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">コード</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">外注名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">外注先</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">単価</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOutsourcing.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.code}</td>
                  <td className="px-6 py-4 text-sm">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    ¥{item.unit_price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                    <button
                      onClick={() => {
                        setFormData({
                          code: item.code,
                          name: item.name,
                          type: '外注先',
                          category: '',
                          unit: '式',
                          standard_price: item.unit_price,
                          supplier_id: item.supplier,
                        });
                        setEditingId(item.id);
                        setShowModal(true);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
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
              {editingId ? '外注編集' : '新規外注追加'}
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="コード"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                disabled={!!editingId}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <input
                type="text"
                placeholder="外注名"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              >
                <option value="外注先">外注先</option>
                <option value="仕入先">仕入先</option>
              </select>
              <input
                type="number"
                placeholder="単価"
                value={formData.standard_price}
                onChange={(e) => setFormData({ ...formData, standard_price: parseFloat(e.target.value) })}
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

export default OutsourcingMaster;
