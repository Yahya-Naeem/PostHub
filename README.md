# PostHub - Modern Dashboard

A cutting-edge Next.js dashboard application for managing posts with a beautiful, responsive design.

## 🚀 Features

- **Modern UI/UX**: Beautiful gradient design with glass morphism effects
- **Full CRUD Operations**: Create, read, update, and delete posts
- **Rich Text Editor**: Custom-built editor with formatting options and live preview
- **Responsive Design**: Works perfectly on all devices
- **Real-time Updates**: Optimistic updates with React Query
- **Dark Mode Support**: Toggle between light and dark themes
- **Error Handling**: Comprehensive error handling and loading states
- **TypeScript**: Fully typed for better development experience

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **React Query** - Data fetching, caching, and synchronization
- **Lucide React** - Beautiful icons

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd posthub-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

\`\`\`
src/
├── app/
│   ├── admin/           # Admin dashboard page
│   ├── posts/[id]/      # Dynamic post detail pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # App providers (React Query, Theme)
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── admin-dashboard.tsx
│   ├── header.tsx
│   ├── post-detail.tsx
│   ├── post-form.tsx
│   ├── posts-list.tsx
│   └── rich-text-editor.tsx
└── lib/
    ├── api.ts           # API functions
    └── utils.ts         # Utility functions
\`\`\`

## 🎯 Pages

### Public Site (/)
- Displays a beautiful grid of posts
- Each post shows title and excerpt
- Click to navigate to post details
- Responsive design with hover effects

### Post Details (/posts/[id])
- Full post content display
- Comments section
- Beautiful typography and layout
- Back navigation

### Admin Dashboard (/admin)
- Complete CRUD operations for posts
- Rich text editor for post content
- Confirmation dialogs for destructive actions
- Real-time updates with optimistic UI

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple/indigo gradients
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Modern Typography**: Clean, readable fonts
- **Consistent Spacing**: Well-structured layouts
- **Accessible Colors**: High contrast for readability

## 🔧 API Integration

The app integrates with JSONPlaceholder API:
- \`GET /posts\` - Fetch all posts
- \`GET /posts/:id\` - Fetch single post
- \`GET /posts/:id/comments\` - Fetch post comments
- \`POST /posts\` - Create new post
- \`PUT /posts/:id\` - Update post
- \`DELETE /posts/:id\` - Delete post

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Enhanced**: Rich experience on larger screens
- **Touch Friendly**: Large touch targets for mobile

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Manual Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## 🧪 Development

### Adding New Features

1. Create components in \`components/\` directory
2. Add API functions to \`lib/api.ts\`
3. Use React Query for data management
4. Follow the existing design patterns

### Styling Guidelines

- Use TailwindCSS utility classes
- Follow the gradient color scheme (indigo/purple)
- Maintain consistent spacing and typography
- Use shadcn/ui components when possible

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js and modern web technologies.
\`\`\`
