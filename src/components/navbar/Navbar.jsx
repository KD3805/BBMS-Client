import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [active, setActive] = useState("ABOUT US");
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current URL location

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
            <div className="navbar-logo">
                <img src="/red-vault2.png" alt="Red-Vault Logo" className="logo" />
            </div>
            <ul className="navbar-links">
                {links.map((link) => (
                    <li
                        key={link.menu.name}
                        className={`navbar-item ${active === link.menu.name ? "active" : ""} unline-navigation`}
                        onMouseEnter={() => setHovered(link.menu.name)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={(e) => {
                            e.stopPropagation();
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
        </nav>
    );
};

export default Navbar;
