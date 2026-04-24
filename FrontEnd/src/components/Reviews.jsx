import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Reviews = () => {
  const reviews = [
    {
      name: 'Gill Bates',
      role: 'Serial Acquirer & Tech Investor',
      image: 'https://i.insider.com/ceb9b91411a62e4a42b31d00?width=600&format=jpeg&auto=webp',
      review: "DevEx completely transformed how I source Micro-SaaS deals. The verified metrics and seamless escrow made my last three acquisitions feel effortless. This is the future of digital asset trading.",
    },
    {
      name: 'Shrikant Tiwari',
      role: 'Ops Lead & SaaS Strategist',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc_Qp2bPivdMe9k67YpwAhH9f9RRjxzIsNqg&s',
      review: "I've used every marketplace out there — nothing comes close to DevEx. The valuation engine is incredibly accurate and the team genuinely cares about both buyers and sellers. Absolute game-changer.",
    },
    {
      name: 'Lizard Wiz',
      role: 'Content Creator & SaaS Evangelist',
      image: 'https://yt3.googleusercontent.com/4vTd6lQgW2dJqqBTIoLj9_yMccnBiDk5j2K1XHzglDhoBqqEdsrXhoXrujl38euQnACsSdpyiA=s900-c-k-c0x00ffffff-no-rj',
      review: "DevEx is pure magic for anyone in the SaaS space. The platform is beautifully designed, incredibly intuitive, and the verified analytics gave me instant confidence. Easily the best marketplace I've used.",
    },
    {
      name: 'Oman Gazhnavi',
      role: 'Visionary Leader & Platform Enthusiast',
      image: 'https://pbs.twimg.com/profile_images/2030245486968639488/rLepme8C_400x400.jpg',
      review: "Supreme experience from start to finish. The interface is flawless, the analytics are unmatched, and the transaction process is smoother than anything I have ever used. DevEx is the gold standard.",
    },
    {
      name: 'Vary Gee',
      role: 'Founder & Growth Hacker',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPSybkvf2_5emC8rW4i_tBSkyF-Xq7cNGJQ&s',
      review: "Sold my first SaaS on DevEx in under two weeks. The listing process was straightforward, the buyer pool was serious, and the escrow gave me total peace of mind. Highly recommend to any founder.",
    },
    {
      name: 'Walter White',
      role: 'Chemistry Enthusiast & Entrepreneur',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTvZYJBjjKdjlpmkPjVAF0jfd4yg2crSdy3g&s',
      review: "I am the one who acquires. DevEx gave me the precision, the data, and the confidence to make calculated moves in the Micro-SaaS space. Say my name — and say DevEx right after it.",
    },
  ];

  const Stars = () => (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="var(--accent)"
          className="opacity-90"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section className="w-full py-32 relative overflow-hidden" id="reviews">
      {/* Top Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-radial-glow opacity-20 pointer-events-none -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-20">
          <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.3em] uppercase mb-6 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-h)] mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-[var(--text)] max-w-xl mx-auto">
            Hear from founders and investors who've experienced the DevEx advantage.
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.15 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet custom-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: '60px' }}
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx} style={{ height: 'auto' }}>
                <div className="group p-8 rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] hover:bg-[var(--bg)] transition-all duration-500 hover:border-[var(--text-h)]/20 hover:-translate-y-2 card-hover-shadow h-full flex flex-col relative overflow-hidden">
                  {/* Subtle quote mark */}
                  <span className="absolute -top-2 -left-1 text-8xl font-black text-[var(--text-h)] opacity-[0.03] select-none leading-none group-hover:opacity-[0.06] transition-opacity duration-500">
                    "
                  </span>

                  <Stars />

                  <p className="text-sm text-[var(--text)] leading-relaxed font-medium mb-8 flex-1 relative z-10 min-h-[120px]">
                    "{review.review}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-6 border-t border-[var(--border)] relative z-10 mt-auto">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[var(--border)]"
                    />
                    <div>
                      <p className="text-[13px] font-bold text-[var(--text-h)] tracking-tight">
                        {review.name}
                      </p>
                      <p className="text-[11px] text-[var(--text)] font-medium">
                        {review.role}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style>{`
        .custom-bullet {
          width: 8px !important;
          height: 8px !important;
          background: var(--border) !important;
          opacity: 1 !important;
          border-radius: 100px !important;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
          margin: 0 4px !important;
        }
        .custom-bullet-active {
          background: var(--accent) !important;
          width: 28px !important;
        }
        .swiper-slide {
          height: auto !important;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
