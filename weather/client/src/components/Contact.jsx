import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setIsSent(false);
    setError(null);

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-white bg-opacity-10 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none"
          ></textarea>

          <button
            type="submit"
            disabled={isSending}
            className={`w-full font-bold py-2 px-4 rounded transition ${
              isSent
                ? 'bg-green-400 text-white hover:bg-green-500'
                : isSending
                ? 'bg-gray-400 text-white cursor-wait'
                : 'bg-yellow-400 text-black hover:bg-yellow-500'
            }`}
          >
            {isSending ? 'Sending...' : isSent ? '✅ Message Sent' : 'Send Message'}
          </button>

          {error && <p className="text-red-300 text-sm mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
