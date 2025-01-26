import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

const services = [
    {
      title: 'Register as Donor',
      description: 'Join our community of life-savers',
      icon: FaUserPlus,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Find Blood',
      description: 'Search for available blood types',
      icon: FaSearch,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Emergency Service',
      description: '24/7 support for urgent needs',
      icon: FaClock,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Nearby Centers',
      description: 'Locate blood banks near you',
      icon: LuMapPin,
      color: 'bg-purple-100 text-purple-600'
    }
];


const Services = () => {
    return (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
                >
                  <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Services
