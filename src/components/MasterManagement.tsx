import React, { useState } from 'react';
import { Users, Package, Settings, Plus, Edit, Trash2, Building2, UserCircle, Shield, Monitor, MapPin, Truck, ShoppingCart, Factory, TrendingDown, Receipt, X } from 'lucide-react';

interface MasterManagementProps {
  currentMaster: string;
}

const MasterManagement: React.FC<MasterManagementProps> = ({ currentMaster }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedCost, setSelectedCost] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedScreen, setSelectedScreen] = useState<any>(null);

  const accounts = [
    {
      id: 'ACC-001',
      username: '田中太郎',
      email: 'tanaka@company.co.jp',
      role: '管理者',
      status: 'active',
      lastLogin: '2025-10-20 09:15',
      passwordUpdatedAt: '2025-09-15 14:30',
      createdAt: '2025-01-10',
      updatedAt: '2025-10-19',
      remarks: '経営企画部所属'
    },
    {
      id: 'ACC-002',
      username: '佐藤花子',
      email: 'sato@company.co.jp',
      role: 'マネージャー',
      status: 'active',
      lastLogin: '2025-10-19 18:45',
      passwordUpdatedAt: '2025-08-20 10:00',
      createdAt: '2025-02-15',
      updatedAt: '2025-10-18',
      remarks: '営業部マネージャー'
    },
    {
      id: 'ACC-003',
      username: '山田次郎',
      email: 'yamada@company.co.jp',
      role: 'スタッフ',
      status: 'inactive',
      lastLogin: '2025-09-30 16:20',
      passwordUpdatedAt: '2025-07-10 09:45',
      createdAt: '2025-03-01',
      updatedAt: '2025-09-30',
      remarks: '休職中'
    },
  ];

  const screens = [
    {
      id: 'SCRN-001',
      code: 'DASHBOARD',
      name: 'ダッシュボード',
      group: 'メイン',
      path: '/dashboard',
      isActive: true,
      remarks: 'トップページ'
    },
    {
      id: 'SCRN-002',
      code: 'SALES',
      name: '売上管理',
      group: '営業管理',
      path: '/sales',
      isActive: true,
      remarks: '売上データの管理画面'
    },
    {
      id: 'SCRN-003',
      code: 'QUOTE',
      name: '見積管理',
      group: '営業管理',
      path: '/quote',
      isActive: true,
      remarks: '見積作成と管理'
    },
    {
      id: 'SCRN-004',
      code: 'ORDER',
      name: '受注管理',
      group: '営業管理',
      path: '/order',
      isActive: true,
      remarks: '受注データの管理'
    },
    {
      id: 'SCRN-005',
      code: 'BILLING',
      name: '請求管理',
      group: '経理管理',
      path: '/billing',
      isActive: true,
      remarks: '請求書の発行と管理'
    },
    {
      id: 'SCRN-006',
      code: 'MASTER_CUSTOMER',
      name: '顧客マスタ',
      group: 'マスタ管理',
      path: '/master/customer',
      isActive: true,
      remarks: '顧客情報の管理'
    },
    {
      id: 'SCRN-007',
      code: 'MASTER_PRODUCT',
      name: '商品マスタ',
      group: 'マスタ管理',
      path: '/master/product',
      isActive: true,
      remarks: '商品情報の管理'
    },
    {
      id: 'SCRN-008',
      code: 'MASTER_STAFF',
      name: '社員マスタ',
      group: 'マスタ管理',
      path: '/master/staff',
      isActive: true,
      remarks: '社員情報の管理'
    },
    {
      id: 'SCRN-009',
      code: 'SETTINGS',
      name: '設定',
      group: 'システム',
      path: '/settings',
      isActive: true,
      remarks: 'システム設定画面'
    },
  ];

  const departments = [
    {
      id: 'DEPT-001',
      name: '経営企画部',
      code: 'MGT',
      parentDepartment: null,
      manager: '田中太郎',
      memberCount: 8,
      description: '経営戦略の立案と実行を担当',
      createdAt: '2025-01-05',
      updatedAt: '2025-10-15'
    },
    {
      id: 'DEPT-002',
      name: '営業部',
      code: 'SALES',
      parentDepartment: null,
      manager: '佐藤花子',
      memberCount: 25,
      description: '顧客対応と売上管理を担当',
      createdAt: '2025-01-05',
      updatedAt: '2025-10-18'
    },
    {
      id: 'DEPT-003',
      name: '開発部',
      code: 'DEV',
      parentDepartment: null,
      manager: '鈴木一郎',
      memberCount: 35,
      description: 'システム開発とメンテナンスを担当',
      createdAt: '2025-01-05',
      updatedAt: '2025-10-20'
    },
    {
      id: 'DEPT-004',
      name: '人事総務部',
      code: 'HR',
      parentDepartment: null,
      manager: '高橋美咲',
      memberCount: 12,
      description: '人事管理と総務業務を担当',
      createdAt: '2025-01-05',
      updatedAt: '2025-10-10'
    },
    {
      id: 'DEPT-005',
      name: '経理部',
      code: 'ACC',
      parentDepartment: null,
      manager: '伊藤健太',
      memberCount: 10,
      description: '財務・経理業務を担当',
      createdAt: '2025-01-05',
      updatedAt: '2025-10-12'
    },
  ];

  const getMasterConfig = () => {
    switch (currentMaster) {
      case 'master-account':
        return { title: 'アカウントマスタ', icon: UserCircle, description: 'システムアカウントを管理します' };
      case 'master-staff':
        return { title: 'スタッフマスタ', icon: Users, description: 'スタッフ情報を管理します' };
      case 'master-department':
        return { title: '部署マスタ', icon: Building2, description: '部署情報を管理します' };
      case 'master-role':
        return { title: 'ロールマスタ', icon: Shield, description: 'ユーザーロールを管理します' };
      case 'master-permission':
        return { title: '権限マスタ', icon: Shield, description: 'システム権限を管理します' };
      case 'master-screen':
        return { title: '画面マスタ', icon: Monitor, description: '画面情報を管理します' };
      case 'master-customer':
        return { title: '顧客マスタ', icon: Users, description: '顧客情報を管理します' };
      case 'master-billing':
        return { title: '請求先マスタ', icon: Receipt, description: '請求先情報を管理します' };
      case 'master-shipping':
        return { title: '配送先マスタ', icon: Truck, description: '配送先情報を管理します' };
      case 'master-product':
        return { title: '商品マスタ', icon: Package, description: '商品情報を管理します' };
      case 'master-supplier':
        return { title: '仕入先マスタ', icon: Factory, description: '仕入先情報を管理します' };
      case 'master-cost':
        return { title: '原価マスタ', icon: TrendingDown, description: '原価情報を管理します' };
      default:
        return { title: 'マスタ管理', icon: Settings, description: 'マスタを選択してください' };
    }
  };

  const masterConfig = getMasterConfig();
  const MasterIcon = masterConfig.icon;

  const customers = [
    {
      id: 'CUST-001',
      registrationDate: '2025-01-15',
      companyName: '株式会社サンプル',
      companyNameKana: 'カブシキガイシャサンプル',
      postalCode: '150-0001',
      address: '東京都渋谷区神宮前1-2-3',
      contactPerson: '田中太郎',
      department: '営業部',
      phone: '03-1234-5678',
      email: 'tanaka@sample.co.jp',
      remarks: '優良顧客'
    },
    {
      id: 'CUST-002',
      registrationDate: '2025-02-20',
      companyName: '有限会社テスト',
      companyNameKana: 'ユウゲンガイシャテスト',
      postalCode: '160-0022',
      address: '東京都新宿区新宿2-5-10',
      contactPerson: '佐藤花子',
      department: '総務部',
      phone: '03-2345-6789',
      email: 'sato@test.co.jp',
      remarks: '定期取引先'
    },
    {
      id: 'CUST-003',
      registrationDate: '2025-03-10',
      companyName: '合同会社デモ',
      companyNameKana: 'ゴウドウガイシャデモ',
      postalCode: '105-0004',
      address: '東京都港区新橋3-8-5',
      contactPerson: '山田次郎',
      department: '企画部',
      phone: '03-3456-7890',
      email: 'yamada@demo.co.jp',
      remarks: '新規顧客'
    },
  ];

  const products = [
    {
      id: 'PROD-001',
      code: 'WEB-001',
      name: 'Webサイト制作',
      nameKana: 'ウェブサイトセイサク',
      category: 'Web開発',
      brand: '自社ブランド',
      specification: 'スタンダードプラン',
      unit: '式',
      image: '',
      description: '企業向けWebサイト制作サービス。レスポンシブデザイン対応。',
      productType: 'サービス',
      isActive: true,
      remarks: ''
    },
    {
      id: 'PROD-002',
      code: 'SYS-001',
      name: 'システム開発',
      nameKana: 'システムカイハツ',
      category: 'システム開発',
      brand: '自社ブランド',
      specification: 'カスタム開発',
      unit: '式',
      image: '',
      description: '業務システム開発サービス。要件定義からリリースまで対応。',
      productType: 'サービス',
      isActive: true,
      remarks: ''
    },
    {
      id: 'PROD-003',
      code: 'CON-001',
      name: 'コンサルティング',
      nameKana: 'コンサルティング',
      category: 'コンサルティング',
      brand: '自社ブランド',
      specification: '時間単位',
      unit: '時間',
      image: '',
      description: 'IT戦略コンサルティングサービス。経営課題の解決を支援。',
      productType: 'サービス',
      isActive: true,
      remarks: ''
    },
    {
      id: 'PROD-004',
      code: 'APP-001',
      name: 'アプリ開発',
      nameKana: 'アプリカイハツ',
      category: 'アプリ開発',
      brand: '自社ブランド',
      specification: 'iOS/Android対応',
      unit: '式',
      image: '',
      description: 'モバイルアプリ開発サービス。iOS/Android両対応。',
      productType: 'サービス',
      isActive: true,
      remarks: ''
    },
  ];

  const users = [
    { id: 1, name: '管理者', email: 'admin@company.co.jp', role: '管理者', department: '経営陣' },
    { id: 2, name: '田中一郎', email: 'tanaka@company.co.jp', role: '営業', department: '営業部' },
    { id: 3, name: '佐藤二郎', email: 'sato@company.co.jp', role: '開発', department: '開発部' },
  ];

  const staff = [
    {
      id: 'STAFF-001',
      lastName: '田中',
      firstName: '太郎',
      lastNameKana: 'タナカ',
      firstNameKana: 'タロウ',
      department: '経営企画部',
      position: '部長',
      hireDate: '2020-04-01',
      birthDate: '1985-03-15',
      gender: '男性',
      email: 'tanaka.taro@company.co.jp',
      phone: '090-1234-5678',
      resignationDate: null,
      remarks: '経営企画部の責任者'
    },
    {
      id: 'STAFF-002',
      lastName: '佐藤',
      firstName: '花子',
      lastNameKana: 'サトウ',
      firstNameKana: 'ハナコ',
      department: '営業部',
      position: '課長',
      hireDate: '2018-04-01',
      birthDate: '1988-07-22',
      gender: '女性',
      email: 'sato.hanako@company.co.jp',
      phone: '090-2345-6789',
      resignationDate: null,
      remarks: '営業部のマネージャー'
    },
    {
      id: 'STAFF-003',
      lastName: '鈴木',
      firstName: '一郎',
      lastNameKana: 'スズキ',
      firstNameKana: 'イチロウ',
      department: '開発部',
      position: '部長',
      hireDate: '2015-04-01',
      birthDate: '1982-11-08',
      gender: '男性',
      email: 'suzuki.ichiro@company.co.jp',
      phone: '090-3456-7890',
      resignationDate: null,
      remarks: '開発部の責任者、技術リーダー'
    },
    {
      id: 'STAFF-004',
      lastName: '高橋',
      firstName: '美咲',
      lastNameKana: 'タカハシ',
      firstNameKana: 'ミサキ',
      department: '人事総務部',
      position: '課長',
      hireDate: '2019-04-01',
      birthDate: '1990-05-12',
      gender: '女性',
      email: 'takahashi.misaki@company.co.jp',
      phone: '090-4567-8901',
      resignationDate: null,
      remarks: '人事採用担当'
    },
    {
      id: 'STAFF-005',
      lastName: '伊藤',
      firstName: '健太',
      lastNameKana: 'イトウ',
      firstNameKana: 'ケンタ',
      department: '経理部',
      position: '主任',
      hireDate: '2021-04-01',
      birthDate: '1992-09-30',
      gender: '男性',
      email: 'ito.kenta@company.co.jp',
      phone: '090-5678-9012',
      resignationDate: null,
      remarks: '財務分析担当'
    },
  ];

  const billingAddresses = [
    {
      id: 'BILL-001',
      registrationDate: '2025-01-15',
      companyName: '株式会社サンプル',
      requestName: '田中太郎',
      requestNameKana: 'タナカタロウ',
      postalCode: '150-0001',
      address: '東京都渋谷区神宮前1-2-3',
      requestRecipientName: '経理部 田中太郎',
      department: '経理部',
      phone: '03-1234-5678',
      email: 'tanaka@sample.co.jp',
      paymentMethod: '銀行振込',
      paymentMonth: '当月',
      paymentDay: 31,
      requestSendMethod: '郵送',
      invoiceNumber: 'INV-2025-001',
      remarks: '月末締め翌月末払い'
    },
    {
      id: 'BILL-002',
      registrationDate: '2025-02-20',
      companyName: '有限会社テスト',
      requestName: '佐藤花子',
      requestNameKana: 'サトウハナコ',
      postalCode: '160-0022',
      address: '東京都新宿区新宿2-5-10',
      requestRecipientName: '総務部 佐藤花子',
      department: '総務部',
      phone: '03-2345-6789',
      email: 'sato@test.co.jp',
      paymentMethod: 'クレジットカード',
      paymentMonth: '翌月',
      paymentDay: 10,
      requestSendMethod: 'メール',
      invoiceNumber: 'INV-2025-002',
      remarks: 'クレジットカード決済'
    },
    {
      id: 'BILL-003',
      registrationDate: '2025-03-10',
      companyName: '合同会社デモ',
      requestName: '山田次郎',
      requestNameKana: 'ヤマダジロウ',
      postalCode: '105-0004',
      address: '東京都港区新橋3-8-5',
      requestRecipientName: '企画部 山田次郎',
      department: '企画部',
      phone: '03-3456-7890',
      email: 'yamada@demo.co.jp',
      paymentMethod: '現金',
      paymentMonth: '当月',
      paymentDay: 15,
      requestSendMethod: 'システム連携',
      invoiceNumber: 'INV-2025-003',
      remarks: '毎月15日締め当月末払い'
    },
  ];

  const permissions = [
    { id: 'PERM-001', name: '見積作成', code: 'QUOTE_CREATE', screen: 'SCRN-003', description: '見積を新規作成する権限' },
    { id: 'PERM-002', name: '見積閲覧', code: 'QUOTE_VIEW', screen: 'SCRN-003', description: '見積を閲覧する権限' },
    { id: 'PERM-003', name: '見積編集', code: 'QUOTE_EDIT', screen: 'SCRN-003', description: '見積を編集する権限' },
    { id: 'PERM-004', name: '見積削除', code: 'QUOTE_DELETE', screen: 'SCRN-003', description: '見積を削除する権限' },
    { id: 'PERM-005', name: '受注作成', code: 'ORDER_CREATE', screen: 'SCRN-004', description: '受注を新規作成する権限' },
    { id: 'PERM-006', name: '受注閲覧', code: 'ORDER_VIEW', screen: 'SCRN-004', description: '受注を閲覧する権限' },
    { id: 'PERM-007', name: '受注編集', code: 'ORDER_EDIT', screen: 'SCRN-004', description: '受注を編集する権限' },
    { id: 'PERM-008', name: '受注削除', code: 'ORDER_DELETE', screen: 'SCRN-004', description: '受注を削除する権限' },
    { id: 'PERM-009', name: '売上作成', code: 'SALES_CREATE', screen: 'SCRN-002', description: '売上を新規作成する権限' },
    { id: 'PERM-010', name: '売上閲覧', code: 'SALES_VIEW', screen: 'SCRN-002', description: '売上を閲覧する権限' },
    { id: 'PERM-011', name: '売上編集', code: 'SALES_EDIT', screen: 'SCRN-002', description: '売上を編集する権限' },
    { id: 'PERM-012', name: '売上削除', code: 'SALES_DELETE', screen: 'SCRN-002', description: '売上を削除する権限' },
    { id: 'PERM-013', name: '請求作成', code: 'BILLING_CREATE', screen: 'SCRN-005', description: '請求を新規作成する権限' },
    { id: 'PERM-014', name: '請求閲覧', code: 'BILLING_VIEW', screen: 'SCRN-005', description: '請求を閲覧する権限' },
    { id: 'PERM-015', name: '請求編集', code: 'BILLING_EDIT', screen: 'SCRN-005', description: '請求を編集する権限' },
    { id: 'PERM-016', name: '請求削除', code: 'BILLING_DELETE', screen: 'SCRN-005', description: '請求を削除する権限' },
    { id: 'PERM-017', name: 'アカウントマスタ管理', code: 'MASTER_ACCOUNT', screen: 'SCRN-006', description: 'アカウントマスタの管理権限' },
    { id: 'PERM-018', name: 'スタッフマスタ管理', code: 'MASTER_STAFF', screen: 'SCRN-008', description: 'スタッフマスタの管理権限' },
    { id: 'PERM-019', name: '顧客マスタ管理', code: 'MASTER_CUSTOMER', screen: 'SCRN-006', description: '顧客マスタの管理権限' },
    { id: 'PERM-020', name: '請求先マスタ管理', code: 'MASTER_BILLING', screen: 'SCRN-005', description: '請求先マスタの管理権限' },
    { id: 'PERM-021', name: '部署マスタ管理', code: 'MASTER_DEPARTMENT', screen: 'SCRN-008', description: '部署マスタの管理権限' },
    { id: 'PERM-022', name: 'ロールマスタ管理', code: 'MASTER_ROLE', screen: 'SCRN-008', description: 'ロールマスタの管理権限' },
    { id: 'PERM-023', name: '権限マスタ管理', code: 'MASTER_PERMISSION', screen: 'SCRN-009', description: '権限マスタの管理権限' },
  ];

  const roles = [
    {
      id: 'ROLE-001',
      name: 'システム管理者',
      code: 'SYSTEM_ADMIN',
      permissions: ['PERM-001', 'PERM-002', 'PERM-003', 'PERM-004', 'PERM-005', 'PERM-006', 'PERM-007', 'PERM-008', 'PERM-009', 'PERM-010', 'PERM-011', 'PERM-012', 'PERM-013', 'PERM-014', 'PERM-015', 'PERM-016', 'PERM-017', 'PERM-018', 'PERM-019', 'PERM-020', 'PERM-021', 'PERM-022', 'PERM-023'],
      description: 'システム全体の管理権限を持つ'
    },
    {
      id: 'ROLE-002',
      name: '営業マネージャー',
      code: 'SALES_MANAGER',
      permissions: ['PERM-001', 'PERM-002', 'PERM-003', 'PERM-004', 'PERM-005', 'PERM-006', 'PERM-007', 'PERM-008', 'PERM-009', 'PERM-010', 'PERM-011', 'PERM-012', 'PERM-014', 'PERM-019'],
      description: '営業活動全般と請求閲覧の管理権限を持つ'
    },
    {
      id: 'ROLE-003',
      name: '営業担当',
      code: 'SALES_STAFF',
      permissions: ['PERM-001', 'PERM-002', 'PERM-005', 'PERM-006', 'PERM-014', 'PERM-019'],
      description: '見積と受注の作成・閲覧権限を持つ'
    },
    {
      id: 'ROLE-004',
      name: '経理担当',
      code: 'ACCOUNTING',
      permissions: ['PERM-002', 'PERM-006', 'PERM-010', 'PERM-013', 'PERM-014', 'PERM-015', 'PERM-016', 'PERM-020'],
      description: '請求と売上の管理権限を持つ'
    },
    {
      id: 'ROLE-005',
      name: '閲覧者',
      code: 'VIEWER',
      permissions: ['PERM-002', 'PERM-006', 'PERM-010', 'PERM-014'],
      description: '各種情報の閲覧権限のみ持つ'
    },
  ];

  const suppliers = [
    {
      id: 'SUP-001',
      name: '株式会社山田商事',
      representative: '山田太郎',
      contactPerson: '鈴木一郎',
      phone: '03-1234-5678',
      email: 'suzuki@yamada-shoji.co.jp',
      postalCode: '100-0001',
      address: '東京都千代田区千代田1-1-1',
      remarks: '長期取引先'
    },
    {
      id: 'SUP-002',
      name: '田中工業株式会社',
      representative: '田中花子',
      contactPerson: '佐藤次郎',
      phone: '06-9876-5432',
      email: 'sato@tanaka-kogyo.co.jp',
      postalCode: '530-0001',
      address: '大阪府大阪市北区梅田1-2-3',
      remarks: '品質重視のパートナー'
    },
    {
      id: 'SUP-003',
      name: '伊藤物産株式会社',
      representative: '伊藤三郎',
      contactPerson: '高橋美咲',
      phone: '052-1111-2222',
      email: 'takahashi@ito-bussan.co.jp',
      postalCode: '460-0001',
      address: '愛知県名古屋市中区栄2-3-4',
      remarks: ''
    },
  ];

  const costs = [
    {
      id: 'COST-001',
      productName: 'Webサイト制作',
      supplierName: '株式会社山田商事',
      purchaseCost: 200000,
      standardCost: 250000,
      unit: '式',
      effectiveDate: '2025-01-01',
      effectiveStartDate: '2025-01-01',
      effectiveEndDate: '2025-12-31',
      remarks: '年間契約の標準単価'
    },
    {
      id: 'COST-002',
      productName: 'システム開発',
      supplierName: '田中工業株式会社',
      purchaseCost: 350000,
      standardCost: 400000,
      unit: '式',
      effectiveDate: '2025-02-01',
      effectiveStartDate: '2025-02-01',
      effectiveEndDate: '2025-12-31',
      remarks: '大規模プロジェクト用'
    },
    {
      id: 'COST-003',
      productName: 'コンサルティング',
      supplierName: '伊藤物産株式会社',
      purchaseCost: 35000,
      standardCost: 40000,
      unit: '時間',
      effectiveDate: '2025-01-15',
      effectiveStartDate: '2025-01-15',
      effectiveEndDate: '2025-06-30',
      remarks: '専門コンサルタント単価'
    },
  ];

  const renderMasterContent = () => {
    if (currentMaster === 'master') {
      return (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">マスタを選択してください</h2>
          <p className="text-gray-600">左のメニューから管理したいマスタを選択してください</p>
        </div>
      );
    }

    if (currentMaster === 'master-account') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    アカウントID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ユーザー名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    メールアドレス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ロール
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最終ログイン
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {account.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        account.role === '管理者' ? 'bg-red-100 text-red-800' :
                        account.role === 'マネージャー' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {account.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {account.status === 'active' ? '有効' : '無効'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedAccount(account);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
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
      );
    }

    if (currentMaster === 'master-staff') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    スタッフID
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
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {s.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.lastName} {s.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedStaff(s);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
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
      );
    }

    if (currentMaster === 'master-customer') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    顧客ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    会社名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    顧客担当者
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    電話番号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    メールアドレス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {c.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {c.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {c.contactPerson}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {c.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {c.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedCustomer(c);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
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
      );
    }

    if (currentMaster === 'master-billing') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    請求先ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    会社名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    請求先名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    電話番号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支払方法
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billingAddresses.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {b.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {b.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {b.requestName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {b.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {b.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBillingAddress(b);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
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
      );
    }

    if (currentMaster === 'master-department') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    部署名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    部署コード
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    責任者
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    従業員数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dept.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.manager}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.memberCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
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
      );
    }

    if (currentMaster === 'master-permission') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    権限名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    権限コード
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    権限カテゴリー
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
                {permissions.map((perm) => {
                  const screen = screens.find(s => s.id === perm.screen);
                  return (
                    <tr key={perm.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {perm.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {perm.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {screen?.name || '未設定'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {perm.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (currentMaster === 'master-role') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ロール名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ロールコード
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    権限
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
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {role.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {role.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permId) => {
                          const perm = permissions.find(p => p.id === permId);
                          const screen = perm ? screens.find(s => s.id === perm.screen) : null;
                          return perm ? (
                            <span key={permId} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {perm.name} ({screen?.category})
                            </span>
                          ) : null;
                        })}
                        {role.permissions.length > 3 && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            +{role.permissions.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {role.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedRole(role);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
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
      );
    }

    if (currentMaster === 'master-supplier') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">仕入先名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当者</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setShowDetailModal(true);
                        }}
                        className="text-sm font-medium text-[#051C2C] hover:underline text-left"
                      >
                        {supplier.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{supplier.contactPerson}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{supplier.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{supplier.email}</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="text-[#051C2C] hover:text-[#0a2a3f]">
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
      );
    }

    if (currentMaster === 'master-cost') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">仕入先名</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">仕入原価</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">標準原価</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">単位</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">有効日</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {costs.map((cost) => (
                  <tr key={cost.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedCost(cost);
                          setShowDetailModal(true);
                        }}
                        className="text-sm font-medium text-[#051C2C] hover:underline text-left"
                      >
                        {cost.productName}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cost.supplierName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">¥{cost.purchaseCost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">¥{cost.standardCost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{cost.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">
                      {cost.effectiveStartDate} 〜 {cost.effectiveEndDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="text-[#051C2C] hover:text-[#0a2a3f]">
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
      );
    }

    if (currentMaster === 'master-product') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品コード</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品カテゴリ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ブランド</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">単位</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">商品種別</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">有効</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{product.code}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowDetailModal(true);
                        }}
                        className="text-sm font-medium text-[#051C2C] hover:underline text-left"
                      >
                        {product.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.brand}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{product.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{product.productType}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {product.isActive ? '有効' : '無効'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="text-[#051C2C] hover:text-[#0a2a3f]">
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
      );
    }

    if (currentMaster === 'master-screen') {
      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規追加</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">画面コード</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">画面名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">画面グループ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">画面パス</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">有効</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {screens.map((screen) => (
                  <tr key={screen.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{screen.code}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedScreen(screen);
                          setShowDetailModal(true);
                        }}
                        className="text-sm font-medium text-[#051C2C] hover:underline text-left"
                      >
                        {screen.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{screen.group}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{screen.path}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${screen.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {screen.isActive ? '有効' : '無効'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="text-[#051C2C] hover:text-[#0a2a3f]">
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
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{masterConfig.title}</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#051C2C] text-white px-4 py-2 rounded-lg hover:bg-[#0a2a3f] transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>新規追加</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500 py-12">
            <MasterIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>データがありません</p>
            <p className="text-sm mt-2">新規追加ボタンから登録してください</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <MasterIcon className="w-8 h-8 text-[#051C2C]" />
          <h1 className="text-3xl font-bold text-gray-800">{masterConfig.title}</h1>
        </div>
        <p className="text-gray-600">{masterConfig.description}</p>
      </div>

      {renderMasterContent()}

      {showDetailModal && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">アカウント詳細</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    アカウントID
                  </label>
                  <input
                    type="text"
                    value={selectedAccount.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ユーザー名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedAccount.username}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={selectedAccount.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ロール <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedAccount.role}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="管理者">管理者</option>
                    <option value="マネージャー">マネージャー</option>
                    <option value="スタッフ">スタッフ</option>
                    <option value="閲覧者">閲覧者</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス
                  </label>
                  <select
                    value={selectedAccount.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="active">有効</option>
                    <option value="inactive">無効</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最終ログイン日
                  </label>
                  <input
                    type="text"
                    value={selectedAccount.lastLogin}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    パスワード最終更新日時
                  </label>
                  <input
                    type="text"
                    value={selectedAccount.passwordUpdatedAt}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    登録日
                  </label>
                  <input
                    type="text"
                    value={selectedAccount.createdAt}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    更新日
                  </label>
                  <input
                    type="text"
                    value={selectedAccount.updatedAt}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedAccount.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedCustomer && currentMaster === 'master-customer' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">顧客詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedCustomer(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    顧客ID
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    登録日
                  </label>
                  <input
                    type="date"
                    value={selectedCustomer.registrationDate}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会社名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.companyName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会社名 カナ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.companyNameKana}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  郵便番号
                </label>
                <input
                  type="text"
                  value={selectedCustomer.postalCode}
                  placeholder="000-0000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  住所
                </label>
                <input
                  type="text"
                  value={selectedCustomer.address}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    顧客担当者
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.contactPerson}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    部署名
                  </label>
                  <input
                    type="text"
                    value={selectedCustomer.department}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  value={selectedCustomer.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  value={selectedCustomer.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedCustomer.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedCustomer(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedBillingAddress && currentMaster === 'master-billing' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">請求先詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedBillingAddress(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先ID
                  </label>
                  <input
                    type="text"
                    value={selectedBillingAddress.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    登録日
                  </label>
                  <input
                    type="date"
                    value={selectedBillingAddress.registrationDate}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  会社名 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedBillingAddress.companyName}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                >
                  <option value="">顧客を選択</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.companyName}>
                      {customer.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedBillingAddress.requestName}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先名 カナ
                  </label>
                  <input
                    type="text"
                    value={selectedBillingAddress.requestNameKana}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  郵便番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedBillingAddress.postalCode}
                  required
                  placeholder="000-0000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  住所 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedBillingAddress.address}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請求先担当者名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedBillingAddress.requestRecipientName}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    部署名
                  </label>
                  <input
                    type="text"
                    value={selectedBillingAddress.department}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={selectedBillingAddress.phone}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={selectedBillingAddress.email}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お支払方法 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedBillingAddress.paymentMethod}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                >
                  <option value="">支払方法を選択</option>
                  <option value="銀行振込">銀行振込</option>
                  <option value="現金">現金</option>
                  <option value="クレジットカード">クレジットカード</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    支払月 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedBillingAddress.paymentMonth}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="">支払月を選択</option>
                    <option value="当月">当月</option>
                    <option value="翌月">翌月</option>
                    <option value="翌々月">翌々月</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    支払日 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedBillingAddress.paymentDay}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="">支払日を選択</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}日
                      </option>
                    ))}
                    <option value="月末">月末</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  請求書送付方法 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedBillingAddress.requestSendMethod}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                >
                  <option value="">送付方法を選択</option>
                  <option value="郵送">郵送</option>
                  <option value="メール">メール</option>
                  <option value="システム連携">システム連携</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  インボイス番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedBillingAddress.invoiceNumber}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedBillingAddress.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedBillingAddress(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedRole && currentMaster === 'master-role' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">ロール詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedRole(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ロールID
                  </label>
                  <input
                    type="text"
                    value={selectedRole.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ロール名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedRole.name}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ロールコード <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedRole.code}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  権限 <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {screens.map((screen) => {
                      const screenPerms = permissions.filter(p => p.screen === screen.id);
                      if (screenPerms.length === 0) return null;
                      return (
                        <div key={screen.id} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="font-medium text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                            {screen.name}
                          </div>
                          <div className="space-y-2">
                            {screenPerms.map((perm) => (
                              <label key={perm.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedRole.permissions.includes(perm.id)}
                                  className="mt-0.5 h-4 w-4 text-[#051C2C] focus:ring-[#051C2C] border-gray-300 rounded"
                                />
                                <div className="flex-1">
                                  <div className="text-sm text-gray-900">{perm.name}</div>
                                  <div className="text-xs text-gray-500">{perm.code}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  value={selectedRole.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedRole(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedStaff && currentMaster === 'master-staff' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">スタッフ詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedStaff(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    スタッフID
                  </label>
                  <input
                    type="text"
                    value={selectedStaff.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    氏名（姓） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedStaff.lastName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    氏名（名） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedStaff.firstName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    氏名（セイ） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedStaff.lastNameKana}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    氏名（メイ） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedStaff.firstNameKana}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    部署 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedStaff.department}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    役職
                  </label>
                  <input
                    type="text"
                    value={selectedStaff.position}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    入社日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedStaff.hireDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    生年月日
                  </label>
                  <input
                    type="date"
                    value={selectedStaff.birthDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    性別
                  </label>
                  <select
                    value={selectedStaff.gender}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={selectedStaff.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={selectedStaff.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  退職日
                </label>
                <input
                  type="date"
                  value={selectedStaff.resignationDate || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedStaff.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedStaff(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedSupplier && currentMaster === 'master-supplier' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{masterConfig.title} - 詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedSupplier(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    仕入先ID
                  </label>
                  <input
                    type="text"
                    value={selectedSupplier.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    仕入先名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedSupplier.name}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    代表者 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedSupplier.representative}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    担当者 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedSupplier.contactPerson}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={selectedSupplier.phone}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={selectedSupplier.email}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    郵便番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedSupplier.postalCode}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    住所 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedSupplier.address}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedSupplier.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedSupplier(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedCost && currentMaster === 'master-cost' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{masterConfig.title} - 詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedCost(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    原価ID
                  </label>
                  <input
                    type="text"
                    value={selectedCost.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedCost.productName}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    仕入先名 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCost.supplierName}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="">仕入先を選択</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.name}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    単位 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedCost.unit}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    仕入原価 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={selectedCost.purchaseCost}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    標準原価 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={selectedCost.standardCost}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    有効開始日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedCost.effectiveStartDate}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    有効終了日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedCost.effectiveEndDate}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedCost.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedCost(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedProduct && currentMaster === 'master-product' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{masterConfig.title} - 詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品ID
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品コード <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.code}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品名（カナ） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.nameKana}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品カテゴリ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.category}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ブランド <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.brand}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    規格 / 型番
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.specification}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    単位 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.unit}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedProduct.productType}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  >
                    <option value="">種別を選択</option>
                    <option value="サービス">サービス</option>
                    <option value="商品">商品</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2 pt-8">
                    <input
                      type="checkbox"
                      checked={selectedProduct.isActive}
                      className="w-4 h-4 text-[#051C2C] border-gray-300 rounded focus:ring-[#051C2C]"
                    />
                    <span className="text-sm font-medium text-gray-700">有効フラグ</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品画像URL
                </label>
                <input
                  type="url"
                  value={selectedProduct.image}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明文
                </label>
                <textarea
                  value={selectedProduct.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedProduct.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedProduct(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedScreen && currentMaster === 'master-screen' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{masterConfig.title} - 詳細</h2>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedScreen(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画面ID
                  </label>
                  <input
                    type="text"
                    value={selectedScreen.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画面コード <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedScreen.code}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画面名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedScreen.name}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画面グループ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedScreen.group}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画面パス <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedScreen.path}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedScreen.isActive}
                    className="w-4 h-4 text-[#051C2C] border-gray-300 rounded focus:ring-[#051C2C]"
                  />
                  <span className="text-sm font-medium text-gray-700">有効フラグ</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  備考
                </label>
                <textarea
                  value={selectedScreen.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedScreen(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button className="px-6 py-2 bg-[#051C2C] text-white rounded-lg hover:bg-[#0a2a3f]">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && currentMaster !== 'master' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {masterConfig.title} - 新規追加
            </h2>
            <form className="space-y-4">
              {currentMaster === 'master-account' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ユーザー名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ユーザー名を入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ロール <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">ロールを選択</option>
                      <option value="admin">管理者</option>
                      <option value="manager">マネージャー</option>
                      <option value="staff">スタッフ</option>
                      <option value="viewer">閲覧者</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-staff' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        氏名（姓） <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="姓を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        氏名（名） <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        氏名（セイ） <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="セイを入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        氏名（メイ） <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="メイを入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        部署 <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      >
                        <option value="">部署を選択</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        役職
                      </label>
                      <input
                        type="text"
                        placeholder="役職を入力"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        入社日 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        生年月日
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        性別
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      >
                        <option value="">性別を選択</option>
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        placeholder="090-1234-5678"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        退職日
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-customer' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        会社名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="会社名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        会社名 カナ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="カナを入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号
                    </label>
                    <input
                      type="text"
                      placeholder="000-0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      住所
                    </label>
                    <input
                      type="text"
                      placeholder="住所を入力"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        顧客担当者
                      </label>
                      <input
                        type="text"
                        placeholder="担当者名を入力"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        部署名
                      </label>
                      <input
                        type="text"
                        placeholder="部署名を入力"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      placeholder="03-0000-0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-billing' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会社名 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">顧客を選択</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.companyName}>
                          {customer.companyName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        請求先名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="請求先名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        請求先名 カナ
                      </label>
                      <input
                        type="text"
                        placeholder="カナを入力"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="000-0000"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      住所 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="住所を入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        請求先担当者名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="担当者名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        部署名
                      </label>
                      <input
                        type="text"
                        placeholder="部署名を入力"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="03-0000-0000"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お支払方法 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">支払方法を選択</option>
                      <option value="銀行振込">銀行振込</option>
                      <option value="現金">現金</option>
                      <option value="クレジットカード">クレジットカード</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        支払月 <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      >
                        <option value="">支払月を選択</option>
                        <option value="当月">当月</option>
                        <option value="翌月">翌月</option>
                        <option value="翌々月">翌々月</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        支払日 <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      >
                        <option value="">支払日を選択</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <option key={day} value={day}>
                            {day}日
                          </option>
                        ))}
                        <option value="月末">月末</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      請求書送付方法 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">送付方法を選択</option>
                      <option value="郵送">郵送</option>
                      <option value="メール">メール</option>
                      <option value="システム連携">システム連携</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      インボイス番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="インボイス番号を入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-permission' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      権限名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="権限名を入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      権限コード <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="権限コードを入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      画面 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">画面を選択</option>
                      {screens.map((screen) => (
                        <option key={screen.id} value={screen.id}>
                          {screen.name} ({screen.group})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      説明
                    </label>
                    <textarea
                      placeholder="説明を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-role' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ロール名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ロール名を入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ロールコード <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ロールコードを入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      権限 <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50">
                      <div className="space-y-4">
                        {screens.map((screen) => {
                          const screenPerms = permissions.filter(p => p.screen === screen.id);
                          if (screenPerms.length === 0) return null;
                          return (
                            <div key={screen.id} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="font-medium text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                                {screen.name}
                              </div>
                              <div className="space-y-2">
                                {screenPerms.map((perm) => (
                                  <label key={perm.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="mt-0.5 h-4 w-4 text-[#051C2C] focus:ring-[#051C2C] border-gray-300 rounded"
                                    />
                                    <div className="flex-1">
                                      <div className="text-sm text-gray-900">{perm.name}</div>
                                      <div className="text-xs text-gray-500">{perm.code}</div>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      説明
                    </label>
                    <textarea
                      placeholder="説明を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-department' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      部署名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="部署名を入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      部署コード <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="部署コードを入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      責任者 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">責任者を選択</option>
                      {staff.map((s) => (
                        <option key={s.id} value={`${s.lastName} ${s.firstName}`}>
                          {s.lastName} {s.firstName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-supplier' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      仕入先名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="仕入先名を入力"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        代表者 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="代表者名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        担当者 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="担当者名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="03-1234-5678"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        郵便番号 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="100-0001"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        住所 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="住所を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-cost' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      商品名 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    >
                      <option value="">商品を選択</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        仕入先名 <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      >
                        <option value="">仕入先を選択</option>
                        {suppliers.map((supplier) => (
                          <option key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        単位 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="式、時間など"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        仕入原価 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="200000"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        標準原価 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="250000"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        有効開始日 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        有効終了日 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-product' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        商品コード <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="PROD-001"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        商品種別 <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      >
                        <option value="">種別を選択</option>
                        <option value="サービス">サービス</option>
                        <option value="商品">商品</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        商品名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="商品名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        商品名（カナ） <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ショウヒンメイ"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        商品カテゴリ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Web開発"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ブランド <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ブランド名を入力"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        規格 / 型番
                      </label>
                      <input
                        type="text"
                        placeholder="規格や型番を入力"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        単位 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="式、時間、個など"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      商品画像URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      説明文
                    </label>
                    <textarea
                      placeholder="商品の説明を入力"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#051C2C] border-gray-300 rounded focus:ring-[#051C2C]"
                      />
                      <span className="text-sm font-medium text-gray-700">有効フラグ</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster === 'master-screen' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        画面コード <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="DASHBOARD"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        画面名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ダッシュボード"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        画面グループ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="メイン"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        画面パス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="/dashboard"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#051C2C] border-gray-300 rounded focus:ring-[#051C2C]"
                      />
                      <span className="text-sm font-medium text-gray-700">有効フラグ</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      備考
                    </label>
                    <textarea
                      placeholder="備考を入力（任意）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                    />
                  </div>
                </>
              )}
              {currentMaster !== 'master-account' && currentMaster !== 'master-staff' && currentMaster !== 'master-customer' && currentMaster !== 'master-billing' && currentMaster !== 'master-department' && currentMaster !== 'master-role' && currentMaster !== 'master-permission' && currentMaster !== 'master-supplier' && currentMaster !== 'master-cost' && currentMaster !== 'master-product' && currentMaster !== 'master-screen' && (
                <>
                  <input
                    type="text"
                    placeholder="名称"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C]"
                  />
                  <textarea
                    placeholder="説明"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C2C] h-20"
                  />
                </>
              )}
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

export default MasterManagement;