import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <footer className="bg-stone-950 text-stone-400 w-full mt-20 border-t border-stone-800">
      {/* Newsletter Section */}
      <div className="border-b border-stone-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl font-bold mb-1">Join the Culinary Circle</h3>
            <p className="text-sm">Exclusive seasonal recipes and priority delivery updates.</p>
          </div>
          {isSubmitted ? (
            <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-500 px-8 py-3 rounded-full border border-emerald-500/20 animate-in zoom-in duration-500">
               <span className="material-symbols-outlined text-sm">verified</span>
               <span className="text-sm font-black uppercase tracking-widest">Signal Joined successfully!</span>
            </div>
          ) : (
            <form className="flex w-full md:w-auto max-w-md gap-2" onSubmit={handleSubmit}>
              <input 
                required
                type="email" 
                placeholder="your@email.com" 
                className="bg-stone-900 border border-stone-800 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-primary/50 w-full md:w-64 transition-all"
              />
              <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95">
                Send
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-8 py-16 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3448/3448636.png" 
              alt="The Culinary Curator" 
              className="w-10 h-10 brightness-0 invert" 
            />
            <span className="text-xl font-bold text-white tracking-tight">The Culinary Curator</span>
          </div>
          <p className="text-sm leading-relaxed mb-8">
            Redefining the digital dining experience through curated excellence, 
            artisanal delivery, and farm-to-table integrity.
          </p>
          <div className="flex gap-4">
            {["public", "alternate_email", "share"].map((icon) => (
              <a
                key={icon}
                className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links Column */}
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navigation</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">The Journal</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors">Curated Categories</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Your Order Tray</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors font-bold text-primary">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact/Address Column */}
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect</h4>
          <div className="space-y-4 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-orange-500 text-lg">location_on</span>
              <span>
                12 Gourmet Plaza, <br />
                Vasant Kunj, New Delhi, <br />
                Delhi 110070, India
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-orange-500 text-lg">call</span>
              <span>+91 999 000 1122</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-orange-500 text-lg">mail</span>
              <a href="mailto:curate@culinarycurator.com" className="hover:text-white transition-colors">curate@culinarycurator.com</a>
            </div>
          </div>
        </div>

        {/* Map Column */}
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Find Us</h4>
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-stone-800 shadow-inner group">
            <iframe 
              title="Mini Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.7482937748806!2d77.15086!3d28.53229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1de72f44c4b5%3A0xe5a3c94f58c7028!2sVasant%20Kunj%2C%20New%20Delhi%2C%20Delhi%215e0!3m2!1sen!2sin!4v1711874200000!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) brightness(0.8)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-stone-900 py-8 text-center text-xs tracking-wide">
        <p>© {currentYear} The Culinary Curator. All rights reserved. Crafted by Gourmet Labs.</p>
      </div>
    </footer>
  );
};

export default Footer;
