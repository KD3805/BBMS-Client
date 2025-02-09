import React from 'react';
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const steps = [
  {
    title: 'Registration',
    description: 'Complete a brief registration form and basic health screening',
    icon: BsFillClipboardCheckFill,
    time: '10-15 minutes'
  },
  {
    title: 'Health Check',
    description: 'Quick physical examination and hemoglobin test',
    icon: FaUserCheck,
    time: '10-15 minutes'
  },
  {
    title: 'Donation',
    description: 'The actual blood donation process',
    icon: FaRegHeart,
    time: '8-10 minutes'
  },
  {
    title: 'Recovery',
    description: 'Rest and refreshments before leaving',
    icon: FaRegClock,
    time: '10-15 minutes'
  }
];

export default function DonationProcess() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">The Donation Process</h2>
        <div className="relative">
          <div className="absolute top-8 left-[50%] h-[calc(100%-4rem)] w-px bg-gray-400 md:block hidden" />
          <div className="absolute top-8 left-[50.2%] h-[calc(100%-4rem)] w-px bg-gray-400 md:block hidden" />
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.title} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block w-1/2" />
                <div className="absolute left-[50%] -translate-x-1/2 z-10 hidden md:block">
                  <div className="bg-white w-8 h-8 rounded-full border-4 border-red-600" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-gray-500 text-sm">{step.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}