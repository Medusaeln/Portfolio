import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  vimeoId: string;
}

interface Category {
  id: string;
  title: string;
  projects: Project[];
}

// Mock Data
const PORTFOLIO_DATA: Category[] = [
  {
    id: "virtual-experience",
    title: "Virtual Experience",
    projects: [
      {
        id: "ve-1",
        title: "Alice's Room",
        description: "VRChat Pool Room built with Unity.\nhttps://vrchat.com/home/launch?worldId=wrld_832077e2-a503-47b4-97f1-0d56ed36fb52",
        vimeoId: "1142437813" // Placeholder
      },
      {
        id: "ve-2",
        title: "Joan Miró‘s Room",
        description: "This VR demo is based on a painting by Juan Miró, with 60% of the objects created using an AI-assisted workflow. Meshes and materials have been optimized for the VR environment.",
        vimeoId: "1142417447" // Placeholder
      },
      {
        id: "ve-3",
        title: "The Meditation Quarry",
        description: "This virtual space was built with Unity to suit Monaverse - a 3D world-building platform and web3 social network for the metaverse.",
        vimeoId: "918443155" // Placeholder
      }
    ]
  },
  {
    id: "vfx-3d-animation",
    title: "VFX&3D Animation",
    projects: [
      {
        id: "anim-1",
        title: "The Blue Butterfly",
        description: "Dream core style real-scene compositing, made with Blender.",
        vimeoId: "1142224961" // Placeholder
      },
      {
        id: "anim-2",
        title: "The Red Envelope",
        description: "Real-scene compositing for Chinese new year, made with Blender.",
        vimeoId: "1142224752" // Placeholder
      },
      {
        id: "anim-3",
        title: "The Astonaut",
        description: "Animation made with Unity.",
        vimeoId: "926907593" // Placeholder
      },
      {
        id: "anim-4",
        title: "Merry Christmas",
        description: "Motion poster made with Blender.",
        vimeoId: "1142223533" // Placeholder
      },
      {
        id: "anim-5",
        title: "New Year 2025",
        description: "Motion poster made with Blender.",
        vimeoId: "1142222004" // Placeholder
      }
    ]
  },
  {
    id: "creative-coding",
    title: "Creative Coding",
    projects: [
      {
        id: "cc-1",
        title: "A Cube's Journey",
        description: "Audio Visualization built with processing.",
        vimeoId: "910041482" // Placeholder
      },
      {
        id: "cc-2",
        title: "Setting Off The Fireworks V1",
        description: "Audio-Visual interaction built with p5.js and Teachable Machine.",
        vimeoId: "917655403" // Placeholder
      },
      {
        id: "cc-3",
        title: "Setting Off The Fireworks V2",
        description: "2 years after V1 released, I remade this V2 with Gemini3, AI can easily realize the same effect in just a few minutes.",
        vimeoId: "1142225571" // Placeholder
      },
      {
        id: "cc-4",
        title: "The Magic Hand",
        description: "Movement Experiments: built with PoseNet and p5.js.",
        vimeoId: "928058602" // Placeholder
      },
      {
        id: "cc-5",
        title: "The Wind Letter",
        description: "Particle letters built with p5.js.",
        vimeoId: "924787623" // Placeholder
      }
    ]
  },
  {
    id: "3d-printing",
    title: "3D Printing",
    projects: [
      {
        id: "3dp-1",
        title: "Make Something Tangible",
        description: "3D printing is both a medium for expressing my ideas and a playground for practicing procedural and parametric modeling.",
        vimeoId: "1142448216" // Placeholder
      },
    ]
  }
];

// Components
const VimeoEmbed = ({ id, title, isBackground = false }: { id: string, title?: string, isBackground?: boolean }) => {
  const src = `https://player.vimeo.com/video/${id}?${isBackground ? 'background=1&autoplay=1&loop=1&byline=0&title=0' : 'title=0&byline=0&portrait=0'}`;
  
  return (
    <div className={`relative w-full overflow-hidden ${isBackground ? 'h-full' : 'aspect-video bg-neutral-900'}`}>
      <iframe
        src={src}
        className={`absolute top-0 left-0 w-full h-full ${isBackground ? 'pointer-events-none opacity-50 grayscale' : ''}`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title || "Vimeo Video"}
        data-testid={`video-${id}`}
      ></iframe>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group mb-16 last:mb-0"
      data-testid={`project-card-${project.id}`}
    >
      <div className="border border-neutral-800 bg-black overflow-hidden mb-6 transition-colors duration-300 group-hover:border-neutral-600">
        <VimeoEmbed id={project.vimeoId} title={project.title} />
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <h3 className="text-xl font-medium tracking-tight text-white" data-testid={`project-title-${project.id}`}>
          {project.title}
        </h3>
        <p className="text-neutral-400 font-light max-w-xl text-sm md:text-base leading-relaxed whitespace-pre-line" data-testid={`project-desc-${project.id}`}>
          {project.description.split('http').map((part, i) => {
            if (i === 0) return part;
            const url = `http${part.split(' ')[0]}`;
            const rest = part.substring(url.length - 4); // -4 because we added http
            return (
              <React.Fragment key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-neutral-300 decoration-neutral-600 underline-offset-4">
                  {url}
                </a>
                {rest}
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category }: { category: Category }) => {
  return (
    <section id={category.id} className="py-24 md:py-32 border-t border-neutral-900" data-testid={`category-${category.id}`}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-2 text-neutral-200">
                {category.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h2>
              <div className="h-1 w-12 bg-white mt-6 mb-6"></div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                Selected Works
              </div>
            </div>
          </div>
          <div className="lg:w-3/4">
            {category.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 mix-blend-difference text-white pointer-events-none">
      <div className="font-bold tracking-tighter text-xl pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        PORTFOLIO
      </div>
      <div className="hidden md:flex gap-6 pointer-events-auto">
        {PORTFOLIO_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToSection(cat.id)}
            className="text-sm font-medium hover:text-neutral-300 transition-colors uppercase tracking-wider"
            data-testid={`nav-${cat.id}`}
          >
            {cat.title}
          </button>
        ))}
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-none border-white text-white hover:bg-white hover:text-black transition-colors ml-4"
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </Button>
      </div>
    </nav>
  );
};

export default function Portfolio() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navigation />
      
      {/* Hero Section */}
      <header ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
           {/* Background Video - Muted, Autoplay, Loop */}
           {/* Using a darker overlay to ensure text readability */}
           <div className="absolute inset-0 bg-black/60 z-10"></div>
           <VimeoEmbed id="1142554538" isBackground={true} />
        </motion.div>

        <div className="relative z-20 container mx-auto px-6 md:px-12 max-w-5xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8"
          >
            YILIN'S PLAYGROUND
            <br />
            
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Designing immersive experiences at the intersection of art, code, space, and AI.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <ArrowDown className="w-6 h-6 animate-bounce text-neutral-400" />
        </motion.div>
      </header>

      {/* About Section */}
      <section className="py-32 md:py-48 bg-black relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-8">About Me</h2>
            <p className="text-xl md:text-xl font-light leading-tight text-neutral-100">
              I was once a landscape architect who "painted" on the land, with 12 years of design experience, creating dialogues between people and their environment through physical spaces. Now, I bring my keen sense of scenario storytelling, spatial composition, and environmental atmosphere to the digital realm. 
            </p>
            <br />
            <p className="text-xl md:text-xl font-light leading-tight text-neutral-100">
              For the past two years, I've dedicated myself to exploring virtual environments, real-time interaction, procedural modeling, 3D animation, creative coding, and AI workflows. I'm no longer content with merely envisioning dreams; I'm committed to bringing them to life through technology.   
            </p>
            <br />
            <p className="text-xl md:text-xl font-light leading-tight text-neutral-100">
              Whether it's creating immersive experiences for brands, generating real-time digital performances for artists, or exploring the boundless possibilities of generative AI, I look forward to collaborating with you. Let's work together to continuously push the boundaries of imagination—from dreamers to dream achievers.        
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Categories */}
      <main className="relative z-10 bg-black pb-32">
        {PORTFOLIO_DATA.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </main>

      {/* Footer */}
      <footer id="contact" className="py-24 border-t border-neutral-900 bg-black relative z-10">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">Let's work together.</h2>
          
          <div className="flex flex-col items-center gap-12 mb-12">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-neutral-600 uppercase">Location</span>
                <span className="text-sm">Breda, NL</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-neutral-600 uppercase">Email</span>
                <a href="mailto:medusaeln@gmail.com" className="text-sm hover:text-neutral-300 transition-colors">medusaeln@gmail.com</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-neutral-600 uppercase">Social</span>
                <div className="flex gap-4 justify-center">
                    <a href="#" className="text-sm hover:text-neutral-400 transition-colors">Instagram: yilinn0708</a>
                   
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-xs font-mono text-neutral-600 uppercase">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
