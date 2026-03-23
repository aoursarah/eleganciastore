import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HomePage: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);
  const categories = [
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1678723357379-d87f2a0ec8ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600' },
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1675294292199-aac27f952585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600' },
    { name: 'Sets', image: 'https://images.unsplash.com/photo-1767334010488-83cdb8539273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1769240171986-d4ba22cf3154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1691316089197-1269faeb3af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            Spring Collection 2026
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover timeless elegance with our new season arrivals
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full hover:bg-white/90 transition-all transform hover:scale-105"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* New Collection Banner */}
      <section className="py-20 bg-[#F5EDE4]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Effortless Elegance
              </h2>
              <p className="text-muted-foreground text-lg">
                Curated pieces that celebrate femininity and sophistication. Each design tells a story of modern luxury and timeless style.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>
              Trending Now
            </h2>
            <Link to="/shop" className="text-sm tracking-wide hover:underline">
              VIEW ALL
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={`/product/${product.id}`} className="group">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      ${product.price}
                    </div>
                  </div>
                  <h3 className="mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{product.reviews} reviews</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/shop?category=${category.name}`}
                  className="group block relative aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              @elegance
            </h2>
            <p className="text-muted-foreground">Follow us for daily inspiration</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt="Instagram"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-[#F6D6DA]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Our Story
              </h2>
              <p className="text-lg leading-relaxed mb-8">
                Founded in 2020, Élégance represents the perfect blend of timeless sophistication and contemporary design. 
                We believe that true luxury lies in quality craftsmanship, sustainable practices, and pieces that transcend seasons.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 text-sm tracking-wide hover:underline">
                DISCOVER MORE
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive exclusive offers, styling tips, and first access to new collections
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
