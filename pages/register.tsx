import Link from "next/link";
import { useState } from "react";
import Layout from "../layouts/Main";
import { useRouter } from 'next/router';

const governments = [
  "Cairo", "Alexandria", "Giza", "Qalyubia", "Port Said", "Suez", 
  "Luxor", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", 
  "Damietta", "Faiyum", "Gharbia", "Ismailia", "Kafr El Sheikh", 
  "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", 
  "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai"
];

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    government: "",
    password: "",
    userType: "", // New field for user type
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        router.push('/login');
      } else {
        alert(`Error: ${data.err || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left" />
              Back to store
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">
              Create an account and discover Local Brands!
            </h2>

            <form className="form" onSubmit={handleSubmit}>
              {/* Existing input fields */}
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "center", margin: "22px" }}>
  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
    <input
      type="radio"
      name="userType"
      value="Business Owner"
      checked={formData.userType === "Business Owner"}
      onChange={handleChange}
      required
      style={{
        appearance: "radio",
        WebkitAppearance: "radio",
        MozAppearance: "radio",
        accentColor: "#f3c614",
        marginRight: "10px",
        cursor: "pointer",
      }}
    />
    Business Owner
  </label>
  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
    <input
      type="radio"
      name="userType"
      value="Customer"
      checked={formData.userType === "Customer"}
      onChange={handleChange}
      required
      style={{
        appearance: "radio",
        WebkitAppearance: "radio",
        MozAppearance: "radio",
        accentColor: "#f3c614",
        marginRight: "10px",
        cursor: "pointer",
      }}
    />
    Customer
  </label>
</div>


              <div className="form__input-row">
                <select
                  className="form__input"
                  name="government"
                  value={formData.government}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Government</option>
                  {governments.map((gov, index) => (
                    <option key={index} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className="checkbox checkbox--sm"
                  >
                    <input
                      name="agreeToTerms"
                      type="checkbox"
                      id="check-signed-in"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                    />
                    <span className="checkbox__check" />
                    <p>
                      I agree to the Google Terms of Service and Privacy Policy
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">Are you already a member?</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;