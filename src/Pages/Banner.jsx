{/* banner image change when refreshed */ }
// import React from "react";

// const BANNERS = [
//   "/Banner_images/1.png",
//   "/Banner_images/2.png",
//   "/Banner_images/3.png",
//   "/Banner_images/4.png",
//   "/Banner_images/5.png",
//   "/Banner_images/6.png",
//   "/Banner_images/7.png",
  // "/Banner_images/8.png",
// ];

// // optional fallback SVG
// const DEFAULT_BANNER =
//   "data:image/svg+xml;base64," +
//   btoa(
//     `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='400'>
//       <defs>
//         <linearGradient id='g' x1='0' x2='1'>
//           <stop offset='0' stop-color='#ffecd2'/>
//           <stop offset='1' stop-color='#fcb69f'/>
//         </linearGradient>
//       </defs>
//       <rect width='100%' height='100%' fill='url(#g)'/>
//       <text x='40' y='230' font-size='48' font-family='Arial' fill='#6d071a'>
//         Artistic Banner
//       </text>
//     </svg>`
//   );

// const Banner = ({ bannerImage, children }) => {
//   const finalBanner =
//     bannerImage ||
//     BANNERS[Math.floor(Math.random() * BANNERS.length)] ||
//     DEFAULT_BANNER;

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "250px",
//         backgroundImage: `url('${finalBanner}')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         position: "relative",
//       }}
//     >
//       {/* Anything passed as children appears ON the banner */}
//       <div
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//           display: "flex",
//           gap: "10px",
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Banner;


{/* banner image one user one image  */ }
import React, { useEffect, useState } from "react";

// ONLY UNCOMMENTED IMAGES ARE USED
const BANNERS = [
  "/Banner_images/1.png",
  "/Banner_images/2.png",
  "/Banner_images/3.png",
  "/Banner_images/4.png",
  "/Banner_images/5.png",
  "/Banner_images/6.png",
  "/Banner_images/7.png",
  "/Banner_images/8.png",
];

const Banner = ({ children }) => {
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    const key = "current_login_banner";

    const saved = sessionStorage.getItem(key);

    if (saved) {
      // SAME LOGIN → KEEP SAME IMAGE
      setBannerImage(saved);
    } else {
      // FIRST TIME AFTER LOGIN → SET NEW RANDOM IMAGE
      const random = BANNERS[Math.floor(Math.random() * BANNERS.length)];
      sessionStorage.setItem(key, random);
      setBannerImage(random);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        backgroundImage: `url('${bannerImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          gap: "10px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Banner;