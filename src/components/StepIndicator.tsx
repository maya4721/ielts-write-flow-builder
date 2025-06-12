
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { number: 1, label: 'Brainstorm' },
    { number: 2, label: 'Outline' },
    { number: 3, label: 'Write' }
  ];

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              currentStep >= step.number 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.number}
            </div>
            <span className={`text-sm font-medium transition-colors duration-300 ${
              currentStep >= step.number 
                ? 'text-blue-600' 
                : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 bg-gray-300 relative overflow-hidden">
              <div className={`h-full bg-blue-500 transition-all duration-500 ${
                currentStep > step.number ? 'w-full' : 'w-0'
              }`} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
