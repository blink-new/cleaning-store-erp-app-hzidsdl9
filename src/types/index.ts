export interface Product {
  id: string
  name: string
  description?: string
  category: string
  price: number
  cost: number
  stock: number
  minStock: number
  barcode?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId?: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  userId: string
  createdAt: string
  updatedAt: string
}

export interface InvoiceItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export interface DashboardStats {
  totalProducts: number
  lowStockProducts: number
  totalCustomers: number
  totalInvoices: number
  totalRevenue: number
  monthlyRevenue: number
}