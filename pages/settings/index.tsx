import React, { useState } from "react";
import Image from "next/image";
import {
  FaUser,
  FaLock,
  FaBell,
  FaQuestionCircle,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import Logo from "@/app/assets/Images/Logo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import auth2 from "@/app/assets/Images/Justxd.png";
import "@/app/assets/styles/settings.css";

export default function SettingsPage({ name }: { name: string }) {
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState<{ training_days: number[] }>({
    training_days: [],
  });

  // Handles checkbox changes for training and rest days
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "training_days"
  ) => {
    const { value, checked } = e.target;
    const day = parseInt(value);

    setFormData((prevState) => {
      const daysArray = prevState[type] || [];
      const updatedDays = checked
        ? [...daysArray, day]
        : daysArray.filter((d) => d !== day);
      return {
        ...prevState,
        [type]: updatedDays,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the number of selected days is between 3 and 5
    if (
      formData.training_days.length < 3 ||
      formData.training_days.length > 5
    ) {
      alert("Please select between 3 and 5 training days.");
      return;
    }

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Successful:", data);
        window.location.href = "/";
      } else {
        console.error("Failed:", data.err);
        alert(`Failed: ${data.err}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="settings-form">
            <h2>Account Settings</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
              />
            </div>
            <button className="save-button">Save Changes</button>
          </div>
        );
      case "security":
        return (
          <div className="settings-form">
            <h2>Security Settings</h2>
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input
                type="password"
                id="current-password"
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" placeholder="••••••••" />
            </div>
            <button className="save-button">Save Changes</button>
          </div>
        );
      case "notifications":
        return (
          <div className="settings-form">
            <h2>Notification Settings</h2>
            <div className="form-group checkbox">
              <input type="checkbox" id="email-notif" />
              <label htmlFor="email-notif">Email Notifications</label>
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" id="push-notif" />
              <label htmlFor="push-notif">Push Notifications</label>
            </div>
            <button className="save-button">Save Changes</button>
          </div>
        );
      case "setup":
        return (
          <div className="settings-main">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <label className="block text-gray-700 font-medium">
                  Select your Training Days (3 at least):
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <label
                      key={day}
                      className="flex flex-col items-center text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={day}
                        checked={formData.training_days.includes(day)}
                        onChange={(e) =>
                          handleCheckboxChange(e, "training_days")
                        }
                        disabled={
                          !formData.training_days.includes(day) &&
                          formData.training_days.length >= 5
                        }
                        className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="mt-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className={`save-button ${
                  formData.training_days.length < 3
                    ? "op-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={formData.training_days.length < 3}
              >
                Submit
              </button>
            </form>
          </div>
        );

      case "help":
        return (
          <div className="help-support">
            <h2>Help & Support</h2>
            <p className="help-description">
              Project is m aintained by these three authors, feel free to reach
              out to them for any assistance or support.
            </p>
            <h3>Project Authors</h3>
            <div className="authors-list">
              <div className="author-card">
                <div className="author-avatar">
                  <Image src={auth2} alt="Noor Amjad" width={60} height={60} />
                </div>
                <h4>Noor Amjad</h4>
                <div className="author-socials">
                  <a
                    href="https://www.linkedin.com/in/noor-amjad-xd"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/Justxd22"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view settings</div>;
    }
  };

  return (
    <div>
      <a href="/dashboard" className="dashboard-icon">
        <LuLayoutDashboard />
      </a>
      <div className="settings-page">
        <video autoPlay loop muted className="background-video">
          <source src="/assets/Videos/BlackFading.mp4" type="video/mp4" />
        </video>


        <div className="logo-container">
          <Image src={Logo} alt="Logo" priority />
        </div>

        <main className="settings-content">
          <aside className="settings-sidebar">
            <h2 className="sidebar-title">SETTINGS</h2>
            <nav>
              <button
                className={activeTab === "account" ? "active" : ""}
                onClick={() => setActiveTab("account")}
              >
                <FaUser /> Account
              </button>
              <button
                className={activeTab === "security" ? "active" : ""}
                onClick={() => setActiveTab("security")}
              >
                <FaLock /> Security
              </button>

              {/* <button onClick={() => (window.location.href = "/setup")}>
                <FaBell /> Training Schedule <FiExternalLink />
              </button> */}

              <button
                className={activeTab === "setup" ? "active" : ""}
                onClick={() => setActiveTab("setup")}
              >
                <FaBell /> Training Schedule
              </button>

              {/* <button className="disabled">
                <FaBell /> Notifications
              </button>
              <button className="disabled">
                <FaLanguage /> Language
              </button>
              <button className="disabled">
                <FaPalette /> Appearance
              </button> */}
              <button
                className={activeTab === "help" ? "active" : ""}
                onClick={() => setActiveTab("help")}
              >
                <FaQuestionCircle /> Help & Support
              </button>
            </nav>
          </aside>

          <section className="settings-main">{renderTabContent()}</section>
        </main>
      </div>
    </div>
  );
}
