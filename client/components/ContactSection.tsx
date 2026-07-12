import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  Text3D,
  Center,
  OrbitControls,
  Stars,
  Sphere,
  MeshDistortMaterial,
  Box,
  Torus,
} from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Loader2,
  CheckCircle,
  Link as LinkIcon,
} from "lucide-react";
import { useContent } from "@/hooks/useContent";

// Enhanced animated background sphere
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 100, 200]}
      scale={2.5}
      position={[4, 0, -5]}
    >
      <MeshDistortMaterial
        color="#8B5CF6"
        emissive="#8B5CF6"
        emissiveIntensity={0.5}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.9}
      />
    </Sphere>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 1;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      torusRef.current.position.y =
        Math.cos(state.clock.elapsedTime * 0.6) * 0.8;
    }
  });

  return (
    <>
      <Box ref={boxRef} args={[0.5, 0.5, 0.5]} position={[2, 2, -3]}>
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.3}
        />
      </Box>
      <Torus ref={torusRef} args={[0.3, 0.1, 16, 100]} position={[-2, -1, -2]}>
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </Torus>
    </>
  );
}

// Enhanced floating contact text (simplified without Text3D)
function FloatingText() {
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={0.7}>
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Enhanced particle system with waves
function EnhancedParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] +=
          Math.sin(state.clock.elapsedTime + positions[i3]) * 0.001;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  const particlesPosition = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 25;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 25;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 25;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8B5CF6"
        size={0.03}
        sizeAttenuation={true}
        transparent
        opacity={1}
      />
    </points>
  );
}

// Enhanced 3D Scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight
        position={[15, 15, 15]}
        angle={0.2}
        penumbra={1}
        intensity={1}
      />
      <pointLight position={[-15, -15, -15]} intensity={0.5} />

      <EnhancedParticles />
      <Stars radius={400} depth={80} count={1500} factor={8} />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        enablePan={false}
      />
    </>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const formVariants = {
  hidden: { x: -100, opacity: 0, scale: 0.9 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const rightSideVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: "easeOut",
    },
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { data: content, isLoading } = useContent();
  
  if (isLoading || !content) return null;

  const contactData = content?.contact;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "8a723899-6388-4d8d-911c-18baf0e0cf07"); // 👈 GET YOUR KEY FROM https://web3forms.com
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("from_name", "Portfolio Contact Form");
      formDataToSend.append("subject", `New Message from ${formData.name}`);

      // Send to both web3forms and our local API concurrently
      const [web3Response, localResponse] = await Promise.all([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formDataToSend
        }),
        fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }).catch(err => {
          console.error("Failed to save message locally:", err);
          return { ok: true }; // Don't fail the whole submission if local save fails
        })
      ]);

      const data = await web3Response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.error("Form submission failed:", data);
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <motion.div
      id="contact"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16 md:py-24 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0  animate-shimmer"></div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          shadows
          dpr={[1, 2]}
          gl={{
            preserveDrawingBuffer: true,
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              (event) => {
                event.preventDefault();
                console.log("WebGL context lost");
              },
              false,
            );

            gl.domElement.addEventListener(
              "webglcontextrestored",
              () => {
                console.log("WebGL context restored");
              },
              false,
            );
          }}
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900" />
          }
        >
          <Scene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <motion.div variants={formVariants}>
            <Card className="bg-black/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-glow">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        variants={itemVariants}
                        className="text-center mb-8"
                      >
                        <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-brand bg-clip-text text-transparent">
                          Send a Message
                        </h2>
                        <p className="text-slate-300">
                          I'd love to hear from you
                        </p>
                      </motion.div>

                      <div className="space-y-4">
                        <motion.div variants={itemVariants}>
                          <label
                            htmlFor="name"
                            className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                              focusedField === "name"
                                ? "text-cyan-400"
                                : "text-slate-200"
                            }`}
                          >
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("name")}
                            onBlur={handleBlur}
                            className="bg-black/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-cyan-400/25"
                            placeholder="Enter your name"
                            required
                          />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <label
                            htmlFor="email"
                            className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                              focusedField === "email"
                                ? "text-cyan-400"
                                : "text-slate-200"
                            }`}
                          >
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={handleBlur}
                            className="bg-black/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-cyan-400/25"
                            placeholder="your@email.com"
                            required
                          />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <label
                            htmlFor="message"
                            className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                              focusedField === "message"
                                ? "text-cyan-400"
                                : "text-slate-200"
                            }`}
                          >
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("message")}
                            onBlur={handleBlur}
                            rows={4}
                            className="bg-black/10 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 backdrop-blur-sm resize-none transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-cyan-400/25"
                            placeholder="Tell me about your project..."
                            required
                          />
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-white hover:bg-slate-200 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Sending...
                              </motion.div>
                            ) : (
                              <motion.div
                                key="send"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                                Send Message
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-slate-300">
                        Thanks for reaching out. I'll get back to you soon!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Contact Info & 3D Focus */}
          <motion.div variants={rightSideVariants} className="space-y-8">
            <motion.div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Get In
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-transparent bg-clip-text bg-gradient-brand animate-shimmer"
                >
                  {" "}
                  Touch
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-xl text-slate-300 max-w-md"
              >
                {contactData?.description || "Ready to bring your ideas to life? Let's collaborate and create something amazing together."}
              </motion.p>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: contactData?.email || "gayatrisain2003@gmail.com",
                },
                { icon: Phone, label: "Phone", value: contactData?.phone || "9289432640" },
                { icon: MapPin, label: "Location", value: contactData?.location || "New Delhi, India" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center space-x-4 text-slate-300 group hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-black/10 rounded-lg backdrop-blur-sm group-hover:bg-cyan-400/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-400/25"
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={containerVariants} className="flex space-x-4">
              {(contactData?.socialLinks || [
                { platform: "GitHub", url: "#", iconUrl: "" },
                { platform: "LinkedIn", url: "#", iconUrl: "" },
                { platform: "Twitter", url: "#", iconUrl: "" },
              ]).map((link, index) => {
                let Icon: any = LinkIcon;
                const platformLower = link.platform.toLowerCase();
                if (platformLower.includes("github")) Icon = Github;
                else if (platformLower.includes("linkedin")) Icon = Linkedin;
                else if (platformLower.includes("twitter") || platformLower === "x") Icon = Twitter;

                return (
                <motion.a
                  key={index}
                  href={link.url}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    backgroundColor: "rgba(251, 113, 133, 0.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-black/10 rounded-lg backdrop-blur-sm hover:bg-gradient-to-r hover:from-rose-400/20 hover:to-pink-400/20 transition-all duration-300 text-slate-300 hover:text-white group hover:shadow-lg hover:shadow-rose-400/25 flex items-center justify-center w-12 h-12"
                  aria-label={link.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.iconUrl ? (
                    <img src={link.iconUrl} alt={link.platform} className="w-6 h-6 object-contain filter invert opacity-80 group-hover:opacity-100" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </motion.a>
              )})}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-5"></div>
    </motion.div>
  );
}
