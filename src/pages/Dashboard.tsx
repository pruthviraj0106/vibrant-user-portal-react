
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User, Mail, Shield, CreditCard, Settings, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    {
      title: 'Profile Status',
      value: 'Active',
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Account Type',
      value: user.role === 'admin' ? 'Administrator' : 'Standard User',
      icon: Shield,
      color: user.role === 'admin' ? 'text-purple-600' : 'text-blue-600',
      bgColor: user.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
    },
    {
      title: 'Subscription',
      value: 'Premium',
      icon: CreditCard,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Activity Score',
      value: '95%',
      icon: BarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Account Information</h2>
                <CardDescription className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Role:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role === 'admin' ? (
                    <>
                      <Shield className="w-3 h-3 mr-1" />
                      Administrator
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 mr-1" />
                      Standard User
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">ID:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{user.id}</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Account Settings</span>
              </CardTitle>
              <CardDescription>
                Manage your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Billing & Plans</span>
              </CardTitle>
              <CardDescription>
                View and manage your subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/billing">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  View Billing
                </Button>
              </Link>
            </CardContent>
          </Card>

          {user.role === 'admin' && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Admin Panel</span>
                </CardTitle>
                <CardDescription>
                  Access administrative tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin">
                  <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                    Open Admin Panel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
