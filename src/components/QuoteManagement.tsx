import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Trash2, X } from 'lucide-react';

interface QuoteItem {
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

interface QuoteFormData {
  quoteNo: string;
  issueDate: string;
  subject: string;
  customerId: string;
  customerName: string;
  customerContactName: string;
  validUntil: string;
  assignedStaff: string;
  paymentMethod: string;
  deliveryDate: string;
  deliveryMethod: string;
  items: QuoteItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  notes: string;
}

const QuoteManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    quoteNo: '',
    issueDate: new Date().toISOString().split('T')[0],
    subject: '',
    customerId: '',
    customerName: '',
    customerContactName: '',
    validUntil: '',
    assignedStaff: '',
    paymentMethod: '',
    deliveryDate: '',
    deliveryMethod: '',
    items: [{ itemName: '', description: '', quantity: 1, unit: '式', unitPrice: 0, amount: 0 }],
    subtotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 0,
    notes: ''
  });

  const quotes = [
    {
      id: 'QT-2025-001',
      customer: '株式会社サンプル',
      contact: '田中太郎',
      title: 'Webサイト制作',
      amount: 495000,
      status: '送付済み',
      date: '2025-01-15',
      validUntil: '2025-02-15',
      assignedStaff: '山田一郎'
    },
    {
      id: 'QT-2025-002',
      customer: '有限会社テスト',
      contact: '佐藤花子',
      title: 'システム開発',
      amount: 308000,
      status: '承認済み',
      date: '2025-01-14',
      validUntil: '2025-02-14',
      assignedStaff: '佐藤二郎'
    },
    {
      id: 'QT-2025-003',
      customer: '合同会社デモ',
      contact: '山田次郎',
      title: 'コンサルティング',
      amount: 902000,
      status: '作成中',
      date: '2025-01-13',
      validUntil: '2025-02-13',
      assignedStaff: '山田一郎'
    },
  ];

  const customers = [
    { id: '1', name: '株式会社サンプル', contact: '田中太郎' },
    { id: '2', name: '有限会社テスト', contact: '佐藤花子' },
    { id: '3', name: '合同会社デモ', contact: '山田次郎' },
  ];

  const staffMembers = [
    { id: '1', name: '山田一郎' },
    { id: '2', name: '佐藤二郎' },
    { id: '3', name: '鈴木三郎' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData(prev => ({
      ...prev,
      customerId,
      customerName: customer?.name || '',
      customerContactName: customer?.contact || ''
    }));
  };

  const handleItemChange = (index: number, field: keyof QuoteItem, value: string | number) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? Number(value) : updatedItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? Number(value) : updatedItems[index].unitPrice;
      updatedItems[index].amount = quantity * unitPrice;
    }

    setFormData(prev => {
      const newData = {
        ...prev,
        items: updatedItems
      };
      return calculateTotals(newData);
    });
  };

  const calculateTotals = (data: QuoteFormData): QuoteFormData => {
    const subtotal = data.items.reduce((total, item) => total + item.amount, 0);
    const taxAmount = Math.floor(subtotal * 0.1);
    const totalAmount = subtotal + taxAmount - data.discountAmount;

    return {
      ...data,
      subtotal,
      taxAmount,
      totalAmount
    };
  };

  const handleDiscountChange = (discount: number) => {
    setFormData(prev => calculateTotals({ ...prev, discountAmount: discount }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { itemName: '', description: '', quantity: 1, unit: '式', unitPrice: 0, amount: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => calculateTotals({
        ...prev,
        items: updatedItems
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('新規見積データ:', formData);

    setFormData({
      quoteNo: '',
      issueDate: new Date().toISOString().split('T')[0],
      subject: '',
      customerId: '',
      customerName: '',
      customerContactName: '',
      validUntil: '',
      assignedStaff: '',
      paymentMethod: '',
      deliveryDate: '',
      deliveryMethod: '',
      items: [{ itemName: '', description: '', quantity: 1, unit: '式', unitPrice: 0, amount: 0 }],
      subtotal: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 0,
      notes: ''
    });

    setShowModal(false);
    alert('見積を作成しました');
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                  見積No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  発行日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  件名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  顧客名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  担当者
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  見積金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  有効期限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
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
                    {quote.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.assignedStaff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ¥{quote.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.validUntil}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 w-full max-w-6xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">新規見積作成</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">基本情報</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      見積No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="quoteNo"
                      value={formData.quoteNo}
                      onChange={handleInputChange}
                      required
                      placeholder="QT-2025-001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      発行日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      有効期限 <span className="text-red-500">*</span>
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
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="見積件名を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">顧客情報</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      顧客名 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="customerId"
                      value={formData.customerId}
                      onChange={(e) => handleCustomerChange(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">顧客を選択</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      顧客担当者名
                    </label>
                    <input
                      type="text"
                      name="customerContactName"
                      value={formData.customerContactName}
                      onChange={handleInputChange}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      担当者名 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="assignedStaff"
                      value={formData.assignedStaff}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">担当者を選択</option>
                      {staffMembers.map(staff => (
                        <option key={staff.id} value={staff.name}>{staff.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">取引条件</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お支払方法 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">選択してください</option>
                      <option value="銀行振込">銀行振込</option>
                      <option value="現金">現金</option>
                      <option value="クレジットカード">クレジットカード</option>
                      <option value="小切手">小切手</option>
                      <option value="分割払い">分割払い</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      納期
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      納品方法
                    </label>
                    <input
                      type="text"
                      name="deliveryMethod"
                      value={formData.deliveryMethod}
                      onChange={handleInputChange}
                      placeholder="例: 電子納品、郵送など"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">見積明細</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>明細追加</span>
                  </button>
                </div>

                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">No.</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">項目名</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">内容詳細</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">数量</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">単位</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">単価</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">金額</th>
                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm text-gray-600">{index + 1}</td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={item.itemName}
                              onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                              placeholder="項目名"
                              required
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                              placeholder="詳細説明"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                              min="1"
                              required
                            />
                          </td>
                          <td className="px-3 py-2">
                            <select
                              value={item.unit}
                              onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                            >
                              <option value="式">式</option>
                              <option value="個">個</option>
                              <option value="台">台</option>
                              <option value="本">本</option>
                              <option value="枚">枚</option>
                              <option value="時間">時間</option>
                              <option value="日">日</option>
                              <option value="ヶ月">ヶ月</option>
                              <option value="年">年</option>
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                              className="w-28 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#051C2C]"
                              min="0"
                              required
                            />
                          </td>
                          <td className="px-3 py-2 text-sm font-medium text-right">
                            ¥{item.amount.toLocaleString()}
                          </td>
                          <td className="px-3 py-2 text-center">
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
                  </table>
                </div>

                <div className="mt-4 bg-white border border-gray-300 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">合計欄</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">小計</span>
                      <span className="text-sm font-medium">¥{formData.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">消費税 (10%)</span>
                      <span className="text-sm font-medium">¥{formData.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">値引き・割引額</span>
                      <input
                        type="number"
                        value={formData.discountAmount}
                        onChange={(e) => handleDiscountChange(Number(e.target.value))}
                        className="w-32 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:ring-1 focus:ring-[#051C2C]"
                        min="0"
                      />
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">合計金額（税込）</span>
                      <span className="text-xl font-bold text-[#051C2C]">¥{formData.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">備考</h3>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-24"
                  placeholder="その他特記事項があれば入力してください"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-300">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button type="submit" className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                  見積作成
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteManagement;