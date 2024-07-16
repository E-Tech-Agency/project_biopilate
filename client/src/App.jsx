import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Accueil from "./pages/Accueil";
import Apropos from "./pages/Apropos";
import Cours from "./pages/Cours";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Formations from "./pages/Formations";

export default function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />}></Route>
          <Route path="/a-propos" element={<Apropos />}></Route>
          <Route path="/cours" element={<Cours />}></Route>
          <Route path="/formations" element={<Formations />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}
