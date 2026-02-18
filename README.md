This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon account recommended)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SBK0910/spendly.git
   cd spendly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add these variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   DATABASE_URL=your_neon_database_url
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

## Learn More

**This is now the Spendly expense tracking application!**

Please refer to the full documentation below for setup and features.

## Deploy on Vercel

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Spendly

Track your expenses and visualize spending patterns. Manage finances and make smarter money decisions.

## Features

- 📊 Visual Analytics - Interactive charts for spending distribution
- 💰 Expense Management - Create, edit, and delete expenses effortlessly
- 💳 Multiple Payment Methods and 10+ Categories
- 🔐 Secure authentication with Clerk
- ⚡ Real-time updates with React Query
- 📱 Responsive design

## API Endpoints

- `POST /api/expense` - Create a new expense
- `GET /api/expense` - Fetch expenses
- `DELETE /api/expense/[id]` - Delete an expense

## Contributing

Contributions are welcome!

## License

Private Repository

---

**Built with ❤️ for better financial management**