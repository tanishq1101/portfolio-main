import { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { sendMessage } from "../api/messageApi";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const { profile } = useProfile();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const email = profile?.email || "";
  const linkedin = profile?.socialLinks?.linkedin || "";
  const github = profile?.socialLinks?.github || "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Send message to backend via messageApi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await sendMessage(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="section-container">
      <h2 className="section-title">
        Get In Touch
      </h2>

      <p className="section-subtitle">
        Have a question or want to work together? Drop me a message!
      </p>

      <div className="contact-grid">
        {/* Contact Form */}
        <form
          className="glass-card contact-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={status === "sending"}
          >
            <Send size={18} />
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="form-success">
              Message sent successfully! ✨
            </p>
          )}

          {status === "error" && (
            <p className="form-error">
              Failed to send. Please try again.
            </p>
          )}
        </form>

        {/* Social Links — loaded from DB profile */}
        <div className="contact-info">
          {email && (
            <a
              href={`mailto:${email}`}
              className="glass-card contact-link-card"
            >
              <Mail size={24} />
              <div>
                <h4>Email</h4>
                <p>{email}</p>
              </div>
            </a>
          )}

          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-card contact-link-card"
            >
              <Linkedin size={24} />
              <div>
                <h4>LinkedIn</h4>
                <p>Let's connect</p>
              </div>
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="glass-card contact-link-card"
            >
              <Github size={24} />
              <div>
                <h4>GitHub</h4>
                <p>Check my code</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
