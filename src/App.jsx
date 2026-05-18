import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider,
} from "react-router-dom";

import Error from "./components/Error";

import Home from "./routes/Home";
import About from "./routes/About";
import Facility from "./routes/Facility";
import Admission from "./routes/Admission";
import Contact from "./routes/Contact";
import StudentProfile from "./routes/StudentProfile";

import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="facility" element={<Facility />} />

      <Route path="contact" element={<Contact />} />
      <Route path="apply" element={<Admission />} />
      <Route path="student-profile" element={<StudentProfile />} />
      <Route path="add-student" element={<AddStudent />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

import { SiteProvider } from "./context/SiteContext";
import AddStudent from "./routes/AddStudent";

const App = () => {
  return ( 
    <SiteProvider>
      <RouterProvider router={router} />
    </SiteProvider>
  );
}
 
export default App;