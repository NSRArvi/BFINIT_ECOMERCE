import AnnounceBarDefault from "../sections/header/AnnounceBarDefault";
import MainHeader from "../sections/header/main-header/MainHeader";
import LandingHeader from "../sections/header/LandingHeader";
import HeroDefault from "../sections/body/HeroDefault";
import LandingHero from "../sections/body/LandingHero";
import ProductGrid from "../sections/body/ProductGrid";
import AboutOverview from "../sections/body/AboutOverview";
import CTABanner from "../sections/body/CTABanner";
import TestimonialsGrid from "../sections/body/TestimonialsGrid";
import TeamGrid from "../sections/body/TeamGrid";
import ServicesGrid from "../sections/body/ServicesGrid";
import FooterDefault from "../sections/footer/footer-default/FooterDefault";

const headerComponents = {
  "announce-bar-default": AnnounceBarDefault,
  "nav-simple": MainHeader,
  "nav-landing": LandingHeader,
};

const heroComponents = {
  "hero-default": HeroDefault,
  "hero-landing": LandingHero,
};

const productComponents = {
  "product-grid": ProductGrid,
};

const contentComponents = {
  "about-overview": AboutOverview,
  "cta-banner": CTABanner,
  "testimonials-grid": TestimonialsGrid,
  "team-grid": TeamGrid,
  "services-grid": ServicesGrid,
};

const footerComponents = {
  "footer-default": FooterDefault,
};

export const componentMap = {
  ...headerComponents,
  ...heroComponents,
  ...productComponents,
  ...contentComponents,
  ...footerComponents,
};
