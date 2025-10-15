import React from 'react';
import { Building2, Lock, User } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051C2C] via-[#0a2a3f] to-[#0f3852] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#051C2C] rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">受注管理システム</h1>
          <p className="text-gray-600 mt-2">ログインしてシステムをご利用ください</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ユーザーID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                defaultValue="admin"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent"
                placeholder="ユーザーIDを入力"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                defaultValue="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] focus:border-transparent"
                placeholder="パスワードを入力"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#051C2C] text-white py-3 px-4 rounded-lg hover:bg-[#0a2a3f] transition-colors font-medium"
          >
            ログイン
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            デモ用: admin / password でログインできます
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;