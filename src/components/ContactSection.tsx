import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, Loader2 } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const webhookUrl = "https://n8n-navin-eagle.onrender.com/webhook/get-in-touch";

    try {
      console.log("Sending form data to webhook:", webhookUrl);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "portfolio_contact_form",
          triggered_from: window.location.origin,
        }),
      });

      // Since we're using no-cors, we won't get a proper response status
      // Show success message
      toast({
        title: "Message sent successfully! ✨",
        description: "Thank you for reaching out. I'll get back to you soon!",
        duration: 5000,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error("Error sending message to webhook:", error);
      toast({
        title: "Error sending message",
        description: "There was an issue sending your message. Please try again or contact me directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'navinsingh04523@gmail.com',
      href: 'mailto:navinsingh04523@gmail.com'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'India',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      name: 'GitHub',
      href: 'https://github.com/Navin45',
      color: 'text-foreground hover:text-primary'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/navin23/',
      color: 'text-foreground hover:text-blue-400'
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      name: 'Twitter',
      href: 'https://x.com/Navin_Rajput45',
      color: 'text-foreground hover:text-sky-400'
    }
  ];

  return (
    <section id="contact" className="relative py-32 px-4 bg-background overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 neural-network-bg animate-matrix-grid opacity-30"></div>
      <div className="absolute inset-0 quantum-grid animate-matrix-grid"></div>

      {/* Floating Data Streams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-data-stream"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent animate-data-stream" style={{ animationDelay: "1s" }}></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 animate-parallax-3d">
              Get In <span className="hero-text">Touch</span>
            </h2>
            {/* Quantum Ripple Effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 animate-quantum-ripple"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 animate-quantum-ripple" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on your next project? Let's discuss how we can bring your ideas to life
            with innovative solutions and cutting-edge technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="animate-fade-in-up">
              <div className="relative inline-block mb-6">
                <h3 className="text-3xl font-bold hero-text">Let's Connect</h3>
                <div className="absolute -bottom-2 left-0 w-20 h-1 holographic-gradient animate-holographic"></div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in new opportunities and exciting projects.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={info.title} className="group relative">
                  {/* Holographic glow */}
                  <div className="absolute -inset-1 holographic-gradient animate-holographic rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

                  <a
                    href={info.href}
                    className="relative flex items-center space-x-4 p-5 glass-card rounded-xl hover:scale-105 transition-all duration-500 animate-scale-in hover:shadow-[0_0_30px_hsl(160_84%_60%_/_0.3)]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{info.title}</p>
                      <p className="text-muted-foreground text-sm">{info.value}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-primary"></div>
                Follow Me
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Navin45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/navin23/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-blue-500/30 hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://x.com/Navin_Rajput45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-sky-500/30 hover:scale-110 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="group relative">
              {/* Holographic frame */}
              <div className="absolute -inset-2 holographic-gradient animate-holographic rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>

              <Card className="relative glass-card border-border animate-scale-in hover:shadow-[0_0_60px_hsl(160_84%_60%_/_0.3)] transition-all duration-700">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold">
                    <span className="hero-text">Send Me a Message</span>
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">Fill out the form below and I'll get back to you soon</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2 group/input">
                        <label htmlFor="firstName" className="text-sm font-medium text-foreground flex items-center gap-2">
                          <div className="w-1 h-4 bg-primary/50 group-focus-within/input:bg-primary transition-colors"></div>
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="glass-card border-border focus:border-primary focus:shadow-[0_0_20px_hsl(160_84%_60%_/_0.2)] transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2 group/input">
                        <label htmlFor="lastName" className="text-sm font-medium text-foreground flex items-center gap-2">
                          <div className="w-1 h-4 bg-primary/50 group-focus-within/input:bg-primary transition-colors"></div>
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="glass-card border-border focus:border-primary focus:shadow-[0_0_20px_hsl(160_84%_60%_/_0.2)] transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group/input">
                      <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary/50 group-focus-within/input:bg-primary transition-colors"></div>
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className="glass-card border-border focus:border-primary focus:shadow-[0_0_20px_hsl(160_84%_60%_/_0.2)] transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2 group/input">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary/50 group-focus-within/input:bg-primary transition-colors"></div>
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Project Collaboration"
                        className="glass-card border-border focus:border-primary focus:shadow-[0_0_20px_hsl(160_84%_60%_/_0.2)] transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2 group/input">
                      <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary/50 group-focus-within/input:bg-primary transition-colors"></div>
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project..."
                        rows={6}
                        className="glass-card border-border focus:border-primary focus:shadow-[0_0_20px_hsl(160_84%_60%_/_0.2)] resize-none transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative group/button">
                      {/* Button glow effect */}
                      <div className="absolute -inset-1 holographic-gradient animate-holographic rounded-2xl blur-lg opacity-0 group-hover/button:opacity-60 transition-opacity duration-700"></div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="relative w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_hsl(160_84%_60%_/_0.4)] disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        {/* Button content */}
                        <div className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                              Send Message
                            </>
                          )}
                        </div>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default ContactSection;