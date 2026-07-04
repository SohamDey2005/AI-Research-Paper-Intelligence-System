import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PaperDetails from "./pages/PaperDetails";
import SavedPapers from "./pages/SavedPapers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/paper/:id" element={<PaperDetails />} />
      <Route path="/saved" element={<SavedPapers />} />
    </Routes>
  );
}

export default App;