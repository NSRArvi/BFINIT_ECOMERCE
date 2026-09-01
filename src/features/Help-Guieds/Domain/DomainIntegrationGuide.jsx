import { useState } from "react";
import {
  Globe,
  Copy,
  Check,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Clock,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function DomainIntegrationGuide() {
  const [copiedField, setCopiedField] = useState(null);
  const [expandedSection, setExpandedSection] = useState("overview");

  const dnsRecords = [
    {
      type: "A Record",
      hostname: "@",
      value: "41.192.13.241",
      ttl: "3600",
      description: "Points your domain to our server",
    },
    {
      type: "CNAME Record",
      hostname: "www",
      value: "example.domain.com",
      ttl: "Default",
      description: "Enables www.yourdomain.com",
    },
  ];

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Domain Integration Help
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Learn how to connect your custom domain to your store
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Overview Section */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("overview")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                What is a Custom Domain?
              </h2>
            </div>
            {expandedSection === "overview" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "overview" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  A custom domain allows you to use your own domain name (like{" "}
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
                    yourbusiness.com
                  </span>
                  ) instead of a default subdomain. This gives your store a
                  professional appearance and builds trust with customers.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Before Custom Domain
                    </h3>
                    <p className="rounded bg-gray-50 px-2 py-1 font-mono text-sm text-gray-600">
                      shop.bfinit.com/preview/zlx4w2
                    </p>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      After Custom Domain
                    </h3>
                    <p className="rounded bg-white px-2 py-1 font-mono text-sm text-gray-600">
                      yourbusiness.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prerequisites */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("prerequisites")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Before You Start
              </h2>
            </div>
            {expandedSection === "prerequisites" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "prerequisites" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  Make sure you have the following before connecting your
                  domain:
                </p>

                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Own a domain name
                      </p>
                      <p className="text-sm text-gray-600">
                        You must have purchased a domain from a domain registrar
                        (where you bought your domain name)
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Access to DNS settings
                      </p>
                      <p className="text-sm text-gray-600">
                        You'll need login credentials to your domain registrar's
                        control panel to modify DNS records
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Time for propagation
                      </p>
                      <p className="text-sm text-gray-600">
                        DNS changes can take 1-48 hours to take effect worldwide
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Don't have a domain yet?
                    </h4>
                    <p className="text-sm text-gray-700">
                      You can register a new domain instantly using our{" "}
                      <a
                        href="https://www.secureserver.net/?plid=599412"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-amber-700 underline hover:text-amber-800"
                      >
                        BFINIT Domain Registration
                      </a>{" "}
                      service. Get fast activation, full DNS management, and
                      complete control over your domain - all in one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Understanding DNS */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("dns-explained")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Understanding DNS Records
              </h2>
            </div>
            {expandedSection === "dns-explained" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "dns-explained" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  DNS (Domain Name System) records tell the internet where to
                  find your website. Think of it like a phone book that connects
                  your domain name to our servers.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="min-w- rounded-md bg-blue-100 px-2 py-1 font-mono text-sm font-semibold text-blue-700">
                        A
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          A Record
                        </h4>
                        <p className="text-sm text-gray-600">
                          Points your domain directly to our server's IP
                          address. This is required for your main domain
                          (yourdomain.com) to work.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-purple-100 px-2 py-1 font-mono text-sm font-semibold text-purple-700">
                        CNAME
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          CNAME Record
                        </h4>
                        <p className="text-sm text-gray-600">
                          Creates an alias for your domain. This is used for the
                          "www" subdomain (www.yourdomain.com) and points it to
                          our hosting.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-green-100 px-2 py-1 font-mono text-sm font-semibold text-green-700">
                        TTL
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          Time To Live (TTL)
                        </h4>
                        <p className="text-sm text-gray-600">
                          How long DNS servers should cache this information
                          (measured in seconds). A lower TTL means changes
                          propagate faster but creates more DNS queries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DNS Records to Add */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("dns-records")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                1
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                DNS Records Required for Your Domain
              </h2>
            </div>
            {expandedSection === "dns-records" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "dns-records" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <p className="mt-4 mb-6 text-gray-700">
                When you add your domain inside the <strong>Domains</strong>{" "}
                section of your BFINIT admin panel, BFINIT will generate the DNS
                records needed to connect your domain to your hosted storefront.
                These records will be visible directly on your domain’s details
                page.
                <br />
                <br />
                After receiving the DNS values, simply log in to the provider
                where you purchased your domain and add the required records in
                their DNS management panel. The examples below show the typical
                format and purpose of each type of DNS record you may need.
              </p>

              {dnsRecords.map((record, index) => (
                <div
                  key={index}
                  className="mb-6 rounded-lg border border-gray-200 p-5 last:mb-0"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        Record {index + 1}: {record.type}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {record.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      Example
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* HOSTNAME */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-900">
                        HOSTNAME / NAME
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={record.hostname}
                          readOnly
                          className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-900"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(
                              record.hostname,
                              `hostname-${index}`,
                            )
                          }
                          className="rounded-md border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-50"
                        >
                          {copiedField === `hostname-${index}` ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        “@” is usually used for the root domain, while “www” is
                        used for the www version of your domain.
                      </p>
                    </div>

                    {/* VALUE */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-900">
                        VALUE / POINTS TO / TARGET
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={record.value}
                          readOnly
                          className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-900"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(record.value, `value-${index}`)
                          }
                          className="rounded-md border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-50"
                        >
                          {copiedField === `value-${index}` ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        This is the destination your domain will connect to. The
                        actual value will be provided by BFINIT once you add
                        your domain.
                      </p>
                    </div>

                    {/* TTL */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-900">
                        TTL (Time To Live)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={record.ttl}
                          readOnly
                          className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-900"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(record.ttl, `ttl-${index}`)
                          }
                          className="rounded-md border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-50"
                        >
                          {copiedField === `ttl-${index}` ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        TTL determines how long DNS changes take to refresh.
                        Most providers allow “Automatic” or “Default.”
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How to Find DNS Settings */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("find-dns")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                2
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Finding Your DNS Settings
              </h2>
            </div>
            {expandedSection === "find-dns" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "find-dns" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  The location of DNS settings varies by registrar, but here's
                  the general process:
                </p>

                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      1
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Log in to your domain registrar
                      </p>
                      <p className="text-sm text-gray-600">
                        Go to the website where you purchased your domain and
                        sign in to your account
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      2
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Find your domain list
                      </p>
                      <p className="text-sm text-gray-600">
                        Look for a section called "My Domains," "Domain
                        Management," or similar
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      3
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Access DNS settings
                      </p>
                      <p className="text-sm text-gray-600">
                        Look for options like "DNS Settings," "DNS Management,"
                        "Nameservers," "Advanced DNS," or "DNS Zone Editor"
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      4
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Add the records
                      </p>
                      <p className="text-sm text-gray-600">
                        Click "Add Record" or similar, then enter the values
                        from Step 1 above
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="mt-4 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Common Terms to Look For
                    </h4>
                    <p className="text-sm text-gray-700">
                      DNS settings might be under different names: DNS
                      Management, DNS Zone Editor, Advanced DNS, Nameserver
                      Settings, or Domain Settings. If you can't find it, search
                      your registrar's help documentation for "DNS" or
                      "nameservers."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DNS Propagation */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("propagation")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                DNS Propagation: What to Expect
              </h2>
            </div>
            {expandedSection === "propagation" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "propagation" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  After adding DNS records, they need to propagate (spread)
                  across the internet. This is a normal part of the process.
                </p>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <h4 className="mb-1 font-semibold text-gray-900">
                        Typical Timeline
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Most changes complete in 1-4 hours</li>
                        <li>• Can take up to 48 hours in rare cases</li>
                        <li>
                          • You may see the changes at different times from
                          different locations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    What happens during propagation:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex gap-3 text-sm">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        1
                      </div>
                      <p className="pt-0.5 text-gray-700">
                        Your registrar updates their DNS servers with the new
                        records
                      </p>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        2
                      </div>
                      <p className="pt-0.5 text-gray-700">
                        The changes spread to DNS servers around the world
                      </p>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        3
                      </div>
                      <p className="pt-0.5 text-gray-700">
                        Your domain starts pointing to our servers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-gray-200 p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Checking Propagation Status
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    You can check if your DNS changes have propagated using
                    online DNS checker tools. Search for "DNS propagation
                    checker" to find free tools that show your domain's status
                    worldwide.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Verify Connection */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("verify")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                3
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Connecting Your Domain
              </h2>
            </div>
            {expandedSection === "verify" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "verify" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  Once you add your domain inside your{" "}
                  <strong>BFINIT Admin → Domains</strong> page, we will generate
                  the DNS records required to connect your domain to your hosted
                  storefront. You must place those DNS values inside the DNS
                  settings of the provider where you bought your domain.
                </p>

                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                      1
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Buy or use an existing domain
                      </p>
                      <p className="text-sm text-gray-600">
                        Any domain you own can be connected. You just need
                        access to its DNS settings.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                      2
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Add your domain in BFINIT Admin
                      </p>
                      <p className="text-sm text-gray-600">
                        Go to <strong>Domains</strong> and enter your domain
                        name (example.com). This will automatically generate the
                        DNS records needed for connection.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                      3
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Copy the DNS values we provide
                      </p>
                      <p className="text-sm text-gray-600">
                        The records shown on your BFINIT Domains page will
                        include an A Record and a CNAME Record. These values are
                        generated specifically for your domain.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                      4
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Paste them into your domain provider's DNS panel
                      </p>
                      <p className="text-sm text-gray-600">
                        Open the DNS management page where you purchased the
                        domain and add the records exactly as shown in your
                        BFINIT Admin.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                      5
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Wait for the records to update
                      </p>
                      <p className="text-sm text-gray-600">
                        DNS changes usually apply within minutes, but it may
                        take a few hours depending on your provider.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                      6
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-gray-900">
                        Your domain will connect automatically
                      </p>
                      <p className="text-sm text-gray-600">
                        Once your DNS records are active, BFINIT will detect
                        them and mark your domain as connected.
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="mt-6 flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Connection Success
                    </h4>
                    <p className="text-sm text-gray-700">
                      When your domain is successfully connected, you'll see an
                      <strong> Active</strong> status inside your BFINIT Domain
                      Settings. Your storefront will then be accessible from
                      your custom domain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Troubleshooting */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection("troubleshooting")}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Troubleshooting Common Issues
              </h2>
            </div>
            {expandedSection === "troubleshooting" ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {expandedSection === "troubleshooting" && (
            <div className="border-t border-gray-200 px-6 pb-6">
              <div className="mt-4 space-y-4">
                <p className="mb-4 text-gray-700">
                  If your domain isn't working after 48 hours, check these
                  common issues:
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                      <span className="text-red-600">✕</span>
                      Domain Not Resolving
                    </h4>
                    <p className="mb-2 text-sm text-gray-700">
                      If your domain shows an error or doesn't load:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-gray-600">
                      <li>
                        • Double-check that DNS records are entered exactly as
                        shown
                      </li>
                      <li>
                        • Verify the A record points to the correct IP address
                      </li>
                      <li>
                        • Ensure there are no typos in the hostname or value
                        fields
                      </li>
                      <li>• Check if DNS propagation is still in progress</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                      <span className="text-red-600">✕</span>
                      WWW Version Not Working
                    </h4>
                    <p className="mb-2 text-sm text-gray-700">
                      If www.yourdomain.com doesn't work but yourdomain.com
                      does:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-gray-600">
                      <li>• Verify the CNAME record is properly configured</li>
                      <li>
                        • Check that the hostname is exactly "www" (no extra
                        characters)
                      </li>
                      <li>
                        • Ensure the CNAME value is exactly "origin.bfinit.com"
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                      <span className="text-red-600">✕</span>
                      SSL/HTTPS Certificate Issues
                    </h4>
                    <p className="mb-2 text-sm text-gray-700">
                      If you see "Not Secure" warnings or certificate errors:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-gray-600">
                      <li>
                        • SSL certificates can take 24-48 hours to provision
                      </li>
                      <li>
                        • Ensure DNS records are correctly pointed to our
                        servers
                      </li>
                      <li>
                        • Try accessing with http:// first, then https:// will
                        work once the certificate is issued
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                      <span className="text-red-600">✕</span>
                      Changes Not Appearing
                    </h4>
                    <p className="mb-2 text-sm text-gray-700">
                      If you made changes but don't see them:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-gray-600">
                      <li>• Clear your browser cache and cookies</li>
                      <li>
                        • Try accessing from a different device or network
                      </li>
                      <li>• Use an incognito/private browser window</li>
                      <li>• Flush your computer's DNS cache</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                      <span className="text-red-600">✕</span>
                      Can't Find DNS Settings
                    </h4>
                    <p className="mb-2 text-sm text-gray-700">
                      If you can't locate your DNS management panel:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-gray-600">
                      <li>
                        • Search your registrar's help center for "DNS settings"
                      </li>
                      <li>
                        • Contact your registrar's support team for guidance
                      </li>
                      <li>
                        • Check if your domain is using custom nameservers (may
                        need to update those first)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">
                      Still Having Issues?
                    </h4>
                    <p className="text-sm text-gray-700">
                      Remember that DNS changes can take up to 48 hours. If
                      problems persist after this time, contact our support team
                      for personalized assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Need Additional Help?
              </h3>
              <p className="mb-3 text-sm text-gray-700">
                If you're having trouble connecting your domain or need
                assistance with any step in this guide, our support team is
                ready to help you get your custom domain up and running.
              </p>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
