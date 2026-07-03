export interface HonoreeCompany {
  name: string;
  category: string;
  phone: string;
  email: string;
  idealConnect: string;
}

export interface Honoree {
  name: string;
  role: string;
  quote: string;
  img: string;
  company: HonoreeCompany;
}

export const PARTNERS_2026: Honoree[] = [
  {
    name: "Vishnu Soni",
    role: "Founding Partner",
    quote: "Corporate gifting that leaves a lasting impression — proud to power ABL 2026.",
    img: "/images/roster/vishnu-soni.png",
    company: {
      name: "Silver Spoon",
      category: "Corporate Gifting",
      phone: "+91 99981 23479",
      email: "vnu444@gmail.com",
      idealConnect: "Corporates, MNC's, HR",
    },
  },
  {
    name: "Shruti Agarwal",
    role: "Founding Partner",
    quote: "Backing the league that backs its members — that's what real partnership looks like.",
    img: "/images/roster/shruti-agarwal.png",
    company: {
      name: "Arcedior International Pvt. Ltd.",
      category: "Furniture Manufacturer",
      phone: "+91 99099 07405",
      email: "shruti@arcedior.com",
      idealConnect: "Interior Designers, Hoteliers, Builders, Home Stylists, Corporates Making New Office",
    },
  },
  {
    name: "Priyank Vora",
    role: "Founding Partner",
    quote: "Wealth is built the same way this league is — with trust, consistency, and the right partners.",
    img: "/images/roster/priyank-vora.png",
    company: {
      name: "Kinstugii Wealth",
      category: "Wealth Management",
      phone: "+91 70432 68807",
      email: "kinstugiiwealth@gmail.com",
      idealConnect: "Business Owners, HNIs, Families Planning Their Finances",
    },
  },
  {
    name: "Gaurav Mehta",
    role: "Founding Partner · Web Dev",
    quote: "Built this website for ABL 2026 — proud to power the league on and off the field.",
    img: "/images/commissioners/gaurav-mehta.png",
    company: {
      name: "Gravity Media Marketing",
      category: "Web Development",
      phone: "+91 81049 33816",
      email: "gauravmehta.biz@gmail.com",
      idealConnect: "Business Owners Without a Website, Custom Web Apps, CRM & ERP Solutions",
    },
  },
];

export const COMMISSIONERS_2026: Honoree[] = [
  {
    name: "Gaurav Mehta",
    role: "Co-Commissioner, ABL",
    quote: "The Ares Business League is more than a competition; it is a movement to forge legendary enterprises and build a stronger nation.",
    img: "/images/commissioners/gaurav-mehta.png",
    company: {
      name: "Gravity Media Marketing",
      category: "Web Development",
      phone: "+91 81049 33816",
      email: "gauravmehta.biz@gmail.com",
      idealConnect: "Business Owners Without a Website, Custom Web Apps, CRM & ERP Solutions",
    },
  },
  {
    name: "Manush Patel",
    role: "Co-Commissioner, ABL",
    quote: "We challenge our leaders to not just perform, but to leave a legacy. True collaboration in this arena changes the entire business landscape.",
    img: "/images/commissioners/manush-patel.png",
    company: {
      name: "Babulal & Sons",
      category: "Building Material Supplier",
      phone: "+91 89800 33292",
      email: "babulalandsons3292@gmail.com",
      idealConnect: "Interior Designers, Architects, Construction Co. Purchase Officers, Civil & AMC Contractors",
    },
  },
];
