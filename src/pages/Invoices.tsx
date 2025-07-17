import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, FileText, Eye, Download, Calculator } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Textarea } from '../components/ui/textarea'
import { useToast } from '../hooks/use-toast'
import { useLanguage } from '../hooks/useLanguage'
import { blink } from '../blink/client'
import { initializeSampleData } from '../utils/sampleData'
import type { Invoice, InvoiceItem, Product, Customer } from '../types'

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null)
  const { toast } = useToast()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    items: [] as InvoiceItem[],
    tax: 8.5
  })

  const [newItem, setNewItem] = useState({
    productId: '',
    quantity: 1
  })

  useEffect(() => {
    loadData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      const user = await blink.auth.me()
      
      // Initialize sample data if needed
      await initializeSampleData(user.id)
      
      // Load all data with localStorage fallback
      let loadedInvoices: Invoice[] = []
      let loadedProducts: Product[] = []
      let loadedCustomers: Customer[] = []
      
      // Load all data from localStorage (database fallback)
      const savedInvoices = localStorage.getItem(`invoices_${user.id}`)
      const savedProducts = localStorage.getItem(`products_${user.id}`)
      const savedCustomers = localStorage.getItem(`customers_${user.id}`)
      
      loadedInvoices = savedInvoices ? JSON.parse(savedInvoices) : []
      loadedProducts = savedProducts ? JSON.parse(savedProducts) : []
      loadedCustomers = savedCustomers ? JSON.parse(savedCustomers) : []
      
      setInvoices(loadedInvoices)
      setProducts(loadedProducts)
      setCustomers(loadedCustomers)
    } catch (error) {
      console.error('Error loading data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const generateInvoiceNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = invoices.length + 1
    return `INV-${year}${month}-${String(count).padStart(4, '0')}`
  }

  const resetForm = () => {
    setFormData({
      customerId: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      items: [],
      tax: 8.5
    })
    setNewItem({
      productId: '',
      quantity: 1
    })
    setEditingInvoice(null)
  }

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    if (customer) {
      setFormData({
        ...formData,
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email || '',
        customerPhone: customer.phone || '',
        customerAddress: customer.address || ''
      })
    }
  }

  const addItem = () => {
    const product = products.find(p => p.id === newItem.productId)
    if (!product) return

    const item: InvoiceItem = {
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      quantity: newItem.quantity,
      price: product.price,
      total: product.price * newItem.quantity
    }

    setFormData({
      ...formData,
      items: [...formData.items, item]
    })

    setNewItem({
      productId: '',
      quantity: 1
    })
  }

  const removeItem = (itemId: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId)
    })
  }

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0)
    const taxAmount = subtotal * (formData.tax / 100)
    const total = subtotal + taxAmount
    return { subtotal, taxAmount, total }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.items.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one item to the invoice',
        variant: 'destructive'
      })
      return
    }

    try {
      const user = await blink.auth.me()
      const { subtotal, taxAmount, total } = calculateTotals()
      
      const invoiceData = {
        invoiceNumber: editingInvoice?.invoiceNumber || generateInvoiceNumber(),
        customerId: formData.customerId || undefined,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail || undefined,
        customerPhone: formData.customerPhone || undefined,
        customerAddress: formData.customerAddress || undefined,
        subtotal,
        tax: taxAmount,
        total,
        status: 'draft' as const,
        userId: user.id
      }

      let updatedInvoices: Invoice[]

      if (editingInvoice) {
        // Update existing invoice
        const updatedInvoice = { 
          ...editingInvoice, 
          ...invoiceData,
          items: formData.items,
          updatedAt: new Date().toISOString() 
        }
        updatedInvoices = invoices.map(inv => 
          inv.id === editingInvoice.id ? updatedInvoice : inv
        )
        
        toast({
          title: 'Success',
          description: 'Invoice updated successfully'
        })
      } else {
        // Add new invoice
        const newInvoice: Invoice = {
          id: Date.now().toString(),
          ...invoiceData,
          items: formData.items,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        updatedInvoices = [...invoices, newInvoice]
        
        toast({
          title: 'Success',
          description: 'Invoice created successfully'
        })
      }

      // Save to localStorage
      localStorage.setItem(`invoices_${user.id}`, JSON.stringify(updatedInvoices))
      setInvoices(updatedInvoices)
      setIsAddDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving invoice:', error)
      toast({
        title: 'Error',
        description: 'Failed to save invoice',
        variant: 'destructive'
      })
    }
  }

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice)
    setFormData({
      customerId: invoice.customerId || '',
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail || '',
      customerPhone: invoice.customerPhone || '',
      customerAddress: invoice.customerAddress || '',
      items: invoice.items,
      tax: (invoice.tax / invoice.subtotal) * 100
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (invoiceId: string) => {
    try {
      const user = await blink.auth.me()
      const updatedInvoices = invoices.filter(inv => inv.id !== invoiceId)
      
      localStorage.setItem(`invoices_${user.id}`, JSON.stringify(updatedInvoices))
      setInvoices(updatedInvoices)
      
      toast({
        title: 'Success',
        description: 'Invoice deleted successfully'
      })
    } catch (error) {
      console.error('Error deleting invoice:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete invoice',
        variant: 'destructive'
      })
    }
  }

  const updateStatus = async (invoiceId: string, status: Invoice['status']) => {
    try {
      const user = await blink.auth.me()
      const updatedInvoices = invoices.map(inv => 
        inv.id === invoiceId 
          ? { ...inv, status, updatedAt: new Date().toISOString() }
          : inv
      )
      
      localStorage.setItem(`invoices_${user.id}`, JSON.stringify(updatedInvoices))
      setInvoices(updatedInvoices)
      
      toast({
        title: 'Success',
        description: `Invoice marked as ${status}`
      })
    } catch (error) {
      console.error('Error updating invoice status:', error)
      toast({
        title: 'Error',
        description: 'Failed to update invoice status',
        variant: 'destructive'
      })
    }
  }

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-6"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{t('invoices.title')}</h1>
          <p className="text-muted-foreground">{t('invoices.subtitle')}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              {t('invoices.createInvoice')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Select Customer</Label>
                  <Select value={formData.customerId} onValueChange={handleCustomerSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose existing customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(customer => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customerAddress">Address</Label>
                <Textarea
                  id="customerAddress"
                  value={formData.customerAddress}
                  onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                  rows={2}
                />
              </div>

              {/* Add Items */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Invoice Items</h3>
                
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Select value={newItem.productId} onValueChange={(value) => setNewItem({ ...newItem, productId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} - ${product.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                      placeholder="Qty"
                    />
                  </div>
                  <Button type="button" onClick={addItem} disabled={!newItem.productId}>
                    Add
                  </Button>
                </div>

                {/* Items List */}
                {formData.items.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>${item.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* Tax and Totals */}
              <div className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tax">Tax Rate (%)</Label>
                    <Input
                      id="tax"
                      type="number"
                      step="0.1"
                      value={formData.tax}
                      onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    {formData.items.length > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${calculateTotals().subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${calculateTotals().taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>${calculateTotals().total.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Invoices ({filteredInvoices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>${invoice.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select value={invoice.status} onValueChange={(status) => updateStatus(invoice.id, status as Invoice['status'])}>
                      <SelectTrigger className="w-24">
                        <SelectValue>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewInvoice(invoice)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(invoice)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(invoice.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No invoices found. Create your first invoice to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Preview Dialog */}
      {previewInvoice && (
        <Dialog open={!!previewInvoice} onOpenChange={() => setPreviewInvoice(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Invoice Preview - {previewInvoice.invoiceNumber}</DialogTitle>
            </DialogHeader>
            <div className="bg-white p-8 border rounded-lg">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-primary">INVOICE</h1>
                  <p className="text-lg">{previewInvoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-bold">CleanPro Store</h2>
                  <p className="text-muted-foreground">Professional Cleaning Supplies</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-2">Bill To:</h3>
                  <div>
                    <p className="font-medium">{previewInvoice.customerName}</p>
                    {previewInvoice.customerEmail && <p>{previewInvoice.customerEmail}</p>}
                    {previewInvoice.customerPhone && <p>{previewInvoice.customerPhone}</p>}
                    {previewInvoice.customerAddress && <p className="whitespace-pre-line">{previewInvoice.customerAddress}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p><span className="font-medium">Invoice Date:</span> {new Date(previewInvoice.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-medium">Status:</span> <Badge className={getStatusColor(previewInvoice.status)}>{previewInvoice.status}</Badge></p>
                </div>
              </div>

              <Table className="mb-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewInvoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${item.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${previewInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${previewInvoice.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${previewInvoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => window.print()} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Print/Save PDF
              </Button>
              <Button variant="outline" onClick={() => setPreviewInvoice(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}