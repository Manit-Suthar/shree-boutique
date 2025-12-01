export default {
    name: "reviews",
    title: "Client Reviews",
    type: "document",
    fields: [
      {
        name: "clientName",
        title: "Client Name",
        type: "string",
      },
      {
        name: "location",
        title: "Location (optional)",
        type: "string",
      },
      {
        name: "reviewText",
        title: "Review Text",
        type: "text",
      },
      {
        name: "rating",
        title: "Rating (1–5)",
        type: "number",
        validation: (Rule) => Rule.min(1).max(5),
      },
    ],
  };
  