import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import FloralBackdrop from './components/FloralBackdrop.jsx'
import Home from './pages/Home.jsx'
import Cerimonia from './pages/Cerimonia.jsx'
import Historia from './pages/Historia.jsx'
import Mural from './pages/Mural.jsx'
import Informacoes from './pages/Informacoes.jsx'
import Indicacoes from './pages/Indicacoes.jsx'
import Mensagens from './pages/Mensagens.jsx'
import Presentes from './pages/Presentes.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { LightboxProvider } from './components/Lightbox.jsx'

export default function App() {
  return (
    <LightboxProvider>
      <FloralBackdrop />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cerimonia" element={<Cerimonia />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/mural" element={<Mural />} />
          <Route path="/informacoes" element={<Informacoes />} />
          <Route path="/indicacoes" element={<Indicacoes />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/presentes" element={<Presentes />} />
          {/* /caronas e /presenca saíram do ar depois da celebração; quem tiver
              o link antigo salvo cai no início em vez de numa página vazia. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </LightboxProvider>
  )
}
