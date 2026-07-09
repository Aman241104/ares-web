export interface HonoreeCompany {
  name: string;
  category: string;
  phone?: string;
  email?: string;
  idealConnect?: string;
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
    name: "Ankit Jani",
    role: "Presenting Sponsor",
    quote: "Marketing is the engine of every business — proud to fuel ABL 2026 from day one.",
    img: "/images/roster/ankit-jani.png",
    company: {
      name: "Jukebox Media",
      category: "Digital Marketing",
      idealConnect: "Businesses Looking to Fix Their Digital Marketing, Businesses Looking to Increase Their Sales",
    },
  },
  {
    name: "Dr. Chahana Shah",
    role: "Founding Partner",
    quote: "A healthy smile builds real confidence — glad to back a league that builds champions.",
    img: "/images/roster/chahana-shah.png",
    company: {
      name: "Chahana Dental Studio",
      category: "Dentist",
      idealConnect: "Families, Corporates, Anyone Looking to Improve Oral Health",
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
  {
    name: "Rushil Pandya",
    role: "Founding Partner",
    quote: "Strength is built one rep at a time — the same discipline that built this league.",
    img: "/images/roster/rushil-pandya.png",
    company: {
      name: "Fitness Hustler",
      category: "Health Coach",
      idealConnect: "Gym Owners, Gujarati Businessmen (25-40 age), Fitness Enthusiasts",
    },
  },
  {
    name: "Ankit Patel",
    role: "Founding Partner",
    quote: "Backing ABL 2026 the same way we back every relationship — with trust and consistency.",
    img: "/images/roster/ankit-patel.png",
    company: {
      name: "Prihaan Spices & Frozen Foods",
      category: "Gifting Sponsor",
    },
  },
  {
    name: "Sujal Soni",
    role: "Founding Partner",
    quote: "Every great journey needs the right partners — honored to be one for ABL 2026.",
    img: "/images/roster/sujal-soni.png",
    company: {
      name: "Destination Anywhere Travel Co.",
      category: "International Tours & Travel",
      idealConnect: "Friends and Family Travelling Abroad, Corporates, Wedding Planners, Honeymooners",
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
