# Delight Tours & Travel

A modern tour booking platform built with Next.js, featuring integration with leading travel platforms including Viator, Bókun, GetYourGuide, and Tripadvisor.

## Features

- **Tour Browsing**: Explore curated tours and activities with detailed information
- **Multi-platform Integration**: Connects with Viator, Bókun, GetYourGuide, and Tripadvisor APIs
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Availability**: Check tour availability and book instantly
- **Customer Reviews**: Display reviews from multiple platforms
- **Video Hero Section**: Engaging homepage with video background

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Frontend**: React 19.2.4
- **Styling**: Tailwind CSS 4 with PostCSS
- **Language**: TypeScript 5
- **Fonts**: Google Fonts (Lato, Open Sans)
- **Linting**: ESLint 9 with Next.js config

## Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun package manager

## Installation

Install all dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Startup Options

### Development Mode (Recommended for development)

Start the development server with hot-reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at:
- Local: http://localhost:3000
- Network: http://<your-ip-address>:3000

Changes to files are automatically reflected in the browser.

### Production Build

Create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

This generates a `.next` folder with optimized production assets.

### Production Server

Start the production server (requires build first):

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

The production server will be available at http://localhost:3000.

### Linting

Check code quality with ESLint:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
# or
bun lint
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Viator API Configuration
VIATOR_API_KEY=your_viator_api_key_here
VIATOR_BASE_URL=https://api.viator.com

# Add other API keys as needed for:
# - Bókun
# - GetYourGuide
# - Tripadvisor
```

## Project Structure

```
delight-tours/
├── app/                    # Next.js App Router
│   ├── api/               # API routes for platform integrations
│   │   ├── viator/       # Viator API integration
│   │   ├── bokun/        # Bókun API integration
│   │   ├── getyourguide/ # GetYourGuide API integration
│   │   └── tripadvisor/  # Tripadvisor API integration
│   ├── about/            # About page
│   ├── booking/          # Booking page
│   ├── contact/          # Contact page
│   ├── reviews/          # Reviews page
│   ├── tours/            # Tours listing page
│   ├── layout.tsx        # Root layout with fonts and navigation
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles and Tailwind theme
│   └── favicon.ico       # Site favicon
├── components/            # Reusable React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer component
│   ├── TourCard.tsx      # Tour display card
│   └── ReviewCard.tsx    # Review display card
├── public/               # Static assets
│   ├── delighttoursandtravel.png
│   ├── window.svg
│   ├── globe.svg
│   ├── file.svg
│   ├── next.svg
│   └── vercel.svg
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.mjs    # PostCSS configuration
├── eslint.config.mjs     # ESLint configuration
└── package.json          # Project dependencies
```

## Available Pages

- **/** - Homepage with hero section, featured tours, and partner logos
- **/tours** - Browse all available tours and activities
- **/booking** - Booking page for tour reservations
- **/reviews** - Customer reviews and ratings
- **/about** - Learn more about Delight Tours & Travel
- **/contact** - Contact information and form

## API Integration

The application integrates with multiple tour booking platforms:

- **Viator**: Product details, reviews, and availability
- **Bókun**: Tour management and booking
- **GetYourGuide**: Activity listings and reservations
- **Tripadvisor**: Reviews and ratings

API routes are located in `app/api/` and require corresponding environment variables.

## Styling

The project uses a custom color theme defined in `app/globals.css`:

- **Primary**: #8B5E3C (brown)
- **Background**: #FFFFFF (white)
- **Foreground**: #3B2A1A (dark brown)
- **Accent**: #D2B48C (tan)
- **CTA**: #8B5E3C (matching primary)

## Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/delight-tours)

### Other Platforms

Build the project and start the production server:

```bash
npm run build
npm run start
```

Ensure all environment variables are configured in your deployment platform.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This project is private and proprietary to Delight Tours & Travel.

## Support

For questions or support, contact the development team or visit the contact page at /contact.
