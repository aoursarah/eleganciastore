import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { SlidersHorizontal, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

type SortOption = 'newest' | 'popular' | 'price-low' | 'price-high';

export const ShopPage: React.FC = () => {
  const { products } = useStore();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const allCategories = ['Dresses', 'Tops', 'Sets', 'Accessories'];
  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const allColors = ['Black', 'White', 'Beige', 'Pink', 'Gray', 'Navy', 'Blue'];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
      const colorMatch = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return categoryMatch && sizeMatch && colorMatch && priceMatch;
    });

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default: // newest
        filtered = [...filtered];
    }

    return filtered;
  }, [products, selectedCategories, selectedSizes, selectedColors, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Shop All
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-border">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-muted transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0 hidden lg:block"
            >
              {/* Categories */}
              <div className="mb-8">
                <h3 className="mb-4">Category</h3>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <h3 className="mb-4">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                        selectedSizes.includes(size)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-8">
                <h3 className="mb-4">Color</h3>
                <div className="space-y-2">
                  {allColors.map(color => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSizes([]);
                  setSelectedColors([]);
                  setPriceRange([0, 500]);
                }}
                className="w-full px-4 py-2 border border-border rounded-full text-sm hover:bg-muted transition-colors"
              >
                Clear All Filters
              </button>
            </motion.aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
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
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
