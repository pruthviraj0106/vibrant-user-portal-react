
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AgeVerificationModal from '../components/AgeVerificationModal';
import { Users, Shield, CreditCard, Zap } from 'lucide-react';

const Index = () => {
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified');
    if (!ageVerified) {
      setShowAgeModal(true);
    }
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowAgeModal(false);
  };

  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive user dashboard with role-based access control'
    },
    {
      icon: Shield,
      title: 'Admin Panel',
      description: 'Powerful admin tools for managing users and content'
    },
    {
      icon: CreditCard,
      title: 'Billing Integration',
      description: 'Flexible subscription plans and payment management'
    },
    {
      icon: Zap,
      title: 'Fast & Secure',
      description: 'Built with modern technologies for optimal performance'
    }
  ];

  return (
    <>
      <AgeVerificationModal isOpen={showAgeModal} onConfirm={handleAgeConfirm} />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Vibrant Portal
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A modern user management platform with role-based access, billing integration, 
                and powerful admin tools.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust VibrantPortal for their user management needs.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
