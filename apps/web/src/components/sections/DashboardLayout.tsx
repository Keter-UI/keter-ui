import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  LayoutDashboard, 
  Settings, 
  Mail, 
  Bell, 
  Search, 
  ChevronLeft,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Shield,
  Zap,
  CreditCard,
  Plus,
  ChevronDown
} from 'lucide-react';
import { Card, Button } from '../ui/KeterUI';
import { cn } from '../../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4200, users: 120, conversions: 45 },
  { name: 'Feb', revenue: 5100, users: 150, conversions: 52 },
  { name: 'Mar', revenue: 4800, users: 135, conversions: 48 },
  { name: 'Apr', revenue: 6200, users: 180, conversions: 61 },
  { name: 'May', revenue: 7800, users: 210, conversions: 75 },
  { name: 'Jun', revenue: 8900, users: 245, conversions: 88 },
];

const customers = [
  { id: 1, name: 'Douglas Yaakov', email: 'douglas@yaakovcarioca.dev', status: 'Active', plan: 'Enterprise', usage: '92%', avatar: 'DY' },
  { id: 2, name: 'Alex Rivera', email: 'alex@example.com', status: 'Pending', plan: 'Pro', usage: '45%', avatar: 'AR' },
  { id: 3, name: 'Sarah Chen', email: 'sarah@design.io', status: 'Active', plan: 'Team', usage: '78%', avatar: 'SC' },
  { id: 4, name: 'Marcus Brown', email: 'marcus@code.net', status: 'Inactive', plan: 'Personal', usage: '12%', avatar: 'MB' },
  { id: 5, name: 'Elena Kozlov', email: 'elena@startup.ai', status: 'Active', plan: 'Enterprise', usage: '98%', avatar: 'EK' },
  { id: 6, name: 'James Wilson', email: 'james@corp.com', status: 'Active', plan: 'Pro', usage: '66%', avatar: 'JW' },
];

export const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 transition-colors duration-300 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-e border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center h-14 px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
             <div className="h-7 w-7 rounded bg-zinc-900 dark:bg-white flex items-center justify-center shrink-0">
                <span className="text-white dark:text-black font-black text-xs">K</span>
             </div>
             {!isCollapsed && <span className="font-bold text-lg tracking-tight">Keter UI</span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div>
            {!isCollapsed && <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 mb-2 px-2 block">Menu</label>}
            <nav className="space-y-1">
              <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active collapsed={isCollapsed} />
              <NavItem icon={<Users size={18} />} label="Customers" collapsed={isCollapsed} />
              <NavItem icon={<BarChart3 size={18} />} label="Analytics" collapsed={isCollapsed} />
              <NavItem icon={<CreditCard size={18} />} label="Billing" collapsed={isCollapsed} />
            </nav>
          </div>

          <div>
            {!isCollapsed && <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 mb-2 px-2 block">Management</label>}
            <nav className="space-y-1">
              <NavItem icon={<Globe size={18} />} label="Websites" collapsed={isCollapsed} />
              <NavItem icon={<Shield size={18} />} label="Security" collapsed={isCollapsed} />
              <NavItem icon={<Zap size={18} />} label="Integrations" badge="Beta" collapsed={isCollapsed} />
            </nav>
          </div>
        </div>

        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          {!isCollapsed && (
            <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 mb-2">
               <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                  <div className="flex-1 overflow-hidden">
                     <p className="text-xs font-bold truncate">Enterprise Workspace</p>
                     <p className="text-[10px] text-zinc-500 truncate">Premium Plan</p>
                  </div>
               </div>
            </div>
          )}
          <button 
            className={cn("w-full h-9 p-0 inline-flex items-center rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors", !isCollapsed && "px-3 justify-start")}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className={cn("transition-transform", isCollapsed && "rotate-180")} size={16} />
            {!isCollapsed && <span className="ms-2 text-xs font-bold uppercase tracking-wider">COLLAPSE</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-6 flex-1">
            {!isCollapsed && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-100 transition-colors">
                <div className="h-4 w-4 rounded bg-blue-600" />
                <span className="text-xs font-bold">Keter-Prod-API</span>
                <ChevronDown size={14} className="text-zinc-400" />
              </div>
            )}
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input 
                type="text" 
                placeholder="Search commands (⌘K)" 
                className="w-full h-8 ps-10 pe-4 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg text-xs focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border-e border-zinc-200 dark:border-zinc-800 pe-3 me-1">
               <Button variant="ghost" size="icon" className="h-8 w-8 relative text-zinc-500">
                 <Bell size={18} />
                 <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
               </Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
                 <Settings size={18} />
               </Button>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 p-1 rounded-lg transition-colors">
               <div className="h-7 w-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px]">DY</div>
               <div className="hidden md:block">
                  <p className="text-[11px] font-bold leading-tight">Doug Yaakov</p>
                  <p className="text-[9px] text-zinc-500 leading-tight">Admin</p>
               </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/50 dark:bg-zinc-950">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                   <span>Project</span>
                   <ChevronLeft className="rotate-180" size={10} />
                   <span className="text-zinc-600 dark:text-zinc-300">Overview</span>
                </nav>
                <h1 className="text-xl font-black tracking-tight">System Performance</h1>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs font-bold">Manage Widgets</Button>
                <Button variant="primary" size="sm" className="h-8 text-xs font-bold gap-2">
                   <Plus size={14} /> New Project
                </Button>
             </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Net Revenue" value="$450,284" trend="+14.2%" trendUp icon={<DollarSign size={16} />} color="blue" />
            <StatCard label="Subscription" value="2,482" trend="+3.2%" trendUp icon={<Zap size={16} />} color="purple" />
            <StatCard label="Churn Rate" value="0.84%" trend="-0.4%" trendUp={false} icon={<TrendingUp size={16} />} color="green" />
            <StatCard label="Avg Council" value="1.2s" trend="+12.4s" trendUp={false} icon={<Globe size={16} />} color="orange" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Chart */}
            <Card className="lg:col-span-8 p-0 overflow-hidden border-zinc-200 dark:border-zinc-800">
               <div className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider">Revenue & conversions</h3>
                    <p className="text-[10px] text-zinc-500 font-medium">Performance over the last 6 months</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <div className="h-2 w-2 rounded-full bg-blue-500" /> Revenue
                     </div>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <div className="h-2 w-2 rounded-full bg-purple-500" /> Conv.
                     </div>
                  </div>
               </div>
               <div className="p-6">
                  <div className="h-[320px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={data}>
                         <defs>
                           <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.05} />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} dy={10} />
                         <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                         <Tooltip 
                           contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                         />
                         <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                         <Line type="monotone" dataKey="conversions" stroke="#a855f7" strokeWidth={3} dot={false} />
                       </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </Card>

            {/* Side Activity */}
            <Card className="lg:col-span-4 p-0 border-zinc-200 dark:border-zinc-800">
               <div className="p-4 border-b border-zinc-100 dark:border-zinc-900">
                  <h3 className="text-sm font-black uppercase tracking-wider">Live Activity</h3>
               </div>
               <div className="p-4 space-y-5">
                  <ActivityItem user="DY" action="created a new project" time="2m ago" />
                  <ActivityItem user="AR" action="updated billing profile" time="15m ago" />
                  <ActivityItem user="SC" action="invited 3 new team members" time="1h ago" />
                  <ActivityItem user="EK" action="deployed v1.2.4 to production" time="3h ago" />
                  <ActivityItem user="JW" action="requested server limit increase" time="5h ago" />
               </div>
               <div className="p-4 pt-0">
                  <Button variant="outline" className="w-full h-8 text-[10px] font-black uppercase tracking-widest">View Audit Log</Button>
               </div>
            </Card>
          </div>

          <Card className="p-0 border-zinc-200 dark:border-zinc-800 overflow-hidden">
             <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40">
                <div>
                   <h3 className="text-sm font-black uppercase tracking-wider">Customer Management</h3>
                   <p className="text-[10px] text-zinc-500 font-medium">Verify and monitor user performance metrics</p>
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="h-8 text-xs font-bold">Filter</Button>
                   <Button variant="secondary" size="sm" className="h-8 text-xs font-bold">Manage Plans</Button>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-zinc-50 dark:bg-zinc-900/40 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      <tr>
                         <th className="px-6 py-4">Identity</th>
                         <th className="px-6 py-4 text-center">Status</th>
                         <th className="px-6 py-4">Account Tier</th>
                         <th className="px-6 py-4">Usage</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {customers.map((user) => (
                         <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group">
                            <td className="px-6 py-3">
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                     {user.avatar}
                                  </div>
                                  <div>
                                     <p className="text-xs font-bold leading-tight">{user.name}</p>
                                     <p className="text-[10px] text-zinc-500 leading-tight font-medium">{user.email}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                               <span className={cn(
                                  "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                  user.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" :
                                  user.status === 'Pending' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" :
                                  "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                               )}>
                                  {user.status}
                               </span>
                            </td>
                            <td className="px-6 py-3">
                               <div className="flex items-center gap-2">
                                  {user.plan === 'Enterprise' && <Shield size={12} className="text-blue-500" />}
                                  {user.plan === 'Pro' && <Zap size={12} className="text-purple-500" />}
                                  <span className="text-xs font-bold">{user.plan}</span>
                                </div>
                            </td>
                            <td className="px-6 py-3">
                               <div className="flex items-center gap-3">
                                  <div className="w-16 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                     <div className="h-full bg-blue-500" style={{ width: user.usage }} />
                                  </div>
                                  <span className="text-[10px] font-bold text-zinc-500">{user.usage}</span>
                               </div>
                            </td>
                            <td className="px-6 py-3 text-right">
                               <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                                  <MoreVertical size={14} className="text-zinc-400" />
                               </Button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, badge, collapsed }: any) => (
  <button className={cn(
    "w-full flex items-center gap-3 h-9 rounded-lg transition-all group overflow-hidden",
    active 
      ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-md shadow-zinc-900/10" 
      : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900",
    collapsed && "justify-center px-0"
  )}>
    <span className={cn(
      "w-10 flex items-center justify-center transition-transform group-hover:scale-110 shrink-0",
      active ? "text-inherit" : "text-zinc-400"
    )}>{icon}</span>
    {!collapsed && (
      <>
        <span className="flex-1 text-left text-[11px] font-bold uppercase tracking-wider">{label}</span>
        {badge && <span className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded me-2 uppercase tracking-tighter">{badge}</span>}
      </>
    )}
  </button>
);

const StatCard = ({ label, value, trend, trendUp, icon, color }: any) => {
  const colors: any = {
    blue: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
    purple: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    green: 'text-green-500 bg-green-50 dark:bg-green-500/10',
    orange: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10',
  };

  return (
    <Card className="p-4 border-zinc-200 dark:border-zinc-800 transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
         <div className={cn("p-2 rounded-lg border border-transparent", colors[color])}>
            {icon}
         </div>
         <div className={cn(
            "flex items-center gap-0.5 text-[10px] font-black tracking-tighter",
            trendUp ? "text-green-500" : "text-red-500"
         )}>
            {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend}
         </div>
      </div>
      <div>
         <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
         <div className="flex items-baseline gap-2">
            <h4 className="text-xl font-black mt-0.5">{value}</h4>
         </div>
      </div>
    </Card>
  );
};

const ActivityItem = ({ user, action, time }: any) => (
  <div className="flex gap-3">
    <div className="h-7 w-7 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[9px] text-zinc-500 shrink-0">
      {user}
    </div>
    <div className="flex-1 min-w-0">
       <p className="text-[11px] leading-tight text-zinc-700 dark:text-zinc-300">
          <span className="font-bold text-zinc-950 dark:text-zinc-50">{user}</span> {action}
       </p>
       <p className="text-[9px] text-zinc-500 font-medium">{time}</p>
    </div>
  </div>
);
