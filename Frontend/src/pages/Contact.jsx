import { useState } from "react";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      return "All fields are required";
    }

    if (!form.email.includes("@")) {
      return "Invalid email address";
    }

    if (form.message.length < 10) {
      return "Message too short";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setStatus(error);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      console.log("Submitted:", form);
      await new Promise((res) => setTimeout(res, 800));

      setStatus("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });

    } catch {
      setStatus("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Contact Us
          </h1>
          <p className="text-sm opacity-60 mt-2">
            Reach out for queries, feedback, or collaboration.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-5 sm:p-6 rounded-xl backdrop-blur border shadow-lg 
                     bg-white/10 border-white/10"
        >

          {/* NAME */}
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border 
                         bg-white/10 border-white/20
                         text-inherit
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border 
                         bg-white/10 border-white/20
                         text-inherit
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your@email.com"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm mb-2">Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border 
                         bg-white/10 border-white/20
                         text-inherit
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your message..."
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* STATUS */}
          {status && (
            <p className={`text-sm ${
              status.includes("success") ? "text-green-400" : "text-red-400"
            }`}>
              {status}
            </p>
          )}

        </form>

      </div>
    </div>
  );
}