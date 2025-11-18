# GitGreen UI Guide

Complete guide to the GitGreen user interface and frontend implementation.

## 📱 Pages Overview

### 1. Landing Page (`/`)

The main entry point showcasing GitGreen's features and value proposition.

**Sections:**
- **Hero** - Main headline with CTA buttons ("Connect GitHub", "View Demo")
- **How It Works** - 4-step process (Track, Tokenize, Offset, Certify)
- **Tech Stack** - Hedera integration showcase (Guardian, HTS, Consensus Service)
- **Footer** - Attribution and links

**Components Used:**
- Button (primary and outline variants)
- Card (for feature display)
- Badge (Hackathon track badge)

**Design:**
- Green gradient background (sustainability theme)
- Responsive grid layout (1/2/4 columns on mobile/tablet/desktop)
- Dark mode support

### 2. Dashboard (`/dashboard`)

Main user interface for managing repositories and viewing emissions.

**Sections:**
- **Header** - Logo, "Connect Repository" and "Calculate Emissions" actions
- **Stats Overview** - 3 key metrics:
  * Total Emissions (kg CO₂)
  * Carbon Offset (kg CO₂ + percentage)
  * Guardian Tokens (count)
- **Repository Tabs** - Filter by:
  * All Repositories
  * Active Tracking
  * Carbon Neutral
- **Repository List** - Shows:
  * Repository name (owner/name)
  * Total emissions
  * Status badge (CALCULATED, MINTED, OFFSET, RETIRED)
  * View Details button
- **Quick Actions** - 4 action cards:
  * Calculate Emissions
  * Purchase Offsets
  * View Badges
  * Emission History

**Components Used:**
- Card (stats, repository list, quick actions)
- Tabs (navigation between repository views)
- Badge (status indicators, offset percentage)
- Button (CTAs and view details)

**Data Structure:**
```typescript
{
  id: string;
  name: string;
  owner: string;
  totalEmissions: number;  // kg CO₂
  status: 'CALCULATED' | 'MINTED' | 'OFFSET' | 'RETIRED';
}
```

**Features:**
- Real-time emission summaries
- Color-coded status badges
- Percentage calculations
- Empty state handling

### 3. Verification Page (`/verify/[emissionId]`)

Public page for verifying emission tokens and viewing certificates.

**Sections:**
- **Header** - "Verified Emission Token" badge + repository info
- **Emission Summary** - 3 metrics:
  * Total CO₂ (kg)
  * CI/CD CO₂ (kg)
  * Status
- **Guardian Token Info**:
  * Token ID (monospace, copyable)
  * Transaction Hash (monospace, copyable)
  * Methodology version
- **Workflow Breakdown** - Detailed emissions by workflow:
  * Workflow name
  * Run count
  * Total runtime (minutes)
  * Runner type
  * CO₂ emissions (kg)
- **Verification Badge** - "Verified by Hedera Guardian" seal

**Components Used:**
- Card (all sections)
- Badge (verification status)
- Button (CTA to track emissions)

**URL Pattern:**
```
/verify/clyxxx... (emission ID)
```

**Use Cases:**
- Public verification of carbon neutrality
- Sharing emission certificates
- Audit trail for stakeholders
- GitHub README badges

---

## 🎨 Component Library

All components are built with shadcn/ui and Radix UI primitives.

### Button

**Variants:**
- `default` - Primary green button
- `destructive` - Red for dangerous actions
- `outline` - Border only
- `secondary` - Subtle gray background
- `ghost` - Transparent with hover
- `link` - Text link style

**Sizes:**
- `default` - h-10 px-4 py-2
- `sm` - h-9 px-3
- `lg` - h-11 px-8
- `icon` - h-10 w-10

**Props:**
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  // + all HTMLButtonElement props
}
```

**Usage:**
```tsx
<Button>Click Me</Button>
<Button variant="outline" size="lg">Large Outline</Button>
<Button variant="destructive">Delete</Button>
```

### Card

**Sub-components:**
- `Card` - Container
- `CardHeader` - Top section
- `CardTitle` - Heading (h3)
- `CardDescription` - Subheading
- `CardContent` - Main content (pt-6)
- `CardFooter` - Bottom section

**Usage:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Badge

**Variants:**
- `default` - Primary green
- `secondary` - Gray
- `destructive` - Red
- `outline` - Border only
- `success` - Green (custom)
- `warning` - Yellow (custom)

**Usage:**
```tsx
<Badge>Default</Badge>
<Badge variant="success">Verified</Badge>
<Badge variant="warning">Pending</Badge>
```

### Tabs

**Sub-components:**
- `Tabs` - Root container
- `TabsList` - Tab button container
- `TabsTrigger` - Individual tab button
- `TabsContent` - Content for each tab

**Usage:**
```tsx
<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="active">Active</TabsTrigger>
  </TabsList>
  <TabsContent value="all">All content</TabsContent>
  <TabsContent value="active">Active content</TabsContent>
</Tabs>
```

---

## 🎨 Design System

### Colors

**Primary (Green):**
- Used for sustainability theme
- Buttons, badges, accents
- HSL: `142 76% 36%`

**Status Colors:**
- Success: Green (`bg-green-500`)
- Warning: Yellow (`bg-yellow-500`)
- Destructive: Red (built-in)
- Muted: Gray (built-in)

**Dark Mode:**
- Automatic via `dark:` classes
- CSS variables in `globals.css`
- Toggle-able with class on `<html>`

### Typography

**Font Stack:**
```
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
Roboto, "Helvetica Neue", Arial, sans-serif
```

**Sizes:**
- `text-xs` - 0.75rem
- `text-sm` - 0.875rem
- `text-base` - 1rem
- `text-lg` - 1.125rem
- `text-xl` - 1.25rem
- `text-2xl` - 1.5rem
- `text-3xl` - 1.875rem
- `text-4xl` - 2.25rem
- `text-5xl` - 3rem
- `text-6xl` - 3.75rem

### Spacing

Using Tailwind's default spacing scale (4px base):
- `gap-4` - 1rem
- `gap-6` - 1.5rem
- `p-4` - 1rem padding
- `py-8` - 2rem vertical padding
- `mb-6` - 1.5rem margin bottom

### Responsive Breakpoints

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

**Grid Examples:**
```tsx
// 1 column mobile, 2 tablet, 3 desktop
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

// 1 column mobile, 2 tablet, 4 desktop
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
```

---

## 🔌 API Integration

### Emission Calculation

**Endpoint:** `POST /api/emissions/calculate`

**Request:**
```typescript
{
  repositoryId: string;
  repositoryName: string;
  repositoryOwner: string;
  periodStart: Date;
  periodEnd: Date;
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    emission: {
      id: string;
      totalCO2kg: number;
      guardianTokenId: string;
      status: 'MINTED';
    };
    summary: {
      periodStart: Date;
      periodEnd: Date;
      totalWorkflows: number;
      totalRuns: number;
      totalCO2kg: number;
    };
  };
}
```

### Get Repository Emissions

**Endpoint:** `GET /api/emissions/[repositoryId]`

**Response:**
```typescript
{
  success: true;
  data: {
    emissions: Emission[];
    summary: {
      totalEmissions: number;
      offsetEmissions: number;
      pendingEmissions: number;
      tokenCount: number;
    };
  };
}
```

---

## 🚀 Running Locally

### Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up database
./setup-dev-db.sh

# 3. Start dev server
npm run dev

# 4. Open browser
http://localhost:3000
```

### Build for Production

```bash
# Compile TypeScript and build
npm run build

# Start production server
npm start
```

**Note:** Requires Prisma client generation. See `DEVELOPMENT_SETUP.md`.

---

## 📊 Data Flow

### Emission Tracking Flow

1. User connects GitHub repository
2. GitGreen fetches workflow runs via GitHub API
3. Carbon calculation service computes emissions
4. Emission record saved to database
5. Guardian service mints emission token
6. Token ID linked to emission record
7. User can view in dashboard
8. Public verification page generated

### User Journey

```
Landing Page (/)
    ↓ [Connect GitHub]
Dashboard (/dashboard)
    ↓ [View Repository]
Repository Details
    ↓ [Calculate Emissions]
API Call → Guardian Token Minted
    ↓ [View Certificate]
Verification Page (/verify/[id])
```

---

## 🎯 Future Enhancements

### Planned Features

1. **Real GitHub OAuth**
   - Connect actual repositories
   - Fetch real workflow data
   - Automatic webhook triggers

2. **Interactive Charts**
   - Recharts integration
   - Emission trends over time
   - Workflow comparison

3. **Offset Marketplace**
   - Browse verified projects
   - Purchase with HBAR
   - Smart contract integration

4. **NFT Badges**
   - Carbon neutral badges
   - Achievement system
   - HTS integration

5. **GitHub Integration**
   - README badges
   - PR comments with emissions
   - Webhook automation

### Component Additions Needed

- [ ] Input component
- [ ] Select/Dropdown component
- [ ] Toast notifications
- [ ] Loading spinners
- [ ] Modal dialogs
- [ ] Charts (Recharts)
- [ ] Table component
- [ ] Form components

---

## 🧪 Testing

### Manual Testing Checklist

**Landing Page:**
- [ ] Hero section displays correctly
- [ ] CTA buttons link to correct pages
- [ ] Features section is responsive
- [ ] Dark mode works

**Dashboard:**
- [ ] Stats calculate correctly
- [ ] Tabs switch properly
- [ ] Repository list displays
- [ ] Empty state shows when no repos
- [ ] Badges show correct colors

**Verification Page:**
- [ ] Emission details display
- [ ] Token info is copyable
- [ ] Workflow breakdown accurate
- [ ] Verification badge shows

**Responsive Design:**
- [ ] Mobile view (< 640px)
- [ ] Tablet view (640-1024px)
- [ ] Desktop view (> 1024px)

---

## 📝 Notes

- All UI components use client-side rendering ('use client')
- Mock data currently used for demonstration
- Database integration ready via Prisma
- API endpoints functional with mock Guardian
- Production build requires database setup

---

**Last Updated:** 2025-01-18
**Version:** 0.1.0
