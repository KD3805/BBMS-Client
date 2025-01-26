import React from 'react'
import { PiHandHeartFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { FaAward } from "react-icons/fa";

const stats = [
    {
      label: 'Total Donations',
      value: '15,000+',
      icon: PiHandHeartFill,
      description: 'Lives impacted through donations'
    },
    {
      label: 'Active Donors',
      value: '5,000+',
      icon: FaUsers,
      description: 'Registered donors available'
    },
    {
      label: 'Success Rate',
      value: '99.9%',
      icon: FaAward,
      description: 'Successful donations completed'
    }
];


const Stats = () => {
    return (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="overflow-hidden border bg-gray-50 p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition">
                  <stat.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                  <div className="mt-2 text-lg font-medium text-gray-900">{stat.label}</div>
                  <div className="mt-1 text-gray-500">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Stats
