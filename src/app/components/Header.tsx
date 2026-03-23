import React, { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingBag, Search, Menu, X, User, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { cart } = useStore();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl tracking-wider" style={{ fontFamily: 'var(--font-serif)' }}>
              ÉLÉGANCE
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              SHOP
            </Link>
            <Link to="/shop?category=Dresses" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              DRESSES
            </Link>
            <Link to="/shop?category=Tops" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              TOPS
            </Link>
            <Link to="/shop?category=Accessories" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              ACCESSORIES
            </Link>
            <Link to="/admin" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              ADMIN
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-full transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm truncate">{user?.firstName}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 hover:bg-muted rounded-full transition-colors hidden md:block">
                <User className="w-5 h-5" />
              </Link>
            )}
            
            <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link
                to="/shop"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                to="/shop?category=Dresses"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                DRESSES
              </Link>
              <Link
                to="/shop?category=Tops"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                TOPS
              </Link>
              <Link
                to="/shop?category=Accessories"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ACCESSORIES
              </Link>
              <Link
                to="/admin"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ADMIN
              </Link>
              <hr className="my-2" />
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <User className="w-5 h-5" />
                    <span>{user?.firstName} {user?.lastName}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm tracking-wide hover:text-muted-foreground transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm tracking-wide hover:text-muted-foreground transition-colors flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
