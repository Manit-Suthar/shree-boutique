export default {
    name: "productGallery",
    title: "Boutique Gallery",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Item Title",
        type: "string",
      },
      {
        name: "category",
        title: "Category",
        type: "string",
        options: {
          list: [
            { title: "Blouse", value: "blouse" },
            { title: "Chaniya Choli", value: "chaniyaCholi" },
            { title: "Kurti", value: "kurtis" },
            { title: "Western", value: "western" },
            { title: "Kids Wear", value: "kids" },
            { title: "Alterations", value: "alterations" },
            { title: "Dress", value: "dress" },
            { title: "Frock", value: "frock" },
          ],
        },
      },
      {
        name: "image",
        title: "Product Photo",
        type: "image",
        options: { hotspot: true },
        fields: [
          {
            name: "alt",
            title: "Alt Text",
            type: "string",
          },
        ],
      },
      {
        name: "isFeatured",
        title: "Show on Home Page?",
        type: "boolean",
        initialValue: false,
      },
    ],
  };
  