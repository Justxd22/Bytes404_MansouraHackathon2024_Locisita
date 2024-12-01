import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import Logo from "@/app/assets/Images/Logo.png";
import Image from "next/image";
import "../../app/globals.css";
import "../../app/assets/styles/register.css";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState(""); // State for the selected city

  const cities: string[] = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Qalyubia",
    "Port Said",
    "Suez",
    "Luxor",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Ismailia",
    "Kafr El Sheikh",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai"
  ];
  

  useEffect(() => {
    async function isValid() {
      const res = await fetch("/api/session", { credentials: "same-origin" });
      const data = await res.json();
      console.log(data);
      if (data.code === 0) {
        window.location.href = "/";
      }
    }
    isValid();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          F_name: first,
          L_name: last,
          city,
          age,
        }),
        credentials: "same-origin",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Register successful:", data);
        window.location.href = "/login";
      } else {
        console.error("Register failed:", data.err);
        alert(`Register failed: ${data.err}`);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <>
    <Link href="/" passHref>
      <Image
        src={Logo}
        alt="Logo"
        className="register-logo w-[60%] mt-20 md:mt-0 md:w-full"
      />
    </Link>
      <div className="register-wrapper">
        <form onSubmit={handleSubmit} className="register-form justify-center">
          <h1 className="register-heading">Register</h1>
          <div className="register-grid-container">
            <div className="register-input-box">
              <input
                type="text"
                placeholder="First name"
                required
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <FaUser className="register-icon" />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                placeholder="Last name"
                required
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
              <FaUser className="register-icon" />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                placeholder="Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <FaUser className="register-icon" />
            </div>
            <div className="register-input-box">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="" disabled>
                  Government
                </option>
                {cities.map((cityName, index) => (
                  <option key={index} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>

            <div className="register-input-box">
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="register-icon" />
            </div>
            <div className="register-input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="register-icon" />
            </div>
            <div className="register-input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // New confirm password input
              />
              <FaLock className="register-icon" />
            </div>
          </div>
          <button type="submit" className="register-submit-btn">
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account?
              <a href="/login" className="register-link-anchor">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>

      <a href="#" className="register-back-button">
        <FaArrowLeft className="back-icon" />
        Back
      </a>
    </>
  );
}
