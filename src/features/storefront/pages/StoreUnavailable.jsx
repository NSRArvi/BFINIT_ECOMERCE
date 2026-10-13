import { Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useStoreInfo from "../hooks/useStoreInfo";
import { resolveDefaultCountry } from "../utils/country";

export default function StoreUnavailable() {
  const { data: storeData } = useStoreInfo();

  const {
    name,
    contact_email,
    contact_phone,
    countries,
    default_country_id,
    default_country_address,
  } = storeData?.data || {};

  const defaultCountry = resolveDefaultCountry(countries, default_country_id);
  const mobileNumber = `${defaultCountry?.country_code}${contact_phone}`;
  const address = `${default_country_address}, ${defaultCountry?.name}`;

  return (
    <main className="bg-background flex min-h-dvh flex-col overflow-hidden px-5 sm:px-6">
      <div className="flex flex-1 items-center justify-center py-12">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="gap-2 rounded-none px-3 py-1 text-xs font-medium tracking-wider uppercase"
          >
            <span className="bg-muted-foreground size-1.5 rounded-full" />
            Orders paused
          </Badge>

          <h1 className="text-foreground mt-5 text-4xl leading-tight font-medium tracking-tight text-balance sm:mt-6 sm:text-5xl lg:text-6xl">
            We&apos;re taking a short break.
          </h1>

          <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-6 text-pretty sm:mt-5 sm:max-w-md sm:text-base sm:leading-7">
            New orders are on hold for now. Already ordered and need a hand? Get
            in touch and we&apos;ll sort it out.
          </p>

          <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-none sm:h-11 sm:w-auto sm:px-7"
            >
              <a href={`mailto:${contact_email}`}>Contact us</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full rounded-none sm:h-11 sm:w-auto sm:px-7"
            >
              <a href={`tel:${mobileNumber}`}>Call us</a>
            </Button>
          </div>

          <ul className="text-muted-foreground mt-5 w-full max-w-sm text-xs sm:mt-6">
            <li>
              <a
                href={`mailto:${contact_email}`}
                className="hover:text-foreground focus-visible:text-foreground block py-2.5 transition-colors sm:py-1.5"
              >
                <Mail className="-mt-0.5 mr-2 inline size-3.5" />
                <span className="break-all">{contact_email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${mobileNumber}`}
                className="hover:text-foreground focus-visible:text-foreground block py-2.5 transition-colors sm:py-1.5"
              >
                <Phone className="-mt-0.5 mr-2 inline size-3.5" />
                {mobileNumber}
              </a>
            </li>
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground focus-visible:text-foreground block py-2.5 text-pretty transition-colors sm:py-1.5"
              >
                <MapPin className="-mt-0.5 mr-2 inline size-3.5" />
                {address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="text-foreground/4 pointer-events-none -mb-3 block text-center text-7xl leading-none font-semibold tracking-tighter whitespace-nowrap uppercase select-none sm:text-8xl md:-mb-6 md:text-9xl"
      >
        {name}
      </span>
    </main>
  );
}
