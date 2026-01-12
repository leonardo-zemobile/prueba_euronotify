'use client'

import Image from "next/image";
import Hero from "./Hero";
import TrustSection from "./TrustSection";

export default function HomeData({dictionary}: any) {
  return (
    <>
    <Hero />
    <TrustSection />
    </>
  );
}
