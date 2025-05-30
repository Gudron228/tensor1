import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Music } from './components/Music/Music';
import { Search } from './components/Search/Search';
import {  Route } from 'react-router-dom';


export default function App() {
   return (
     <div className="app">
        <Header />
        <Route path="/music" component={Music}></Route>
        <Route path="/search" component={Search}></Route>
        <Footer />
     </div>
   );
}

