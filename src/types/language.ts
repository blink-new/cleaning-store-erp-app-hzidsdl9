export type Language = 'en' | 'ar'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // App Title
    'app.title': 'CleanPro Store Manager',
    'app.subtitle': 'Professional Cleaning Supplies',
    'app.loading': 'Loading CleanPro Store Manager...',
    'app.signInPrompt': 'Please sign in to continue',
    'app.signIn': 'Sign In',
    'app.signOut': 'Sign Out',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.inventory': 'Inventory',
    'nav.invoices': 'Invoices',
    'nav.customers': 'Customers',
    'nav.reports': 'Reports',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome to CleanPro Store Manager',
    'dashboard.totalProducts': 'Total Products',
    'dashboard.lowStockItems': 'Low Stock Items',
    'dashboard.totalCustomers': 'Total Customers',
    'dashboard.totalInvoices': 'Total Invoices',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.lowStockAlert': 'Low Stock Alert',
    'dashboard.lowStockMessage': 'You have {count} product{plural} running low on stock. Consider restocking soon to avoid running out.',
    'dashboard.alert': 'Alert',

    // Inventory
    'inventory.title': 'Inventory Management',
    'inventory.subtitle': 'Manage your cleaning products and supplies',
    'inventory.addProduct': 'Add Product',
    'inventory.editProduct': 'Edit Product',
    'inventory.addNewProduct': 'Add New Product',
    'inventory.searchPlaceholder': 'Search products...',
    'inventory.filterByCategory': 'Filter by category',
    'inventory.allCategories': 'All Categories',
    'inventory.products': 'Products',
    'inventory.productName': 'Product Name',
    'inventory.description': 'Description',
    'inventory.category': 'Category',
    'inventory.cost': 'Cost',
    'inventory.price': 'Price',
    'inventory.stock': 'Stock',
    'inventory.minStock': 'Min Stock',
    'inventory.barcode': 'Barcode',
    'inventory.profit': 'Profit',
    'inventory.actions': 'Actions',
    'inventory.lowStock': 'Low stock',
    'inventory.updateProduct': 'Update Product',
    'inventory.cancel': 'Cancel',
    'inventory.noProducts': 'No products found. Add your first product to get started.',

    // Invoices
    'invoices.title': 'Invoice Management',
    'invoices.subtitle': 'Create and manage customer invoices',
    'invoices.createInvoice': 'Create Invoice',
    'invoices.editInvoice': 'Edit Invoice',
    'invoices.createNewInvoice': 'Create New Invoice',
    'invoices.searchPlaceholder': 'Search invoices...',
    'invoices.filterByStatus': 'Filter by status',
    'invoices.allStatuses': 'All Statuses',
    'invoices.invoiceNumber': 'Invoice #',
    'invoices.customer': 'Customer',
    'invoices.date': 'Date',
    'invoices.total': 'Total',
    'invoices.status': 'Status',
    'invoices.customerName': 'Customer Name',
    'invoices.email': 'Email',
    'invoices.phone': 'Phone',
    'invoices.address': 'Address',
    'invoices.taxRate': 'Tax Rate (%)',
    'invoices.invoiceItems': 'Invoice Items',
    'invoices.selectProduct': 'Select product',
    'invoices.quantity': 'Quantity',
    'invoices.add': 'Add',
    'invoices.product': 'Product',
    'invoices.subtotal': 'Subtotal',
    'invoices.tax': 'Tax',
    'invoices.updateInvoice': 'Update Invoice',
    'invoices.noInvoices': 'No invoices found. Create your first invoice to get started.',
    'invoices.preview': 'Invoice Preview',
    'invoices.billTo': 'Bill To:',
    'invoices.item': 'Item',
    'invoices.qty': 'Qty',
    'invoices.downloadPDF': 'Download PDF',
    'invoices.sendEmail': 'Send Email',
    'invoices.draft': 'Draft',
    'invoices.sent': 'Sent',
    'invoices.paid': 'Paid',
    'invoices.overdue': 'Overdue',

    // Customers
    'customers.title': 'Customer Management',
    'customers.subtitle': 'Manage your customer database and relationships',
    'customers.addCustomer': 'Add Customer',
    'customers.editCustomer': 'Edit Customer',
    'customers.addNewCustomer': 'Add New Customer',
    'customers.searchPlaceholder': 'Search customers by name, email, or phone...',
    'customers.name': 'Customer Name',
    'customers.totalInvoices': 'Total Invoices:',
    'customers.totalSpent': 'Total Spent:',
    'customers.pending': 'Pending:',
    'customers.lastInvoice': 'Last Invoice:',
    'customers.customerSince': 'Customer since',
    'customers.updateCustomer': 'Update Customer',
    'customers.noCustomers': 'No customers found',
    'customers.noCustomersMessage': 'Add your first customer to get started.',
    'customers.adjustSearch': 'Try adjusting your search terms.',
    'customers.summary': 'Customer Summary',
    'customers.totalCustomers': 'Total Customers',
    'customers.totalRevenue': 'Total Revenue',
    'customers.pendingPayments': 'Pending Payments',
    'customers.avgPerCustomer': 'Avg per Customer',

    // Common
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.warning': 'Warning',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.view': 'View',
    'common.download': 'Download',
    'common.send': 'Send',

    // Messages
    'messages.productAdded': 'Product added successfully',
    'messages.productUpdated': 'Product updated successfully',
    'messages.productDeleted': 'Product deleted successfully',
    'messages.customerAdded': 'Customer added successfully',
    'messages.customerUpdated': 'Customer updated successfully',
    'messages.customerDeleted': 'Customer deleted successfully',
    'messages.invoiceCreated': 'Invoice created successfully',
    'messages.invoiceUpdated': 'Invoice updated successfully',
    'messages.invoiceDeleted': 'Invoice deleted successfully',
    'messages.statusUpdated': 'Invoice status updated to {status}',
    'messages.loadError': 'Failed to load data',
    'messages.saveError': 'Failed to save',
    'messages.deleteError': 'Failed to delete',
    'messages.cannotDelete': 'Customer has existing invoices. Please delete invoices first.',
    'messages.addItems': 'Please add at least one item to the invoice',

    // Language
    'language.english': 'English',
    'language.arabic': 'العربية',
    'language.switch': 'Switch Language'
  },
  ar: {
    // App Title
    'app.title': 'كلين برو - مدير المتجر',
    'app.subtitle': 'مستلزمات التنظيف المهنية',
    'app.loading': 'جاري تحميل كلين برو مدير المتجر...',
    'app.signInPrompt': 'يرجى تسجيل الدخول للمتابعة',
    'app.signIn': 'تسجيل الدخول',
    'app.signOut': 'تسجيل الخروج',

    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.inventory': 'المخزون',
    'nav.invoices': 'الفواتير',
    'nav.customers': 'العملاء',
    'nav.reports': 'التقارير',

    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحباً بك في كلين برو مدير المتجر',
    'dashboard.totalProducts': 'إجمالي المنتجات',
    'dashboard.lowStockItems': 'المنتجات منخفضة المخزون',
    'dashboard.totalCustomers': 'إجمالي العملاء',
    'dashboard.totalInvoices': 'إجمالي الفواتير',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.monthlyRevenue': 'الإيرادات الشهرية',
    'dashboard.lowStockAlert': 'تنبيه مخزون منخفض',
    'dashboard.lowStockMessage': 'لديك {count} منتج{plural} بمخزون منخفض. فكر في إعادة التخزين قريباً لتجنب النفاد.',
    'dashboard.alert': 'تنبيه',

    // Inventory
    'inventory.title': 'إدارة المخزون',
    'inventory.subtitle': 'إدارة منتجات ومستلزمات التنظيف',
    'inventory.addProduct': 'إضافة منتج',
    'inventory.editProduct': 'تعديل المنتج',
    'inventory.addNewProduct': 'إضافة منتج جديد',
    'inventory.searchPlaceholder': 'البحث في المنتجات...',
    'inventory.filterByCategory': 'تصفية حسب الفئة',
    'inventory.allCategories': 'جميع الفئات',
    'inventory.products': 'المنتجات',
    'inventory.productName': 'اسم المنتج',
    'inventory.description': 'الوصف',
    'inventory.category': 'الفئة',
    'inventory.cost': 'التكلفة',
    'inventory.price': 'السعر',
    'inventory.stock': 'المخزون',
    'inventory.minStock': 'الحد الأدنى للمخزون',
    'inventory.barcode': 'الباركود',
    'inventory.profit': 'الربح',
    'inventory.actions': 'الإجراءات',
    'inventory.lowStock': 'مخزون منخفض',
    'inventory.updateProduct': 'تحديث المنتج',
    'inventory.cancel': 'إلغاء',
    'inventory.noProducts': 'لم يتم العثور على منتجات. أضف منتجك الأول للبدء.',

    // Invoices
    'invoices.title': 'إدارة الفواتير',
    'invoices.subtitle': 'إنشاء وإدارة فواتير العملاء',
    'invoices.createInvoice': 'إنشاء فاتورة',
    'invoices.editInvoice': 'تعديل الفاتورة',
    'invoices.createNewInvoice': 'إنشاء فاتورة جديدة',
    'invoices.searchPlaceholder': 'البحث في الفواتير...',
    'invoices.filterByStatus': 'تصفية حسب الحالة',
    'invoices.allStatuses': 'جميع الحالات',
    'invoices.invoiceNumber': 'رقم الفاتورة',
    'invoices.customer': 'العميل',
    'invoices.date': 'التاريخ',
    'invoices.total': 'الإجمالي',
    'invoices.status': 'الحالة',
    'invoices.customerName': 'اسم العميل',
    'invoices.email': 'البريد الإلكتروني',
    'invoices.phone': 'الهاتف',
    'invoices.address': 'العنوان',
    'invoices.taxRate': 'معدل الضريبة (%)',
    'invoices.invoiceItems': 'عناصر الفاتورة',
    'invoices.selectProduct': 'اختر المنتج',
    'invoices.quantity': 'الكمية',
    'invoices.add': 'إضافة',
    'invoices.product': 'المنتج',
    'invoices.subtotal': 'المجموع الفرعي',
    'invoices.tax': 'الضريبة',
    'invoices.updateInvoice': 'تحديث الفاتورة',
    'invoices.noInvoices': 'لم يتم العثور على فواتير. أنشئ فاتورتك الأولى للبدء.',
    'invoices.preview': 'معاينة الفاتورة',
    'invoices.billTo': 'فاتورة إلى:',
    'invoices.item': 'العنصر',
    'invoices.qty': 'الكمية',
    'invoices.downloadPDF': 'تحميل PDF',
    'invoices.sendEmail': 'إرسال بريد إلكتروني',
    'invoices.draft': 'مسودة',
    'invoices.sent': 'مرسلة',
    'invoices.paid': 'مدفوعة',
    'invoices.overdue': 'متأخرة',

    // Customers
    'customers.title': 'إدارة العملاء',
    'customers.subtitle': 'إدارة قاعدة بيانات العملاء والعلاقات',
    'customers.addCustomer': 'إضافة عميل',
    'customers.editCustomer': 'تعديل العميل',
    'customers.addNewCustomer': 'إضافة عميل جديد',
    'customers.searchPlaceholder': 'البحث في العملاء بالاسم أو البريد الإلكتروني أو الهاتف...',
    'customers.name': 'اسم العميل',
    'customers.totalInvoices': 'إجمالي الفواتير:',
    'customers.totalSpent': 'إجمالي المبلغ المنفق:',
    'customers.pending': 'معلق:',
    'customers.lastInvoice': 'آخر فاتورة:',
    'customers.customerSince': 'عميل منذ',
    'customers.updateCustomer': 'تحديث العميل',
    'customers.noCustomers': 'لم يتم العثور على عملاء',
    'customers.noCustomersMessage': 'أضف عميلك الأول للبدء.',
    'customers.adjustSearch': 'جرب تعديل مصطلحات البحث.',
    'customers.summary': 'ملخص العملاء',
    'customers.totalCustomers': 'إجمالي العملاء',
    'customers.totalRevenue': 'إجمالي الإيرادات',
    'customers.pendingPayments': 'المدفوعات المعلقة',
    'customers.avgPerCustomer': 'المتوسط لكل عميل',

    // Common
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.cancel': 'إلغاء',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.all': 'الكل',
    'common.loading': 'جاري التحميل...',
    'common.success': 'نجح',
    'common.error': 'خطأ',
    'common.warning': 'تحذير',
    'common.confirm': 'تأكيد',
    'common.close': 'إغلاق',
    'common.view': 'عرض',
    'common.download': 'تحميل',
    'common.send': 'إرسال',

    // Messages
    'messages.productAdded': 'تم إضافة المنتج بنجاح',
    'messages.productUpdated': 'تم تحديث المنتج بنجاح',
    'messages.productDeleted': 'تم حذف المنتج بنجاح',
    'messages.customerAdded': 'تم إضافة العميل بنجاح',
    'messages.customerUpdated': 'تم تحديث العميل بنجاح',
    'messages.customerDeleted': 'تم حذف العميل بنجاح',
    'messages.invoiceCreated': 'تم إنشاء الفاتورة بنجاح',
    'messages.invoiceUpdated': 'تم تحديث الفاتورة بنجاح',
    'messages.invoiceDeleted': 'تم حذف الفاتورة بنجاح',
    'messages.statusUpdated': 'تم تحديث حالة الفاتورة إلى {status}',
    'messages.loadError': 'فشل في تحميل البيانات',
    'messages.saveError': 'فشل في الحفظ',
    'messages.deleteError': 'فشل في الحذف',
    'messages.cannotDelete': 'العميل لديه فواتير موجودة. يرجى حذف الفواتير أولاً.',
    'messages.addItems': 'يرجى إضافة عنصر واحد على الأقل إلى الفاتورة',

    // Language
    'language.english': 'English',
    'language.arabic': 'العربية',
    'language.switch': 'تغيير اللغة'
  }
}