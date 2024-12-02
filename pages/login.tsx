import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Layout from "../layouts/Main";
import { useRouter } from 'next/router';

type LoginMail = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { register, errors } = useForm();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
  
      if (response.ok) {
        alert("Login successful!");
        // Handle successful registration (e.g., redirect to login page)
        router.push('/');
      } else {
        alert(`Error: ${data.err || "Something went wrong."}`);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
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
            <h2 className="form-block__title">Log in</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  ref={register({
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Please write a valid email
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>

              {errorMessage && (
                <p className="message message--error">{errorMessage}</p>
              )}

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className="checkbox checkbox--sm"
                  >
                    <input
                      type="checkbox"
                      name="keepSigned"
                      id="check-signed-in"
                      ref={register({ required: false })}
                    />
                    <span className="checkbox__check" />
                    <p>Keep me signed in</p>
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="form__info__forgot-password"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign in
              </button>

              <p className="form__signup-link">
                Not a member yet? <Link href="/register">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
