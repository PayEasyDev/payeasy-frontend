import { useState } from 'react';
   import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
   import Navbar from './components/Navbar';
   import AuthModal from './components/AuthModal';
   import UserPage from './components/UserPage'; // New user page component
   import heroImage from './images/HomePageImage.jpg';
   import './App.css';

   function App() {
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [modalMode, setModalMode] = useState('login');

       const openModal = (mode) => {
           setModalMode(mode);
           setIsModalOpen(true);
       };

       return (
           <Router>
               <div className="app">
                   <Navbar
                       onLoginClick={() => openModal('login')}
                       onSignupClick={() => openModal('signup')}
                   />
                   <Routes>
                       <Route
                           path="/"
                           element={
                               <section className="hero">
                                   <div className="hero-text">
                                       <h1>
                                           What's PayEasy? <br />
                                           Glad you asked!
                                       </h1>
                                       <p className="hero-subtext">
                                           PayEasy is a great way to send money to friends and family, even if they bank somewhere different than you do. That means it’s super easy to get paid back, or split the costs of things like dinner. With PayEasy, the money goes directly into your bank account. And when money goes into your bank account directly, you can live delightfully. PayEasy is already in lots of banking apps, so look for it in yours today.
                                       </p>
                                       <button className="hero-cta" onClick={() => alert('Feature coming soon')}>
                                           See if your bank offers PayEasy
                                       </button>
                                   </div>
                                   <div className="hero-image">
                                       <img src={heroImage} alt="Friends splitting sweets" />
                                   </div>
                               </section>
                           }
                       />
                       <Route path="/user" element={<UserPage />} />
                   </Routes>
                   {isModalOpen && (
                       <AuthModal
                           initialMode={modalMode}
                           onClose={() => setIsModalOpen(false)}
                           onSuccess={() => setIsModalOpen(false)} // We'll update AuthModal to redirect
                       />
                   )}
               </div>
           </Router>
       );
   }

   export default App;