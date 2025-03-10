import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Code } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Contact Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              Contact Us
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with us. We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-8 lg:p-12">
              <div className="text-white">
                <h2 className="text-3xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">
                  Contact Information
                </h2>
                <p className="text-violet-100 mb-12 text-lg">
                  Fill up the form and we will get back to you within 24 hours.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center">
                    <Mail className="h-7 w-7 text-violet-200" />
                    <span className="ml-4 text-white text-lg font-bold">
                      krakesh.gates@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-7 w-7 text-violet-200" />
                    <span className="ml-4 text-violet-100 text-lg">
                      +91 9876543210
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-7 w-7 text-violet-200" />
                    <span className="ml-4 text-violet-100 text-lg">
                      Hyderabad, Telangana, India
                    </span>
                  </div>
                </div>

                {/* Developer Credit */}
                <div className="mt-16 pt-8 border-t border-violet-400/30">
                  <div className="flex items-center">
                    <Code className="h-6 w-6 text-violet-200" />
                    <span className="ml-4 text-lg">
                      <span className="text-violet-200">Developed by </span>
                      <span className="font-extrabold text-white bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                        Rakesh Koneti
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 