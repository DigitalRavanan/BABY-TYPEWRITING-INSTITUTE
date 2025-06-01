import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FaUsers, FaBookOpen, FaAward } from "react-icons/fa";
import { AiFillCheckCircle, AiOutlineLaptop } from "react-icons/ai";
import { MdKeyboard, MdOutlineLanguage } from "react-icons/md";

const stats = [
  { label: "Students Trained", value: 1200, icon: <FaUsers size={40} /> },
  { label: "Courses Offered", value: 3, icon: <FaBookOpen size={40} /> },
  { label: "Years of Excellence", value: 15, icon: <FaAward size={40} /> },
];

const courses = [
  {
    title: "English Typewriting",
    desc: "Touch typing to improve speed and accuracy.",
    icon: <MdOutlineLanguage size={36} />,
  },
  {
    title: "Tamil Typewriting",
    desc: "Master Tamil typing for exams and jobs.",
    icon: <MdKeyboard size={36} />,
  },
  {
    title: "Basic Computer Skills",
    desc: "Learn MS Office, Email, Browsing & more.",
    icon: <AiOutlineLaptop size={36} />,
  },
];

const testimonials = [
  {
    quote: "Best place to learn typewriting. I passed my exam on first attempt!",
    author: "Sathish",
  },
  {
    quote: "Excellent teachers and personal attention. Highly recommended.",
    author: "Meena",
  },
  {
    quote: "Helped me get confident in using computers and email.",
    author: "Karthik",
  },
];

const galleryImages = [
  "https://source.unsplash.com/400x300/?typing",
  "https://source.unsplash.com/400x300/?keyboard",
  "https://source.unsplash.com/400x300/?students",
];

// Counter component unchanged, except moved icon outside to the stats section

const Counter = ({ end, label, icon }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center px-6 py-6 rounded-2xl shadow-lg bg-white/10 flex flex-col items-center gap-3">
      <div className="text-teal-400">{icon}</div>
      <div
        className="text-5xl font-extrabold text-white"
        style={{ textShadow: "3px 3px 6px black" }}
      >
        {count}+
      </div>
      <div
        className="mt-1 font-medium text-white"
        style={{ textShadow: "2px 2px 4px black" }}
      >
        {label}
      </div>
    </div>
  );
};

// Animation variants for scroll fade-up
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Home = () => {
  // Setup controls and inView for each section to trigger animation on scroll
  const [refHero, inViewHero] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refStats, inViewStats] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refCourses, inViewCourses] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refTestimonials, inViewTestimonials] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refGallery, inViewGallery] = useInView({ triggerOnce: true, threshold: 0.3 });

  const controlsHero = useAnimation();
  const controlsStats = useAnimation();
  const controlsCourses = useAnimation();
  const controlsTestimonials = useAnimation();
  const controlsGallery = useAnimation();

  React.useEffect(() => {
    if (inViewHero) controlsHero.start("visible");
  }, [inViewHero, controlsHero]);
  React.useEffect(() => {
    if (inViewStats) controlsStats.start("visible");
  }, [inViewStats, controlsStats]);
  React.useEffect(() => {
    if (inViewCourses) controlsCourses.start("visible");
  }, [inViewCourses, controlsCourses]);
  React.useEffect(() => {
    if (inViewTestimonials) controlsTestimonials.start("visible");
  }, [inViewTestimonials, controlsTestimonials]);
  React.useEffect(() => {
    if (inViewGallery) controlsGallery.start("visible");
  }, [inViewGallery, controlsGallery]);

  return (
    <div className="overflow-x-hidden">
      <div
        className="min-h-screen relative font-sans"
        style={{
          backgroundImage: "url('/images/typewriter.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-0"></div>

        {/* Main content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          {/* Hero Section */}
          <motion.section
            ref={refHero}
            initial="hidden"
            animate={controlsHero}
            variants={fadeUp}
            className="text-center py-24 max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide"
              style={{ textShadow: "4px 4px 10px black" }}
            >
              Welcome to Baby Typewriting Institute
            </motion.h1>
            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto text-white/90"
              style={{ textShadow: "2px 2px 6px black" }}
            >
              Learn English, Tamil Typewriting & Basic Computer Skills with expert guidance.
            </motion.p>
            <Link to="/courses">
              <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full shadow-lg hover:from-blue-600 hover:to-teal-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 text-white font-semibold">
                Explore Courses
              </button>
            </Link>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            ref={refStats}
            initial="hidden"
            animate={controlsStats}
            variants={fadeUp}
            className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white"
          >
            {stats.map(({ label, value, icon }) => (
              <Counter key={label} end={value} label={label} icon={icon} />
            ))}
          </motion.section>

          {/* Courses Section */}
          <motion.section
            ref={refCourses}
            initial="hidden"
            animate={controlsCourses}
            variants={fadeUp}
            className="py-20 text-center text-white"
          >
            <h2 className="text-4xl font-extrabold mb-12" style={{ textShadow: "3px 3px 8px black" }}>
              Our Courses
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {courses.map(({ title, desc, icon }) => (
                <div
                  key={title}
                  className="bg-white/10 p-6 rounded-2xl shadow-xl hover:bg-white/20 transition-colors flex items-start gap-4"
                >
                  <div className="text-teal-400 mt-1">{icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                    <p className="text-sm text-gray-200">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
            ref={refTestimonials}
            initial="hidden"
            animate={controlsTestimonials}
            variants={fadeUp}
            className="py-20 text-center rounded-3xl shadow-inner bg-black/60"
          >
            <h2 className="text-4xl font-extrabold mb-12 tracking-wide" style={{ textShadow: "3px 3px 8px black" }}>
              Student Feedback
            </h2>
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              className="max-w-3xl mx-auto"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <blockquote
                    className="italic text-lg px-6 md:px-12 bg-black/30 rounded-xl py-6 shadow-lg text-white"
                    style={{ textShadow: "2px 2px 6px black" }}
                  >
                    “{t.quote}”
                    <footer className="mt-4 font-semibold">— {t.author}</footer>
                  </blockquote>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.section>

          {/* Gallery Section */}
          <motion.section
            ref={refGallery}
            initial="hidden"
            animate={controlsGallery}
            variants={fadeUp}
            className="py-16"
          >
            <h2
              className="text-4xl font-extrabold text-center mb-12 text-white"
              style={{ textShadow: "3px 3px 8px black" }}
            >
              Gallery
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 px-4">
              {galleryImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Gallery"
                  className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 border border-white/20"
                  loading="lazy"
                />
              ))}
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="py-6 text-center text-sm mt-12 text-white bg-emerald-800 shadow-inner rounded-t-2xl">
            <p>&copy; {new Date().getFullYear()} Baby Typewriting Institute. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
