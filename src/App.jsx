import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './components/Page.jsx'
import Card from './components/Card.jsx';
import Favorite from './components/Favorites.jsx';

// import './App.css'

function App() {

  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/favorites" element={<Favorite />} />
        <Route path="/country/:countryName" element={<Card />} />
      </Routes>
    </Router>
  )
}

export default App
