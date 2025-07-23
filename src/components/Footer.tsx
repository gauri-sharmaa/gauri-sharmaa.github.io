
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, BookOpen } from "lucide-react";
import resumePdf from '../assets/gauri_resume.pdf';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Gauri Sharma. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <SocialLink href="https://github.com/gauri-sharmaa" icon={<Github size={24} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/gs-softwaredev/" icon={<Linkedin size={24} />} label="LinkedIn" />
            <SocialLink href="https://medium.com/@gaurisharma1686" icon={<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='24' height='24' fill='currentColor'><path d='M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6 .6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z'/></svg>} label="Medium" />
            <SocialLink href={resumePdf} icon={<BookOpen size={24} />} label="Resume" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string 
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default Footer;