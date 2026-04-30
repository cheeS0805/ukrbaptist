import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout/MainLayout'
import { HomePage } from './pages/HomePage/HomePage'
import { ChurchesPage } from './pages/ChurchesPage/ChurchesPage'
import { ChurchDetailPage } from './pages/ChurchDetailPage/ChurchDetailPage'
import { EventsPage } from './pages/EventsPage/EventsPage'
import { EventsArchivePage } from './pages/EventsArchivePage/EventsArchivePage'
import { EventDetailPage } from './pages/EventDetailPage/EventDetailPage'
import { ContactsPage } from './pages/ContactsPage/ContactsPage'
import { DonatePage } from './pages/DonatePage/DonatePage'
import { GaragePage } from './pages/GaragePage/GaragePage'
import { GarageDetailPage } from './pages/GarageDetailPage/GarageDetailPage'
import { HistoryPage } from './pages/about/HistoryPage/HistoryPage'
import { CommitteePage } from './pages/about/CommitteePage/CommitteePage'
import { CreedPage } from './pages/about/CreedPage/CreedPage'
import { PartnersPage } from './pages/about/PartnersPage/PartnersPage'
import { ArticleDetailPage } from './pages/ArticleDetailPage/ArticleDetailPage'
import { ArticlesPage } from './pages/ArticlesPage/ArticlesPage'


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/churches" element={<ChurchesPage />} />
          <Route path="/churches/:slug" element={<ChurchDetailPage />} />
          <Route path="/blog" element={<Navigate to="/our-events" replace />} />
          <Route path="/our-events" element={<EventsPage />} />
          <Route path="/our-events/archive" element={<EventsArchivePage />} />
          <Route path="/our-events/:slug" element={<EventDetailPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/garage/:slug" element={<GarageDetailPage />} />
          <Route path="/about-us/history" element={<HistoryPage />} />
          <Route path="/about-us/committee" element={<CommitteePage />} />
          <Route path="/about-us/creed" element={<CreedPage />} />
          <Route path="/about-us/partners" element={<PartnersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
