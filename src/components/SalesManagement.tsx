import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const SalesManagement: React.FC = () => {
  const monthlyData = [
    { month: '2024年10月', sales: 1800000, orders: 24 },
    { month: '2024年11月', sales: 2200000, orders: 28 },
    { month: '2024年12月', sales: 2650000, orders: 35 },
    { month: '2025年1月', sales: 2450000, orders: 32 },
  ];

  const topCustomers = [
    { customer: '株式会社サンプル', amount: 1250000, orders: 8 },
    { customer: '有限会社テスト', amount: 980000, orders: 6 },
    { customer: '合同会社デモ', amount: 820000, orders: 4 },
    { customer: '株式会社例示', amount: 650000, orders: 5 },
  ];

  const recentSales = [
    { date: '2025-01-15', customer: '株式会社サンプル', project: 'Webサイト制作', amount: 450000 },
    { date: '2025-01-14', customer: '有限会社テスト', project: 'システム開発', amount: 280000 },
    { date: '2025-01-13', customer: '合同会社デモ', project: 'コンサルティング', amount: 820000 },
    { date: '2025-01-12', customer: '株式会社例示', project: 'デザイン作成', amount: 320000 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">売上管理</h1>
        <p className="text-gray-600 mt-2">売上実績と分析を確認できます</p>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">今月の売上</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">¥2,450,000</p>
              <p className="text-sm text-green-600 font-medium mt-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +12.5%
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">今月の受注数</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">32件</p>
              <p className="text-sm text-blue-600 font-medium mt-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +15.3%
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">平均受注額</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">¥76,563</p>
              <p className="text-sm text-purple-600 font-medium mt-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +3.2%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">年間売上</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">¥28,500,000</p>
              <p className="text-sm text-orange-600 font-medium mt-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                +18.7%
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 月別売上 */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">月別売上推移</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{data.month}</p>
                    <p className="text-sm text-gray-600">{data.orders}件の受注</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">
                      ¥{data.sales.toLocaleString()}
                    </p>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#051C2C] h-2 rounded-full"
                        style={{ width: `${(data.sales / 3000000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 主要顧客 */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">主要顧客別売上</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{customer.customer}</p>
                    <p className="text-sm text-gray-600">{customer.orders}件の取引</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">
                      ¥{customer.amount.toLocaleString()}
                    </p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#051C2C] h-2 rounded-full"
                        style={{ width: `${(customer.amount / 1500000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 最近の売上 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">最近の売上実績</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日付
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  顧客名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  案件名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  売上金額
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.map((sale, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    ¥{sale.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesManagement;