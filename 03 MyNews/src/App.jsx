import React, { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Header from './components/Header/Header'
import FeaturedNews from './components/FeaturedNews'
import { BrowserRouter , Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color='#0d6efd'
        height={4}
        progress={progress}
      />
      <BrowserRouter basename="/">
        <Header />
        <Routes>
          <Route exact path="/" element={<FeaturedNews setProgress={setProgress} key="home" pageSize={9} country="us" category="general" />} />
          <Route exact path="/business" element={<FeaturedNews setProgress={setProgress} key="business" pageSize={9} country='us' category='business' />} />
          <Route exact path="/entertainment" element={<FeaturedNews setProgress={setProgress} key="entertainment" pageSize={9} country='us' category='entertainment' />} />
          <Route exact path="/health" element={<FeaturedNews setProgress={setProgress} key="health" pageSize={9} country='us' category='health' />} />
          <Route exact path="/science" element={<FeaturedNews setProgress={setProgress} key="science" pageSize={9} country='us' category='science' />} />
          <Route exact path="/sports" element={<FeaturedNews setProgress={setProgress} key="sports" pageSize={9} country='us' category='sports' />} />
          <Route exact path="/technology" element={<FeaturedNews setProgress={setProgress} key="technology" pageSize={9} country='us' category='technology' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
