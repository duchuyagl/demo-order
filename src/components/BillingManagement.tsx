import React, { useState } from 'react';
import { Plus, Search, Download, Mail, Eye, FileText } from 'lucide-react';

const BillingManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const invoices = [
    { 
      id: 'INV-001', 
      customer: '株式会社サンプル', 
      amount: '¥450,000', 
      status: '送付済み', 
      issueDate: '2025-01-15',
      dueDate: '2025-02-14',
      project: 'Webサイト制作'
    },
    { 
      id: 'INV-002', 
      customer: '有限会社テスト', 
      amount: '¥280,000', 
      status: '入金済み', 
      issueDate: '2025-01-10',
      dueDate: '2025-02-09',
      project: 'システム開発'
    },
    { 
      id: 'INV-003', 
      customer: '合同会社デモ', 
      amount: '¥820,000', 
      status: '未送付', 
      issueDate: '2025-01-08',
      dueDate: '2025-02-07',
      project: 'コンサルティング'
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">請求管理</h1>
          <p className="text-gray-600 mt-2">請求書の作成・送付・管理を行います</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#051C2C] text-white px-6 py-3 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>新規請求書作成</span>
        </button>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="請求書番号・顧客名で検索"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent">
            <option value="">全てのステータス</option>
            <option value="draft">未送付</option>
            <option value="sent">送付済み</option>
            <option value="paid">入金済み</option>
            <option value="overdue">期限超過</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent">
            <option value="">発行月</option>
            <option value="2025-01">2025年1月</option>
            <option value="2024-12">2024年12月</option>
            <option value="2024-11">2024年11月</option>
          </select>
          <button className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>一括ダウンロード</span>
          </button>
        </div>
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">今月発行額</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">¥1,550,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">入金済み</p>
            <p className="text-2xl font-bold text-green-600 mt-2">¥280,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">未入金</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">¥1,270,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">期限超過</p>
            <p className="text-2xl font-bold text-red-600 mt-2">¥0</p>
          </div>
        </div>
      </div>

      {/* 請求書一覧テーブル */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  請求書番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  顧客名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  案件名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  請求金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  発行日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  支払期限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === '入金済み' ? 'bg-green-100 text-green-800' :
                      invoice.status === '送付済み' ? 'bg-blue-100 text-blue-800' :
                      invoice.status === '未送付' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.issueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 新規請求書作成モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">新規請求書作成</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    受注番号選択
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]">
                    <option value="">受注を選択</option>
                    <option value="1">ORD-001 - 株式会社サンプル</option>
                    <option value="2">ORD-002 - 有限会社テスト</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    支払期限
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  請求項目
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  placeholder="請求項目を入力"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求金額（税抜）
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    消費税率（%）
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]">
                    <option value="10">10%</option>
                    <option value="8">8%</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-24"
                  placeholder="備考を入力"
                ></textarea>
              </div>
            </form>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                作成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingManagement;