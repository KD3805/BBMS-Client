import Footer from "../home/Footer";
import AboutHero from "./AboutHero";
import BloodTypes from "./BloodTypes";
import DonationProcess from "./DonationProcess";
import Eligibility from "./Eligibility";

export default function AboutBloodDonation() {
    return (
      <div className="min-h-screen bg-gray-50">
        <AboutHero />
        <BloodTypes />
        <DonationProcess />
        <Footer />
      </div>
    );
  }