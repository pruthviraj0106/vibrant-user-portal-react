
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Calendar, Download } from 'lucide-react';

const Billing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9',
      period: '/month',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 10 projects',
        'Basic support',
        '5GB storage',
        'Email notifications'
      ],
      current: false,
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'Best for growing teams and businesses',
      features: [
        'Unlimited projects',
        'Priority support',
        '100GB storage',
        'Advanced analytics',
        'Team collaboration',
        'Custom integrations'
      ],
      current: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Unlimited storage',
        'Advanced security',
        'Custom branding',
        'SLA guarantee'
      ],
      current: false,
      popular: false
    }
  ];

  const invoices = [
    { id: 'INV-001', date: '2024-01-01', amount: '$29.00', status: 'paid' },
    { id: 'INV-002', date: '2023-12-01', amount: '$29.00', status: 'paid' },
    { id: 'INV-003', date: '2023-11-01', amount: '$29.00', status: 'paid' },
    { id: 'INV-004', date: '2023-10-01', amount: '$29.00', status: 'paid' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Billing & Subscriptions
          </h1>
          <p className="text-gray-600">
            Manage your subscription, view invoices, and update payment methods.
          </p>
        </div>

        {/* Current Plan */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Plan</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Pro Plan</h3>
                <p className="text-gray-600">$29/month • Next billing date: February 1, 2024</p>
              </div>
              <div className="text-right">
                <Button variant="outline" className="mr-2">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment
                </Button>
                <Button variant="outline">
                  Cancel Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-lg transition-shadow ${
                  plan.popular ? 'border-blue-500 shadow-lg' : ''
                } ${plan.current ? 'bg-gradient-to-b from-blue-50 to-white' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.current 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : ''
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Billing History</span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </CardTitle>
            <CardDescription>
              View and download your past invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 text-sm font-medium text-gray-500">Invoice</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="py-4 font-medium">{invoice.id}</td>
                      <td className="py-4 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{invoice.date}</span>
                        </div>
                      </td>
                      <td className="py-4 font-medium">{invoice.amount}</td>
                      <td className="py-4">
                        <Badge className="bg-green-100 text-green-800">
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
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
    </div>
  );
};

export default Billing;
