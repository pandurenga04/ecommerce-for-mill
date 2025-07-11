"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Phone, Mail, MapPin, Leaf, Award, Users, Clock, ShoppingBag, ArrowRight, Menu, X } from 'lucide-react'
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (showLoading) {
    return (
      <div className="min-h-screen gradient-green flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-fjSpbRoy822uGsEpL4RD5nQQzsBySOYXA&s')] opacity-10"></div>
        <div className="text-center animate-fade-in z-10 max-w-sm sm:max-w-lg">
          <div className="mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-pulse-green">
              <Leaf className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold text-white mb-3 sm:mb-6 drop-shadow-lg">SRI SRINIVASA</h1>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-green-100 mb-2 sm:mb-4">FLOUR MILLS</h2>
          <p className="text-base sm:text-xl md:text-2xl text-green-100 font-semibold animate-float">80 YEARS OF LEGACY</p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl px-3 sm:px-4 py-3 sm:py-4 sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-10 h-10 sm:w-14 sm:h-14 gradient-green rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="text-white w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-2xl font-bold text-gradient">Sri Srinivasa Flour Mills</h1>
              <p className="text-xs sm:text-sm text-green-600 font-medium">80 Years of Legacy</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-sm font-bold text-gradient">Sri Srinivasa</h1>
              <p className="text-xs text-green-600 font-medium">80 Years Legacy</p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/products">
              <Button variant="ghost" className="text-green-700 hover:text-green-600 hover:bg-green-50 font-medium">
                Products
              </Button>
            </Link>
            <Link href="/cart">
              <Button className="gradient-green text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Cart ({cartItemCount})
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/cart">
              <Button size="sm" className="gradient-green text-white px-2 py-1 text-xs">
                <ShoppingBag className="w-3 h-3 mr-1" />
                {cartItemCount}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-green-100">
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-green-700 hover:bg-green-50">
                  Products
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-green-700 hover:bg-green-50">
                  Cart ({cartItemCount})
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 gradient-green opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1227198304/photo/colourful-background-from-various-herbs-and-spices-for-cooking-in-bowls.jpg?s=612x612&w=0&k=20&c=OtzOlSOjQ0a9giYM0FKyRJqIsIvWguEZv9pCzjKs5vo=')] bg-cover bg-center opacity-20"></div>

        {/* Floating Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div
          className="hidden sm:block absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="hidden sm:block absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 text-center text-white max-w-6xl px-4">
          <div className="animate-slide-up">
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold mb-4 sm:mb-8 drop-shadow-2xl leading-tight">
              Traditional
              <span className="block text-green-200">Quality</span>
            </h1>
            <p className="text-sm sm:text-xl md:text-3xl mb-8 sm:mb-12 drop-shadow-lg font-light max-w-4xl mx-auto leading-relaxed px-4">
              Premium flours and authentic masala powders crafted with 80 years of expertise and love
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full w-full sm:w-auto"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-green-100">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium text-sm sm:text-base">5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: Clock, number: "80+", label: "Years Legacy", color: "text-green-600" },
              { icon: Award, number: "23+", label: "Premium Products", color: "text-emerald-600" },
              { icon: Users, number: "5000+", label: "Happy Customers", color: "text-teal-600" },
              { icon: Star, number: "5.0", label: "Customer Rating", color: "text-green-600" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center p-4 sm:p-8 card-hover border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50"
              >
                <CardContent className="p-0">
                  <stat.icon className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 ${stat.color}`} />
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-medium text-xs sm:text-base">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 gradient-green-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient mb-4 sm:mb-6">About Sri Srinivasa Flour Mills</h2>
            <div className="w-24 sm:w-32 h-1 gradient-green mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              A legacy brand with 80 years of trust in delivering high-quality flours and traditional masala powders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Sri Srinivasa Flour Mills is a legacy brand with 80 years of trust in delivering high-quality flours and
                traditional masala powders. We are committed to purity, tradition, and taste that brings families
                together.
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 sm:w-7 sm:h-7 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-700 text-base sm:text-lg font-semibold">5.0 Customer Rating</span>
              </div>

              <Link href="/products">
                <Button className="gradient-green text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-full sm:w-auto">
                  Explore Products
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 card-hover order-1 lg:order-2">
              <CardContent className="p-6 sm:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-gradient mb-6 sm:mb-8">Why Choose Us?</h3>
                <ul className="space-y-4 sm:space-y-6">
                  {[
                    "100% Pure and Natural Ingredients",
                    "Traditional Processing Methods",
                    "Quality Tested Products",
                    "Fast & Reliable Delivery",
                    "80 Years of Trusted Experience",
                    "Authentic Traditional Recipes",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 gradient-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm sm:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient mb-4 sm:mb-6">Our Commitment</h2>
            <div className="w-24 sm:w-32 h-1 gradient-green mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Natural",
                description: "Pure ingredients with no artificial additives or preservatives",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Rigorous quality testing ensures the finest products reach you",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Clock,
                title: "Traditional Methods",
                description: "Time-tested processes passed down through generations",
                color: "from-teal-500 to-green-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 sm:p-8 card-hover border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50"
              >
                <CardContent className="p-0">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 gradient-green relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-8">Ready to Experience Quality?</h2>
          <p className="text-base sm:text-xl text-green-100 mb-8 sm:mb-12 leading-relaxed px-4">
            Join thousands of satisfied customers who trust Sri Srinivasa Flour Mills for their daily needs
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full w-full sm:w-auto"
            >
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="md:col-span-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-green rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold">Sri Srinivasa Flour Mills</h3>
                  <p className="text-green-400 font-medium text-sm sm:text-base">80 Years of Legacy</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0 text-sm sm:text-base">
                Delivering premium quality flours and traditional masala powders with trust, authenticity, and the love
                of generations.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-300 ml-2 text-sm sm:text-base">Trusted by 5000+ families</span>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-green-400">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Home", "Products", "Cart", "About Us"].map((link) => (
                  <li key={link}>
                    <Link
                      href={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "")}`}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-green-400">Contact Info</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base">+91 79043 56029</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base">info@srisrinivasaflour.com</span>
                </div>
                <div className="flex items-start justify-center sm:justify-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base text-center sm:text-left">
                    Traditional Flour Mills
                    <br />
                    Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              © 2024 Sri Srinivasa Flour Mills. All rights reserved. Made with ❤️ for quality.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
