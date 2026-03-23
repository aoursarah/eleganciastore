import React from 'react';
import { Link } from 'react-router';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8F8F8] mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              ÉLÉGANCE
            </h3>
            <p className="text-sm text-muted-foreground">
              Timeless elegance for the modern woman
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm tracking-wide">SHOP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/shop?category=Dresses" className="hover:text-foreground transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Tops" className="hover:text-foreground transition-colors">
                  Tops
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Sets" className="hover:text-foreground transition-colors">
                  Sets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="mb-4 text-sm tracking-wide">HELP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/order-tracking" className="hover:text-foreground transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm tracking-wide">NEWSLETTER</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates and exclusive offers
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Élégance. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
