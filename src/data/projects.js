/**
 * Selected work. Every project here exists in Tejas's GitHub account and was
 * listed in the original portfolio. Live links were checked when this site was
 * built; where a demo has been taken offline it is marked instead of linked.
 *
 * Visuals: screenshots of the live applications captured for this site, or
 * the project image that shipped with the original portfolio.
 */
import bmsDesktop from '../assets/images/project-bookmyshow-desktop.png?w=640;960;1440;1920&format=avif;webp;jpg&as=picture';
import bmsMobile from '../assets/images/project-bookmyshow-mobile.png?w=240;360;540&format=avif;webp;jpg&as=picture';
import swipeImage from '../assets/images/project-swiping-cards.png?w=480;750&format=avif;webp;png&as=picture';
import hiringImage from '../assets/images/project-hiring.jpg?w=400;540&format=avif;webp;jpg&as=picture';

export const projects = [
  {
    slug: 'bookmyshow',
    number: '01',
    name: 'BookMyShow Clone',
    category: 'Full-stack · Ticket booking',
    year: '2021',
    layout: 'full',
    description:
      'A movie ticket-booking application modelled on BookMyShow. Users register and sign in, browse what is showing, book tickets and review their bookings from their account, while an admin role manages the listings behind it.',
    role: 'Solo: design, front end, API, database, deployment',
    tech: ['React', 'React Router', 'Axios', 'Bootstrap', 'Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt'],
    live: 'https://bookmyshowtejas.netlify.app/',
    repos: [
      { label: 'Front end', href: 'https://github.com/Tejashr/bookmyshowreact' },
      { label: 'API', href: 'https://github.com/Tejashr/bookmyshownode' },
    ],
    image: bmsDesktop,
    imageAlt: 'Home screen of the BookMyShow clone showing the app navigation and hero banner',
    secondaryImage: bmsMobile,
    secondaryImageAlt: 'The BookMyShow clone on a phone-sized screen',
  },
  {
    slug: 'swiping-cards',
    number: '02',
    name: 'Swiping Cards',
    category: 'Full-stack · Interaction',
    year: '2021',
    layout: 'split-right',
    description:
      'A swipe-driven image review app. Signed-in users swipe right to express interest, left to reject and up to skip; every decision is stored, so the accepted and rejected history stays visible to the user.',
    role: 'Solo: design, front end, API, database, deployment',
    tech: ['React', 'react-tinder-card', 'Bootstrap', 'Node.js', 'Express', 'MongoDB'],
    live: 'https://swiping-cards.netlify.app/',
    repos: [
      { label: 'Front end', href: 'https://github.com/Tejashr/swiping-cards-fe' },
      { label: 'API', href: 'https://github.com/Tejashr/swiping-cards-be' },
    ],
    image: swipeImage,
    imageAlt: 'Illustration of two hands swiping a card on a phone screen',
  },
  {
    slug: 'hiring',
    number: '03',
    name: 'Hiring',
    category: 'Full-stack · Job platform',
    year: '2021',
    layout: 'split-left',
    description:
      'A two-sided job platform. Candidates find openings and apply; recruiters post roles and see the list of candidates who applied to each of their jobs, with authentication on both sides.',
    role: 'Solo: design, front end, API, database',
    tech: ['React', 'Bootstrap', 'Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt'],
    live: null,
    liveNote: 'Live demo retired',
    repos: [
      { label: 'Front end', href: 'https://github.com/Tejashr/Hiring-fe' },
      { label: 'API', href: 'https://github.com/Tejashr/Hiring-be' },
    ],
    image: hiringImage,
    imageAlt: 'A sticky note reading “We’re hiring!” on a blue background',
  },
  {
    slug: 'url-shortener',
    number: '04',
    name: 'URL Shortener',
    category: 'Full-stack · Utility',
    year: '2021',
    layout: 'typographic',
    description:
      'An authenticated URL-shortening service: sign in, paste a long address and get a short one back. The Node.js API handles accounts, transactional email and the redirects.',
    role: 'Solo: design, front end, API, database',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Nodemailer'],
    live: null,
    liveNote: 'Live demo retired',
    repos: [
      { label: 'Front end', href: 'https://github.com/Tejashr/url' },
      { label: 'API', href: 'https://github.com/Tejashr/urlnode' },
    ],
    specimen: {
      before: 'https://example.com/very/long/path?with=many&query=parameters',
      after: 'short.ly/7Kq2x',
    },
  },
];

/** A newer, code-only piece of work from Tejas's GitHub, shown as a footnote to the selected work. */
export const experiment = {
  label: 'Recent, code only',
  name: 'socialMediaBackend',
  year: '2024',
  description:
    'A TypeScript back end for a social application: Express and Mongoose with JWT authentication, Socket.IO for real-time updates, Cloudinary media uploads, transactional email and a Jest test setup.',
  tech: ['TypeScript', 'Express', 'Mongoose', 'Socket.IO', 'Cloudinary', 'Jest'],
  href: 'https://github.com/Tejashr/socialMediaBackend',
};
