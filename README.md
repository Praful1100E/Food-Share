# 🍃 FoodShare - Reduce Food Waste, Feed Communities

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)]()
[![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white)]()
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)]()

## 🌟 Project Overview

**FoodShare** is a web-based platform designed to combat food waste while addressing hunger in communities. The platform connects food donors (restaurants, grocery stores, households, and food banks) with those in need (NGOs, shelters, orphanages, and individuals), creating a sustainable solution for food redistribution.

## 🎯 Mission Statement

> "Every meal saved makes a difference in reducing waste and fighting hunger in your community."

FoodShare was born from a simple yet powerful idea: **What if we could connect those who have surplus food with those who need it?** Our mission is to reduce food waste while ensuring no one in our community goes hungry.

## 🚀 Current Features

### ✅ **Core Functionality**
- **🌐 Interactive Homepage** - Beautiful, responsive landing page with clear call-to-actions
- **📝 Food Donation System** - Comprehensive donation form with validation
- **🗺️ Interactive Map (OpenStreetMap & Leaflet.js)** - Real-time map with zero API keys required, custom food pins, city filters (Shimla, Manali, Dharamshala, Solan, Mandi), and live donation syncing
- **💾 Local Storage** - Donation data persistence using browser localStorage
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### ✅ **User Interface**
- **Modern Design** - Clean, intuitive interface using Bootstrap 5
- **Interactive Elements** - Hover effects, animations, and smooth transitions
- **Accessibility** - User-friendly navigation and clear visual hierarchy
- **Modal Forms** - Login and registration modals (UI implementation)

### ✅ **Donation Process**
1. **Post Your Surplus** - Easy form to list available food items
2. **Find & Request** - Browse available donations on interactive map
3. **Pickup & Share** - Coordinate pickup and track impact

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.0
- **Maps**: OpenStreetMap (OSM) with Leaflet.js (100% Free & Open-Source, No API Key needed)
- **Icons**: Font Awesome 6.4.0
- **Storage**: Browser localStorage (for demo purposes)
- **Database**: SQLite (foodshare.db - ready for backend integration)

## 📋 How to Use

### Quick Start
1. **Clone or download** the project files
2. **Open `index_linked.html`** in your web browser
3. **Navigate through the platform**:
   - Browse the homepage to understand the mission
   - Click "Donate Food" to access the donation form
   - Fill out the donation form with food details
   - Submit to see the success confirmation
   - Use "← Back to Home" to return to main page

### File Structure
```
Foodwaste/
├── index_linked.html          # Main homepage with working navigation
├── donate_linked.html         # Donation form page
├── styles.css                 # Custom CSS styles
├── script_working.js          # JavaScript functionality
├── README.md                  # This file
├── README_LINKED.md           # Navigation-specific documentation
├── TODO.md                    # Development roadmap
└── instance/
    └── foodshare.db           # SQLite database (ready for backend)
```

## 🎨 Key Features Explained

### Homepage (`index_linked.html`)
- **Hero Section** - Compelling call-to-action with donation button
- **Features Overview** - Three-step process explanation
- **About Section** - Mission, founders, and contact information
- **Interactive Map** - Shows sample food locations in Himachal Pradesh
- **Statistics Counter** - Visual impact metrics
- **Footer** - Quick links and donor/receiver categories

### Donation Form (`donate_linked.html`)
- **Comprehensive Fields**:
  - Food name and quantity
  - Description and expiry date
  - Pickup location and donor details
  - Food type categorization
  - Additional notes
- **Form Validation** - Ensures all required fields are completed
- **Success Modal** - Confirmation with donation summary
- **Local Storage** - Saves donations for demonstration

### Interactive Map
- **Himachal Pradesh Focus** - Shows locations in Shimla, Manali, and Dharamshala
- **Sample Data** - Demonstrates real food donation locations
- **Info Windows** - Click markers to see food details
- **Request Pickup** - Interactive buttons for each location

## 👥 Target Users

### Food Donors
- **Restaurants** - Surplus prepared food and ingredients
- **Grocery Stores** - Overstocked or near-expiry items
- **Households** - Excess home-cooked meals or groceries
- **Food Banks** - Bulk food redistribution

### Food Receivers
- **NGOs** - Community organizations serving those in need
- **Shelters** - Homeless shelters and emergency housing
- **Orphanages** - Children's homes and care facilities
- **Individuals** - Families and people experiencing food insecurity

## 📊 Development Roadmap

### Phase 1: Foundation ✅ (Current)
- [x] Project structure and basic HTML/CSS/JS
- [x] Responsive Bootstrap design
- [x] OpenStreetMap & Leaflet.js map integration (No API keys needed)
- [x] Working donation form
- [x] Navigation between pages

### Phase 2: Core Features (Next)
- [ ] User authentication system
- [ ] Backend API development
- [ ] Database integration
- [ ] Real-time donation updates
- [ ] Search and filter functionality

### Phase 3: Advanced Features
- [ ] Image upload for food items
- [ ] Real-time notifications
- [ ] Pickup request workflow
- [ ] Rating and review system
- [ ] Mobile app development

### Phase 4: Analytics & Growth
- [ ] User dashboard
- [ ] Impact analytics
- [ ] Community features
- [ ] Multi-region support
- [ ] API for third-party integrations

## 🤝 Founders & Contact

### Meet the Team
- **Praful Thakur** - Founder & Lead Developer
  - Passionate about using technology for social impact
  - Email: rajputpraful791@gmail.com

- **Jatin Dadwal** - Co-founder & Business Strategist
  - Dedicated to building sustainable community solutions

### Get in Touch
- **Email**: rajputpraful791@gmail.com
- **Purpose**: Questions about FoodShare, partnership opportunities, or general inquiries

## 🌱 Social Impact

FoodShare addresses two critical global challenges:

1. **Food Waste Reduction** - Billions of tons of food are wasted annually worldwide
2. **Hunger Alleviation** - Millions face food insecurity in communities everywhere

By connecting surplus food with those in need, FoodShare creates a **triple win**:
- **Environmental** - Reduces greenhouse gas emissions from food waste
- **Social** - Helps feed people experiencing hunger
- **Economic** - Maximizes the value of food resources

## 🔧 Technical Notes

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires internet connection for OpenStreetMap map tiles

### Mapping & Zero-Key Setup
- Uses OpenStreetMap via Leaflet.js - 100% free and open source
- No API keys, billing, or subscription required

### Data Storage
- Currently uses localStorage for demonstration
- SQLite database ready for backend integration
- Scalable architecture for future enhancements

## 📄 License

This project is developed with the mission to serve communities and reduce food waste. Feel free to use, modify, and distribute for non-commercial purposes.

## 🙏 Acknowledgments

- **Bootstrap Team** - For the excellent CSS framework
- **OpenStreetMap & Leaflet.js** - For the open-source mapping engine
- **Font Awesome** - For the beautiful icons
- **Open Source Community** - For inspiration and tools

---

**Made with ❤️ for communities everywhere**

*"Connecting surplus with need, one meal at a time"*
