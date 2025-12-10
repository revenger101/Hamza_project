# Quick Start Guide - ShopHub E-Commerce Website

## 🚀 How to Run

1. **Open the website**
   - Simply open `index.html` in your web browser
   - No installation or server setup required!

2. **Navigate the site**
   - Use the navigation menu to explore different pages
   - Click the ShopHub logo to return to the home page

## 🛍️ Testing the Shopping Experience

### Step 1: Browse Products
- Visit the **Home Page** to see featured products
- Click **Products** in the navigation to see the full catalog
- Use filters to browse by category (Electronics, Fashion, Accessories)
- Adjust the price range slider to filter by price
- Sort products by price or name

### Step 2: Add Items to Cart
- Click **"Add to Cart"** on any product
- Watch the cart count badge update in the header
- A notification will appear confirming the item was added

### Step 3: Review Your Cart
- Click the cart icon in the header or navigate to **Cart**
- Review your items
- Update quantities using the +/- buttons
- Remove items if needed
- See real-time price calculations

### Step 4: Checkout
- Fill in the payment form (demo only - no real payment)
- Use any test card details:
  - Card Number: 1234 5678 9012 3456
  - Expiry: 12/25
  - CVV: 123
- Click **"Complete Purchase"**
- See the success confirmation

## 👤 Testing User Authentication

### Create an Account
1. Click **"Login"** in the navigation
2. Switch to the **"Sign Up"** tab
3. Fill in the registration form:
   - Full Name: Your Name
   - Email: any@email.com
   - Password: minimum 6 characters
   - Confirm Password: same as above
4. Check "I agree to the Terms & Conditions"
5. Click **"Create Account"**

### Login
1. Go to the **Login** page
2. Enter your email and password
3. Click **"Login"**
4. You'll be redirected to your account page

### View Your Account
- After logging in, click **"Account"** in the navigation
- View your profile information
- Navigate between Profile, Orders, and Settings
- Toggle notification preferences

### Sign Out
- Click the **"Sign Out"** button in the account page
- Or click your user avatar and select sign out

## 📱 Testing Responsive Design

### Desktop View (1024px+)
- Open in a full browser window
- See the full navigation menu
- Products displayed in a grid layout

### Tablet View (768px - 1023px)
- Resize your browser window
- Navigation adapts
- Products in 2-column grid

### Mobile View (< 768px)
- Resize to mobile size or use browser dev tools
- Hamburger menu appears
- Single column layout
- Touch-friendly buttons

## 🎨 Features to Explore

### Home Page
- ✨ Animated hero section with gradient background
- 🎯 Featured products showcase
- 📦 Feature cards (Free Shipping, Secure Payment, etc.)
- 🎉 Call-to-action section

### Products Page
- 🔍 Category filtering
- 💰 Price range slider
- 📊 Sort options
- 📱 Responsive product grid

### Authentication
- 📝 Form validation
- 🔒 Password requirements
- ✅ Success/error messages
- 💾 Session persistence

### Shopping Cart
- ➕ Add/remove items
- 🔢 Quantity controls
- 💵 Real-time totals
- 💾 Persists across sessions

### Checkout
- 🛒 Cart review
- 💳 Payment form with formatting
- 📊 Order summary with tax and shipping
- ✅ Success modal

## 💡 Tips

1. **Cart Persistence**: Your cart items are saved in localStorage and will persist even if you close the browser

2. **User Sessions**: Once logged in, your session persists until you sign out

3. **Free Shipping**: Orders over $50 get free shipping!

4. **Mobile Testing**: Use browser DevTools (F12) to test different screen sizes

5. **Clear Data**: To reset everything, open browser console and run:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

## 🐛 Troubleshooting

**Cart not updating?**
- Make sure JavaScript is enabled in your browser
- Check browser console for errors (F12)

**Can't login?**
- Make sure you've created an account first
- Password must be at least 6 characters
- Email must be in valid format

**Images not loading?**
- This project uses Unsplash images via CDN
- Make sure you have an internet connection

**Styles not working?**
- Make sure all CSS files are in the `css/` folder
- Check that file paths are correct

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console (F12) for errors
2. Verify all files are in the correct folders
3. Make sure you're opening `index.html` directly in a browser
4. Try clearing your browser cache

---

Enjoy exploring ShopHub! 🎉

