import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "156",
    icon: Package,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Total Customers",
    value: "5,678",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Revenue",
    value: "£45,678",
    icon: DollarSign,
    color: "text-yellow-600",
  },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
