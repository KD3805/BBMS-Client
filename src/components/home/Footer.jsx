import React from 'react';
import { RiFacebookCircleLine } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Red Vault</h3>
            <p className="text-sm">Making blood donation accessible and efficient for everyone.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Find Blood</a></li>
              <li><a href="#" className="hover:text-white transition">Donate</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>1234 Healthcare Ave</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@redvault.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 px-4 py-2 rounded-l-md flex-1 text-sm"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-6">
              <RiFacebookCircleLine className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <BsTwitterX className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <MdMailOutline className="w-5 h-5 cursor-pointer hover:text-white transition" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© 2024 Red Vault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}