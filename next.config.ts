import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // experimental: {
  //   staleTimes helps you to cache the routes for specific amount of times. Unfortunately this cannot be enabled per page. This can only be enabled for the entire application. Soo have to be very careful while using this. Disabling this for now. Alternativelt we can use prefetch catche which can be used in Link component 
  //   staleTimes: {   
  //     dynamic: 30,
  //   },
  // },
};

export default nextConfig;
