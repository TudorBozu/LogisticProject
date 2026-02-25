# RoutaX Auth Pages

## Getting started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open: http://localhost:5173

### Routes
- `/sign-in` — Sign In page (default redirect)
- `/sign-up` — Sign Up / Registration page

### Project structure

```
src/
├── components/
│   └── auth/
│       ├── AuthLayout.tsx      # Split-screen layout (brand panel + form panel)
│       ├── Divider.tsx         # "or continue with" divider
│       ├── FormInput.tsx       # Reusable input with label, icon, error, password toggle
│       ├── Logo.tsx            # RoutaX logo mark
│       └── SocialButton.tsx    # OAuth provider buttons (Google, Apple, Facebook, Microsoft)
├── hooks/
│   └── useAuthForm.ts          # Generic form state + validation + submission hook
├── pages/
│   ├── SignInPage.tsx          # /sign-in
│   └── SignUpPage.tsx          # /sign-up
├── types/
│   └── auth.ts                 # TypeScript interfaces for form values
├── App.tsx                     # Router setup
├── main.tsx                    # Entry point
└── index.css                   # Global styles + Tailwind directives

### Authentication
Currently uses mock data. To integrate real auth:
1. Replace `mockSignIn()` in `SignInPage.tsx` with your actual API call
2. Replace `mockSignUp()` in `SignUpPage.tsx` with your actual API call  
3. Replace `mockSocialSignIn/Up()` functions with actual OAuth flows (e.g. Firebase, Auth0, Supabase)
```
