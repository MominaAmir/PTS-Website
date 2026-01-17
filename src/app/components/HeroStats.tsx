'use client'

import { motion } from 'framer-motion'

interface HeroStatsProps {
  stats: {
    years: number
    projects: number
    team: number
    satisfaction: number
  }
}

export default function HeroStats({ stats }: HeroStatsProps) {
  const statItems = [
    { value: `${stats.years}+`, label: 'Years in Dubai' },
    { value: `${stats.projects}+`, label: 'Projects Completed' },
    { value: `${stats.team}+`, label: 'Expert Team' },
    { value: `${stats.satisfaction}%`, label: 'Client Satisfaction' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {statItems.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
        >
          <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
          <div className="text-sm md:text-base opacity-90">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}