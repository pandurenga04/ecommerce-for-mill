"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingCart, Leaf, ArrowRight, Star } from "lucide-react"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-md shadow-xl px-4 py-4 border-b border-green-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="w-14 h-14 gradient-green rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="text-white w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">Sri Srinivasa Flour Mills</h1>
                  <p className="text-sm text-green-600 font-medium">80 Years of Legacy</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
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
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="animate-slide-up">
            <div className="w-32 h-32 mx-auto mb-8 gradient-green rounded-full flex items-center justify-center shadow-2xl">
              <ShoppingCart className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient mb-6">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
              Discover our premium collection of traditional flours and authentic masala powders!
            </p>
            <Link href="/products">
              <Button className="gradient-green text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full">
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 gradient-green rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Sri Srinivasa Flour Mills</h3>
                <p className="text-green-400 font-medium">80 Years of Legacy</p>
              </div>
            </div>
            <p className="text-gray-400">© 2024 Sri Srinivasa Flour Mills. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl px-4 py-4 sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-14 h-14 gradient-green rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Sri Srinivasa Flour Mills</h1>
                <p className="text-sm text-green-600 font-medium">80 Years of Legacy</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
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
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-6">Shopping Cart</h1>
          <div className="w-32 h-1 gradient-green mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600">Review your selected items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card
                key={item.name}
                className="card-hover border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 gradient-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-12 h-12 text-green-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-2xl text-gray-800 mb-2">{item.name}</h3>
                          <Badge className="gradient-green text-white border-0 mb-3">{item.category}</Badge>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">(4.8)</span>
                          </div>
                          <p className="text-green-600 font-bold text-xl">₹{item.price}/kg</p>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.name)}
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-green-50 rounded-full p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.name, Math.max(1, item.quantity - 1))}
                            className="h-10 w-10 p-0 rounded-full border-green-200 hover:bg-green-100"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-16 text-center font-bold text-xl text-green-700">{item.quantity}kg</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="h-10 w-10 p-0 rounded-full border-green-200 hover:bg-green-100"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-3xl text-gradient">₹{item.price * item.quantity}</p>
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
            <Card className="sticky top-24 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="gradient-green text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity}kg × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-bold text-green-600 text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <hr className="border-green-200" />

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">Total:</span>
                    <span className="text-3xl font-bold text-gradient">₹{getTotalPrice()}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full gradient-green text-white text-xl py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Why Choose Us?
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-2">
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
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 gradient-green rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="text-white w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Sri Srinivasa Flour Mills</h3>
              <p className="text-green-400 font-medium">80 Years of Legacy</p>
            </div>
          </div>
          <p className="text-gray-400">© 2024 Sri Srinivasa Flour Mills. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
