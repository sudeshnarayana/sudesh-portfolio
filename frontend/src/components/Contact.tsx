import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../supabaseClient';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus('error');
      setErrorMsg('Name is required.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setStatus('error');
      setErrorMsg('Message must be at least 10 characters long.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase.from('contact_messages').insert([
      { name: name.trim(), email: email.trim(), message: message.trim() },
    ]);

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong sending your message. Please try again.');
      return;
    }

    setStatus('success');
    triggerConfetti();
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/10 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <div className="w-16 h-1 bg-violet-600 dark:bg-violet-400 mx-auto rounded-full mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Have a project in mind, an internship opportunity, or just want to connect?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Feel free to reach out via the form, or drop me an email directly. I will do my best to get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6 py-6">
              <div className="flex items-center space-x-4">
                <div className="p-3.5 rounded-2xl bg-violet-600/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 border border-violet-600/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Email Me</span>
                  <a href="mailto:sudeshnarayana2001@gmail.com" className="font-heading font-bold text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    sudeshnarayana2001@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3.5 rounded-2xl bg-fuchsia-600/10 dark:bg-fuchsia-400/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-600/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Location</span>
                  <span className="font-heading font-bold text-slate-800 dark:text-slate-200">
                    Colombo, Sri Lanka
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 text-sm text-slate-500 dark:text-slate-400 flex items-start space-x-3 italic">
              <MessageSquare className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
              <p>
                "Building software is not just about writing code; it's about solving real-world challenges with robust engineering."
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/80 glow-primary relative">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-16"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 text-green-500 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                    Thank you for reaching out. I've received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 transition-colors shadow-md cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 dark:focus:border-violet-400 transition-all duration-300 disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 dark:focus:border-violet-400 transition-all duration-300 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi, I would love to talk about an opportunity..."
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 dark:focus:border-violet-400 transition-all duration-300 resize-none disabled:opacity-50"
                    />
                  </div>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs sm:text-sm flex items-center space-x-2.5"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-bold bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-violet-600/10 cursor-pointer"
                  >
                    <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
