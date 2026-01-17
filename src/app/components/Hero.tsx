'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Sparkles, Award, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HeroProps {
  stats?: {
    years: number
    projects: number
    team: number
    satisfaction: number
  }
}

export default function Hero({ stats }: HeroProps) {
  const defaultStats = {
    years: 13,
    projects: 500,
    team: 50,
    satisfaction: 100
  }

  const displayStats = stats || defaultStats
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Text animation
  const [textIndex, setTextIndex] = useState(0)
  const luxuryWords = ["Luxury", "Prestigious", "Exclusive", "Sophisticated", "Elegant"]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % luxuryWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight
      setScrollProgress(Math.min(progress, 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with multi-layered parallax effect */}
      <div className="absolute inset-0 z-0">
        {/* Main background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            transform: `translateY(${scrollProgress * 30}px) scale(${1 + scrollProgress * 0.05})`,
          }}
        />
        
        {/* Animated gradient layers */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.9, 0.8, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Geometric floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating hexagon */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 border border-white/10 rounded-3xl"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated glowing orbs */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-secondary/15 rounded-full"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${10 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-white w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Premium badge with animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
            </motion.div>
            <span className="text-xs font-medium tracking-wider">13+ YEARS IN DUBAI</span>
            <motion.div
              className="w-1 h-1 bg-secondary rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Animated heading with word cycling - REDUCED SIZE */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-white/90">Transforming</span>
            <motion.span
              key={textIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="block text-secondary mt-2 font-bold"
            >
              {luxuryWords[textIndex]}
            </motion.span>
            <span className="block text-white/90 mt-2">Spaces</span>
          </h1>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="h-0.5 bg-gradient-to-r from-secondary to-primary mb-8 rounded-full"
          />

          {/* Description - REDUCED SIZE */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ease: "easeOut" }}
            className="text-base md:text-lg lg:text-xl opacity-90 mb-8 max-w-xl leading-relaxed"
          >
            Premium interior design & fit-out solutions for Dubai's most prestigious 
            residential and commercial properties.
          </motion.p>

          {/* Interactive CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 30px rgba(255, 193, 7, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-secondary to-secondary/80 text-white rounded-xl font-semibold text-sm tracking-wide overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  View Portfolio
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "rgba(255, 255, 255, 0.25)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold text-sm tracking-wide overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Book Consultation
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight className="ml-3 w-4 h-4" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Animated stats grid - REDUCED SIZE */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl">
            {[
              { 
                value: `${displayStats.years}+`, 
                label: 'Years Excellence',
                icon: <TrendingUp className="w-4 h-4" />
              },
              { 
                value: `${displayStats.projects}+`, 
                label: 'Projects',
                icon: <Award className="w-4 h-4" />
              },
              { 
                value: `${displayStats.team}+`, 
                label: 'Expert Team',
                icon: <Users className="w-4 h-4" />
              },
              { 
                value: `${displayStats.satisfaction}%`, 
                label: 'Satisfaction',
                icon: <Sparkles className="w-4 h-4" />
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -3,
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-left transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/15 to-primary/15 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-secondary mb-2">
                    <motion.div
                      animate={{ rotate: [0, 8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                  <motion.div
                    className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs opacity-80 leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Side decorative elements */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden xl:block">
        <motion.div
          className="h-48 w-0.5 bg-gradient-to-b from-transparent via-secondary to-transparent"
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Background text pattern - SMALLER */}
      <div className="absolute right-6 bottom-6 opacity-[0.03] rotate-90 origin-bottom-right hidden 2xl:block">
        <div className="text-[6rem] font-black tracking-widest whitespace-nowrap">
          LUXURY · DESIGN · EXCELLENCE
        </div>
      </div>
    </section>
  )
}