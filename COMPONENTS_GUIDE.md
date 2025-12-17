# Reusable Components Guide

Is project mein code ko modular aur reusable banane ke liye common components create kiye gaye hain.

## 📁 Component Structure

```
src/components/
├── common/              # Reusable components
│   ├── PageHeader.tsx
│   ├── SectionBadge.tsx
│   ├── PrimaryButton.tsx
│   ├── OutlineButton.tsx
│   ├── FeatureCard.tsx
│   └── index.ts
├── layout/              # Layout components
│   ├── MainNav.tsx
│   ├── Footer.tsx
│   └── AOSInit.tsx
├── sections/            # Page sections
│   └── ...
└── ui/                  # Shadcn UI components
    └── ...
```

## 🎨 Common Components

### 1. PageHeader
**Purpose:** Page title, badge, description aur breadcrumbs ke liye

**Usage:**
```tsx
import PageHeader from "@/components/common/PageHeader";

<PageHeader 
  badge="About InvestaX"
  title="About Us"
  description="Learn more about our company"  // Optional
  breadcrumb="About Us"
/>
```

**Props:**
- `badge?: string` - Top badge text (optional)
- `title: string` - Main heading (required)
- `description?: string` - Subtitle text (optional)
- `breadcrumb: string` - Breadcrumb current page name (required)

---

### 2. SectionBadge
**Purpose:** Section labels/tags ke liye

**Usage:**
```tsx
import { SectionBadge } from "@/components/common";

<SectionBadge>Investment Opportunities</SectionBadge>
<SectionBadge className="mb-4">Custom Styling</SectionBadge>
```

**Props:**
- `children: React.ReactNode` - Badge content (required)
- `className?: string` - Additional CSS classes (optional)

**Default Styling:**
- Gold background with border
- Rounded full shape
- Consistent padding

---

### 3. PrimaryButton
**Purpose:** Primary action buttons (Gold background)

**Usage:**
```tsx
import { PrimaryButton } from "@/components/common";

<PrimaryButton>Start Investing</PrimaryButton>
<PrimaryButton className="px-10 py-7">Custom Size</PrimaryButton>
<PrimaryButton size="sm">Small Button</PrimaryButton>
```

**Props:**
- `children: React.ReactNode` - Button content (required)
- `size?: "default" | "sm" | "lg" | "icon"` - Button size (default: "lg")
- `className?: string` - Additional CSS classes (optional)
- All standard HTML button attributes

**Default Styling:**
- Gold background (`#D4AF37`)
- Dark navy text (`#0F1C2E`)
- Hover effect with darker gold
- No border

---

### 4. OutlineButton
**Purpose:** Secondary action buttons (Transparent with gold border)

**Usage:**
```tsx
import { OutlineButton } from "@/components/common";

<OutlineButton>Contact Us</OutlineButton>
<OutlineButton className="px-10 py-7">Custom Size</OutlineButton>
```

**Props:**
- `children: React.ReactNode` - Button content (required)
- `size?: "default" | "sm" | "lg" | "icon"` - Button size (default: "lg")
- `className?: string` - Additional CSS classes (optional)
- All standard HTML button attributes

**Default Styling:**
- Transparent background
- Gold border (`#D4AF37`)
- White text
- Hover: Gold background with dark text

---

### 5. FeatureCard
**Purpose:** Icon, title aur description wale cards ke liye

**Usage:**
```tsx
import { FeatureCard } from "@/components/common";
import { Shield } from "lucide-react";

<FeatureCard 
  icon={Shield}
  title="Secure Investment"
  description="Your investment is protected with legal documentation"
/>
```

**Props:**
- `icon: LucideIcon` - Lucide icon component (required)
- `title: string` - Card title (required)
- `description: string` - Card description (required)
- `className?: string` - Additional CSS classes (optional)

**Default Styling:**
- Navy gradient background
- Gold border
- Gold icon
- Rounded corners
- Consistent padding

---

## 📦 Import Methods

### Named Imports (Recommended)
```tsx
import { PageHeader, SectionBadge, PrimaryButton, OutlineButton, FeatureCard } from "@/components/common";
```

### Individual Imports
```tsx
import PageHeader from "@/components/common/PageHeader";
import SectionBadge from "@/components/common/SectionBadge";
```

---

## 🎯 Benefits

1. **Consistency:** Sab jagah same design aur styling
2. **Maintainability:** Ek jagah change karo, sab jagah update ho jaye
3. **Reusability:** Code duplication nahi, clean codebase
4. **Type Safety:** TypeScript props ke saath full type checking
5. **Customization:** className prop se easy customization

---

## 🔄 Migration Summary

### Pages Updated:
- ✅ `src/app/about/page.tsx`
- ✅ `src/app/services/page.tsx`
- ✅ `src/app/investment/page.tsx`
- ✅ `src/app/team/page.tsx`
- ✅ `src/app/testimonials/page.tsx`
- ✅ `src/app/faqs/page.tsx`
- ✅ `src/app/contact/page.tsx`
- ✅ `src/app/blog/page.tsx`

### Sections Updated:
- ✅ `AboutSection.tsx`
- ✅ `HeroSection.tsx`
- ✅ `CtaBannerSection.tsx`
- ✅ `InvestmentPlansSection.tsx`
- ✅ `BlogSection.tsx`
- ✅ `ServicesSection.tsx`
- ✅ `TestimonialsSection.tsx`
- ✅ `FaqSection.tsx`
- ✅ `ContactSection.tsx`
- ✅ `HighlightCardsSection.tsx`

---

## 💡 Best Practices

1. **Always use common components** jahan bhi repeated patterns ho
2. **Customize with className** instead of creating new components
3. **Keep components simple** - single responsibility principle
4. **Use TypeScript props** for type safety
5. **Document any new components** is guide mein

---

## 🚀 Future Enhancements

Agar aur patterns repeat ho rahe hain, to naye components add kar sakte hain:
- `StatCard` - Statistics display ke liye
- `TestimonialCard` - Testimonials ke liye
- `ServiceCard` - Service cards ke liye
- `BlogCard` - Blog posts ke liye

---

**Last Updated:** December 2024
**Maintained By:** InvestaX Development Team

