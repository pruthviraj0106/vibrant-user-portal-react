
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Age Verification
          </CardTitle>
          <CardDescription className="text-gray-600">
            Please confirm your age to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              You must be 18 years or older to access this platform.
            </p>
            <p className="text-sm text-gray-500">
              By clicking "I am 18 or older", you confirm that you meet the age requirement.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              I am 18 or older
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = 'https://www.google.com'}
              className="w-full"
            >
              I am under 18
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeVerificationModal;
