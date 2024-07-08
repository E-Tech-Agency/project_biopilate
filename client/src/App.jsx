import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Accueil from "./Pages/Accueil";
import Apropos from "./Pages/Apropos";
import Cours from "./Pages/Cours";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Formations from "./Pages/Formations";

export default function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/accueil" element={<Accueil />}></Route>
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
