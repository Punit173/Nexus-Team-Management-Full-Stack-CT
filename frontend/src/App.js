import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-animated text-gray-100 relative overflow-hidden">
        {/* Decorative floating orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-4 py-10 max-w-6xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddMember />} />
              <Route path="/members" element={<ViewMembers />} />
              <Route path="/members/:id" element={<MemberDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
