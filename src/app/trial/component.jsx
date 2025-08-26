"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Calendar,
  Music,
  Camera,
  Trophy,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// Sample past events data
const pastEvents = [
  {
    id: 1,
    title: "Zypher'24 Orientation",
    date: "August 17, 2024",
    category: "Orientation",
    description:
      "The grand welcome event for first-years by CSI-Innowave, featuring society intro, keynote speeches, and creative performances.",
    highlights: [
      "700+ attendees",
      "Speech by Saksham Gupta",
      "Team interaction",
    ],
    imageUrl:
      "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745345923/IMG_6797_ilm6d7.jpg",
    color: "from-pink-500 to-purple-600",
  },
  {
    id: 2,
    title: "ESPORTS-VISPHOT",
    date: "November 10, 2024",
    category: "Gaming",
    description:
      "A Diwali-themed gaming night with thrilling rounds in BGMI, Skribbl, Fall Guys, and more. Celebrating fun and competition together.",
    highlights: ["6 games", "Maroon CSI tees", "Full attendance"],
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 3,
    title: "UNCHATTARED",
    date: "January 25, 2025",
    category: "Hackathon",
    description:
      "One of MAIT's biggest tech events featuring SMART-O-HACK — a hackathon where innovation met real-world challenges.",
    highlights: ["Hackathon", "Workshops", "Major turnout"],
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    title: "CODE-GENESIS",
    date: "February 10, 2025",
    category: "Technical",
    description:
      "A coding showdown hosted by CSI-Innowave, testing problem-solving skills and speed across multiple rounds.",
    highlights: ["DSA Challenges", "Cash prizes", "Mentor sessions"],
    imageUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=500&fit=crop",
    color: "from-red-500 to-rose-600",
  },
];

// Icons for event categories
const TechnicalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const AcademicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const GamingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const OrientationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const HackathonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const categoryIcons = {
  Cultural: Music,
  Technical: TechnicalIcon,
  Sports: Trophy,
  Academic: AcademicIcon,
  Gaming: GamingIcon,
  Orientation: OrientationIcon,
  Hackathon: HackathonIcon,
};

export default function CollegeEventShowcase() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveEvent((prev) => (prev + 1) % pastEvents.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveEvent(
      (prev) => (prev - 1 + pastEvents.length) % pastEvents.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const handleDotClick = useCallback((index) => {
    if (isAnimating || index === activeEvent) return;
    setIsAnimating(true);
    setActiveEvent(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, activeEvent]);

  // Auto-rotate events
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleNext, isAnimating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentEvent = pastEvents[activeEvent];
  const IconComponent = categoryIcons[currentEvent.category] || Trophy;

  return (
    <section
      className="relative py-16 overflow-hidden bg-gray-900"
      ref={containerRef}
    >
      {/* Background animated circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Unforgettable Moments
          </h2>
          <div className="relative h-1 w-40 bg-gray-700 mx-auto">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{
                width: `${((activeEvent + 1) / pastEvents.length) * 100}%`,
                transition: "width 0.6s ease-in-out",
              }}
            ></div>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Relive our most epic society events that made campus history
          </p>
        </div>

        {/* Event Cards */}
        <div className="relative">
          <div className="relative h-full min-h-[500px]">
            {pastEvents.map((event, index) => (
              <div
                key={event.id}
                className={`transition-all duration-500 ${
                  activeEvent === index
                    ? "opacity-100 translate-y-0 z-20"
                    : "opacity-0 translate-y-8 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl transform transition hover:scale-[1.02] duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-80 lg:h-auto">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-70 mix-blend-overlay z-10`}
                      ></div>
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-20"></div>

                      {/* Category Badge */}
                      <div className="absolute top-6 left-6 z-30 bg-black bg-opacity-50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <IconComponent />
                          <span className="text-white font-medium">
                            {event.category}
                          </span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="absolute bottom-6 left-6 z-30 text-white">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-10">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 text-lg mb-6">
                        {event.description}
                      </p>

                      {/* Highlights */}
                      <div className="bg-gray-700 bg-opacity-40 rounded-xl p-5 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Event Highlights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {event.highlights.map((highlight, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-center bg-gray-800 rounded-lg p-3 text-center"
                            >
                              <span className="text-gray-200 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-4 mt-8">
                        <button
                          className={`px-6 py-3 rounded-xl font-medium text-white shadow-lg bg-gradient-to-r ${event.color} hover:opacity-90 transition-all flex items-center gap-2`}
                          aria-label={`View gallery for ${event.title}`}
                        >
                          <Camera className="w-5 h-5" />
                          View Gallery
                        </button>
                        <button 
                          className="px-6 py-3 rounded-xl font-medium text-white bg-gray-700 hover:bg-gray-600 transition-all"
                          aria-label={`View details for ${event.title}`}
                        >
                          Event Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {pastEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeEvent === index
                    ? "bg-white w-8"
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 focus:outline-none transform transition hover:scale-110 hidden md:block"
            aria-label="Previous event"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 focus:outline-none transform transition hover:scale-110 hidden md:block"
            aria-label="Next event"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Upcoming */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready For What&apos;s Next?
          </h3>
          <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1">
            Check Upcoming Events
          </button>
        </div>
      </div>
    </section>
  );
}