import type { Product, Customer, Invoice, InvoiceItem } from '../types'

export const createSampleData = (userId: string) => {
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'All-Purpose Cleaner',
      description: 'Multi-surface cleaning solution',
      category: 'Cleaners',
      price: 12.99,
      cost: 8.50,
      stock: 45,
      minStock: 10,
      barcode: '123456789',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Microfiber Cloth Pack',
      description: 'Pack of 5 microfiber cleaning cloths',
      category: 'Supplies',
      price: 15.99,
      cost: 10.00,
      stock: 8,
      minStock: 15,
      barcode: '987654321',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Glass Cleaner',
      description: 'Streak-free glass and window cleaner',
      category: 'Cleaners',
      price: 9.99,
      cost: 6.25,
      stock: 22,
      minStock: 10,
      barcode: '456789123',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Disinfectant Spray',
      description: 'Hospital-grade disinfectant spray',
      category: 'Cleaners',
      price: 18.99,
      cost: 12.50,
      stock: 35,
      minStock: 20,
      barcode: '789123456',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Vacuum Cleaner Bags',
      description: 'Universal vacuum cleaner bags (pack of 10)',
      category: 'Supplies',
      price: 24.99,
      cost: 16.00,
      stock: 12,
      minStock: 8,
      barcode: '321654987',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  const sampleCustomers: Customer[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, ST 12345',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Somewhere, ST 67890',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      phone: '(555) 456-7890',
      address: '789 Business Blvd, Corporate City, ST 54321',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  // Create sample invoices
  const sampleInvoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-202501-0001',
      customerId: '1',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '(555) 123-4567',
      customerAddress: '123 Main St, Anytown, ST 12345',
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'All-Purpose Cleaner',
          quantity: 3,
          price: 12.99,
          total: 38.97
        },
        {
          id: '2',
          productId: '3',
          productName: 'Glass Cleaner',
          quantity: 2,
          price: 9.99,
          total: 19.98
        }
      ],
      subtotal: 58.95,
      tax: 5.01,
      total: 63.96,
      status: 'paid' as const,
      userId,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      invoiceNumber: 'INV-202501-0002',
      customerId: '2',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '(555) 987-6543',
      customerAddress: '456 Oak Ave, Somewhere, ST 67890',
      items: [
        {
          id: '3',
          productId: '4',
          productName: 'Disinfectant Spray',
          quantity: 5,
          price: 18.99,
          total: 94.95
        },
        {
          id: '4',
          productId: '2',
          productName: 'Microfiber Cloth Pack',
          quantity: 2,
          price: 15.99,
          total: 31.98
        }
      ],
      subtotal: 126.93,
      tax: 10.79,
      total: 137.72,
      status: 'sent' as const,
      userId,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      invoiceNumber: 'INV-202501-0003',
      customerId: '3',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.wilson@company.com',
      customerPhone: '(555) 456-7890',
      customerAddress: '789 Business Blvd, Corporate City, ST 54321',
      items: [
        {
          id: '5',
          productId: '1',
          productName: 'All-Purpose Cleaner',
          quantity: 10,
          price: 12.99,
          total: 129.90
        },
        {
          id: '6',
          productId: '4',
          productName: 'Disinfectant Spray',
          quantity: 8,
          price: 18.99,
          total: 151.92
        },
        {
          id: '7',
          productId: '5',
          productName: 'Vacuum Cleaner Bags',
          quantity: 3,
          price: 24.99,
          total: 74.97
        }
      ],
      subtotal: 356.79,
      tax: 30.33,
      total: 387.12,
      status: 'paid' as const,
      userId,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      invoiceNumber: 'INV-202501-0004',
      customerId: '1',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '(555) 123-4567',
      customerAddress: '123 Main St, Anytown, ST 12345',
      items: [
        {
          id: '8',
          productId: '2',
          productName: 'Microfiber Cloth Pack',
          quantity: 4,
          price: 15.99,
          total: 63.96
        }
      ],
      subtotal: 63.96,
      tax: 5.44,
      total: 69.40,
      status: 'draft' as const,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  return {
    products: sampleProducts,
    customers: sampleCustomers,
    invoices: sampleInvoices
  }
}

export const initializeSampleData = async (userId: string) => {
  const { products, customers, invoices } = createSampleData(userId)
  
  // Check if data already exists
  const existingProducts = localStorage.getItem(`products_${userId}`)
  const existingCustomers = localStorage.getItem(`customers_${userId}`)
  const existingInvoices = localStorage.getItem(`invoices_${userId}`)
  
  // Only initialize if no data exists
  if (!existingProducts) {
    localStorage.setItem(`products_${userId}`, JSON.stringify(products))
  }
  
  if (!existingCustomers) {
    localStorage.setItem(`customers_${userId}`, JSON.stringify(customers))
  }
  
  if (!existingInvoices) {
    localStorage.setItem(`invoices_${userId}`, JSON.stringify(invoices))
  }
}