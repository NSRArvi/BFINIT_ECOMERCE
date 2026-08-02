import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LandingHeaderMobile from "./LandingHeaderMobile";
import useBasePath from "@/hooks/useBasePath";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { editorLinkClick } from "@/utils/themeEditor";
import { getImgUrl } from "@/utils/getImgUrl";

const navLinks = [
  { name: "Home", href: "" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function LandingHeader({ content, isEditing = false }) {
  const { storeId } = useParams();
  const basePath = useBasePath();

  const { data: storeData } = useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Prevent body scroll when mobile menu or search is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  let logoContent = null;

  if (content.logoType === "auto") {
    if (storeData?.data?.logo) {
      logoContent = (
        <Link to={basePath} className="inline-block h-8 max-w-40">
          <img
            src={getImgUrl(storeData?.data?.logo)}
            alt={`logo of ${storeData?.data?.name}`}
            className="h-full w-auto object-contain object-left"
          />
        </Link>
      );
    } else {
      logoContent = (
        <Link to={basePath} className="text-sm font-semibold">
          {storeData?.data?.name}
        </Link>
      );
    }
  }

  if (content.logoType === "logo") {
    logoContent = (
      <Link to={basePath} className="inline-block h-8 max-w-40">
        <img
          src={getImgUrl(storeData?.data?.logo)}
          alt={`logo of ${storeData?.data?.name}`}
          className="h-full w-auto object-contain object-left"
        />
      </Link>
    );
  }

  if (content.logoType === "text") {
    logoContent = (
      <Link to={basePath} className="text-sm font-semibold">
        {storeData?.data?.name}
      </Link>
    );
  }

  if (content.logoType === "both") {
    logoContent = (
      <Link to={basePath} className="flex items-center gap-2">
        <div className="h-8 max-w-32">
          <img
            src={getImgUrl(storeData?.data?.logo)}
            alt={`logo of ${storeData?.data?.name}`}
            className="h-full w-auto object-contain object-left"
          />
        </div>
        <span className="text-sm font-semibold">{storeData?.data?.name}</span>
      </Link>
    );
  }

  return (
    <>
      <nav className="bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {logoContent}

          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                onClick={isEditing ? editorLinkClick : undefined}
                to={`${basePath}${link.href}`}
                className="hover:text-primary text-sm transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex lg:hidden">
            <Button
              onClick={handleToggle}
              variant="ghost"
              size="icon"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <LandingHeaderMobile navLinks={navLinks} handleToggle={handleToggle} />
      )}
    </>
  );
}
