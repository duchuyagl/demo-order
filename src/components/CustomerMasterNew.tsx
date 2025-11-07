import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Customer {
  id: string;
  code: string;
  name: string;
  kana_name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

const CustomerMasterNew: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    kana_name: '',
    email: '',
    phone: '',
    postal_code: '',
    address: '',
    representative_name: '',
    payment_terms: '',
    status: '有効',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
    setCustomers(data || []);
  };

  const handleSave = async () => {
    if (editingId) {
      await supabase.from('customers').update(formData).eq('id', editingId);
    } else {
      await supabase.from('customers').insert([formData]);
    }
    fetchCustomers();
    setShowModal(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('customers').delete().eq('id', id);
    fetchCustomers();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      kana_name: '',
      email: '',
      phone: '',
      postal_code: '',
      address: '',
      representative_name: '',
      payment_terms: '',
      status: '有効',
    });
    setEditingId(null);
  };

  const filteredCustomers = customers.filter(c =>
    c.code.includes(searchTerm) || c.name.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">顧客マスタ</h1>
        <p className="text-gray-600 mt-2">顧客情報を管理します</p>
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
              <span>新規顧客追加</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">コード</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">顧客名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">カナ名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">メール</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">電話</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{customer.code}</td>
                  <td className="px-6 py-4 text-sm">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.kana_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                      customer.status === '有効' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                    <button
                      onClick={() => {
                        setFormData(customer as any);
                        setEditingId(customer.id);
                        setShowModal(true);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-900">
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
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingId ? '顧客編集' : '新規顧客追加'}
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="コード"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  disabled={!!editingId}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
                <input
                  type="text"
                  placeholder="顧客名"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>
              <input
                type="text"
                placeholder="カナ名"
                value={formData.kana_name}
                onChange={(e) => setFormData({ ...formData, kana_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="メール"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
                <input
                  type="tel"
                  placeholder="電話"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>
              <input
                type="text"
                placeholder="住所"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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

export default CustomerMasterNew;
