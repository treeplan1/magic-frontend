# MagicPen - Website Clone

A pixel-perfect clone of the MagicPen landing page - an AI-powered LinkedIn content creation platform.

## 🎨 Original Website

The original website can be found at: [https://coral-raven-277062.hostingersite.com/](https://coral-raven-277062.hostingersite.com/)

## ✨ Features

This clone includes all the main sections and features of the original website:

- **Fixed Navigation Bar** - Responsive navbar with mobile menu support
- **Hero Section** - Eye-catching gradient headline with call-to-action buttons
- **Features Section** - 4 feature cards highlighting key capabilities
- **Social Proof** - Display of trusted company logos (Google, Microsoft, Amazon, Meta, Apple)
- **Testimonials** - User reviews with avatar placeholders
- **FAQ Accordion** - Interactive expandable/collapsible questions and answers
- **CTA Section** - Prominent call-to-action with gradient background
- **Footer** - Organized links and copyright information
- **Authentication Modals** - Complete login and signup forms with:
  - Email and password fields
  - Full name field (signup only)
  - Password visibility toggle
  - Remember me checkbox (login only)
  - Forgot password link (login only)
  - Social login buttons (Google & Facebook)
  - Form validation
  - Responsive design
  - Easy toggle between login and signup modes

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon set
- **JavaScript (ES6+)**

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Magic-pen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Magic-pen/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css          # Custom styles
│   ├── App.jsx          # Main application component
│   ├── index.css        # Tailwind CSS imports
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🎯 Key Components

### Navigation
- Responsive design with mobile menu toggle
- Fixed position with backdrop blur effect
- Smooth scroll navigation to sections

### Hero Section
- Large gradient text headline
- Two CTA buttons (primary and secondary)
- Hero image with shadow effects

### Features Grid
- 4 feature cards with icons
- Hover effects for better interactivity
- Responsive grid layout (1-2-4 columns)

### Testimonials
- 3 testimonial cards with gradient backgrounds
- Avatar placeholders with initials
- Responsive 3-column grid

### FAQ Accordion
- Interactive expand/collapse functionality
- Smooth transitions
- Chevron icon rotation animation

### CTA Section
- Full-width gradient background (purple to pink)
- Centered content with prominent button

### Footer
- 4-column layout (Logo, Product, Company, Legal)
- Responsive design
- Copyright notice

## 🎨 Design Features

- **Color Scheme**: Purple (#7C3AED) and Pink (#EC4899) gradients
- **Typography**: Clean, modern sans-serif fonts
- **Spacing**: Consistent padding and margins using Tailwind's spacing scale
- **Shadows**: Subtle box shadows for depth
- **Transitions**: Smooth hover and click animations
- **Responsive**: Mobile-first design that works on all screen sizes

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Authentication System

### How It Works

The authentication system includes:

1. **Login Modal** - Accessible via "Login" button in navbar
   - Email and password fields
   - Remember me checkbox
   - Forgot password link
   - Social login options (Google & Facebook)

2. **Signup Modal** - Accessible via "Get Started" buttons
   - Full name field
   - Email and password fields
   - Password strength indicator
   - Terms of service agreement
   - Social signup options

3. **Features**
   - Password visibility toggle (eye icon)
   - Form validation (HTML5)
   - Easy switching between login/signup
   - Responsive modal design
   - Close on background click or X button

4. **Integration Ready**
   - Form submission handler in place
   - Console logging for debugging
   - Ready to connect to your backend API
   - All form data captured in state

### Connecting to Your Backend

To connect the auth forms to your backend, update the `handleSubmit` function in `App.jsx`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    const data = await response.json()
    // Handle success
  } catch (error) {
    // Handle error
  }
}
```

## 🔧 Customization

### Changing Colors

The main colors are defined using Tailwind classes. To change them:
- Purple: `purple-600`, `purple-700`, etc.
- Pink: `pink-600`, etc.

### Modifying Content

All content is stored directly in the `App.jsx` file in arrays:
- `features` - Feature cards content
- `testimonials` - User testimonials
- `faqs` - FAQ questions and answers
- `companies` - Company names

## 📄 License

This is a clone project created for educational purposes.

## 🤝 Contributing

Feel free to fork this project and make improvements. Pull requests are welcome!

## 📞 Support

For any questions or issues, please open an issue in the repository.

---

Made with ❤️ using React and Tailwind CSS
