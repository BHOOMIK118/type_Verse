import React from "react";
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-4/5 mx-auto bg-gradient-to-b from-neutral-900 to-black min-h-screen font-mono">
      <main className="container mx-auto px-4 py-2">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center relative flex flex-col items-center justify-center mb-48 mt-20">
          <div className="space-y-8" style={{ opacity: 1 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-200 font-mono mb-6 max-w-4xl leading-tight">
              Master Your Typing Skills
              <br />
              with <span className="text-emerald-400">TypeVerse</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-mono mb-12">
              Practice typing, challenge friends, and track improvements with
              real-time stats in a sleek, minimalist interface.
            </p>
            <div style={{ opacity: 1 }}>
              <Link to="typingtext">
                <button className="inline-flex items-center justify-center gap-2 text-sm text-white font-semibold shadow bg-gradient-to-r from-emerald-500 to-emerald-600 hover:border-none hover:from-emerald-700 hover:to-emerald-800 text-primary-foreground rounded-md h-10 px-8 transition-all duration-300 group">
                  Start Typing Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose TypeVerse? Section */}
        <section className="mb-48">
          <h2 className="text-4xl font-bold mb-10 text-center">
            Why Choose{" "}
            <span className="underline decoration-[#10B981] decoration-4">
              TypeVerse
            </span>
            ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Real-time Feedback",
                description:
                  "Get instant feedback of your typing speed, and accuracy.",
              },
              {
                icon: "🏆",
                title: "Challenge Friends",
                description: "Compete with friends in real-time typing races.",
              },
              {
                icon: "📈",
                title: "Detailed Statistics",
                description:
                  "Track progress over time with comprehensive stats.",
              },
              {
                icon: "⚙️",
                title: "Customizable Options",
                description:
                  "Choose from different typing modes to suit your needs.",
              },
              {
                icon: "🎨",
                title: "Minimalist Interface",
                description: "Enjoy a sleek design that enhances your focus.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-neutral-900 rounded-lg p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TypeVerse by Numbers Section */}
        <section className="mb-48">
          <h2 className="text-4xl font-bold mb-10 text-center">
            TypeVerse by{" "}
            <span className="underline decoration-[#10B981] decoration-4">
              Numbers
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { number: "1+", label: "Typist Registered" },
              { number: "10+", label: "Races Completed" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg p-6 text-center flex-none min-w-[200px]"
              >
                <p className="text-4xl font-bold text-[#10B981] mb-2">
                  {stat.number}
                </p>
                <p className="text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ready to Become a Typing Pro? Section */}
        <section className="mb-48 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Become a{" "}
            <span className="underline decoration-[#10B981] decoration-4">
              Typing Pro
            </span>
            ?
          </h2>
          <p className="mb-8 text-neutral-400">
            Join thousands of users who have improved their typing speed and
            accuracy with TypeVerse.
          </p>
          <Link to="typingtext">
            <button className="bg-[#10B981] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#0D9668] hover:border-none transition duration-300">
              Get Started for Free →
            </button>
          </Link>
        </section>

        {/* What Our Users Say Section */}
        <section className="mb-48">
          <h2 className="text-4xl font-bold mb-10 text-center">
            What Our{" "}
            <span className="underline decoration-[#10B981] decoration-4">
              Users
            </span>{" "}
            Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah L.",
                handle: "@sarah_l",
                content:
                  "TypeFast has dramatically improved my typing speed. I've gone from 40 WPM to over 80 WPM in just a month!",
              },
              {
                name: "Michael R.",
                handle: "@michael_r",
                content:
                  "The real-time feedback and analytics have been crucial in identifying and correcting my typing mistakes.",
              },
              {
                name: "Emily T.",
                handle: "@emily_t",
                content:
                  "Challenging friends has made practicing typing so much more fun and engaging. I look forward to it every day!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-neutral-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold mr-3">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-neutral-400 text-sm">
                      {testimonial.handle}
                    </p>
                  </div>
                  <CheckCircle className="ml-auto text-[#10B981]" size={20} />
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;