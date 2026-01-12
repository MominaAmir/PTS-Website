import { Building, Target, Users, Shield, Award, Globe } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Uncompromising quality in every detail of our work.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'Transparent processes and honest communication.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Working closely with clients to realize their vision.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Incorporating latest trends and technologies.'
    }
  ]

  const milestones = [
    { year: '2010', title: 'Company Founded', description: 'Started operations in Dubai' },
    { year: '2013', title: 'First Major Project', description: 'Completed 50,000 sq ft commercial project' },
    { year: '2016', title: 'Team Expansion', description: 'Grew to 30+ design professionals' },
    { year: '2020', title: 'Premium Partner', description: 'Became preferred vendor for luxury developments' },
    { year: '2023', title: '500+ Projects', description: 'Celebrated milestone of 500 completed projects' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl opacity-90">
            With over 13 years of excellence in Dubai, PTS Design has established 
            itself as a premier provider of innovative interior design and fit-out solutions.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Our Journey</h2>
            <div className="space-y-4 text-lg text-neutral-600">
              <p>
                Founded in 2010 as Power Point Technical Service LLC, PTS Design 
                began with a vision to transform Dubai's interior design landscape. What started 
                as a small team of passionate designers has grown into a 50+ member strong 
                organization.
              </p>
              <p>
                Over the years, we've completed over 500 projects across residential, commercial, 
                healthcare, and retail sectors. Our commitment to quality and innovation has made 
                us a trusted partner for prestigious developments across the UAE.
              </p>
              <p>
                Today, we combine traditional craftsmanship with cutting-edge technology to 
                deliver spaces that are not only beautiful but also functional and sustainable.
              </p>
            </div>
          </div>
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Building className="w-48 h-48 text-primary/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-neutral-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              The principles that guide every decision and every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-secondary mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Milestones</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Key moments that shaped our journey to becoming a leader in interior design.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>
          
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className={`p-6 bg-white rounded-2xl shadow-lg ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}>
                  <div className="text-secondary font-bold text-lg mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{milestone.title}</h3>
                  <p className="text-neutral-600">{milestone.description}</p>
                </div>
              </div>
              <div className="relative w-12 h-12 flex-shrink-0">
                <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Leadership</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Meet the experienced professionals guiding our vision and ensuring project success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Mohammed Ali', role: 'Founder & CEO', experience: '15+ Years' },
              { name: 'Sarah Johnson', role: 'Creative Director', experience: '12+ Years' },
              { name: 'Ahmed Hassan', role: 'Project Director', experience: '10+ Years' },
            ].map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-16 h-16 text-white/60" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-secondary mb-3">{member.role}</p>
                <p className="opacity-90">{member.experience} in Interior Design</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications & Partnerships */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Accreditations & Partners</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Recognized by leading industry bodies and trusted by premium brands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bg-neutral-light p-8 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="font-semibold text-primary">Certified Partner</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}