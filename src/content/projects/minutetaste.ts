import type { ProjectEntry } from "@/types";

export const minutetasteProject: ProjectEntry = {
  slug: "minutetaste",
  kicker: "MinuteTaste",
  title: "MinuteTaste",
  summary:
    "A complete restaurant platform built from scratch with table reservations, pickup ordering, secret deals with countdown reveals, manual payment verification, staff order validation, and a fully custom CMS built without any third-party library. Deployed on a self-managed server with Nginx. Six weeks, one developer, zero shortcuts.",
  metaLeft: "Complete Build (Restaurant Platform)",
  metaRight: "Full-Stack Web Developer",
  image: "",
  width: 1086,
  height: 633,
  reverse: false,
  accent: "#111111",
  year: "2025",
  role: "Full-Stack Web Developer",
  client: "Wai Sin Lee (Malaysia)",
  duration: "6 Weeks",
  stack: ["React", "Node.js", "PostgreSQL", "Nginx"],
  heroImage: {
    src: "",
    alt: "MinuteTaste restaurant platform hero",
    width: 1086,
    height: 633,
  },
  caseStudyBlocks: [
    {
      type: "overview",
      superLabel: "The project itself :",
      title: "Project Overview",
      body:
        "MinuteTaste is a web platform built for a Malaysian restaurant that also runs a phone case shop on the side. The client needed a full business system, not just a menu page, but a real operational platform covering table reservations, pickup ordering, a scheduled secret deals engine with countdown timers and auto-reveal, manual bank transfer payment verification, inventory management with rollback, and a staff-facing order validation page. On top of all of that, midway through the project the client asked for a completely custom CMS so he could edit every piece of content on the site himself, built from scratch with no Sanity and no third-party headless library. Delivered everything in six weeks.",
      cards: [
        {
          icon: "problem",
          label: "Problem:",
          body:
            "The client had a real business with no digital system behind it. He needed a platform that could handle reservations, orders, and a unique secret deals feature, all managed manually without payment gateways or delivery integrations. The system also had to be fully editable by a non-technical owner.",
        },
        {
          icon: "goal",
          label: "Goal:",
          body:
            "Build a complete, stable MVP that the client could actually run his business on from day one, covering every customer-facing flow and every admin operation, deployed and live on a self-managed server.",
        },
        {
          icon: "role",
          label: "My role:",
          body:
            "Full-stack development from database design through to frontend, backend, custom CMS, and server deployment. One developer across the entire stack.",
        },
        {
          icon: "responsibilities",
          label: "Responsibilities:",
          bullets: [
            "Full-stack architecture with React, Node.js, and PostgreSQL",
            "Restaurant table reservation system",
            "Full menu pickup ordering with cart and pickup time selection",
            "Secret deals engine with countdown, scheduled reveal, sold-out logic, and 18-hour auto-hide",
            "Manual payment flow with bank transfer and TNG proof upload",
            "Payment proof compression, watermarking, and auto-delete after 60 days",
            "Inventory reservation and rollback on order approval and cancellation",
            "Admin dashboard with orders, deals, menu, banners, and system settings",
            "Staff-facing order verification page with VALID and INVALID states",
            "Fully custom CMS built from scratch without any third-party library",
            "Dockerized deployment on a self-managed server with Nginx configuration",
          ],
        },
      ],
    },
    {
      type: "section",
      label: "App Direction",
      title: "Built for a real business, not a demo",
      body:
        "MinuteTaste had to work in a real restaurant environment from day one. The design balances a clean customer-facing experience with a practical, information-dense admin layer. The customer side is simple and clear, with Chinese and English throughout, a visible non-halal notice, and a straightforward flow from browsing to checkout. The admin and CMS side is built for a non-technical owner who needs to manage deals, verify payments, update menu items, and check orders without relying on a developer every time.",
    },
    {
      type: "persona",
      label: "User Personas",
      title: "The regular customer who just wants to order ahead",
      body:
        "The typical MinuteTaste customer is a local regular who knows the restaurant and wants a faster way to reserve a table or order pickup without calling in. They are comfortable with a simple web flow on their phone, they pay via bank transfer or TNG because that is how things work locally, and they want confirmation that their order is real and being handled.",
      quote:
        "I just want to pick my food, pay, and show up. I don't need an app, I just need it to work.",
      name: "Mei Lin",
      role: "Regular customer, office worker",
      photo: "",
      details: [
        { label: "Age", value: "29" },
        { label: "Location", value: "Malaysia" },
        { label: "Device", value: "Mobile browser" },
      ],
      goals: [
        "Reserve a table without calling the restaurant",
        "Order pickup ahead of time so it is ready when she arrives",
        "Catch a secret deal before it sells out",
        "Get a clear order confirmation she can show staff",
      ],
      frustrations: [
        "Restaurants that only take orders over WhatsApp with no confirmation",
        "No way to know if a deal is still available",
        "Having to call to check if her order went through",
      ],
    },
    {
      type: "section",
      label: "Information Architecture",
      title: "Every flow connects back to one order system",
      body:
        "Reservations, pickup orders, and secret deal purchases all feed into the same order management layer. The customer sees three clear entry points on the homepage. Each flow leads to a guest checkout with payment proof upload and ends with an order number. The admin sees everything in one dashboard. The staff verification page sits outside the main flow entirely. It is a standalone page where staff enter an order number and instantly see VALID or INVALID in large text.",
    },
    {
      type: "section",
      label: "The Deals Engine",
      title: "The hardest feature to get right",
      body:
        "The secret deals engine was the most technically demanding part of the build. Each deal goes through four stages: pre-reveal, reveal, sold out, and auto-hide. In pre-reveal, only the price, countdown, and quantity are visible while the product name and photo stay hidden. At reveal, the full deal unlocks automatically at a scheduled time. When sold out, purchasing is disabled but the deal stays visible. Eighteen hours after selling out, the deal disappears from the front end. Inventory is reserved the moment an order is submitted, not when it is approved, to prevent overselling. If the admin cancels an order, the inventory rolls back automatically. Every rule in this system, including repurchase limits, quantity per order, stock visibility, and auto-cancel timing, is a toggle in the admin settings.",
    },
    {
      type: "section",
      label: "The Custom CMS",
      title: "Built from scratch because the client needed full control",
      body:
        "Midway through the project, the client asked for a CMS that would let him edit every visible piece of content on the site, including text, images, banners, labels, and notices, without touching the code or relying on a developer. The constraint was that no third-party CMS library was allowed. So I built it raw: a custom content management layer on top of the existing Node.js and PostgreSQL stack, with an admin interface that maps directly to every editable field on the front end. It was a significant addition to the original scope and one of the more interesting engineering challenges of the project.",
    },
    {
      type: "section",
      label: "Payment & Verification Flow",
      title: "Manual payments, zero margin for error",
      body:
        "There are no payment gateways in MinuteTaste. Customers pay via bank transfer or TNG and upload a screenshot as proof. The system compresses the image automatically, applies a watermark with the order number and timestamp, and stores it securely so only the admin can access it. After 60 days, the image deletes itself automatically for privacy. The admin then manually verifies the payment against their bank records and approves or cancels. Approval confirms the inventory. Cancellation triggers an automatic rollback. Every action is logged with a timestamp.",
    },
    {
      type: "section",
      label: "Deployment",
      title: "Dockerized and live on a self-managed server",
      body:
        "The whole platform runs in Docker containers on a self-managed server. Getting Nginx configured correctly for this setup was one of the bigger learning curves of the project, including routing, reverse proxying, and making sure everything stayed stable under the deployment. The client wanted something he owned and controlled, not a managed hosting solution, and that is what he got. The deployment holds and the platform has been running reliably since handoff.",
    },
    {
      type: "section",
      label: "Final Design",
      title: "A complete business system delivered in six weeks",
      body:
        "MinuteTaste launched as a fully operational platform covering every flow the client needed to run his restaurant digitally. Reservations work. Pickup ordering works. The deals engine runs on schedule. Payments are verified manually with a clean audit trail. The staff verification page handles fake order prevention. The custom CMS lets the owner update anything on the site himself. The client left a five-star review on Upwork. Six weeks, one developer, no shortcuts.",
    },
    {
      type: "gallery",
      columns: 3,
      images: [
        { src: "", alt: "MinuteTaste final design - homepage hero", width: 1086, height: 633 },
        { src: "", alt: "MinuteTaste final design - menu ordering flow", width: 1086, height: 633 },
        { src: "", alt: "MinuteTaste final design - secret deals engine", width: 1086, height: 633 },
        { src: "", alt: "MinuteTaste final design - reservation flow", width: 1086, height: 633 },
        { src: "", alt: "MinuteTaste final design - admin dashboard", width: 1086, height: 633 },
        { src: "", alt: "MinuteTaste final design - staff verification page", width: 1086, height: 633 },
      ],
    },
    {
      type: "section",
      label: "Mobile Responsiveness",
      title: "Designed for customers ordering on their phones",
      body:
        "The customer-facing side of MinuteTaste is primarily used on mobile. The checkout flow, the deals countdown, the menu browsing, and the payment proof upload are all built and tested for small screens first. The admin panel is desktop-focused since that is where the owner operates from, but the staff verification page works on any device since staff use whatever is available at the counter.",
    },
    {
      type: "gallery",
      columns: 5,
      images: [
        { src: "", alt: "MinuteTaste mobile - homepage", width: 375, height: 812 },
        { src: "", alt: "MinuteTaste mobile - menu browsing", width: 375, height: 812 },
        { src: "", alt: "MinuteTaste mobile - secret deal", width: 375, height: 812 },
        { src: "", alt: "MinuteTaste mobile - checkout", width: 375, height: 812 },
        { src: "", alt: "MinuteTaste mobile - order confirmation", width: 375, height: 812 },
      ],
    },
  ],
};
