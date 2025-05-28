
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentManager from '../components/ContentManager';
import { 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Search,
  MoreHorizontal,
  UserCheck,
  UserX,
  MessageSquare
} from 'lucide-react';

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin panel
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', joinDate: '2024-01-10' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-20' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active', joinDate: '2024-01-25' },
    { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'user', status: 'suspended', joinDate: '2024-01-30' },
  ];

  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Sessions', value: '856', change: '+5%', icon: UserCheck, color: 'text-green-600' },
    { title: 'Revenue', value: '$12,450', change: '+18%', icon: BarChart3, color: 'text-purple-600' },
    { title: 'Support Tickets', value: '23', change: '-8%', icon: FileText, color: 'text-orange-600' },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  const getRoleBadge = (role: string) => {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600">
            Manage users, monitor activity, and configure system settings.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for different admin sections */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Content Management</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Users Table */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>User Management</span>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        Add User
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Manage user accounts and permissions
                    </CardDescription>
                    
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b">
                          <tr className="text-left">
                            <th className="pb-3 text-sm font-medium text-gray-500">User</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Role</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Joined</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="py-4">
                                <div>
                                  <p className="font-medium text-gray-900">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </td>
                              <td className="py-4">
                                <Badge className={getRoleBadge(user.role)}>
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="py-4">
                                <Badge className={getStatusBadge(user.status)}>
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="py-4 text-sm text-gray-500">
                                {user.joinDate}
                              </td>
                              <td className="py-4">
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Approve Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <UserX className="w-4 h-4 mr-2" />
                      Suspend Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-2 border-blue-500 pl-4">
                      <p className="text-sm font-medium">New user registered</p>
                      <p className="text-xs text-gray-500">Alice Brown - 2 minutes ago</p>
                    </div>
                    <div className="border-l-2 border-green-500 pl-4">
                      <p className="text-sm font-medium">Payment processed</p>
                      <p className="text-xs text-gray-500">John Doe - 15 minutes ago</p>
                    </div>
                    <div className="border-l-2 border-orange-500 pl-4">
                      <p className="text-sm font-medium">Support ticket created</p>
                      <p className="text-xs text-gray-500">Jane Smith - 1 hour ago</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
