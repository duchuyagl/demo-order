import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Trash2 } from 'lucide-react';

const QuoteManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    title: '',
    validUntil: '',
    paymentMethod: '',
    notes: '',
    items: [{ product: '', quantity: 1, unitPrice: 0, amount: 0 }]
  });

  const quotes = [
    { 
      id: 'QT-001', 
      customer: '株式会社サンプル', 
      title: 'Webサイト制作',
      amount: '¥450,000', 
      status: '送付済み', 
      date: '2025-01-15',
      validUntil: '2025-02-15'
    },
    { 
      id: 'QT-002', 
      customer: '有限会社テスト', 
      title: 'システム開発',
      amount: '¥280,000', 
      status: '承認済み', 
      date: '2025-01-14',
      validUntil: '2025-02-14'
    },
    { 
      id: 'QT-003', 
      customer: '合同会社デモ', 
      title: 'コンサルティング',
      amount: '¥820,000', 
      status: '作成中', 
      date: '2025-01-13',
      validUntil: '2025-02-13'
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // 数量と単価が入力されている場合、金額を自動計算
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? Number(value) : updatedItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? Number(value) : updatedItems[index].unitPrice;
      updatedItems[index].amount = quantity * unitPrice;
    }
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, unitPrice: 0, amount: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: updatedItems
      }));
    }
  };

  const getTotalAmount = () => {
    return formData.items.reduce((total, item) => total + item.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで実際の見積作成処理を行う
    console.log('新規見積データ:', formData);
    
    // フォームをリセット
    setFormData({
      customer: '',
      title: '',
      validUntil: '',
      paymentMethod: '',
      notes: '',
      items: [{ product: '', quantity: 1, unitPrice: 0, amount: 0 }]
    });
    
    // モーダルを閉じる
    setShowModal(false);
    
    // 成功メッセージを表示（実際のシステムでは適切な通知システムを使用）
    alert('見積を作成しました');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">見積管理</h1>
          <p className="text-gray-600 mt-2">見積書の作成・管理を行います</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#051C2C] text-white px-6 py-3 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>新規見積作成</span>
        </button>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="見積番号・顧客名で検索"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent">
            <option value="">全てのステータス</option>
            <option value="draft">作成中</option>
            <option value="sent">送付済み</option>
            <option value="approved">承認済み</option>
            <option value="rejected">却下</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent">
            <option value="">期間選択</option>
            <option value="today">今日</option>
            <option value="week">今週</option>
            <option value="month">今月</option>
          </select>
        </div>
      </div>

      {/* 見積一覧テーブル */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  見積番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  顧客名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  件名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作成日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  有効期限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {quote.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {quote.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      quote.status === '承認済み' ? 'bg-green-100 text-green-800' :
                      quote.status === '送付済み' ? 'bg-blue-100 text-blue-800' :
                      quote.status === '作成中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.validUntil}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
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

      {/* 新規見積作成モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">新規見積作成</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    顧客選択
                  </label>
                  <select 
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="">顧客を選択</option>
                    <option value="1">株式会社サンプル</option>
                    <option value="2">有限会社テスト</option>
                    <option value="3">合同会社デモ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    有効期限
                  </label>
                  <input
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  件名
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  placeholder="見積件名を入力"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お支払方法
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                >
                  <option value="">お支払方法を選択</option>
                  <option value="bank_transfer">銀行振込</option>
                  <option value="cash">現金</option>
                  <option value="credit_card">クレジットカード</option>
                  <option value="check">小切手</option>
                  <option value="installment">分割払い</option>
                </select>
              </div>
              
              {/* 見積明細 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    見積明細
                  </label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>明細追加</span>
                  </button>
                </div>
                
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">商品・サービス</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">数量</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">単価</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">金額</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={item.product}
                              onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                              placeholder="商品名を入力"
                              required
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                              min="1"
                              required
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                              min="0"
                              required
                            />
                          </td>
                          <td className="px-4 py-2">
                            <span className="text-sm font-medium">¥{item.amount.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              disabled={formData.items.length === 1}
                              className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-2 text-right font-medium text-gray-700">
                          合計金額:
                        </td>
                        <td className="px-4 py-2 font-bold text-lg text-gray-900">
                          ¥{getTotalAmount().toLocaleString()}
                        </td>
                        <td className="px-4 py-2"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
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
              <button type="submit" className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                作成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteManagement;