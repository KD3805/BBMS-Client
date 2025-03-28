import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger plugin

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const [active, setActive] = useState("ABOUT US");
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current URL location
    const [checked, setChecked] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".navbar-item", {
            y: -30,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            stagger: 0.15,
        }, "nav anim")
    })

    const links = [
        {
            menu: { name: "ABOUT US", link: "/" },
            submenu: [],
        },
        {
            menu: { name: "LOOKING FOR BLOOD", link: "/RecipientLogin" },
            submenu: [
                { name: "Recipient Login", link: "/RecipientLogin" },
                { name: "Recipient Registration", link: "/RecipientSignup" },
                { name: "Blood Availability", link: "/BloodAvailability" },
                { name: "Thalassemia Detection", link: "/Thalassemia/Detection" },
            ],
        },
        {
            menu: { name: "WANT TO DONATE BLOOD", link: "/DonorLogin" },
            submenu: [
                { name: "Donor Login", link: "/DonorLogin" },
                { name: "Donor Registration", link: "/DonorSignup" },
                { name: "Eligibility", link: "/Eligibility" },
                { name: "About Blood Donation", link: "/AboutBloodDonation" },
            ],
        },
        {
            menu: { name: "BLOOD BANK LOGIN", link: "/AdminLogin" },
            submenu: [],
        },
    ];

    // **Effect to update active state when the URL changes**
    useEffect(() => {
        const currentPath = location.pathname;

        let foundActiveMenu = "ABOUT US"; // Default active menu

        for (const link of links) {
            if (link.menu.link === currentPath) {
                foundActiveMenu = link.menu.name;
                break;
            }
            if (link.submenu.some(sub => sub.link === currentPath)) {
                foundActiveMenu = link.menu.name;
                break;
            }
        }

        setActive(foundActiveMenu);
    }, [location.pathname]); // Runs whenever location changes

    return (
        <nav className="navbar">
            <a href="#" className="navbar-logo">
                <img src="/red-vault2.png" alt="Red-Vault Logo" className="logo" />
            </a>

            <div className={`nav-toggle ${checked ? "show-icon" : ""}`} id="nav-toggle">
                <GiHamburgerMenu className="nav-burger" onClick={() => setChecked(!checked)} />
                <IoCloseSharp className="nav-close" onClick={() => setChecked(!checked)} />
            </div>

            <div className={`navbar-menu ${checked ? "show-menu" : ""}`} id="navbar-menu">
                <ul className="navbar-links">
                    {links.map((link) => (
                        <li
                            key={link.menu.name}
                            className={`navbar-item ${active === link.menu.name ? "active" : ""} unline-navigation`}
                            onMouseEnter={() => setHovered(link.menu.name)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                setChecked(!checked)
                                navigate(link.menu.link);
                            }}
                        >
                            <span>{link.menu.name}</span>
                            {hovered === link.menu.name && link.submenu.length > 0 && (
                                <div className="submenu">
                                    <ul>
                                        {link.submenu.map((sublink, index) => (
                                            <li key={index} className="submenu-item" onClick={(e) => {
                                                e.stopPropagation();
                                                setHovered(null);
                                                setChecked(!checked)
                                                navigate(sublink.link);
                                            }}>
                                                {sublink.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="triangle-bg-xxs"></div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
