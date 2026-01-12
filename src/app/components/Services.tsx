import { Building, Home, Heart, ShoppingBag, School, Wrench } from 'lucide-react'
import ServiceCard from './ServiceCard'


const Services = () => {
  const services = [
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Commercial Projects',
      description: 'Office spaces, restaurants, supermarkets, and warehouses designed for productivity and brand identity.',
      projects: 150
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Residential Projects',
      description: 'Luxury villas and apartments that reflect personal style while maximizing functionality.',
      projects: 200
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Healthcare & Education',
      description: 'Hospitals, clinics, schools designed for comfort, safety, and efficiency.',
      projects: 75
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Retail Spaces',
      description: 'Shops and kiosks that enhance customer experience and drive sales.',
      projects: 100
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Civil Maintenance',
      description: 'Complete maintenance solutions including waterproofing, painting, and carpentry.',
      projects: 'Ongoing'
    },
    {
      icon: <School className="w-8 h-8" />,
      title: 'Authority Approvals',
      description: 'Expert handling of all Dubai municipality and regulatory approvals.',
      projects: '100% Success'
    }
  ]

  return (
    <section className="py-24 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            End-to-end interior design and fit-out solutions for every space, 
            backed by 13+ years of Dubai expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services