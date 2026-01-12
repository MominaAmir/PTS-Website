'use client'

import { ClipboardCheck, Palette, FileCheck, Hammer, CheckCircle, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

const Process = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: 'Consultation',
      description: 'We listen to your vision, requirements, and budget',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Design Concept',
      description: 'Create initial designs and 3D visualizations',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Planning & Approval',
      description: 'Technical drawings and authority approvals',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: 'Execution',
      description: 'Professional fit-out with quality control',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Handover',
      description: 'Final inspection and project delivery',
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Aftercare',
      description: 'Maintenance support and warranty services',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our 6-Step Process
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            A systematic approach that ensures quality, timeline adherence, and client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${step.color} text-white`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold text-primary mr-2">{index + 1}</span>
                      <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                    </div>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process