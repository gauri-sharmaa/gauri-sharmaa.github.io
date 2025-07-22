import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, MapPin, Send, Github, Linkedin, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Get in touch for research collaborations, project opportunities, or just to say hello!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Other Ways to Connect</h2>
            
            <div className="space-y-8">
              <ContactItem 
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                content={<a href="mailto:gaurisharma80@gatech.edu" className="text-primary hover:underline">gaurisharma80 [at] gatech [dot] edu</a>}
              />

            <ContactItem 
                icon={<Calendar className="h-5 w-5" />} 
                title="Calendly"
                content={
                  <span>
                    <Button asChild size="sm" className="mb-2">
                      <a href="https://calendly.com/gsharma-fusen/30min" target="_blank" rel="noopener noreferrer">
                        Click here to book a meeting!
                      </a>
                    </Button>
                    <span className="block mt-1">If you book a meeting please also send a message on the contact form! Thank you!</span>
                  </span>
                }
              />
              
              
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="https://github.com/gauri-sharmaa" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={32} />
              </a>
              <a href="https://www.linkedin.com/in/gs-softwaredev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={32} />
              </a>
              <a href="https://medium.com/@gaurisharma1686" target="_blank" rel="noopener noreferrer" aria-label="Medium" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='32' height='32' fill='currentColor'><path d='M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6 .6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z'/></svg>
              </a>
              <a href="/src/assets/gauri_resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume" className="text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen size={32} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ 
  icon, 
  title, 
  content 
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: React.ReactNode; 
}) => {
  return (
    <div className="flex">
      <div className="mr-4 mt-1 bg-secondary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <div className="text-muted-foreground">{content}</div>
      </div>
    </div>
  );
};

export default ContactPage;