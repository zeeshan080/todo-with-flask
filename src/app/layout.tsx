import './globals.css'
import Providers from './providers'
import AddTask from './components/models/add-tasks'

export const metadata = {
  title: 'Todo List',
  description: 'An interactive todo list',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={`bg-gray-200`}>
        <AddTask/>
        {children}
        </body>
      </Providers>
    </html>
  )
}
