import React from 'react';
import { LuDroplet } from "react-icons/lu";

const bloodTypes = [
  { type: 'A+', canGiveTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  { type: 'O+', canGiveTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O+', 'O-'] },
  { type: 'B+', canGiveTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  { type: 'AB+', canGiveTo: ['AB+'], canReceiveFrom: ['All Types'] },
  { type: 'A-', canGiveTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  { type: 'O-', canGiveTo: ['All Types'], canReceiveFrom: ['O-'] },
  { type: 'B-', canGiveTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  { type: 'AB-', canGiveTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] }
];

export default function BloodTypes() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Blood Type Compatibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodTypes.map((blood) => (
            <div key={blood.type} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <LuDroplet className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold ml-3">{blood.type}</span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-gray-700">Can Give To:</p>
                  <p className="text-gray-600">{Array.isArray(blood.canGiveTo) ? blood.canGiveTo.join(', ') : blood.canGiveTo}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Can Receive From:</p>
                  <p className="text-gray-600">{Array.isArray(blood.canReceiveFrom) ? blood.canReceiveFrom.join(', ') : blood.canReceiveFrom}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}