import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <MotionConfig reducedMotion="user">
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LazyMotion>
  </MotionConfig>
);

export default App;
