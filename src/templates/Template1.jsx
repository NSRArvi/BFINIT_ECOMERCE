import Hero from "@/components/storefront/testHome/hero/Hero";
import React from "react";
import Products from "@/components/storefront/testHome/products/Products";
import TimelessClassics from "@/components/storefront/testHome/timeless-classics/TimelessClassics";
import TestNavigation from "@/components/storefront/shared/testNavigation/TestNavigation";
import SpecialCollections from "@/components/storefront/testHome/special-collections/SpecialCollections";
import ProductTabs from "@/components/storefront/testHome/product-tab/ProductTab";
import DynamicBentoGrid from "@/components/storefront/testHome/bento-grid/BentoGrid";
import SplitLayout from "@/components/storefront/testHome/split-layout/SplitLayout";
import VideoBgSection from "@/components/storefront/testHome/video-bg-section/VideoBgSection";
import BeforeAfter from "@/components/storefront/testHome/before-after/BeforeAfter";
import ShopTheLook from "@/components/storefront/testHome/shop-the-look/ShopTheLook";
import Blogs from "@/components/storefront/testHome/blogs/Blogs";
import MarqueeScrollSection from "@/components/storefront/testHome/marquee-scroll-section/MarqueeScrollSection";
import SpringItem from "@/components/storefront/testHome/spring-item/SpringItem";

const Template1 = () => {
  return (
    <>
      <TestNavigation />
      <Hero />
      <Products />
      <TimelessClassics />
      <SpecialCollections />
      <ProductTabs />
      <DynamicBentoGrid />
      {/* <SplitLayout /> */}
      <VideoBgSection />
      <ShopTheLook />
      <SpringItem />
      <BeforeAfter />
      <Blogs />
      <MarqueeScrollSection />
    </>
  );
};

export default Template1;
