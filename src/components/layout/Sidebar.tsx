import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  BarChart3,
  LogOut,
  Sparkles
} from 'lucide-react'
import { blink } from '../../blink/client'
import { cn } from '../../lib/utils'
import { useLanguage } from '../../hooks/useLanguage'
import { LanguageSwitcher } from '../ui/language-switcher'

export function Sidebar() {
  const location = useLocation()
  const { t } = useLanguage()

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.inventory'), href: '/inventory', icon: Package },
    { name: t('nav.invoices'), href: '/invoices', icon: FileText },
    { name: t('nav.customers'), href: '/customers', icon: Users },
    { name: t('nav.reports'), href: '/reports', icon: BarChart3 },
  ]

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border rtl:left-auto rtl:right-0 rtl:border-r-0 rtl:border-l">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">CleanPro</h1>
            <p className="text-xs text-muted-foreground">{t('app.subtitle').split(' ').slice(-2).join(' ')}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border space-y-2">
          <LanguageSwitcher />
          <button
            onClick={() => blink.auth.logout()}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t('app.signOut')}
          </button>
        </div>
      </div>
    </div>
  )
}