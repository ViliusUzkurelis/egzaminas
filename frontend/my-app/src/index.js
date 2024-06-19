import {React, useState}from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './routes/index';
import Login from './routes/login/login';
import Register from './routes/register/register';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Admin from './routes/admin/admin';
import Renginiai from './routes/renginiai/renginiai';
import { ReactSession } from 'react-client-session';

export default function App() {

  ReactSession.setStoreType("localStorage");

  const [admin, setAdmin] = useState(ReactSession.get("admin"));

  return (
    <BrowserRouter>
      <Header admin={admin}/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login setAdmin={setAdmin}/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/renginiai/:miestas" element={<Renginiai />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(< App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
