"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Download,
  ShoppingCart,
  Leaf,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Shield,
  Truck,
  ArrowRight,
} from "lucide-react"

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    flatNo: "",
    streetName: "",
    city: "",
    state: "",
    pinCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const generateWhatsAppMessage = () => {
    const orderDetails = cartItems
      .map((item) => `- ${item.name} x ${item.quantity}kg = ₹${item.price * item.quantity}`)
      .join("%0A")

    const fullAddress = `${formData.flatNo}, ${formData.streetName}, ${formData.city}, ${formData.state} - ${formData.pinCode}`

    const message = `Hello, I want to place an order.%0A%0AName: ${formData.fullName}%0APhone: ${formData.phoneNumber}%0AAddress: ${fullAddress}%0A%0AOrder Details:%0A${orderDetails}%0A%0ATotal: ₹${getTotalPrice()}`

    return `https://api.whatsapp.com/send?phone=917904356029&text=${message}`
  }

  const downloadCartDetails = () => {
    const orderDetails = cartItems
      .map((item) => `${item.name} x ${item.quantity}kg = ₹${item.price * item.quantity}`)
      .join("\n")

    const fullAddress = `${formData.flatNo}, ${formData.streetName}, ${formData.city}, ${formData.state} - ${formData.pinCode}`

    const content = `Sri Srinivasa Flour Mills - Order Details
=====================================

Customer Information:
Name: ${formData.fullName}
Phone: ${formData.phoneNumber}
Address: ${fullAddress}

Order Details:
${orderDetails}

Total Amount: ₹${getTotalPrice()}

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
`

    const blob = new Blob([content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Sri_Srinivasa_Order_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.flatNo ||
      !formData.streetName ||
      !formData.city ||
      !formData.state ||
      !formData.pinCode
    ) {
      alert("Please fill in all required fields")
      return
    }

    const whatsappUrl = generateWhatsAppMessage()
    window.open(whatsappUrl, "_blank")

    clearCart()
    alert("Order submitted! WhatsApp will open with your order details.")
    router.push("/")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <nav className="bg-white/95 backdrop-blur-md shadow-xl px-4 py-4 border-b border-green-100">
          <div className="max-w-7xl mx-auto">
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
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="animate-slide-up">
            <div className="w-32 h-32 mx-auto mb-8 gradient-green rounded-full flex items-center justify-center shadow-2xl">
              <ShoppingCart className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient mb-6">No Items in Cart</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
              Please add items to your cart before checkout.
            </p>
            <Link href="/products">
              <Button className="gradient-green text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full">
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl px-4 py-4 border-b border-green-100">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-6">Checkout</h1>
          <div className="w-32 h-1 gradient-green mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customer Information Form */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="gradient-green text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="w-6 h-6" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700 font-semibold text-lg flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-12 border-green-200 focus:border-green-500 rounded-lg"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phoneNumber"
                      className="text-gray-700 font-semibold text-lg flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-12 border-green-200 focus:border-green-500 rounded-lg"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="flatNo" className="text-gray-700 font-semibold text-lg flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Flat/House No *
                    </Label>
                    <Input
                      id="flatNo"
                      name="flatNo"
                      value={formData.flatNo}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-12 border-green-200 focus:border-green-500 rounded-lg"
                      placeholder="Flat/House number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="streetName" className="text-gray-700 font-semibold text-lg">
                      Street Name *
                    </Label>
                    <Input
                      id="streetName"
                      name="streetName"
                      value={formData.streetName}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-12 border-green-200 focus:border-green-500 rounded-lg"
                      placeholder="Street name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city" className="text-gray-700 font-semibold text-lg">
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-12 border-green-200 focus:border-green-500 rounded-lg"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-gray-700 font-semibold text-lg">
                      State *
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-12 border-green-200 focus:border-green-500 rounded-lg"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pinCode" className="text-gray-700 font-semibold text-lg">
                      PIN Code *
                    </Label>
                    <Input
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-12 border-green-200 focus:border-green-500 rounded-lg"
                      placeholder="PIN Code"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    onClick={downloadCartDetails}
                    variant="outline"
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50 bg-transparent h-14 text-lg font-semibold rounded-full"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Cart Details
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1 gradient-green text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    Confirm Order via WhatsApp
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-8">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="gradient-green text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-lg">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="gradient-green text-white border-0 text-xs">{item.category}</Badge>
                          <p className="text-sm text-gray-600">
                            {item.quantity}kg × ₹{item.price}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-green-600 text-xl">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <hr className="border-green-200" />

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">Total:</span>
                    <span className="text-4xl font-bold text-gradient">₹{getTotalPrice()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Info */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-8">
                <h4 className="font-bold text-blue-800 mb-6 text-xl flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Order Process
                </h4>
                <ol className="space-y-4">
                  {[
                    { icon: User, text: "Fill in your details" },
                    { icon: Download, text: "Download cart details (optional)" },
                    { icon: CreditCard, text: "Click 'Confirm Order'" },
                    { icon: Mail, text: "WhatsApp will open with your order" },
                    { icon: Truck, text: "Send the message to complete your order" },
                  ].map((step, index) => (
                    <li key={index} className="flex items-center gap-4 text-blue-700">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <step.icon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{step.text}</span>
                    </li>
                  ))}
                </ol>
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
