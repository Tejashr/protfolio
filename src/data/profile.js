/**
 * Everything about Tejas that appears on the site. Sourced from the original
 * repository (data.json, nav.js, timeline.js, the certificate images) and from
 * Tejas's public GitHub profile. Nothing here is invented.
 */
export const profile = {
  name: 'Tejas HR',
  firstName: 'Tejas',
  title: 'Full-Stack Developer',
  location: 'Bengaluru, India',
  email: 'tejasteju11@gmail.com',
  careerStart: { year: 2021, month: 7 },
  currentCompany: 'Eli Lilly and Company',
  tagline: 'Dream without fear.',
  siteUrl: 'https://tejashr.github.io/protfolio/',
  links: {
    linkedin: 'https://www.linkedin.com/in/tejas-hr-700743128/',
    github: 'https://github.com/Tejashr',
  },
};

export const socialLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, display: profile.email, external: false },
  { label: 'LinkedIn', href: profile.links.linkedin, display: 'linkedin.com/in/tejas-hr-700743128', external: true },
  { label: 'GitHub', href: profile.links.github, display: 'github.com/Tejashr', external: true },
];
