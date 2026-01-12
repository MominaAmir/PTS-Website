import { Building, Home, Heart, ShoppingBag, School, Wrench, CheckCircle, Calendar, Users, Shield } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: <Building className="w-10 h-10" />,
      title: 'Commercial Projects',
      description: 'Complete interior design and fit-out solutions for offices, restaurants, hotels, and corporate spaces.',
      features: ['Office Design', 'Restaurant & Cafe', 'Hotel & Resort', 'Corporate Spaces'],
      timeline: '4-12 Weeks',
      team: 'Dedicated Project Team'
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: 'Residential Projects',
      description: 'Luxury villas, apartments, and penthouses designed to reflect personal style and maximize space.',
      features: ['Villa Design', 'Apartment Interior', 'Penthouse', 'Custom Homes'],
      timeline: '8-16 Weeks',
      team: 'Senior Designer + Team'
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: 'Healthcare & Education',
      description: 'Specialized designs for hospitals, clinics, schools, and educational institutions.',
      features: ['Hospital Design', 'Medical Clinics', 'Schools', 'Universities'],
      timeline: '12-24 Weeks',
      team: 'Specialized Design Team'
    },
    {
      icon: <ShoppingBag className="w-10 h-10" />,
      title: 'Retail Spaces',
      description: 'Store designs that enhance brand identity and create engaging customer experiences.',
      features: ['Boutique Stores', 'Shopping Malls', 'Showrooms', 'Pop-up Stores'],
      timeline: '4-8 Weeks',
      team: 'Retail Design Experts'
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: 'Civil Maintenance',
      description: 'Comprehensive maintenance services including repairs, renovations, and upgrades.',
      features: ['Waterproofing', 'Painting', 'Carpentry', 'Electrical'],
      timeline: 'Ongoing',
      team: 'Maintenance Crew'
    },
    {
      icon: <School className="w-10 h-10" />,
      title: 'Authority Approvals',
      description: 'Expert handling of all Dubai municipality and regulatory authority approvals.',
      features: ['DM Approvals', 'DDA Approvals', 'Civil Defense', 'Utility Connections'],
      timeline: '2-6 Weeks',
      team: 'Approval Specialists'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Consultation & Brief',
      description: 'Understanding your requirements, budget, and vision'
    },
    {
      step: '02',
      title: 'Concept Design',
      description: 'Creating initial designs and 3D visualizations'
    },
    {
      step: '03',
      title: 'Detailed Planning',
      description: 'Technical drawings, material selection, and approvals'
    },
    {
      step: '04',
      title: 'Execution',
      description: 'Professional fit-out with quality control'
    },
    {
      step: '05',
      title: 'Handover',
      description: 'Final inspection and project delivery'
    },
    {
      step: '06',
      title: 'Aftercare',
      description: 'Maintenance support and warranty services'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl opacity-90">
            End-to-end interior design and fit-out solutions tailored to your needs. 
            From concept to completion, we handle every detail.
          </p>
        </div>
      </div>

      {/* All Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Comprehensive Solutions</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We offer a complete range of interior design and construction services for every type of space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    {service.icon}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span className="font-semibold">{service.timeline}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-neutral-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium">{service.team}</span>
                  </div>
                  <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Process */}
      <div className="bg-neutral-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Proven Process</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A systematic approach that ensures quality, timeline adherence, and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-4xl font-bold text-secondary mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-primary/20"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Why Choose PTS?</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">13+ Years Experience</h3>
                  <p className="text-neutral-600">Deep understanding of Dubai market and regulations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">In-House Team</h3>
                  <p className="text-neutral-600">Complete control with our own designers, engineers, and craftsmen.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Quality Assurance</h3>
                  <p className="text-neutral-600">Rigorous quality checks at every stage of the project.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Timely Delivery</h3>
                  <p className="text-neutral-600">Project management expertise ensures on-time completion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Get a Free Quote</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-white/70"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-white/70"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-white/70"
              />
              <select className="w-full px-4 py-3 bg-white/10 rounded-lg text-white">
                <option value="">Select Service</option>
                <option value="commercial">Commercial Projects</option>
                <option value="residential">Residential Projects</option>
                <option value="healthcare">Healthcare & Education</option>
                <option value="retail">Retail Spaces</option>
              </select>
              <textarea
                placeholder="Project Details"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-white/70 resize-none"
              />
              <button className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-lg transition-colors">
                Request Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}