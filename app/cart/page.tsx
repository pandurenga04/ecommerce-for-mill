"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingCart, Leaf, ArrowRight, Star, Menu, X, Truck } from 'lucide-react'
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTamilNadu, setIsTamilNadu] = useState(true) // Default to Tamil Nadu

  // Delivery Charge Logic
  const calculateDeliveryCharge = () => {
    const subtotal = getTotalPrice()
    let masalaWeightKg = 0
    let otherWeightKg = 0
    let hasMasala = false

    cartItems.forEach((item) => {
      const weightStr = item.weight.toLowerCase()
      let weightKg = 0

      if (weightStr.includes("kg")) {
        weightKg = parseFloat(weightStr.replace("kg", ""))
      } else if (weightStr.includes("g")) {
        weightKg = parseFloat(weightStr.replace("g", "")) / 1000
      }

      if (item.category === "Masala Powders") {
        hasMasala = true
        masalaWeightKg += weightKg * item.quantity
      } else {
        otherWeightKg += weightKg * item.quantity
      }
    })

    let deliveryCharge = 0
    // Masala Powders: Free delivery if subtotal >= ₹599, else ₹70/kg in TN, ₹140/kg outside TN
    if (hasMasala && subtotal < 599) {
      const masalaCharge = isTamilNadu ? masalaWeightKg * 70 : masalaWeightKg * 140
      deliveryCharge += Math.max(masalaCharge, 70) // Minimum ₹70
    }
    // Other categories: ₹70/kg in TN, ₹140/kg outside TN
    if (otherWeightKg > 0) {
      const otherCharge = isTamilNadu ? otherWeightKg * 70 : otherWeightKg * 140
      deliveryCharge += Math.max(otherCharge, 70) // Minimum ₹70
    }

    return deliveryCharge
  }

  const deliveryCharge = calculateDeliveryCharge()
  const subtotal = getTotalPrice()
  const finalTotal = subtotal + deliveryCharge
  const isFreeDelivery = deliveryCharge === 0

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-md shadow-xl px-3 sm:px-4 py-3 sm:py-4 border-b border-green-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2 sm:gap-4 cursor-pointer">
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
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-green-700 hover:text-green-600 hover:bg-green-50 font-medium">
                  Home
                </Button>
              </Link>
              <Link href="/products">
                <Button className="gradient-green text-white hover:shadow-lg transition-all duration-300">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="flex sm:hidden items-center">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t border-green-100">
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-green-700 hover:bg-green-50">
                    Home
                  </Button>
                </Link>
                <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-green-700 hover:bg-green-50">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="animate-slide-up">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 gradient-green rounded-full flex items-center justify-center shadow-2xl">
              <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4 sm:mb-6">Your Cart is Empty</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-md mx-auto px-4">
              Discover our premium collection of traditional flours and authentic masala powders!
            </p>
            <Link href="/products">
              <Button className="gradient-green text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-full sm:w-auto">
                Browse Products
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-green rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="text-white w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold">Sri Srinivasa Flour Mills</h3>
                <p className="text-green-400 font-medium text-sm sm:text-base">80 Years of Legacy</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">© 2025 Sri Srinivasa Flour Mills. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl px-3 sm:px-4 py-3 sm:py-4 sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 sm:gap-4 cursor-pointer">
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
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-green-700 hover:text-green-600 hover:bg-green-50 font-medium">
                Home
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent font-medium"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex sm:hidden items-center">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-green-100">
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-green-700 hover:bg-green-50">
                  Home
                </Button>
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-green-700 hover:bg-green-50">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-gradient mb-4 sm:mb-6">Shopping Cart</h1>
          <div className="w-24 sm:w-32 h-1 gradient-green mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-xl text-gray-600">Review your selected items</p>
        </div>

        {/* Free Delivery Banner for Masala Powders */}
        {!isFreeDelivery && subtotal < 599 && cartItems.some(item => item.category === "Masala Powders") && (
          <div className="mb-6 sm:mb-8">
            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-center gap-3 text-center">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-800 text-sm sm:text-base">
                      Add ₹{(599 - subtotal).toFixed(2)} more for FREE delivery on Masala Powders!
                    </p>
                    <p className="text-orange-600 text-xs sm:text-sm">
                      Currently: ₹{isTamilNadu ? "70" : "140"}/kg delivery charge for Masala Powders • Free delivery on orders ₹599+
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delivery Charge Banner for All Categories */}
        {!isFreeDelivery && (
          <div className="mb-6 sm:mb-8">
            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-center gap-3 text-center">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-800 text-sm sm:text-base">
                      Delivery charge: ₹{isTamilNadu ? "70" : "140"} per kg (minimum ₹70)
                    </p>
                    <p className="text-orange-600 text-xs sm:text-sm">
                      Current delivery charge: ₹{deliveryCharge.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Free Delivery Success Banner */}
        {isFreeDelivery && cartItems.some(item => item.category === "Masala Powders") && (
          <div className="mb-6 sm:mb-8">
            <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-center gap-3 text-center">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800 text-sm sm:text-base">
                      🎉 Congratulations! You've earned FREE delivery on Masala Powders!
                    </p>
                    <p className="text-green-600 text-xs sm:text-sm">You saved ₹{isTamilNadu ? "70" : "140"}/kg on delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {cartItems.map((item) => (
              <Card
                key={`${item.name}-${item.weight}`}
                className="card-hover border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="p-4 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 gradient-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="font-bold text-xl sm:text-2xl text-gray-800 mb-2">{item.name}</h3>
                          <Badge className="gradient-green text-white border-0 mb-2 sm:mb-3 text-xs sm:text-sm">
                            {item.category}
                          </Badge>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                    star <= Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600">({item.rating})</span>
                          </div>
                          <p className="text-green-600 font-bold text-lg sm:text-xl">₹{item.price}/{item.weight}</p>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.name, item.weight)}
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 self-start"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 bg-green-50 rounded-full p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.name, Math.max(1, item.quantity - 1), item.weight)}
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full border-green-200 hover:bg-green-100"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <span className="w-12 sm:w-16 text-center font-bold text-lg sm:text-xl text-green-700">
                            {item.quantity} × {item.weight}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.name, item.quantity + 1, item.weight)}
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full border-green-200 hover:bg-green-100"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="font-bold text-2xl sm:text-3xl text-gradient">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 sm:top-24 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="gradient-green text-white rounded-t-lg">
                <CardTitle className="text-lg sm:text-2xl flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.name}-${item.weight}`}
                      className="flex justify-between items-center p-3 sm:p-4 bg-green-50 rounded-xl"
                    >
                      <div className="flex-1 pr-2">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">{item.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {item.quantity} × {item.weight} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-bold text-green-600 text-base sm:text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <hr className="border-green-200" />

                {/* Location Checkbox */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="location"
                    checked={isTamilNadu}
                    onCheckedChange={(checked) => setIsTamilNadu(checked === true)}
                  />
                  <Label htmlFor="location" className="text-gray-700 font-semibold text-sm sm:text-base">
                    Delivery within Tamil Nadu
                  </Label>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  {isTamilNadu
                    ? "₹70/kg for all categories (minimum ₹70)"
                    : "₹140/kg for all categories (minimum ₹70)"}
                </p>

                <hr className="border-green-200" />

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Subtotal:</span>
                    <span className="font-bold text-gray-800">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700 font-medium">Delivery:</span>
                    </div>
                    <div className="text-right">
                      {isFreeDelivery ? (
                        <div>
                          <span className="font-bold text-green-600">FREE</span>
                          {cartItems.some(item => item.category === "Masala Powders") && (
                            <p className="text-xs text-gray-500 line-through">
                              ₹{isTamilNadu ? "70" : "140"}/kg
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="font-bold text-gray-800">₹{deliveryCharge.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="border-green-200" />

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-800">Total:</span>
                    <span className="text-2xl sm:text-3xl font-bold text-gradient">₹{finalTotal.toFixed(2)}</span>
                  </div>
                  {isFreeDelivery && cartItems.some(item => item.category === "Masala Powders") && (
                    <p className="text-sm text-green-600 mt-2 text-center">
                      🎉 You saved ₹{isTamilNadu ? "70" : "140"}/kg on delivery for Masala Powders!
                    </p>
                  )}
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full gradient-green text-white text-base sm:text-xl py-4 sm:py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                </Link>

                <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                    Why Choose Us?
                  </h4>
                  <ul className="text-xs sm:text-sm text-blue-700 space-y-1 sm:space-y-2">
                    <li>✓ 100% Pure & Natural</li>
                    <li>✓ 80 Years of Trust</li>
                    <li>✓ Fast Delivery</li>
                    <li>✓ Quality Guaranteed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-green rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold">Sri Srinivasa Flour Mills</h3>
              <p className="text-green-400 font-medium text-sm sm:text-base">80 Years of Legacy</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">© 2025 Sri Srinivasa Flour Mills. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
