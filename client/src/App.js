import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Cartpage from "./pages/Cartpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Profilepage from "./pages/Profilepage";
import Shippingpage from "./pages/Shippingpage";
import Paymentpage from "./pages/Paymentpage";
import Orderpage from "./pages/Orderpage";
import Confirmationpage from "./pages/Confirmationpage";

const App = () => {
  const [paypalClientId, setPaypalClientId] = useState("test");
  const fetchPayPalClientId = async () => {
    const { data } = await axios.get("/api/config/paypal");
    return data;
  };

  useEffect(() => {
    fetchPayPalClientId().then((id) => {
      setPaypalClientId(id);
    });
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="login" element={<Loginpage />} />
              <Route path="register" element={<Registerpage />} />
              <Route path="profile" element={<Profilepage />} />
              <Route path="product/:id" element={<Productpage />} />
              <Route path="cart" element={<Cartpage />}>
                <Route path=":id" element={<Cartpage />} />
              </Route>
              <Route path="shipping" element={<Shippingpage />} />
              <Route path="payment" element={<Paymentpage />} />
              <Route path="order" element={<Orderpage />} />
              <Route
                path="orders/:summary/:id"
                element={<Confirmationpage />}
              />
              <Route path="orders/:id" element={<Confirmationpage />} />
              <Route path="" element={<Homepage />} exact />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;
