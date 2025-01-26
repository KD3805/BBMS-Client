import React from 'react';
import { MdOutlineFormatQuote } from "react-icons/md";

const testimonials = [
  {
    quote: "Donating blood was such a rewarding experience. The process was smooth and the staff was incredibly supportive.",
    author: "Sarah Johnson",
    role: "Regular Donor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Red Vault's quick response during my emergency situation saved my life. I'm forever grateful.",
    author: "Michael Chen",
    role: "Blood Recipient",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl relative">
              <MdOutlineFormatQuote className="absolute top-4 right-4 w-8 h-8 text-red-200" />
              <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}