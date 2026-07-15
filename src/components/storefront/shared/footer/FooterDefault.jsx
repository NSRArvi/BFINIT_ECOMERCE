import { Link, useParams } from "react-router";
import { Mail, Phone, MapPin, Lock, Copyright } from "lucide-react";
import {
  SiTiktok,
  SiPinterest,
  SiFacebook,
  SiX,
  SiInstagram,
  SiYoutube,
  SiWhatsapp,
} from "react-icons/si";
import FooterCountrySwitcher from "./FooterCountrySwitcher";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useBasePath from "@/hooks/useBasePath";
import useCountry from "@/hooks/useCountry";
import { cn } from "@/lib/utils";
import { footerLinks } from "@/features/admin/theme-editor/utils/contstants";
import { getImgUrl } from "@/utils/getImgUrl";
import { editorLinkClick } from "@/utils/themeEditor";
import useThemeEditor from "@/features/admin/theme-editor/hooks/useThemeEditor";
import { resolveDefaultCountry } from "@/features/storefront/utils/country";

const logos = [
  { src: "/images/logo/visa.png", alt: "Visa" },
  { src: "/images/logo/ma.svg", alt: "Mastercard" },
  { src: "/images/logo/axp.svg", alt: "American Express" },
  { src: "/images/logo/discover.svg", alt: "Discover" },
  { src: "/images/logo/ap.png", alt: "Apple Pay" },
  { src: "/images/logo/gp.png", alt: "Google Pay" },
];

export default function FooterDefault({ content }) {
  const { storeId } = useParams();
  const { isEditing } = useThemeEditor();
  const { saveCountry } = useCountry();
  const basePath = useBasePath();

  const { data: countries } = useGetQuery({
    endpoint: "/api/v1/country",
    enabled: true,
    queryKey: ["countries"],
  });

  const { data: storeData } = useGetQuery({
    endpoint: `/api/v1/stores/${storeId}/info`,
    enabled: !!storeId,
    queryKey: ["store", storeId],
  });

  const { data: socialMedia } = useGetQuery({
    endpoint: `/api/v1/general/socialMedia/${storeId}`,
    enabled: !!storeId,
    queryKey: ["socialMedia", storeId],
  });

  const { data: stripeConfig, isLoading: isStripeConfigLoading } = useGetQuery({
    endpoint: `/payments/stripe/public/client/${storeId}`,
    queryKey: ["stripe-client-config", storeId],
  });

  const defaultCountry = resolveDefaultCountry(
    countries?.data,
    storeData?.data?.default_country_id,
  );

  const socialMediaLinks = [
    {
      id: "facebook",
      url: socialMedia?.data?.facebook,
      Icon: SiFacebook,
    },
    { id: "x", url: socialMedia?.data?.x, Icon: SiX },
    {
      id: "instagram",
      url: socialMedia?.data?.instagram,
      Icon: SiInstagram,
    },
    { id: "youtube", url: socialMedia?.data?.youtube, Icon: SiYoutube },
    { id: "tiktok", url: socialMedia?.data?.tiktok, Icon: SiTiktok },
    {
      id: "pinterest",
      url: socialMedia?.data?.pinterest,
      Icon: SiPinterest,
    },
    {
      id: "whatsapp",
      url: socialMedia?.data?.whatsapp,
      Icon: SiWhatsapp,
    },
  ];

  const isStripeConnected =
    !isStripeConfigLoading &&
    stripeConfig?.data?.charges_enabled &&
    stripeConfig?.data?.payouts_enabled;

  const date = new Date();
  const year = date.getFullYear();
  const { description, showContactInfo, showSocialLinks } = content;
  const { company, shop, support } = footerLinks;

  const handleCountryChange = (country) => {
    saveCountry(country);
  };

  return (
    <footer className="bg-card border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <Link
              onClick={isEditing ? editorLinkClick : undefined}
              to={basePath}
              className="mb-3 inline-block h-8 max-w-40"
            >
              <img
                src={getImgUrl(storeData?.data?.logo)}
                alt={`logo of ${storeData?.data?.name}`}
                className="h-full w-auto object-contain object-left"
              />
            </Link>

            <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
              {description}
            </p>

            {showContactInfo && (
              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${storeData?.data?.contact_email}`}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{storeData?.data?.contact_email}</span>
                </a>

                <a
                  href={`tel:${defaultCountry?.country_code}${storeData?.data?.contact_phone}`}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>
                    {defaultCountry?.country_code}
                    {storeData?.data?.contact_phone}
                  </span>
                </a>

                <div className="text-muted-foreground flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="leading-relaxed">
                    {storeData?.data?.default_country_address},{" "}
                    {defaultCountry?.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          {company && company?.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {company.map((link, index) => (
                  <li key={index}>
                    <Link
                      onClick={isEditing ? editorLinkClick : undefined}
                      to={`${basePath}${link.url}`}
                      className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {support && support.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Support
              </h4>
              <ul className="space-y-3">
                {support.slice(0, 3).map((link, index) => (
                  <li key={index}>
                    <Link
                      onClick={isEditing ? editorLinkClick : undefined}
                      to={`${basePath}${link.url}`}
                      className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {support && support.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-transparent uppercase">
                Support
              </h4>
              <ul className="space-y-3">
                {support.slice(3, 6).map((link, index) => (
                  <li key={index}>
                    <Link
                      onClick={isEditing ? editorLinkClick : undefined}
                      to={`${basePath}${link.url}`}
                      className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-border border-t" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          {/* left side */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
            <p className="text-muted-foreground inline-flex items-center justify-center gap-1 text-sm">
              <Copyright className="size-4" /> {year} {storeData?.data?.name}.
              All rights reserved.
            </p>

            <FooterCountrySwitcher handleCountryChange={handleCountryChange} />
          </div>

          {/* right side */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
            {/* online payment methods */}
            {isStripeConnected && (
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1.5">
                  {logos.map(({ src, alt }) => (
                    <div
                      key={alt}
                      className="border-border/60 h-6.5 overflow-hidden rounded border bg-white px-1.5 py-1"
                    >
                      <img
                        src={src}
                        alt={alt}
                        className="h-full w-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground flex items-center gap-1 text-[10px]">
                  <Lock className="h-2.5 w-2.5" /> Secured by Stripe
                </p>
              </div>
            )}

            {/* social media */}
            {showSocialLinks && (
              <div className="flex items-center gap-4">
                {socialMediaLinks?.map(({ id, url, Icon }) => (
                  <Link
                    key={id}
                    to={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={id}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      !url && "hidden",
                    )}
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
