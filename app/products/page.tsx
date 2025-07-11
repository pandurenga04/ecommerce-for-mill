"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { ShoppingCart, Search, Check, Leaf, Star, Filter, Grid, List } from "lucide-react"

const products = {
  "Masala Powders": [
    { name: "Sambar Powder", price: 400, image: "https://moonrice.net/wp-content/uploads/2024/04/SambarPodi-4.jpg", rating: 4.8, reviews: 124 },
    { name: "Rasam Powder", price: 400, image: "https://srivarahafoods.com/cdn/shop/files/SriVarahaFoods-Pepper-Cumin-Rasam-Powder-Podi-Milagu-Jeera-Rasam-Podi.webp?v=1750331977", rating: 4.9, reviews: 98 },
    { name: "Idli Powder", price: 300, image: "https://mylaporeganapathys.com/wp-content/uploads/2025/05/yellu-idly-podi.jpg", rating: 4.7, reviews: 156 },
    { name: "Sesame Powder", price: 400, image: "https://www.yummytummyaarthi.com/wp-content/uploads/2017/01/1-20.jpg", rating: 4.6, reviews: 87 },
    { name: "Vathal Powder", price: 400, image: "https://www.yummytummyaarthi.com/wp-content/uploads/2014/07/2.-11.png", rating: 4.8, reviews: 92 },
    { name: "Coriander Powder", price: 300, image: "https://img500.exportersindia.com/product_images/bc-500/dir_168/5034701/coriander-seeds-powder-1498201560-3083197.jpeg", rating: 4.9, reviews: 203 },
    { name: "Turmeric Powder", price: 450, image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/15065/conversions/fa246ce0-054b-4892-bf30-5eb43cd938aa-thumb.jpg", rating: 4.8, reviews: 167 },
    {
      name: "Curry Leaves Powder",
      price: 400,
      image: "https://www.indianveggiedelight.com/wp-content/uploads/2021/07/curryleaves-chutney-powder-featured.jpg",
      rating: 4.7,
      reviews: 78,
    },
    {
      name: "Drumstick Leaves Powder",
      price: 400,
      image: "https://5.imimg.com/data5/OC/YS/MY-28365108/natural-drumstick-leaves-powder-500x500.jpg",
      rating: 4.6,
      reviews: 65,
    },
    {
      name: "Mint Leaves Powder",
      price: 300,
      image: "https://5.imimg.com/data5/QX/UT/OK/SELLER-94661056/mint-leaves-powder-500x500.jpg",
      rating: 4.5,
      reviews: 54,
    },
    { name: "Dal Powder", price: 300, image: "https://www.vishalam.com/cdn/shop/products/paruppu-podi-dal-rice-mix-329743.jpg?v=1690005069", rating: 4.7, reviews: 89 },
  ],
  "Flours & Mixes": [
    {
      name: "Health Mix Powder",
      price: 300,
      image: "https://sweetkaramcoffee.in/cdn/shop/articles/millets-health-mix-kanji-maavu-250g-564369_c4a720ba-edde-4297-b7f0-893b9b4f206d.jpg?v=1745047720",
      rating: 4.9,
      reviews: 234,
    },
    { name: "Wheat Flour", price: 80, image: "https://farmfit.in/wp-content/uploads/2024/03/Firefly-wheat-flour-in-wooden-bowl-white-background-with-grains-17849.jpg", rating: 4.8, reviews: 456 },
    {
      name: "Pearl Millet Flour (Kambu)",
      price: 65,
      image: "https://www.terraearthfood.com/cdn/shop/products/03700053a3bffc164dec344e05bb28bf53b460a4.jpg?v=1583655833",
      rating: 4.7,
      reviews: 123,
    },
    {
      name: "Ragi Flour (Keppai)",
      price: 70,
      image: "https://www.jiomart.com/images/product/original/rvvziovn9o/farmbean-ragi-flour-1kg-ragi-mavu-keppai-mavu-ragi-atta-finger-millet-flour-ragulu-ragi-nachani-organic-flour-rich-in-dietary-fibers-healthy-food-gluten-free-atta-no-preservatives-no-trans-fats-high-protein-100-more-fibre-product-images-orvvziovn9o-p603878066-5-202308151317.jpg?im=Resize=(420,420)",
      rating: 4.8,
      reviews: 189,
    },
    { name: "Rice Flour", price: 60, image: "https://m.media-amazon.com/images/I/51GswgOU9ZL._UF1000,1000_QL80_.jpg", rating: 4.6, reviews: 267 },
    { name: "Idiyappam Flour", price: 70, image: "https://mirchi.com/os/cdn/content/images/idiyappam%20flour%20dharshana%20homemade%20food_medium_0514144.webp", rating: 4.7, reviews: 145 },
    { name: "Rice Upma Mix", price: 350, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkjj61VedTyCHq4YIvDQwLK6QUJP8B5optog&s", rating: 4.5, reviews: 76 },
    { name: "Rava Dosa Mix", price: 300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWfCpC9CGGhXyDcRfC1CFdkBIHa41XURtnw&s", rating: 4.6, reviews: 98 },
  ],
  "Bathing Powders": [
    {
      name: "Herbal Bath Powder",
      price: 400,
      image: "https://5.imimg.com/data5/SELLER/Default/2023/2/HR/KM/MD/9313101/thuvalai-powder-herbal-bath-powder-for-adults.jpg",
      rating: 4.8,
      reviews: 156,
    },
    {
      name: "Kasturi Turmeric Powder",
      price: 400,
      image: "https://static.wixstatic.com/media/86d471_8dfce175354545feb1c93adf3010618b~mv2.png/v1/fill/w_980,h_607,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/86d471_8dfce175354545feb1c93adf3010618b~mv2.png",
      rating: 4.9,
      reviews: 203,
    },
    { name: "Shikakai Powder", price: 400, image: "https://shreenaenterprise.com/cdn/shop/files/Shikakai-Powder.jpg?v=1725448820", rating: 4.7, reviews: 134 },
    { name: "Turmeric Powder", price: 300, image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/15065/conversions/fa246ce0-054b-4892-bf30-5eb43cd938aa-thumb.jpg", rating: 4.6, reviews: 187 },
  ],
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({})
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const { addToCart, cartItems } = useCart()

  const allProducts = Object.entries(products).flatMap(([category, items]) =>
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
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleQuantityChange = (productName: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productName]: quantity }))
  }

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.name] || 1
    addToCart({ ...product, quantity })
    setQuantities((prev) => ({ ...prev, [product.name]: 1 }))

    setAddedToCart((prev) => ({ ...prev, [product.name]: true }))
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.name]: false }))
    }, 2000)
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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
            <Link href="/cart">
              <Button className="gradient-green text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Cart ({cartItemCount})
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-6">Our Premium Products</h1>
          <div className="w-32 h-1 gradient-green mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our collection of traditional flours and authentic masala powders
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 border-green-200 focus:border-green-500 rounded-full"
                />
              </div>

              <div className="flex gap-4 items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 h-12 border-green-200 focus:border-green-500 rounded-full">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Masala Powders">Masala Powders</SelectItem>
                    <SelectItem value="Flours & Mixes">Flours & Mixes</SelectItem>
                    <SelectItem value="Bathing Powders">Bathing Powders</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 h-12 border-green-200 focus:border-green-500 rounded-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-green-200 rounded-full p-1">
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
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div
          className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.name}
              className="card-hover border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden group"
            >
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 gradient-green text-white border-0 shadow-lg">
                    {product.category}
                  </Badge>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2">{product.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-3xl font-bold text-gradient">₹{product.price}/kg</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm font-semibold text-gray-700">Qty (kg):</label>
                    <Input
                      type="number"
                      min="1"
                      value={quantities[product.name] || 1}
                      onChange={(e) => handleQuantityChange(product.name, Number.parseInt(e.target.value) || 1)}
                      className="w-20 h-10 border-green-200 focus:border-green-500 rounded-lg"
                    />
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full h-12 font-semibold rounded-full transition-all duration-300 ${
                      addedToCart[product.name]
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "gradient-green text-white hover:shadow-lg"
                    }`}
                    disabled={addedToCart[product.name]}
                  >
                    {addedToCart[product.name] ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 gradient-green rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No products found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search or filter criteria.</p>
          </div>
        )}
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
