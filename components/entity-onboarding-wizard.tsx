'use client'

import React, { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'

interface WizardStep {
  id: string
  title: string
  description: string
  fields: string[]
}

const steps: WizardStep[] = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Enter your organization details',
    fields: ['Organization Name', 'Sector', 'Location', 'Registration Number']
  },
  {
    id: 'contact',
    title: 'Contact Details',
    description: 'Add primary contact information',
    fields: ['Contact Name', 'Email', 'Phone', 'Office Address']
  },
  {
    id: 'certifications',
    title: 'Certifications',
    description: 'List your environmental certifications',
    fields: ['ISO 14001', 'ISO 50001', 'Other Certifications']
  },
  {
    id: 'projects',
    title: 'Project Registration',
    description: 'Register your carbon offset projects',
    fields: ['Project Name', 'Methodology', 'Expected CCCs', 'Timeline']
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review all information and submit',
    fields: []
  }
]

interface EntityOnboardingWizardProps {
  onComplete?: () => void
}

export function EntityOnboardingWizard({ onComplete }: EntityOnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = steps[currentStep]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setCurrentStep(idx)}
                className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  idx === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : idx < currentStep
                    ? 'bg-emerald-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {idx < currentStep ? <Check size={20} /> : idx + 1}
              </button>
              {idx < steps.length - 1 && (
                <div className={`h-1 flex-1 transition-colors ${idx < currentStep ? 'bg-emerald-500' : 'bg-muted'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
        </div>

        {/* Form Fields */}
        {step.fields.length > 0 && (
          <div className="space-y-4 mb-8">
            {step.fields.map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-foreground">{field}</label>
                {field === 'Sector' || field === 'Methodology' ? (
                  <select className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Select {field.toLowerCase()}</option>
                    {field === 'Sector' && (
                      <>
                        <option>Cement</option>
                        <option>Steel</option>
                        <option>Renewable Energy</option>
                        <option>Chemicals</option>
                      </>
                    )}
                    {field === 'Methodology' && (
                      <>
                        <option>ACM0013 - Energy Optimization</option>
                        <option>ACM0014 - Fuel Switch</option>
                        <option>ACM0002 - Renewable Energy</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type={field === 'Email' ? 'email' : field === 'Phone' ? 'tel' : 'text'}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Review Summary */}
        {step.id === 'review' && (
          <div className="space-y-4 mb-8 rounded-lg bg-muted/50 p-4">
            <h3 className="font-semibold text-foreground">Registration Summary</h3>
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <p className="text-muted-foreground">Organization Name</p>
                <p className="font-medium text-foreground">Eastern Cement Works Ltd</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sector</p>
                <p className="font-medium text-foreground">Cement</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">Odisha, India</p>
              </div>
              <div>
                <p className="text-muted-foreground">Projects</p>
                <p className="font-medium text-foreground">1 Project Registered</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-lg border border-border px-6 py-2 font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="ml-auto flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Submit Registration' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}
