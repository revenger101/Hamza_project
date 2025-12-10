# ShopHub - Project Structure

## 📁 Complete File Organization

```
Project_Hamza/
│
├── 📄 index.html                    # Home page with hero section and featured products
├── 📄 products.html                 # Products catalog with filtering and sorting
├── 📄 auth.html                     # Login and signup page
├── 📄 account.html                  # User account dashboard
├── 📄 checkout.html                 # Shopping cart and checkout page
│
├── 📄 README.md                     # Project documentation
├── 📄 QUICK_START.md               # Quick start guide
├── 📄 PROJECT_STRUCTURE.md         # This file
│
├── 📂 css/                          # All stylesheets
│   ├── variables.css               # CSS variables, colors, fonts, spacing
│   ├── components.css              # Reusable components (buttons, cards, forms)
│   ├── header.css                  # Header and navigation styles
│   ├── footer.css                  # Footer styles
│   ├── home.css                    # Home page specific styles
│   ├── products.css                # Products page styles
│   ├── auth.css                    # Authentication page styles
│   ├── account.css                 # Account page styles
│   └── checkout.css                # Checkout page styles
│
└── 📂 js/                           # All JavaScript files
    ├── products.js                 # Product data and product utilities
    ├── cart.js                     # Shopping cart management class
    ├── auth.js                     # Authentication management class
    ├── utils.js                    # Utility functions and helpers
    ├── home.js                     # Home page functionality
    ├── products-page.js            # Products page functionality
    ├── auth-page.js                # Auth page functionality
    ├── account-page.js             # Account page functionality
    └── checkout-page.js            # Checkout page functionality
```

## 📄 HTML Pages (5 Total)

### 1. index.html - Home Page
- Hero section with gradient background
- Featured products grid
- Feature cards (shipping, payment, returns, support)
- Call-to-action section
- Responsive layout

### 2. products.html - Products Catalog
- Sidebar with filters (category, price range)
- Product grid with sorting options
- Product cards with images and details
- Add to cart functionality
- Responsive grid layout

### 3. auth.html - Authentication
- Tabbed interface (Login/Signup)
- Login form with email and password
- Signup form with validation
- Social login buttons (UI only)
- Form validation and error messages

### 4. account.html - User Account
- User profile header with avatar
- Sidebar navigation (Profile, Orders, Settings)
- Profile information display
- Settings with toggle switches
- Sign out functionality

### 5. checkout.html - Cart & Checkout
- Shopping cart items list
- Quantity controls
- Order summary with calculations
- Payment form with card formatting
- Success modal on completion

## 🎨 CSS Files (9 Total)

### Core Styles
- **variables.css** - Design system (colors, typography, spacing, shadows)
- **components.css** - Reusable UI components
- **header.css** - Navigation and header
- **footer.css** - Footer layout and links

### Page-Specific Styles
- **home.css** - Hero section, features, animations
- **products.css** - Product grid, filters, sorting
- **auth.css** - Auth forms, tabs, validation
- **account.css** - Account layout, settings, toggles
- **checkout.css** - Cart items, payment form, summary

## 💻 JavaScript Files (9 Total)

### Core Functionality
- **products.js** - Product data array (12 products) and utility functions
- **cart.js** - ShoppingCart class with localStorage persistence
- **auth.js** - AuthManager class with user management
- **utils.js** - Helper functions (validation, formatting, navigation)

### Page-Specific Scripts
- **home.js** - Load featured products, add to cart
- **products-page.js** - Filtering, sorting, product display
- **auth-page.js** - Login/signup handling, validation
- **account-page.js** - Profile display, navigation, logout
- **checkout-page.js** - Cart display, payment processing

## 🎯 Key Features by File

### Shopping Cart (cart.js)
```javascript
- addItem(product)           // Add product to cart
- removeItem(productId)      // Remove product from cart
- updateQuantity(id, qty)    // Update item quantity
- getTotal()                 // Calculate cart total
- getItemCount()             // Get total items
- clearCart()                // Empty the cart
- saveCart()                 // Persist to localStorage
- loadCart()                 // Load from localStorage
```

### Authentication (auth.js)
```javascript
- register(userData)         // Create new user account
- login(email, password)     // Authenticate user
- logout()                   // Sign out user
- isLoggedIn()              // Check auth status
- getCurrentUser()          // Get current user data
- requireAuth()             // Protect routes
```

### Product Management (products.js)
```javascript
- getProductById(id)         // Find product by ID
- getFeaturedProducts()      // Get featured items
- getProductsByCategory()    // Filter by category
- getCategories()            // Get all categories
- formatPrice(price)         // Format currency
```

## 🎨 Design System

### Colors
- Primary: Blue (#2563eb)
- Secondary: Green (#10b981)
- Text: Gray scale
- Backgrounds: White, Light Gray
- Gradients: Purple-Blue, Green

### Typography
- Headings: Poppins (600, 700, 800)
- Body: Inter (300, 400, 500, 600, 700)
- Sizes: 0.75rem to 3rem

### Spacing
- XS: 0.25rem
- SM: 0.5rem
- MD: 1rem
- LG: 1.5rem
- XL: 2rem
- 2XL: 3rem
- 3XL: 4rem

### Components
- Buttons: Primary, Secondary, Outline, Ghost
- Cards: Product cards, Info cards, Settings cards
- Forms: Inputs, Labels, Validation
- Badges: Cart count, Status badges
- Modals: Success modal

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Responsive Features
- Mobile hamburger menu
- Flexible grid layouts
- Touch-friendly buttons
- Optimized font sizes
- Stacked layouts on mobile

## 💾 Data Storage

### LocalStorage Keys
- `shoppingCart` - Array of cart items
- `currentUser` - Current logged-in user
- `users` - Array of all registered users

### Data Structures

**Cart Item:**
```javascript
{
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number
}
```

**User:**
```javascript
{
  id: string,
  name: string,
  email: string,
  password: string,
  createdAt: string
}
```

**Product:**
```javascript
{
  id: number,
  name: string,
  price: number,
  category: string,
  image: string,
  description: string,
  featured: boolean
}
```

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Animations
- **JavaScript ES6+** - Classes, Arrow functions, Template literals
- **LocalStorage API** - Data persistence
- **Google Fonts** - Typography
- **Unsplash** - Product images (CDN)

## 📊 Statistics

- **Total Files**: 23
- **HTML Pages**: 5
- **CSS Files**: 9
- **JavaScript Files**: 9
- **Products**: 12
- **Categories**: 3 (Electronics, Fashion, Accessories)
- **Lines of Code**: ~2,500+

---

**Note**: This is a client-side only project. All data is stored in the browser's localStorage. No backend server or database is required.

