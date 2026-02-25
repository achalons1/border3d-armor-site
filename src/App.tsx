import { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, User, Menu, X, ChevronDown, 
  Upload, MessageCircle, Printer, Truck, Star, 
  Shield, Clock, Award, Facebook, 
  Instagram, Twitter, Mail, MapPin, 
  Minus, Plus, Trash2, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
}

// Products data
const products: Product[] = [
  { id: 1, name: 'Dwarf Kingsguard - Sons of Ymir', price: 2.25, image: '/images/product-dwarf-kingsguard.jpg', category: 'Miniatures' },
  { id: 2, name: 'Dwarf Veterans Unit', price: 2.25, image: '/images/product-dwarf-veteran.jpg', category: 'Miniatures' },
  { id: 3, name: 'The Winged Hussar', price: 8.00, image: '/images/product-hussar.jpg', category: 'Miniatures' },
  { id: 4, name: 'Skeleton Spearmen Command', price: 10.00, image: '/images/product-skeleton.jpg', category: 'Miniatures' },
];

const portfolioItems = [
  { id: 1, name: 'Cosplay Helmet - Geoffro Edition', price: 140.00, image: '/images/portfolio-helmet.jpg', category: 'Cosplay' },
  { id: 2, name: 'Sci-Fi Plasma Rifle', price: 85.00, image: '/images/portfolio-weapon.jpg', category: 'Props' },
  { id: 3, name: 'Fantasy Dragon Bust', price: 120.00, image: '/images/portfolio-dragon.jpg', category: 'Sculpture' },
  { id: 4, name: 'Ornate Fantasy Sword', price: 95.00, image: '/images/portfolio-sword.jpg', category: 'Props' },
];

const reviews: Review[] = [
  { id: 1, name: 'Customer', date: 'Deluxe Cosplay Armor 11/05/2021', rating: 5, text: 'I was super happy with my print yet again! They will require very minimal clean up prior to paint. Thanks again and this is one happy customer.' },
  { id: 2, name: 'Aleks', date: 'Fast delivery', rating: 5, text: 'Fast delivery and quality was as expected. Packed with attention and care. Will use this shop again!' },
  { id: 3, name: 'Aaron', date: 'Excellent experience', rating: 5, text: 'Excellent prices, quality, and communication from this seller! I highly recommend to all those looking to build a massive skeleton horde.' },
];

const faqs = [
  { question: 'What file formats do you accept?', answer: 'We accept STL, OBJ, and 3MF file formats. If you have a different format, contact us and we\'ll help you convert it.' },
  { question: 'How long does shipping take?', answer: 'Most orders ship within 3-5 business days. Shipping time varies by location, typically 3-7 business days within the US.' },
  { question: 'What materials do you use?', answer: 'We use high-quality resin for detailed miniatures and durable PLA/PETG filament for larger props and cosplay items.' },
  { question: 'Do you offer custom designs?', answer: 'Yes! We can work with your designs or help create custom models. Use our quote request form to get started.' },
];

// Navigation Component
function Navigation({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#shop' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-10 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">B3</span>
            </div>
            <span className="text-white font-semibold text-xl hidden sm:block">Border3D</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium underline-animation transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-white/80 hover:text-white transition-colors p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-white transition-colors p-2 hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={onCartClick}
              className="text-white/80 hover:text-white transition-colors p-2 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center text-white font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-white/80 hover:text-white py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Announcement Bar
function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 h-10 flex items-center overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-white text-sm font-medium mx-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Free shipping on all products over $50
          </span>
        ))}
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111]" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="text-lg">🇺🇸</span>
              <span className="text-white/80 text-sm font-medium">Proudly Veteran-Owned</span>
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Veteran-Owned{' '}
              <span className="text-red-500">3D Printing</span>{' '}
              Studio
            </h1>

            <p className="text-xl text-white/70 max-w-lg">
              Custom miniatures, cosplay props, and custom builds. We bring your imagination to life with precision and quality.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#quote" className="btn-primary flex items-center gap-2">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#portfolio" className="btn-secondary">
                View Portfolio
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="trust-badge">
                <Shield className="w-5 h-5 text-red-500" />
                <span>Premium Quality</span>
              </div>
              <div className="trust-badge">
                <Clock className="w-5 h-5 text-red-500" />
                <span>Fast Turnaround</span>
              </div>
              <div className="trust-badge">
                <Award className="w-5 h-5 text-red-500" />
                <span>Veteran Owned</span>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              {/* Main dragon image */}
              <div className="absolute top-0 right-0 w-80 h-80 animate-float">
                <img 
                  src="/images/hero-dragon.jpg" 
                  alt="3D Printed Dragon"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              {/* Secondary miniatures image */}
              <div className="absolute bottom-0 left-0 w-72 h-72 animate-float" style={{ animationDelay: '1s' }}>
                <img 
                  src="/images/hero-miniatures.jpg" 
                  alt="3D Printed Miniatures"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-black"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// What We Create Section
function WhatWeCreateSection() {
  const categories = [
    {
      title: 'Miniatures',
      description: 'Ultra-detailed resin miniatures for tabletop and collectors.',
      image: '/images/category-miniatures.jpg',
    },
    {
      title: 'Cosplay Prints',
      description: 'Helmets, armor parts, and props printed in durable materials.',
      image: '/images/category-cosplay.jpg',
    },
    {
      title: 'Custom Builds',
      description: 'One-of-a-kind prints, terrain, gifts, and specialty models.',
      image: '/images/category-custom.jpg',
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What We Create</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From intricate miniatures to life-size props, we transform your ideas into reality
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className="product-card group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="img-zoom aspect-square">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition-colors">
                  {category.title}
                </h3>
                <p className="text-white/60 text-sm">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Portfolio Section
function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Portfolio</h2>
            <p className="text-white/60">Showcasing our finest work</p>
          </div>
          <a href="#shop" className="text-red-500 hover:text-red-400 flex items-center gap-2 font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              className="portfolio-item group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4]">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="portfolio-overlay flex flex-col justify-end p-6">
                <span className="text-red-500 text-sm font-medium mb-1">{item.category}</span>
                <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                <p className="text-white/80">${item.price.toFixed(2)} USD</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    { icon: Upload, title: 'Send Your Idea', description: 'Upload your STL or describe your idea.' },
    { icon: MessageCircle, title: 'We Quote It', description: 'You get a clear, fast quote based on size & material.' },
    { icon: Printer, title: 'We Print', description: 'Precision resin or durable filament prints.' },
    { icon: Truck, title: 'We Ship', description: 'Fast shipping from Texas with tracking.' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Getting your custom 3D print is easy. Just follow these simple steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4 relative">
                  <step.icon className="w-8 h-8 text-red-500" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-red-600/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quote CTA Section
function QuoteCTASection() {
  return (
    <section id="quote" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-black" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Request a Custom Quote
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Get a personalized quote for your 3D printing project. No experience needed - just describe your idea and we\'ll handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => toast.info('Quote form coming soon!')}
              className="btn-primary animate-pulse-glow"
            >
              Request a Quote
            </button>
            <a href="#contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured Products Section
function FeaturedProductsSection({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  return (
    <section id="shop" className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Featured Collection</h2>
            <p className="text-white/60">Highlands Miniatures - Premium Quality</p>
          </div>
          <a href="#shop" className="text-red-500 hover:text-red-400 flex items-center gap-2 font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="product-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="img-zoom aspect-square relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    onClick={() => onAddToCart(product)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-red-500 text-xs font-medium">{product.category}</span>
                <h3 className="text-white font-medium mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-white/80 font-semibold">From ${product.price.toFixed(2)} USD</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reviews Section
function ReviewsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Don\'t just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className="testimonial-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-white/80 mb-4">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-semibold">{review.name[0]}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{review.name}</p>
                  <p className="text-white/50 text-sm">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-white/60">Got questions? We\'ve got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <div className="faq-answer">
                <p className="text-white/60 pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact CTA Section
function ContactCTASection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-black" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Bring Your Idea to Life?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Describe your project and get a fast, clear quote — no experience needed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => toast.info('Quote form coming soon!')}
              className="btn-primary"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B3</span>
              </div>
              <span className="text-white font-semibold text-xl">Border3D</span>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Premium 3D printing services for cosplay, gaming, and custom creations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Shop', 'Services', 'Portfolio', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {['Shipping Policy', 'Refund Policy', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Subscribe to our emails</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="input-dark flex-1"
              />
              <Button 
                onClick={() => toast.success('Subscribed successfully!')}
                className="bg-red-600 hover:bg-red-700"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@border3d.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Texas, USA</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Border3D. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-sm">🇺🇸</span>
            <span className="text-white/40 text-sm">United States | USD $</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Cart Drawer
function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemove 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#111] border-white/10 w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Your cart is empty</p>
              <Button 
                onClick={onClose}
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 rounded-lg p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-red-500 font-semibold mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20"
                        >
                          <Minus className="w-3 h-3 text-white" />
                        </button>
                        <span className="text-white text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20"
                        >
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="ml-auto text-white/40 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between mb-4">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white font-semibold">${total.toFixed(2)}</span>
                </div>
                <Button 
                  onClick={() => toast.info('Checkout coming soon!')}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Checkout
                </Button>
                <p className="text-white/40 text-xs text-center mt-2">
                  Shipping calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Main App
function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black">
      <AnnouncementBar />
      <Navigation cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <HeroSection />
        <WhatWeCreateSection />
        <PortfolioSection />
        <HowItWorksSection />
        <QuoteCTASection />
        <FeaturedProductsSection onAddToCart={addToCart} />
        <ReviewsSection />
        <FAQSection />
        <ContactCTASection />
      </main>
      
      <Footer />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default App;
