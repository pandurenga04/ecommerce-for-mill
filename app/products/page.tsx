"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { ShoppingCart, Search, Check, Leaf, Star, Filter, Grid, List, Menu, X } from 'lucide-react'

// Define interfaces for type safety
interface Product {
  name: string
  pricePerKg: number
  image: string
  rating: number
  reviews: number
  category: string
}

interface Variant {
  value: string
  label: string
  multiplier: number
}

interface CartItem extends Product {
  quantity: number
  price: number
  weight: string
}

const products: Record<string, Product[]> = {
  "Masala Powders": [
    { name: "Sambar Powder", pricePerKg: 400, image: "https://moonrice.net/wp-content/uploads/2024/04/SambarPodi-4.jpg", rating: 4.8, reviews: 124, category: "Masala Powders" },
    { name: "Rasam Powder", pricePerKg: 400, image: "https://srivarahafoods.com/cdn/shop/files/SriVarahaFoods-Pepper-Cumin-Rasam-Powder-Podi-Milagu-Jeera-Rasam-Podi.webp?v=1750331977", rating: 4.9, reviews: 98, category: "Masala Powders" },
    { name: "Idli Powder", pricePerKg: 300, image: "https://mylaporeganapathys.com/wp-content/uploads/2025/05/yellu-idly-podi.jpg", rating: 4.7, reviews: 156, category: "Masala Powders" },
    { name: "Sesame Powder", pricePerKg: 400, image: "https://www.yummytummyaarthi.com/wp-content/uploads/2017/01/1-20.jpg", rating: 4.6, reviews: 87, category: "Masala Powders" },
    { name: "Vathal Powder", pricePerKg: 400, image: "https://www.yummytummyaarthi.com/wp-content/uploads/2014/07/2.-11.png", rating: 4.8, reviews: 92, category: "Masala Powders" },
    { name: "Coriander Powder", pricePerKg: 300, image: "https://img500.exportersindia.com/product_images/bc-500/dir_168/5034701/coriander-seeds-powder-1498201560-3083197.jpeg", rating: 4.9, reviews: 203, category: "Masala Powders" },
    { name: "Turmeric Powder", pricePerKg: 450, image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/15065/conversions/fa246ce0-054b-4892-bf30-5eb43cd938aa-thumb.jpg", rating: 4.8, reviews: 167, category: "Masala Powders" },
    { name: "Curry Leaves Powder", pricePerKg: 400, image: "https://www.indianveggiedelight.com/wp-content/uploads/2021/07/curryleaves-chutney-powder-featured.jpg", rating: 4.7, reviews: 78, category: "Masala Powders" },
    { name: "Drumstick Leaves Powder", pricePerKg: 400, image: "https://5.imimg.com/data5/OC/YS/MY-28365108/natural-drumstick-leaves-powder-500x500.jpg", rating: 4.6, reviews: 65, category: "Masala Powders" },
    { name: "Mint Leaves Powder", pricePerKg: 350, image: "https://5.imimg.com/data5/QX/UT/OK/SELLER-94661056/mint-leaves-powder-500x500.jpg", rating: 4.5, reviews: 54, category: "Masala Powders" },
    { name: "Dal Powder", pricePerKg: 300, image: "https://www.vishalam.com/cdn/shop/products/paruppu-podi-dal-rice-mix-329743.jpg?v=1690005069", rating: 4.7, reviews: 89, category: "Masala Powders" },
  ],
  "Flours & Mixes": [
    { name: "Health Mix Powder", pricePerKg: 300, image: "https://sweetkaramcoffee.in/cdn/shop/articles/millets-health-mix-kanji-maavu-250g-564369_c4a720ba-edde-4297-b7f0-893b9b4f206d.jpg?v=1745047720", rating: 4.9, reviews: 234, category: "Flours & Mixes" },
    { name: "Wheat Flour", pricePerKg: 70, image: "https://farmfit.in/wp-content/uploads/2024/03/Firefly-wheat-flour-in-wooden-bowl-white-background-with-grains-17849.jpg", rating: 4.8, reviews: 456, category: "Flours & Mixes" },
    { name: "Pearl Millet Flour (Kambu)", pricePerKg: 65, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkmXdHLjEqcMsqFNtjPmy7atRZ56xoMU0oAw&s", rating: 4.7, reviews: 123, category: "Flours & Mixes" },
    { name: "Ragi Flour (Keppai)", pricePerKg: 80, image: "https://www.jiomart.com/images/product/original/rvvziovn9o/farmbean-ragi-flour-1kg-ragi-mavu-keppai-mavu-ragi-atta-finger-millet-flour-ragulu-ragi-nachani-organic-flour-rich-in-dietary-fibers-healthy-food-gluten-free-atta-no-preservatives-no-trans-fats-high-protein-100-more-fibre-product-images-orvvziovn9o-p603878066-5-202308151317.jpg?im=Resize=(420,420)", rating: 4.8, reviews: 189, category: "Flours & Mixes" },
    { name: "Rice Flour", pricePerKg: 60, image: "https://m.media-amazon.com/images/I/51GswgOU9ZL._UF1000,1000_QL80_.jpg", rating: 4.6, reviews: 267, category: "Flours & Mixes" },
    { name: "Idiyappam Flour", pricePerKg: 70, image: "https://mirchi.com/os/cdn/content/images/idiyappam%20flour%20dharshana%20homemade%20food_medium_0514144.webp", rating: 4.7, reviews: 145, category: "Flours & Mixes" },
    { name: "Rice Upma Mix", pricePerKg: 350, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:GetQkkjj61VedTyCHq4YIvDQwLK6QUJP8B5optog&s", rating: 4.5, reviews: 76, category: "Flours & Mixes" },
    { name: "Rava Dosa Mix", pricePerKg: 300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:GetQSSWfCpC9CGGhXyDcRfC1CFdkBIHa41XURtnw&s", rating: 4.6, reviews: 98, category: "Flours & Mixes" },
  ],
  "Bathing Powders": [
    { name: "Herbal Bath(Sthnana) Powder", pricePerKg: 400, image: "https://5.imimg.com/data5/SELLER/Default/2023/2/HR/KM/MD/9313101/thuvalai-powder-herbal-bath-powder-for-adults.jpg", rating: 4.8, reviews: 156, category: "Bathing Powders" },
    { name: "Kasturi Turmeric Powder", pricePerKg: 400, image: "https://static.wixstatic.com/media/86d471_8dfce175354545feb1c93adf3010618b~mv2.png/v1/fill/w_980,h_607,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/86d471_8dfce175354545feb1c93adf3010618b~mv2.png", rating: 4.9, reviews: 203, category: "Bathing Powders" },
    { name: "Shikakai Powder", pricePerKg: 400, image: "https://shreenaenterprise.com/cdn/shop/files/Shikakai-Powder.jpg?v=1725448820", rating: 4.7, reviews: 134, category: "Bathing Powders" },
    { name: "Bath Turmeric Powder", pricePerKg: 400, image: "https://www.aalayamselveer.com/wp-content/uploads/2020/10/Poosu-Manjal-Podi.png", rating: 4.6, reviews: 187, category: "Bathing Powders" },
  ],
}

const variants: Variant[] = [
  { value: "0.1", label: "100g", multiplier: 0.1 },
  { value: "0.25", label: "250g", multiplier: 0.25 },
  { value: "0.5", label: "500g", multiplier: 0.5 },
  { value: "1", label: "1kg", multiplier: 1 },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({})
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("name")
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const { addToCart, cartItems } = useCart()

  const allProducts: Product[] = Object.entries(products).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category })),
  )

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerKg - b.pricePerKg
        case "price-high":
          return b.pricePerKg - a.pricePerKg
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const getProductKey = (product: Product): string => `${product.name}_${product.category}`

  const handleQuantityChange = (product: Product, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [getProductKey(product)]: quantity }))
  }

  const handleVariantChange = (product: Product, variant: string) => {
    setSelectedVariants((prev) => ({ ...prev, [getProductKey(product)]: variant }))
  }

  const handleAddToCart = (product: Product) => {
    const productKey = getProductKey(product)
    const quantity = quantities[productKey] || 1
    const variant = selectedVariants[productKey] || "1"
    const variantData = variants.find((v) => v.value === variant)
    const price = product.pricePerKg * (variantData?.multiplier || 1)
    const weight = variantData?.label || "1kg"

    addToCart({ ...product, quantity, price, weight })
    setQuantities((prev) => ({ ...prev, [productKey]: 1 }))
    setAddedToCart((prev) => ({ ...prev, [productKey]: true }))
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [productKey]: false }))
    }, 2000)
  }

  const cartItemCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

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
            <Link href="/cart">
              <Button className="gradient-green text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Cart ({cartItemCount})
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/cart">
              <Button size="sm" className="gradient-green text-white px-2 py-1 text-xs">
                <ShoppingCart className="w-3 h-3 mr-1" />
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

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-green-100">
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-green-700 hover:bg-green-50">
                  Home
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

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-gradient mb-4 sm:mb-6">Our Premium Products</h1>
          <div className="w-24 sm:w-32 h-1 gradient-green mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover our collection of traditional flours and authentic masala powders
          </p>
        </div>

        {/* Mobile Filters Toggle */}
        <div className="sm:hidden mb-6">
          <Button
            onClick={() => setFiltersOpen(!filtersOpen)}
            variant="outline"
            className="w-full border-green-200 text-green-700 hover:bg-green-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters & Search
          </Button>
        </div>

        {/* Filters */}
        <Card className={`mb-6 sm:mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm ${filtersOpen || 'hidden sm:block'}`}>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-6 sm:items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-full text-sm sm:text-base"
                />
              </div>

              {/* Category Filter */}
              <div className="w-full sm:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-full text-sm sm:text-base">
                    <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Masala Powders">Masala Powders</SelectItem>
                    <SelectItem value="Flours & Mixes">Flours & Mixes</SelectItem>
                    <SelectItem value="Bathing Powders">Bathing Powders</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="w-full sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10 sm:h-12 border-green-200 focus:border-green-500 rounded-full text-sm sm:text-base">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode - Desktop Only */}
              <div className="hidden sm:flex border border-green-200 rounded-full p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full ${viewMode === "grid" ? "gradient-green text-white" : "text-green-600"}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-full ${viewMode === "list" ? "gradient-green text-white" : "text-green-600"}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div
          className={`grid gap-4 sm:gap-6 lg:gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => {
            const productKey = getProductKey(product)
            const selectedVariant = selectedVariants[productKey] || "1"
            const variantData = variants.find((v) => v.value === selectedVariant)
            const currentPrice = product.pricePerKg * (variantData?.multiplier || 1)
            
            return (
              <Card
                key={productKey}
                className="card-hover border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden group"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 gradient-green text-white border-0 shadow-lg text-xs sm:text-sm">
                      {product.category}
                    </Badge>
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm font-semibold">{product.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</CardTitle>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-gradient">₹{currentPrice.toFixed(2)}/{variantData?.label || "1kg"}</p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Weight:</label>
                      <Select
                        value={selectedVariant}
                        onValueChange={(value) => handleVariantChange(product, value)}
                      >
                        <SelectTrigger className="w-24 sm:w-28 h-8 sm:h-10 border-green-200 focus:border-green-500 rounded-lg text-sm">
                          <SelectValue placeholder="Select weight" />
                        </SelectTrigger>
                        <SelectContent>
                          {variants.map((variant) => (
                            <SelectItem key={variant.value} value={variant.value}>
                              {variant.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Qty:</label>
                      <Input
                        type="number"
                        min="1"
                        value={quantities[productKey] || 1}
                        onChange={(e) => handleQuantityChange(product, Number.parseInt(e.target.value) || 1)}
                        className="w-16 sm:w-20 h-8 sm:h-10 border-green-200 focus:border-green-500 rounded-lg text-sm"
                      />
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full h-10 sm:h-12 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base ${
                        addedToCart[productKey]
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "gradient-green text-white hover:shadow-lg"
                      }`}
                      disabled={addedToCart[productKey]}
                    >
                      {addedToCart[productKey] ? (
                        <>
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 gradient-green rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">No products found</h3>
            <p className="text-gray-600 text-base sm:text-lg px-4">Try adjusting your search or filter criteria.</p>
          </div>
        )}
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
          <p className="text-gray-400 text-sm sm:text-base">© 2024 Sri Srinivasa Flour Mills. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
