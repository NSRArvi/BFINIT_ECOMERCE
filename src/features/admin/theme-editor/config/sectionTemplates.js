export const sectionTemplates = {
  header: [
    {
      id: "announce-bar-default",
      category: "header",
      singleInstance: true,
      name: "Announcement Bar",
      description:
        "Display promotions, updates or important messages at the top of your store.",
      thumbnail: "📢",
      defaultContent: {
        message: "Free shipping on orders over $50. Shop now and save.",
      },
      fieldSchema: [
        {
          key: "message",
          label: "Message",
          type: "textarea",
          rows: 2,
          placeholder: "Enter a promotional or informational message...",
          helpText:
            "Appears at the top of every page to highlight promotions or important updates.",
        },
      ],
    },
    {
      id: "nav-simple",
      category: "header",
      singleInstance: true,
      name: "Main Header",
      description:
        "Display your store logo, navigation menu and customer actions.",
      thumbnail: "🧭",
      defaultContent: {
        logoType: "auto",
      },
      fieldSchema: [
        {
          key: "logoType",
          label: "Brand Display",
          type: "radio",
          helpText: "Choose how your brand appears in the header.",
          options: [
            { value: "auto", label: "Automatic" },
            { value: "logo", label: "Logo Only" },
            { value: "text", label: "Store Name Only" },
            { value: "both", label: "Logo & Store Name" },
          ],
        },
      ],
    },
    {
      id: "nav-landing",
      category: "header",
      singleInstance: true,
      name: "Landing Header",
      description:
        "Display your brand and navigation links for landing pages and business websites.",
      thumbnail: "🧭",
      defaultContent: {
        logoType: "auto",
      },
      fieldSchema: [
        {
          key: "logoType",
          label: "Brand Display",
          type: "radio",
          helpText: "Choose how your brand appears in the header.",
          options: [
            { value: "auto", label: "Automatic" },
            { value: "logo", label: "Logo Only" },
            { value: "text", label: "Store Name Only" },
            { value: "both", label: "Logo & Store Name" },
          ],
        },
      ],
    },
  ],

  hero: [
    {
      id: "hero-default",
      category: "body",
      singleInstance: false,
      name: "Hero Banner",
      description:
        "Showcase your brand with a large banner, headline and call to action.",
      thumbnail: "🖼️",
      defaultContent: {
        title: "Discover Your Next Favorite Thing",
        subTitle:
          "Curated products and collections designed for your lifestyle.",
        cta: "Shop Now",
        backgroundImage: null,
      },
      fieldSchema: [
        {
          key: "title",
          label: "Heading",
          type: "text",
          placeholder: "Enter a headline...",
          helpText: "The primary message displayed in your hero banner.",
        },
        {
          key: "subTitle",
          label: "Description",
          type: "textarea",
          rows: 3,
          placeholder: "Add supporting text...",
          helpText: "Provide additional context to support your headline.",
        },
        {
          key: "cta",
          label: "Button Label",
          type: "text",
          placeholder: "e.g. Shop Now",
          helpText: "Text displayed on the primary call-to-action button.",
        },
        {
          key: "backgroundImage",
          label: "Background Image",
          type: "image",
          helpText: "Upload the image displayed behind the banner content.",
        },
      ],
    },
    {
      id: "hero-landing",
      category: "body",
      singleInstance: false,
      name: "Landing Hero",
      description:
        "A full-screen hero with a bold two-part headline over a background image.",
      thumbnail: "🖼️",
      defaultContent: {
        title: "Build Better.",
        subTitle: "Grow Faster.",
        description:
          "We help businesses deliver exceptional products and services through trusted expertise, innovative solutions and a commitment to long-term success.",
        image: null,
      },
      fieldSchema: [
        {
          key: "title",
          label: "Headline",
          type: "text",
          placeholder: "e.g. Build Better. Grow Faster.",
          helpText: "The main headline that introduces your business.",
        },
        {
          key: "subTitle",
          label: "Subheading",
          type: "text",
          placeholder: "e.g. Trusted solutions for growing businesses.",
          helpText: "An optional second line to reinforce your headline.",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          rows: 3,
          placeholder:
            "Briefly describe what your business does and what makes it different.",
          helpText: "Supporting text displayed below the heading.",
        },
        {
          key: "image",
          label: "Background Image",
          type: "image",
          helpText:
            "Upload a high-quality background image for your hero section.",
        },
      ],
    },
  ],

  products: [
    {
      id: "product-grid",
      category: "body",
      singleInstance: false,
      name: "Featured Products",
      description: "Highlight products in a customizable grid layout.",
      thumbnail: "🛍️",
      defaultContent: {
        title: "Featured Products",
        columns: "4",
        productsToShow: "8",
        productSource: {
          type: "all",
          value: null,
        },
        sortBy: "default",
        showTitle: true,
      },
      fieldSchema: [
        {
          key: "title",
          label: "Heading",
          type: "text",
          placeholder: "e.g. Featured Products",
          helpText: "Displayed above the product grid.",
        },
        {
          key: "showTitle",
          label: "Show Heading",
          type: "switch",
          helpText: "Display the section heading.",
        },
        // {
        //   key: "productSource",
        //   label: "Products",
        //   type: "product-source",
        //   helpText: "Choose which products to display.",
        //   options: [
        //     {
        //       label: "All Products",
        //       value: "all",
        //       description: "Display all available products.",
        //     },
        //     {
        //       label: "Manual Selection",
        //       value: "manual",
        //       description: "Choose specific products to feature.",
        //     },
        // TODO: after implementing query params then enable these fields.
        // {
        //   label: "Featured Products",
        //   value: "badge:featured",
        //   description: "Products marked as featured",
        // },
        // {
        //   label: "New Arrivals",
        //   value: "badge:new_arrival",
        //   description: "Products marked as new",
        // },
        // {
        //   label: "Hot Deals",
        //   value: "badge:hot_deal",
        //   description: "Products on special promotion",
        // },
        // {
        //   label: "Best Selling",
        //   value: "auto:best_selling",
        //   description: "Top products by sales volume",
        // },
        // {
        //   label: "Recently Added",
        //   value: "auto:newest",
        //   description: "Newest products by date added",
        // },
        //   ],
        // },
        // {
        //   key: "sortBy",
        //   label: "Sort By",
        //   type: "select",
        //   options: [
        //     { label: "Default", value: "default" },
        //     { label: "Price: Low to High", value: "price_asc" },
        //     { label: "Price: High to Low", value: "price_desc" },
        //     { label: "Name: A to Z", value: "name_asc" },
        //     { label: "Name: Z to A", value: "name_desc" },
        //   ],
        //   helpText: "Order in which products appear",
        // },
        {
          key: "productsToShow",
          label: "Products to Show",
          type: "select",
          options: [
            { label: "4 Products", value: "4" },
            { label: "8 Products", value: "8" },
            { label: "12 Products", value: "12" },
            { label: "16 Products", value: "16" },
            { label: "20 Products", value: "20" },
          ],
          helpText: "Maximum number of products displayed in this section.",
        },
        {
          key: "columns",
          label: "Columns",
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "4 Columns", value: "4" },
            { label: "6 Columns", value: "6" },
          ],
          helpText: "Number of products displayed in each row.",
        },
      ],
    },
  ],

  content: [
    {
      id: "about-overview",
      category: "body",
      singleInstance: true,
      name: "About Overview",
      description:
        "Introduce your business, share your story and build trust with your visitors.",
      thumbnail: "📖",
      defaultContent: {
        eyebrow: "Introduction",
        title: "Our Story, Built On Purpose And Craft",
        description:
          "We are a team dedicated to building something meaningful in our industry. From humble beginnings to where we are today, we combine expertise, care, and attention to detail to deliver value where it matters most. Our approach goes beyond the basics. We turn our values into real impact, connecting our vision with the people we serve through quality, trust, and experience.",
        statement1Label: "Vision",
        statement1:
          "To become a trusted name people rely on, shaping how our work is experienced, discovered, and valued everywhere we go.",
        statement2Label: "Mission",
        statement2:
          "To grow with purpose by combining quality, service, and genuine care, turning our values into meaningful impact and connecting with the people we serve through every experience.",
      },
      fieldSchema: [
        {
          key: "eyebrow",
          label: "Eyebrow Text",
          type: "text",
          placeholder: "e.g. Introduction",
          helpText: "Small label displayed above the heading.",
        },
        {
          key: "title",
          label: "Heading",
          type: "textarea",
          rows: 2,
          placeholder: "Enter a heading...",
          helpText: "The main heading for this section.",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          rows: 4,
          placeholder: "Tell your brand's story...",
          helpText: "The main body text describing your brand.",
        },
        {
          key: "statement1Label",
          label: "First Statement Label",
          type: "text",
          placeholder: "e.g. Vision",
          helpText: "Heading text for the first statement block.",
        },
        {
          key: "statement1",
          label: "First Statement",
          type: "textarea",
          rows: 3,
          placeholder: "e.g. To become the leading name people trust...",
          helpText:
            "Optional. Leave blank to hide this block from the section.",
        },
        {
          key: "statement2Label",
          label: "Second Statement Label",
          type: "text",
          placeholder: "e.g. Mission",
          helpText: "Heading text for the second statement block.",
        },
        {
          key: "statement2",
          label: "Second Statement",
          type: "textarea",
          rows: 3,
          placeholder: "e.g. To guide our growth with quality and care...",
          helpText:
            "Optional. Leave blank to hide this block from the section.",
        },
      ],
    },
    {
      id: "services-grid",
      category: "body",
      singleInstance: true,
      name: "Services",
      description:
        "Showcase the services you offer, from consulting to full-service delivery.",
      thumbnail: "🛠️",
      defaultContent: {
        eyebrow: "What We Do",
        title: "Services Built Around Your Needs",
        description:
          "Whatever stage you're at, we have the right service to help you move forward.",
        showCta: false,
        ctaText: "Contact Us",
        services: [
          {
            image: null,
            title: "Consulting",
            description:
              "Strategic guidance to help you make the right decisions at every stage.",
            features: "Strategy session\nCustom roadmap\nFollow-up support",
            priceLabel: "Starting at $200",
            badge: "",
            tags: "Strategy, Planning",
          },
          {
            image: null,
            title: "Implementation",
            description:
              "Hands-on execution, from initial setup to full delivery, done right.",
            features: "Full setup\nDedicated support\nQuality assurance",
            priceLabel: "Custom Quote",
            badge: "Most Popular",
            tags: "Delivery, Support",
          },
          {
            image: null,
            title: "Ongoing Support",
            description:
              "Continued partnership to keep things running smoothly long after launch.",
            features: "Monthly check-ins\nPriority support",
            priceLabel: "",
            badge: "",
            tags: "Maintenance",
          },
        ],
      },
      fieldSchema: [
        {
          key: "eyebrow",
          label: "Eyebrow Text",
          type: "text",
          placeholder: "e.g. What We Do",
          helpText: "Small label displayed above the heading.",
        },
        {
          key: "title",
          label: "Heading",
          type: "textarea",
          rows: 2,
          placeholder: "Enter a heading...",
          helpText: "The main heading for this section.",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          rows: 3,
          placeholder: "Enter supporting text...",
          helpText: "Optional. Short supporting text below the heading.",
        },
        {
          key: "showCta",
          label: "Show Button On Cards",
          type: "switch",
          helpText:
            "Show a button on every service card that links to your Contact page.",
        },
        {
          key: "ctaText",
          label: "Button Text",
          type: "text",
          placeholder: "e.g. Book a Call",
          helpText: "Label shown on the button, if enabled above.",
        },
        {
          key: "services",
          label: "Services",
          type: "array",
          itemLabel: "Service",
          helpText: "Add, remove, or reorder the services you offer.",
          itemSchema: [
            {
              key: "image",
              label: "Image",
              type: "image",
              helpText: "Optional. Photo representing this service.",
            },
            {
              key: "title",
              label: "Service Name",
              type: "text",
              placeholder: "e.g. Consulting",
              helpText: "Name of the service.",
            },
            {
              key: "description",
              label: "Service Description",
              type: "textarea",
              rows: 3,
              placeholder: "Describe what this service includes...",
              helpText: "Short description of what this service covers.",
            },
            {
              key: "features",
              label: "Key Features",
              type: "textarea",
              rows: 3,
              placeholder:
                "e.g. Strategy session, Custom roadmap, Follow-up support",
              helpText:
                "Optional. One per line — shown as a checklist under the description.",
            },
            {
              key: "priceLabel",
              label: "Price / Starting At",
              type: "text",
              placeholder: "e.g. Starting at $200",
              helpText: "Optional. Leave blank to hide pricing on this card.",
            },
            {
              key: "badge",
              label: "Badge Text",
              type: "text",
              placeholder: "e.g. Most Popular",
              helpText: "Optional. Small highlight badge shown on the card.",
            },
            {
              key: "tags",
              label: "Tags",
              type: "text",
              placeholder: "e.g. Strategy, Planning",
              helpText:
                "Optional. Comma-separated keywords shown below the description.",
            },
          ],
        },
      ],
    },
    {
      id: "team-grid",
      category: "body",
      singleInstance: true,
      name: "Our Team",
      description: "Introduce your team with photos, names, and roles.",
      thumbnail: "👥",
      defaultContent: {
        eyebrow: "Our Team",
        title: "The People Behind Our Brand",
        description:
          "Meet the people who bring our vision to life, every single day.",
        members: [
          {
            image: null,
            name: "Alexandra Bennett",
            role: "Founder & CEO",
          },
          {
            image: null,
            name: "Marcus Chen",
            role: "Head of Operations",
          },
          {
            image: null,
            name: "Priya Anand",
            role: "Creative Director",
          },
        ],
      },
      fieldSchema: [
        {
          key: "eyebrow",
          label: "Eyebrow Text",
          type: "text",
          placeholder: "e.g. Our Team",
          helpText: "Small label displayed above the heading.",
        },
        {
          key: "title",
          label: "Heading",
          type: "textarea",
          rows: 2,
          placeholder: "Enter a heading...",
          helpText: "The main heading for this section.",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          rows: 3,
          placeholder: "Enter supporting text...",
          helpText: "Optional. Short supporting text below the heading.",
        },
        {
          key: "members",
          label: "Team Members",
          type: "array",
          itemLabel: "Member",
          helpText: "Add, remove, or reorder team members.",
          itemSchema: [
            {
              key: "image",
              label: "Photo",
              type: "image",
              helpText: "Photo of the team member.",
            },
            {
              key: "name",
              label: "Name",
              type: "text",
              placeholder: "e.g. Jane Doe",
              helpText: "Name of the team member.",
            },
            {
              key: "role",
              label: "Role",
              type: "text",
              placeholder: "e.g. Founder & CEO",
              helpText: "Job title or role of the team member.",
            },
          ],
        },
      ],
    },
    {
      id: "testimonials-grid",
      category: "body",
      singleInstance: true,
      name: "Testimonials",
      description:
        "Showcase customer reviews and feedback to build trust with visitors.",
      thumbnail: "💬",
      defaultContent: {
        eyebrow: "Testimonials",
        title: "TRUSTED BY OUR CLIENTS",
        description:
          "Built on trust, collaboration and measurable results. Here's what our clients say about working with our team.",
        testimonials: [
          {
            image: null,
            name: "Alexandra Bennett",
            role: "Founder, Studio Verde",
            quote:
              "Working with this team changed how we think about our brand. The results speak for themselves.",
          },
          {
            image: null,
            name: "Marcus Chen",
            role: "Operations Lead, Northline",
            quote:
              "Reliable, thoughtful, and genuinely invested in getting things right. Couldn't ask for a better partner.",
          },
        ],
      },
      fieldSchema: [
        {
          key: "eyebrow",
          label: "Eyebrow Text",
          type: "text",
          placeholder: "e.g. Testimonials",
          helpText: "Small label displayed above the heading.",
        },
        {
          key: "title",
          label: "Heading",
          type: "textarea",
          rows: 2,
          placeholder: "Enter a heading...",
          helpText: "The main heading for this section.",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          rows: 3,
          placeholder: "Enter supporting text...",
          helpText: "Optional. Short supporting text below the heading.",
        },
        {
          key: "testimonials",
          label: "Testimonials",
          type: "array",
          itemLabel: "Testimonial",
          helpText: "Add, remove, or reorder customer testimonials.",
          itemSchema: [
            {
              key: "image",
              label: "Photo",
              type: "image",
              helpText: "Optional. Photo of the customer.",
            },
            {
              key: "name",
              label: "Name",
              type: "text",
              placeholder: "e.g. Jane Doe",
              helpText: "Name of the customer giving the testimonial.",
            },
            {
              key: "role",
              label: "Role / Company",
              type: "text",
              placeholder: "e.g. CEO, Acme Inc.",
              helpText: "Optional. Role or company of the customer.",
            },
            {
              key: "quote",
              label: "Quote",
              type: "textarea",
              rows: 3,
              placeholder: "What did they say about you?",
              helpText: "The testimonial text.",
            },
          ],
        },
      ],
    },
    {
      id: "cta-banner",
      category: "body",
      singleInstance: true,
      name: "Call To Action",
      description: "A closing banner to prompt visitors to take the next step.",
      thumbnail: "📖",
      defaultContent: {
        eyebrow: "Get Started",
        title: "Ready To Grow With Us?",
        description:
          "Join the businesses that trust us to deliver quality, care and results that matter.",
        primaryCtaText: "Get In Touch",
        primaryCtaLink: "/contact",
        secondaryCtaText: "",
        secondaryCtaLink: "",
      },
      fieldSchema: [
        {
          key: "eyebrow",
          label: "Eyebrow Text",
          type: "text",
          placeholder: "e.g. Get Started",
          helpText: "Small label displayed above the heading.",
        },
        {
          key: "title",
          label: "Heading",
          type: "textarea",
          rows: 2,
          placeholder: "Enter a heading...",
          helpText: "The main heading for this section.",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          rows: 3,
          placeholder: "Enter supporting text...",
          helpText: "Short supporting text below the heading.",
        },
        {
          key: "primaryCtaText",
          label: "Primary Button Text",
          type: "text",
          placeholder: "e.g. Contact Us",
          helpText: "Label shown on the button - customize this text.",
        },
        {
          key: "primaryCtaLink",
          label: "Primary Button Destination",
          type: "select",
          options: [
            { label: "About Us", value: "/about" },
            { label: "Contact", value: "/contact" },
          ],
          helpText: "Choose which page this button should link to.",
        },
        {
          key: "secondaryCtaText",
          label: "Secondary Button Text",
          type: "text",
          placeholder: "e.g. Learn More",
          helpText: "Optional. Leave blank to hide the second button.",
        },
        {
          key: "secondaryCtaLink",
          label: "Secondary Button Destination",
          type: "select",
          options: [
            { label: "None", value: "" },
            { label: "About Us", value: "/about" },
            { label: "Contact", value: "/contact" },
          ],
          helpText:
            "Choose which page this button should link to, or leave as None to hide it.",
        },
      ],
    },
  ],

  footer: [
    {
      id: "footer-default",
      category: "footer",
      singleInstance: true,
      name: "Multi-Column Footer",
      description:
        "Display company information, contact details, navigation links and social media.",
      thumbnail: "🔗",
      defaultContent: {
        description:
          "We are committed to providing high-quality products and exceptional customer service.",
        showContactInfo: true,
        showSocialLinks: true,
      },
      fieldSchema: [
        {
          key: "description",
          label: "About",
          type: "textarea",
          rows: 3,
          placeholder: "Tell customers about your business...",
          helpText: "Displayed in the footer to introduce your business.",
        },
        {
          key: "showContactInfo",
          label: "Show Contact Information",
          type: "switch",
          helpText: "Display your email, phone number, and address.",
        },
        {
          key: "showSocialLinks",
          label: "Show Social Links",
          type: "switch",
          helpText: "Display links to your social media profiles.",
        },
      ],
    },
  ],
};
