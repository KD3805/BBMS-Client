import React from 'react';
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Footer from '../home/Footer';

const eligibilityCriteria = {
  requirements: [
    'Age between 18-65 years',
    'Weight above 50kg',
    'Hemoglobin level of 12.5g/dl or more',
    'Normal blood pressure',
    'Good general health'
  ],
  restrictions: [
    'Recent major surgery',
    'Pregnancy or recent childbirth',
    'Active infectious diseases',
    'High-risk behavior',
    'Certain chronic medical conditions'
  ]
};

export default function Eligibility() {
  return (
    <>
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-green-800 mb-6 flex items-center">
                <FaCheck className="w-6 h-6 mr-2" />
                Requirements
              </h3>
              <ul className="space-y-4">
                {eligibilityCriteria.requirements.map((item, index) => (
                  <li key={index} className="flex items-center text-green-700">
                    <FaCheck className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-red-800 mb-6 flex items-center">
                <ImCross className="w-6 h-6 mr-2" />
                Restrictions
              </h3>
              <ul className="space-y-4">
                {eligibilityCriteria.restrictions.map((item, index) => (
                  <li key={index} className="flex items-center text-red-700">
                    <ImCross className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}