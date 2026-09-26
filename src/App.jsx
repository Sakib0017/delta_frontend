import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Vision from './pages/Vision';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ServicePage from './pages/ServicePage';
import Services from './pages/Services';
import NewsDetail from './pages/NewsDetail';

import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Register from './admin/Register';
import { Forgot, Reset } from './admin/Password';
import Dashboard from './admin/Dashboard';
import CrudPage from './admin/CrudPage';
import Messages from './admin/Messages';
import ChangePassword from './admin/ChangePassword';
import ProjectsAdmin from './admin/ProjectsAdmin';
import { VisionAdmin, AboutAdmin } from './admin/ContentAdmin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return null;
}

function Public({ children }) {
  return (
    <div className="min-h-svh flex flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1 w-full min-w-0">{children}</main>
      <Footer />
    </div>
  );
}

function Guard({ children }) {
  if (!localStorage.getItem('delta_token')) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Public><Home /></Public>} />
        <Route path="/about" element={<Public><About /></Public>} />
        <Route path="/vision" element={<Public><Vision /></Public>} />
        <Route path="/history" element={<Public><Vision /></Public>} />
        <Route path="/team" element={<Public><Team /></Public>} />
        <Route path="/gallery" element={<Public><Gallery /></Public>} />
        <Route path="/gallary" element={<Public><Gallery /></Public>} />
        <Route path="/contact" element={<Public><Contact /></Public>} />
        <Route path="/services" element={<Public><Services /></Public>} />
        <Route path="/services/:slug" element={<Public><ServicePage /></Public>} />
        <Route path="/news/:id" element={<Public><NewsDetail /></Public>} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/forgot" element={<Forgot />} />
        <Route path="/admin/reset-password" element={<Reset />} />

        <Route path="/admin" element={<Guard><AdminLayout /></Guard>}>
          <Route index element={<Dashboard />} />
          <Route path="sliders" element={<CrudPage title="Slider" subtitle="Homepage hero slides" endpoint="/sliders" fields={[{ name: 'header', label: 'Slider Title', type: 'text', required: true }, { name: 'content', label: 'Description', type: 'textarea', required: true }, { name: 'img', label: 'Background Image', type: 'image', required: true }]} columns={['img', 'header', 'content']} />} />
          <Route path="services" element={<CrudPage title="Core Services" endpoint="/services" fields={[{ name: 'content', label: 'Card Title', type: 'text', required: true }, { name: 'content1', label: 'Card Subtitle', type: 'text' }, { name: 'links', label: 'Link (e.g. /services/building)', type: 'text' }, { name: 'img', label: 'Image', type: 'image', required: true }]} columns={['img', 'content', 'links']} />} />
          <Route path="partners" element={<CrudPage title="Corporate Partners" endpoint="/clients" fields={[{ name: 'img', label: 'Partner Logo', type: 'image', required: true }]} columns={['img']} />} />
          <Route path="news" element={<CrudPage title="Latest News" endpoint="/news" fields={[{ name: 'header', label: 'Title', type: 'text', required: true }, { name: 'content', label: 'Summary', type: 'textarea', required: true }, { name: 'detail', label: 'Detail', type: 'textarea' }, { name: 'img', label: 'Image', type: 'image', required: true }]} columns={['img', 'header', 'content']} />} />
          <Route path="messages" element={<Messages />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="keys" element={<CrudPage title="About Us — Key Areas" endpoint="/keys" fields={[{ name: 'header', label: 'Header', type: 'text', required: true }, { name: 'content', label: 'Content', type: 'textarea', required: true }]} columns={['header', 'content']} />} />
          <Route path="vision" element={<VisionAdmin />} />
          <Route path="team" element={<CrudPage title="Team" endpoint="/team" fields={[{ name: 'name', label: 'Name', type: 'text', required: true }, { name: 'description', label: 'Role', type: 'text', required: true }, { name: 'content', label: 'Bio', type: 'textarea', required: true }, { name: 'img', label: 'Photo', type: 'image', required: true }]} columns={['img', 'name', 'description']} />} />
          <Route path="gallery" element={<CrudPage title="Gallery" endpoint="/gallery" fields={[{ name: 'header', label: 'Category (tab header)', type: 'text', required: true }, { name: 'img', label: 'Image', type: 'image', required: true }]} columns={['img', 'header']} />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="members" element={<CrudPage title="Members" subtitle="Legacy `user` table" endpoint="/members" fields={[{ name: 'name', label: 'Name', type: 'text', required: true }, { name: 'email', label: 'Email', type: 'text', required: true }, { name: 'spec', label: 'Specialization', type: 'text' }, { name: 'contact', label: 'Contact', type: 'text' }, { name: 'room', label: 'Room', type: 'text' }, { name: 'cember', label: 'Member info', type: 'text' }]} columns={['name', 'email', 'spec']} />} />
          <Route path="misc" element={<CrudPage title="Miscellaneous" endpoint="/misc" fields={[{ name: 'content', label: 'Content', type: 'text', required: true }, { name: 'img', label: 'Image', type: 'image' }]} columns={['img', 'content']} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
