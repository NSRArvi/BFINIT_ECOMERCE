export const sectionTemplates = {
  header: [
    {
      id: "announce-bar-default",
      name: "Announcement Bar",
      description:
        "Display promotions, updates or important messages at the top of your store.",
      thumbnail: "📢",
      singleInstance: true,
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
      name: "Main Header",
      description:
        "Display your store logo, navigation menu and customer actions.",
      thumbnail: "🧭",
      singleInstance: true, // Only one navbar allowed
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
      name: "Hero Banner",
      description:
        "Showcase your brand with a large banner, headline and call to action.",
      thumbnail: "🖼️",
      singleInstance: false, // Only one hero allowed
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
  ],
  products: [
    {
      id: "product-grid",
      name: "Featured Products",
      description: "Highlight products in a customizable grid layout.",
      thumbnail: "🛍️",
      singleInstance: false,
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

  footer: [
    {
      id: "footer-default",
      name: "Multi-Column Footer",
      description:
        "Display company information, contact details, navigation links and social media.",
      thumbnail: "🔗",
      singleInstance: true,
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
