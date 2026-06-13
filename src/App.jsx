import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";

import Error from "./components/Error";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Facility = lazy(() => import("./routes/Facility"));
const Admission = lazy(() => import("./routes/Admission"));
const Contact = lazy(() => import("./routes/Contact"));
const StudentProfile = lazy(() => import("./routes/StudentProfile"));
const AddStudent = lazy(() => import("./routes/AddStudent"));
const EditStudent = lazy(() => import("./routes/EditStudent"));
const AdminLogin = lazy(() => import("./routes/AdminLogin"));

import RootLayout from "./layouts/RootLayout";

import { SiteProvider } from "./context/SiteContext";
import { AuthProvider } from "./context/AuthContext";

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
      <Route path="edit-student/:id" element={<EditStudent />} />
      <Route path="admin-login" element={<AdminLogin />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

const App = () => {
  return ( 
    <AuthProvider>
      <SiteProvider>
        <RouterProvider router={router} />
      </SiteProvider>
    </AuthProvider>
  );
}
 
export default App;