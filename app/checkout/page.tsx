"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
  const [isTamilNadu, setIsTamilNadu] = useState(true) // Default to Tamil Nadu

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Calculate delivery charge based on new rules
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
    // Masala Powders: Free delivery if subtotal >= ₹599, else ₹60/kg in TN, ₹120/kg outside TN
    if (hasMasala && subtotal < 599) {
      deliveryCharge += isTamilNadu ? masalaWeightKg * 60 : masalaWeightKg * 120
    }
    // Other categories: ₹90/kg in TN, ₹180/kg outside TN
    if (otherWeightKg > 0) {
      deliveryCharge += isTamilNadu ? otherWeightKg * 90 : otherWeightKg * 180
    }

    return deliveryCharge
  }

  const subtotal = getTotalPrice()
  const deliveryCharge = calculateDeliveryCharge()
  const finalTotal = subtotal + deliveryCharge
  const isFreeDelivery = deliveryCharge === 0

  const generateWhatsAppMessage = () => {
    const orderDetails = cartItems
      .map((item) => `- ${item.name} x ${item.quantity} × ${item.weight} = ₹${(item.price * item.quantity).toFixed(2)}`)
      .join("%0A")

    const fullAddress = `${formData.flatNo}, ${formData.streetName}, ${formData.city}, ${formData.state} - ${formData.pinCode}`

    const deliveryInfo = isFreeDelivery
      ? "FREE Delivery"
      : `Delivery Charge: ₹${deliveryCharge.toFixed(2)}`

    const message = `Hello, I want to place an order.%0A%0AName: ${formData.fullName}%0APhone: ${formData.phoneNumber}%0AAddress: ${fullAddress}%0ALocation: ${isTamilNadu ? "Tamil Nadu" : "Outside Tamil Nadu"}%0A%0AOrder Details:%0A${orderDetails}%0A%0ASubtotal: ₹${subtotal.toFixed(2)}%0A${deliveryInfo}%0ATotal Amount: ₹${finalTotal.toFixed(2)}`

    return `https://api.whatsapp.com/send?phone=917904356029&text=${message}`
  }

  const downloadCartDetails = () => {
    const orderDetails = cartItems
      .map((item) => `${item.name} x ${item.quantity} × ${item.weight} = ₹${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const fullAddress = `${formData.flatNo}, ${formData.streetName}, ${formData.city}, ${formData.state} - ${formData.pinCode}`

    const deliveryInfo = isFreeDelivery
      ? cartItems.some(item => item.category === "Masala Powders")
        ? `FREE Delivery (You saved ₹${isTamilNadu ? "60" : "120"}/kg!)`
        : "FREE Delivery"
      : `Delivery Charge: ₹${deliveryCharge.toFixed(2)}`

    const content = `Sri Srinivasa Flour Mills - Order Details
=====================================

Customer Information:
Name: ${formData.fullName}
Phone: ${formData.phoneNumber}
Address: ${fullAddress}
Location: ${isTamilNadu ? "Tamil Nadu" : "Outside Tamil Nadu"}

Order Details:
${orderDetails}

Subtotal: ₹${subtotal.toFixed(2)}
${deliveryInfo}
Total Amount: ₹${finalTotal.toFixed(2)}

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
        <nav className="bg-white/95 backdrop-blur-md shadow-xl px-3 sm:px-4 py-3 sm:py-4 border-b border-green-100">
          <div className="max-w-7xl mx-auto">
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
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="animate-slide-up">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 gradient-green rounded-full flex items-center justify-center shadow-2xl">
              <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4 sm:mb-6">No Items in Cart</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-md mx-auto px-4">
              Please add items to your cart before checkout.
            </p>
            <Link href="/products">
              <Button className="gradient-green text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-full sm:w-auto">
                Browse Products
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
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
      <nav className="bg-white/95 backdrop-blur-md shadow-xl px-3 sm:px-4 py-3 sm:py-4 border-b border-green-100">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-gradient mb-4 sm:mb-6">Checkout</h1>
          <div className="w-24 sm:w-32 h-1 gradient-green mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-xl text-gray-600">Complete your order</p>
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
                      Add ₹{599 - subtotal} more for FREE delivery on Masala Powders!
                    </p>
                    <p className="text-orange-600 text-xs sm:text-sm">
                      Currently: ₹{isTamilNadu ? "60" : "120"}/kg delivery charge for Masala Powders • Free delivery on orders ₹599+
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delivery Charge Banner for Other Categories */}
        {!isFreeDelivery && cartItems.some(item => item.category !== "Masala Powders") && (
          <div className="mb-6 sm:mb-8">
            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-center gap-3 text-center">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-800 text-sm sm:text-base">
                      Delivery charge for Flours & Mixes and Bathing Powders: ₹{isTamilNadu ? "90" : "180"} per kg
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
                    <p className="text-green-600 text-xs sm:text-sm">You saved ₹{isTamilNadu ? "60" : "120"}/kg on delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Customer Information Form */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="gradient-green text-white rounded-t-lg">
              <CardTitle className="text-lg sm:text-2xl flex items-center gap-2">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label
                      htmlFor="fullName"
                      className="text-gray-700 font-semibold text-sm sm:text-lg flex items-center gap-2"
                    >
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-lg text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phoneNumber"
                      className="text-gray-700 font-semibold text-sm sm:text-lg flex items-center gap-2"
                    >
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-lg text-sm sm:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label
                      htmlFor="flatNo"
                      className="text-gray-700 font-semibold text-sm sm:text-lg flex items-center gap-2"
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      Flat/House No *
                    </Label>
                    <Input
                      id="flatNo"
                      name="flatNo"
                      value={formData.flatNo}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-lg text-sm sm:text-base"
                      placeholder="Flat/House number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="streetName" className="text-gray-700 font-semibold text-sm sm:text-lg">
                      Street Name *
                    </Label>
                    <Input
                      id="streetName"
                      name="streetName"
                      value={formData.streetName}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-lg text-sm sm:text-base"
                      placeholder="Street name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="city" className="text-gray-700 font-semibold text-sm sm:text-lg">
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-lg text-sm sm:text-base"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-gray-700 font-semibold text-sm sm:text-lg">
                      State *
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-lg text-sm sm:text-base"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pinCode" className="text-gray-700 font-semibold text-sm sm:text-lg">
                      PIN Code *
                    </Label>
                    <Input
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      required
                      className="mt-2 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-lg text-sm sm:text-base"
                      placeholder="PIN Code"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <Button
                    type="button"
                    onClick={downloadCartDetails}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent h-12 sm:h-14 text-sm sm:text-lg font-semibold rounded-full"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Download Cart Details
                  </Button>

                  <Button
                    type="submit"
                    className="gradient-green text-white h-12 sm:h-14 text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    Confirm Order via WhatsApp
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6 sm:space-y-8">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="gradient-green text-white rounded-t-lg">
                <CardTitle className="text-lg sm:text-2xl flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4 max-h-60 sm:max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.name}-${item.weight}`}
                      className="flex justify-between items-center p-3 sm:p-4 bg-green-50 rounded-xl"
                    >
                      <div className="flex-1 pr-2">
                        <p className="font-semibold text-gray-800 text-sm sm:text-lg line-clamp-2">{item.name}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                          <Badge className="gradient-green text-white border-0 text-xs w-fit">{item.category}</Badge>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {item.quantity} × {item.weight} × ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-green-600 text-lg sm:text-xl">₹{(item.price * item.quantity).toFixed(2)}</p>
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
                    ? "₹60/kg for Masala Powders, ₹90/kg for other categories"
                    : "₹120/kg for Masala Powders, ₹180/kg for other categories"}
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
                            <p className="text-xs text-gray-500 line-through">₹{isTamilNadu ? "60" : "120"}/kg</p>
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
                    <span className="text-2xl sm:text-4xl font-bold text-gradient">₹{finalTotal.toFixed(2)}</span>
                  </div>
                  {isFreeDelivery && cartItems.some(item => item.category === "Masala Powders") && (
                    <p className="text-sm text-green-600 mt-2 text-center">🎉 You saved ₹{isTamilNadu ? "60" : "120"}/kg on delivery!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Process Info */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-4 sm:p-8">
                <h4 className="font-bold text-blue-800 mb-4 sm:mb-6 text-lg sm:text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  Order Process
                </h4>
                <ol className="space-y-3 sm:space-y-4">
                  {[
                    { icon: User, text: "Fill in your details" },
                    { icon: Download, text: "Download cart details (optional)" },
                    { icon: CreditCard, text: "Click 'Confirm Order'" },
                    { icon: Mail, text: "WhatsApp will open with your order" },
                    { icon: Truck, text: "Send the message to complete your order" },
                  ].map((step, index) => (
                    <li key={index} className="flex items-center gap-3 sm:gap-4 text-blue-700">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        {index + 1}
                      </div>
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      <span className="font-medium text-sm sm:text-base">{step.text}</span>
                    </li>
                  ))}
                </ol>
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
