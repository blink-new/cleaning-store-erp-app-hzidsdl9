import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { 
  Package, 
  Users, 
  FileText, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Plus,
  ShoppingCart
} from 'lucide-react'
import { blink } from '../blink/client'
import { useLanguage } from '../hooks/useLanguage'
import { initializeSampleData } from '../utils/sampleData'
import type { DashboardStats } from '../types'

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockProducts: 0,
    totalCustomers: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const user = await blink.auth.me()
      
      // Initialize sample data if needed
      await initializeSampleData(user.id)
      
      let products: any[] = []
      let customers: any[] = []
      let invoices: any[] = []
      
      // Load data from localStorage (database fallback)
      const savedProducts = localStorage.getItem(`products_${user.id}`)
      const savedCustomers = localStorage.getItem(`customers_${user.id}`)
      const savedInvoices = localStorage.getItem(`invoices_${user.id}`)
      
      products = savedProducts ? JSON.parse(savedProducts) : []
      customers = savedCustomers ? JSON.parse(savedCustomers) : []
      invoices = savedInvoices ? JSON.parse(savedInvoices) : []
      
      // Calculate stats
      const lowStockProducts = products.filter(p => p.stock <= p.minStock).length
      const totalRevenue = invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.total, 0)
      
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const monthlyRevenue = invoices
        .filter(inv => {
          const invDate = new Date(inv.createdAt)
          return inv.status === 'paid' && 
                 invDate.getMonth() === currentMonth && 
                 invDate.getFullYear() === currentYear
        })
        .reduce((sum, inv) => sum + inv.total, 0)

      setStats({
        totalProducts: products.length,
        lowStockProducts,
        totalCustomers: customers.length,
        totalInvoices: invoices.length,
        totalRevenue,
        monthlyRevenue
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: t('dashboard.totalProducts'),
      value: stats.totalProducts,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: t('dashboard.lowStockItems'),
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: 'text-orange-600',
      badge: stats.lowStockProducts > 0 ? 'warning' : null
    },
    {
      title: t('dashboard.totalCustomers'),
      value: stats.totalCustomers,
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: t('dashboard.totalInvoices'),
      value: stats.totalInvoices,
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      title: t('dashboard.totalRevenue'),
      value: `${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-600'
    },
    {
      title: t('dashboard.monthlyRevenue'),
      value: `${stats.monthlyRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-indigo-600'
    }
  ]

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link to="/invoices">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Invoice
              </Button>
            </Link>
            <Link to="/inventory">
              <Button variant="outline" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Add Product
              </Button>
            </Link>
            <Link to="/customers">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Add Customer
              </Button>
            </Link>
            <Link to="/inventory">
              <Button variant="outline" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Check Low Stock
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                {card.badge && (
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    {t('dashboard.alert')}
                  </Badge>
                )}
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats.lowStockProducts > 0 && (
        <Card className="mt-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t('dashboard.lowStockAlert')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700">
              {t('dashboard.lowStockMessage')
                .replace('{count}', stats.lowStockProducts.toString())
                .replace('{plural}', stats.lowStockProducts !== 1 ? 's' : '')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}