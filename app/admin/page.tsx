"use client";

import { useState, useEffect } from "react";
import { useContent, useUpdateContent, PortfolioContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Save, LogOut, LayoutDashboard, User, Code, Briefcase, Sparkles, Mail, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: content, isLoading } = useContent();
  const updateMutation = useUpdateContent();
  const [localContent, setLocalContent] = useState<PortfolioContent | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (content) {
      setLocalContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  // Sync with local storage for session persistence
  useEffect(() => {
    const saved = localStorage.getItem("admin_session");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_session", "true");
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_session");
  };

  const handleSave = async () => {
    if (!localContent) return;
    try {
      await updateMutation.mutateAsync({ password: "admin123", content: localContent });
      toast.success("Content updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Uploading file...");
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");
      
      const data = await response.json();
      callback(data.url);
      toast.success("File uploaded successfully", { id: toastId });
    } catch (error) {
      toast.error("Error uploading file", { id: toastId });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <Card className="max-w-md w-full bg-surface/50 border-border/20 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-black/20"
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/">Back to Site</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !localContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-foreground pb-20">
      <nav className="border-b border-border/20 bg-surface/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">Admin CMS</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-2xl mx-auto px-6 mt-10">
        <Tabs defaultValue="hero" className="space-y-8">
          <TabsList className="bg-surface/50 border border-white/5 p-1 flex flex-wrap h-auto gap-2">
            <TabsTrigger value="hero" className="flex gap-2"><LayoutDashboard size={16} /> Home</TabsTrigger>
            <TabsTrigger value="about" className="flex gap-2"><User size={16} /> About</TabsTrigger>
            <TabsTrigger value="skills" className="flex gap-2"><Code size={16} /> Skills</TabsTrigger>
            <TabsTrigger value="experience" className="flex gap-2"><Briefcase size={16} /> Experience</TabsTrigger>
            <TabsTrigger value="collaborations" className="flex gap-2"><Sparkles size={16} /> Collaborations</TabsTrigger>
            <TabsTrigger value="projects" className="flex gap-2"><Briefcase size={16} /> Projects</TabsTrigger>
            <TabsTrigger value="contact" className="flex gap-2"><User size={16} /> Contact</TabsTrigger>
            <TabsTrigger value="headerfooter" className="flex gap-2"><LayoutDashboard size={16} /> Header/Footer</TabsTrigger>
            <TabsTrigger value="popup" className="flex gap-2"><LayoutDashboard size={16} /> Popup</TabsTrigger>
            <TabsTrigger value="messages" className="flex gap-2"><Mail size={16} /> Messages</TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="bg-surface/30 border-border/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Contact Form Submissions</CardTitle>
                <Button variant="outline" size="sm" onClick={fetchMessages} disabled={isLoadingMessages}>
                  {isLoadingMessages ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
                  Refresh
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {messages.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">No messages yet.</div>
                ) : (
                  <div className="grid gap-4">
                    {messages.map((msg: any) => (
                      <Card key={msg.id} className="bg-black/20 border-border/10">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-lg">{msg.name}</div>
                              <div className="text-sm text-primary">
                                <a href={`mailto:${msg.email}`}>{msg.email}</a>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(msg.date).toLocaleString()}
                            </div>
                          </div>
                          <div className="mt-4 text-muted-foreground whitespace-pre-wrap bg-black/40 p-3 rounded-md border border-white/5">
                            {msg.message}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Content */}
          <TabsContent value="hero">
            <Card className="bg-surface/30 border-border/20">
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-b border-white/10 pb-6 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-primary">SEO Metadata</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input 
                        value={localContent.seo?.title || ''} 
                        onChange={(e) => setLocalContent({...localContent, seo: {...(localContent.seo || {title: '', description: ''}), title: e.target.value}} as any)}
                        className="bg-black/20"
                        placeholder="e.g. My Portfolio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Input 
                        value={localContent.seo?.description || ''} 
                        onChange={(e) => setLocalContent({...localContent, seo: {...(localContent.seo || {title: '', description: ''}), description: e.target.value}} as any)}
                        className="bg-black/20"
                        placeholder="e.g. A showcase of my work"
                      />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-primary">Hero Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      value={localContent.hero.name} 
                      onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, name: e.target.value}})}
                      className="bg-black/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Background Image URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={localContent.hero.backgroundImage} 
                        onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, backgroundImage: e.target.value}})}
                        className="bg-black/20"
                        placeholder="Paste URL or upload file ->"
                      />
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, (url) => setLocalContent({...localContent, hero: {...localContent.hero, backgroundImage: url}}))}
                        className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Roles (comma separated)</Label>
                  <Input 
                    value={localContent.hero.roles?.join(', ') || ''} 
                    onChange={(e) => {
                      const rolesArray = e.target.value.split(',');
                      setLocalContent({...localContent, hero: {...localContent.hero, roles: rolesArray.map(r => r.trim()).filter(Boolean)}});
                    }}
                    className="bg-black/20"
                    placeholder="e.g. Full Stack Developer, UI/UX Designer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={localContent.hero.description} 
                    onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, description: e.target.value}})}
                    rows={4}
                    className="bg-black/20"
                  />
                </div>
                
                <div className="border-t border-border/20 pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">Buttons & Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label>Primary Button Text</Label>
                      <Input 
                        value={localContent.hero.primaryButtonText || ''} 
                        onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, primaryButtonText: e.target.value}})}
                        className="bg-black/20"
                        placeholder="e.g. View Projects"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Button Link</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={localContent.hero.primaryButtonLink || ''} 
                          onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, primaryButtonLink: e.target.value}})}
                          className="bg-black/20"
                          placeholder="e.g. #projects"
                        />
                        <Input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, (url) => setLocalContent({...localContent, hero: {...localContent.hero, primaryButtonLink: url}}))}
                          className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                          title="Upload a file instead of a link"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Text</Label>
                      <Input 
                        value={localContent.hero.secondaryButtonText || ''} 
                        onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, secondaryButtonText: e.target.value}})}
                        className="bg-black/20"
                        placeholder="e.g. Contact"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Link (e.g. Resume)</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={localContent.hero.secondaryButtonLink || ''} 
                          onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, secondaryButtonLink: e.target.value}})}
                          className="bg-black/20"
                          placeholder="e.g. #contact"
                        />
                        <Input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, (url) => setLocalContent({...localContent, hero: {...localContent.hero, secondaryButtonLink: url}}))}
                          className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                          title="Upload a file instead of a link"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/20 pt-6">
                  <h3 className="text-lg font-medium mb-4">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input 
                        value={localContent.hero.social?.github || ''} 
                        onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, social: {...localContent.hero.social, github: e.target.value}}})}
                        className="bg-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn URL</Label>
                      <Input 
                        value={localContent.hero.social?.linkedin || ''} 
                        onChange={(e) => setLocalContent({...localContent, hero: {...localContent.hero, social: {...localContent.hero.social, linkedin: e.target.value}}})}
                        className="bg-black/20"
                      />
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about">
            <Card className="bg-surface/30 border-border/20">
              <CardHeader>
                <CardTitle>About Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input 
                      value={localContent.about.role} 
                      onChange={(e) => setLocalContent({...localContent, about: {...localContent.about, role: e.target.value}})}
                      className="bg-black/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile Image URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={localContent.about.image} 
                        onChange={(e) => setLocalContent({...localContent, about: {...localContent.about, image: e.target.value}})}
                        className="bg-black/20"
                        placeholder="Paste URL or upload file ->"
                      />
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, (url) => setLocalContent({...localContent, about: {...localContent.about, image: url}}))}
                        className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea 
                    value={localContent.about.bio} 
                    onChange={(e) => setLocalContent({...localContent, about: {...localContent.about, bio: e.target.value}})}
                    rows={4}
                    className="bg-black/20"
                  />
                </div>
                
                <div className="border-t border-border/20 pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">Buttons & Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Primary Button Text</Label>
                      <Input 
                        value={localContent.about.primaryButtonText || ''} 
                        onChange={(e) => setLocalContent({...localContent, about: {...localContent.about, primaryButtonText: e.target.value}})}
                        className="bg-black/20"
                        placeholder="e.g. Let's Connect"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Button Link</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={localContent.about.primaryButtonLink || ''} 
                          onChange={(e) => setLocalContent({...localContent, about: {...localContent.about, primaryButtonLink: e.target.value}})}
                          className="bg-black/20"
                          placeholder="e.g. mailto:example@example.com"
                        />
                        <Input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, (url) => setLocalContent({...localContent, about: {...localContent.about, primaryButtonLink: url}}))}
                          className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                          title="Upload a file instead of a link"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Text</Label>
                      <Input 
                        value={localContent.about.secondaryButtonText || ''} 
                        onChange={(e) => setLocalContent({...localContent, about: {...localContent.about, secondaryButtonText: e.target.value}})}
                        className="bg-black/20"
                        placeholder="e.g. Download Resume"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Link (e.g. Resume)</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={localContent.about.secondaryButtonLink || ''} 
                          onChange={(e) => setLocalContent({...localContent, about: {...localContent.about, secondaryButtonLink: e.target.value}})}
                          className="bg-black/20"
                          placeholder="e.g. #resume"
                        />
                        <Input 
                          type="file" 
                          onChange={(e) => handleFileUpload(e, (url) => setLocalContent({...localContent, about: {...localContent.about, secondaryButtonLink: url}}))}
                          className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                          title="Upload a file instead of a link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Highlights Section */}
            <div className="mt-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">About Highlights / Stats</h3>
                <Button onClick={() => {
                  const newHighlights = [...(localContent.about.highlights || [])];
                  newHighlights.push({ value: "10+", label: "New Stat", icon: "Star", accent: "blue" });
                  setLocalContent({...localContent, about: {...localContent.about, highlights: newHighlights}});
                }}>
                  <Plus size={16} className="mr-2" /> Add Stat
                </Button>
              </div>

              {(localContent.about.highlights || []).map((highlight, index) => (
                <Card key={index} className="bg-surface/30 border-border/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Stat: {highlight.label}</CardTitle>
                    <Button variant="ghost" size="icon" className="text-rose-500" onClick={() => {
                      const newHighlights = [...localContent.about.highlights];
                      newHighlights.splice(index, 1);
                      setLocalContent({...localContent, about: {...localContent.about, highlights: newHighlights}});
                    }}>
                      <Trash2 size={16} />
                    </Button>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Value (e.g. 2+)</Label>
                      <Input 
                        value={highlight.value} 
                        onChange={(e) => {
                          const newHighlights = [...localContent.about.highlights];
                          newHighlights[index].value = e.target.value;
                          setLocalContent({...localContent, about: {...localContent.about, highlights: newHighlights}});
                        }}
                        className="bg-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Label (e.g. Years Experience)</Label>
                      <Input 
                        value={highlight.label} 
                        onChange={(e) => {
                          const newHighlights = [...localContent.about.highlights];
                          newHighlights[index].label = e.target.value;
                          setLocalContent({...localContent, about: {...localContent.about, highlights: newHighlights}});
                        }}
                        className="bg-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon (Lucide React icon name)</Label>
                      <Input 
                        value={highlight.icon} 
                        onChange={(e) => {
                          const newHighlights = [...localContent.about.highlights];
                          newHighlights[index].icon = e.target.value;
                          setLocalContent({...localContent, about: {...localContent.about, highlights: newHighlights}});
                        }}
                        className="bg-black/20"
                        placeholder="e.g. Briefcase, Code, Award"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Accent Color (Tailwind name)</Label>
                      <Input 
                        value={highlight.accent} 
                        onChange={(e) => {
                          const newHighlights = [...localContent.about.highlights];
                          newHighlights[index].accent = e.target.value;
                          setLocalContent({...localContent, about: {...localContent.about, highlights: newHighlights}});
                        }}
                        className="bg-black/20"
                        placeholder="e.g. blue, emerald, purple"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Section */}
          <TabsContent value="skills">
            <div className="space-y-6">
              <Card className="bg-surface/30 border-border/20 mb-6">
                <CardHeader><CardTitle>Skills Section Header</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Badge Text</Label>
                    <Input value={localContent.skillsHeader?.badgeText || ''} onChange={(e) => setLocalContent({...localContent, skillsHeader: {...localContent.skillsHeader, badgeText: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. 🎯 What I Bring to the Table" />
                  </div>
                  <div className="space-y-2">
                    <Label>Main Title</Label>
                    <Input value={localContent.skillsHeader?.titleMain || ''} onChange={(e) => setLocalContent({...localContent, skillsHeader: {...localContent.skillsHeader, titleMain: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. How I Can Contribute &" />
                  </div>
                  <div className="space-y-2">
                    <Label>Highlighted Title</Label>
                    <Input value={localContent.skillsHeader?.titleHighlight || ''} onChange={(e) => setLocalContent({...localContent, skillsHeader: {...localContent.skillsHeader, titleHighlight: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. My Key Skills" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={localContent.skillsHeader?.description || ''} onChange={(e) => setLocalContent({...localContent, skillsHeader: {...localContent.skillsHeader, description: e.target.value}} as any)} className="bg-black/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/30 border-border/20 mb-6">
                <CardHeader><CardTitle>Skills Footer Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Footer Description</Label>
                    <Textarea value={localContent.skillsFooter?.description || ''} onChange={(e) => setLocalContent({...localContent, skillsFooter: {...localContent.skillsFooter, description: e.target.value}} as any)} className="bg-black/20" />
                  </div>
                  <div className="space-y-2">
                    <Label>Footer Points (One per line)</Label>
                    <Textarea 
                      value={(localContent.skillsFooter?.points || []).join('\n')} 
                      onChange={(e) => {
                        const newPoints = e.target.value.split('\n').filter(p => p.trim() !== '');
                        setLocalContent({...localContent, skillsFooter: {...localContent.skillsFooter, points: newPoints, description: localContent.skillsFooter?.description || ''}} as any);
                      }} 
                      className="bg-black/20" 
                      rows={5}
                      placeholder="Performance & Optimization&#10;Responsive & Adaptive Design&#10;UI/UX Implementation"
                    />
                  </div>
                </CardContent>
              </Card>

              {(localContent.skillCategories || []).map((category, catIndex) => (
                <Card key={catIndex} className="bg-surface/30 border-border/20 relative group">
                  <CardContent className="p-4 space-y-6">
                    <div className="flex justify-between items-start">
                      <Label className="text-sm font-bold text-primary">Category #{catIndex + 1}</Label>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500" onClick={() => {
                        const newCats = [...(localContent.skillCategories || [])];
                        newCats.splice(catIndex, 1);
                        setLocalContent({...localContent, skillCategories: newCats});
                      }}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category Title</Label>
                        <Input 
                          placeholder="e.g. Frontend"
                          value={category.title} 
                          onChange={(e) => {
                            const newCats = [...(localContent.skillCategories || [])];
                            newCats[catIndex].title = e.target.value;
                            setLocalContent({...localContent, skillCategories: newCats});
                          }}
                          className="bg-black/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Input 
                          placeholder="e.g. Libraries & frameworks"
                          value={category.subtitle} 
                          onChange={(e) => {
                            const newCats = [...(localContent.skillCategories || [])];
                            newCats[catIndex].subtitle = e.target.value;
                            setLocalContent({...localContent, skillCategories: newCats});
                          }}
                          className="bg-black/20"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Category Icon Name (Lucide React)</Label>
                        <Input 
                          placeholder="e.g. Layout, Code2, Server, Database, Wrench"
                          value={category.icon} 
                          onChange={(e) => {
                            const newCats = [...(localContent.skillCategories || [])];
                            newCats[catIndex].icon = e.target.value;
                            setLocalContent({...localContent, skillCategories: newCats});
                          }}
                          className="bg-black/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border/20">
                      <Label className="text-sm">Skills in this category</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(category.skills || []).map((skill, skillIndex) => (
                          <div key={skillIndex} className="p-3 bg-black/20 rounded-md border border-white/5 space-y-3 relative group/skill">
                            <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-rose-500 opacity-0 group-hover/skill:opacity-100 transition-opacity" onClick={() => {
                              const newCats = [...(localContent.skillCategories || [])];
                              newCats[catIndex].skills.splice(skillIndex, 1);
                              setLocalContent({...localContent, skillCategories: newCats});
                            }}>
                              <Trash2 size={12} />
                            </Button>
                            
                            <div className="space-y-1 pr-6">
                              <Label className="text-xs text-muted-foreground">Name</Label>
                              <Input 
                                placeholder="Skill Name"
                                value={skill.name} 
                                onChange={(e) => {
                                  const newCats = [...(localContent.skillCategories || [])];
                                  newCats[catIndex].skills[skillIndex].name = e.target.value;
                                  setLocalContent({...localContent, skillCategories: newCats});
                                }}
                                className="bg-black/40 h-8 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">Icon Image URL</Label>
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="Icon URL"
                                  value={skill.icon} 
                                  onChange={(e) => {
                                    const newCats = [...(localContent.skillCategories || [])];
                                    newCats[catIndex].skills[skillIndex].icon = e.target.value;
                                    setLocalContent({...localContent, skillCategories: newCats});
                                  }}
                                  className="bg-black/40 h-8 text-sm"
                                />
                                <Input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={(e) => handleFileUpload(e, (url) => {
                                    const newCats = [...(localContent.skillCategories || [])];
                                    newCats[catIndex].skills[skillIndex].icon = url;
                                    setLocalContent({...localContent, skillCategories: newCats});
                                  })}
                                  className="bg-black/40 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer h-8 text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="h-full min-h-[100px] border-dashed text-sm" onClick={() => {
                          const newCats = [...(localContent.skillCategories || [])];
                          if (!newCats[catIndex].skills) newCats[catIndex].skills = [];
                          newCats[catIndex].skills.push({ name: "", icon: "" });
                          setLocalContent({...localContent, skillCategories: newCats});
                        }}>
                          <Plus className="mr-1 h-4 w-4" /> Add Skill
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full h-16 border-dashed" onClick={() => {
                setLocalContent({
                  ...localContent, 
                  skillCategories: [...(localContent.skillCategories || []), { title: "", subtitle: "", icon: "Code2", skills: [] }]
                });
              }}>
                <Plus className="mr-2" /> Add Category
              </Button>
            </div>
          </TabsContent>

          {/* Projects Section */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card className="bg-surface/30 border-border/20 mb-6">
                <CardHeader><CardTitle>Projects Section Header & CTA</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Badge Text</Label>
                    <Input value={localContent.projectsHeader?.badgeText || ''} onChange={(e) => setLocalContent({...localContent, projectsHeader: {...localContent.projectsHeader, badgeText: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. 🚀 My Work" />
                  </div>
                  <div className="space-y-2">
                    <Label>Main Title</Label>
                    <Input value={localContent.projectsHeader?.title || ''} onChange={(e) => setLocalContent({...localContent, projectsHeader: {...localContent.projectsHeader, title: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. Featured Projects" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={localContent.projectsHeader?.description || ''} onChange={(e) => setLocalContent({...localContent, projectsHeader: {...localContent.projectsHeader, description: e.target.value}} as any)} className="bg-black/20" />
                  </div>
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <h4 className="text-sm font-medium text-white/70">Bottom Call-to-Action Button</h4>
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input value={localContent.projectsCta?.buttonText || ''} onChange={(e) => setLocalContent({...localContent, projectsCta: {...localContent.projectsCta, buttonText: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. View All Projects on GitHub" />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link URL</Label>
                      <Input value={localContent.projectsCta?.buttonUrl || ''} onChange={(e) => setLocalContent({...localContent, projectsCta: {...localContent.projectsCta, buttonUrl: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. https://github.com/..." />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {localContent.projects.map((project, index) => (
                <Card key={project.id} className="bg-surface/30 border-border/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Project: {project.title || "New Project"}</CardTitle>
                    <Button variant="ghost" size="icon" className="text-rose-500" onClick={() => {
                      const newProjects = [...localContent.projects];
                      newProjects.splice(index, 1);
                      setLocalContent({...localContent, projects: newProjects});
                    }}>
                      <Trash2 size={16} />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Project Title</Label>
                        <Input 
                          value={project.title} 
                          onChange={(e) => {
                            const newProjects = [...localContent.projects];
                            newProjects[index].title = e.target.value;
                            setLocalContent({...localContent, projects: newProjects});
                          }}
                          className="bg-black/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Thumbnail Image URL</Label>
                        <div className="flex gap-2">
                          <Input 
                            value={project.image} 
                            onChange={(e) => {
                              const newProjects = [...localContent.projects];
                              newProjects[index].image = e.target.value;
                              setLocalContent({...localContent, projects: newProjects});
                            }}
                            className="bg-black/20"
                            placeholder="Paste URL or upload ->"
                          />
                          <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, (url) => {
                              const newProjects = [...localContent.projects];
                              newProjects[index].image = url;
                              setLocalContent({...localContent, projects: newProjects});
                            })}
                            className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Short Description</Label>
                        <Textarea 
                          value={project.description} 
                          onChange={(e) => {
                            const newProjects = [...localContent.projects];
                            newProjects[index].description = e.target.value;
                            setLocalContent({...localContent, projects: newProjects});
                          }}
                          className="bg-black/20"
                        />
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Live URL</Label>
                        <Input 
                          value={project.liveUrl} 
                          onChange={(e) => {
                            const newProjects = [...localContent.projects];
                            newProjects[index].liveUrl = e.target.value;
                            setLocalContent({...localContent, projects: newProjects});
                          }}
                          className="bg-black/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Github URL</Label>
                        <Input 
                          value={project.githubUrl} 
                          onChange={(e) => {
                            const newProjects = [...localContent.projects];
                            newProjects[index].githubUrl = e.target.value;
                            setLocalContent({...localContent, projects: newProjects});
                          }}
                          className="bg-black/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Long Description (for detail page)</Label>
                      <Textarea 
                        value={project.longDescription || ""} 
                        onChange={(e) => {
                          const newProjects = [...localContent.projects];
                          newProjects[index].longDescription = e.target.value;
                          setLocalContent({...localContent, projects: newProjects});
                        }}
                        className="bg-black/20 min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Main Image URL (for detail page header)</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={project.mainimage || ""} 
                          onChange={(e) => {
                            const newProjects = [...localContent.projects];
                            newProjects[index].mainimage = e.target.value;
                            setLocalContent({...localContent, projects: newProjects});
                          }}
                          className="bg-black/20"
                          placeholder="Paste URL or upload ->"
                        />
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(e, (url) => {
                            const newProjects = [...localContent.projects];
                            newProjects[index].mainimage = url;
                            setLocalContent({...localContent, projects: newProjects});
                          })}
                          className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Technologies (Comma separated)</Label>
                      <Input 
                        value={(project.technologies || []).join(", ")} 
                        onChange={(e) => {
                          const newProjects = [...localContent.projects];
                          newProjects[index].technologies = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                          setLocalContent({...localContent, projects: newProjects});
                        }}
                        className="bg-black/20"
                        placeholder="React, Tailwind, Node.js..."
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border/20">
                      <Label>Gallery Images</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {(project.gallery || []).map((imgUrl, imgIdx) => (
                          <div key={imgIdx} className="p-2 border border-white/10 rounded-md bg-black/20 relative group overflow-hidden">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute top-3 right-3 h-7 w-7 text-white bg-red-500/80 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10" 
                              onClick={() => {
                                const newProjects = [...localContent.projects];
                                newProjects[index].gallery.splice(imgIdx, 1);
                                setLocalContent({...localContent, projects: newProjects});
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                            {imgUrl ? (
                              <div className="aspect-video w-full mb-3 bg-black/40 rounded overflow-hidden flex items-center justify-center border border-white/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imgUrl} alt="Gallery item" className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="aspect-video w-full mb-3 bg-black/40 rounded flex items-center justify-center text-xs text-muted-foreground border border-white/5 border-dashed">
                                No Image
                              </div>
                            )}
                            <div className="space-y-2">
                              <Input 
                                value={imgUrl} 
                                onChange={(e) => {
                                  const newProjects = [...localContent.projects];
                                  newProjects[index].gallery[imgIdx] = e.target.value;
                                  setLocalContent({...localContent, projects: newProjects});
                                }}
                                className="h-8 text-xs bg-black/40"
                                placeholder="Image URL"
                              />
                              <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileUpload(e, (url) => {
                                  const newProjects = [...localContent.projects];
                                  newProjects[index].gallery[imgIdx] = url;
                                  setLocalContent({...localContent, projects: newProjects});
                                })}
                                className="bg-black/40 w-full file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md cursor-pointer h-8 text-[10px] pr-0"
                              />
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-md p-4 bg-black/10 hover:bg-black/20 transition-colors min-h-[160px]">
                          <Label className="mb-4 text-sm text-muted-foreground text-center">Add new image</Label>
                          <div className="flex flex-col gap-3 w-full max-w-[180px]">
                            <Button variant="outline" size="sm" onClick={() => {
                              const newProjects = [...localContent.projects];
                              if (!newProjects[index].gallery) newProjects[index].gallery = [];
                              newProjects[index].gallery.push("");
                              setLocalContent({...localContent, projects: newProjects});
                            }}>
                              <Plus className="w-4 h-4 mr-2" /> Blank URL Input
                            </Button>
                            <div className="relative w-full">
                              <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileUpload(e, (url) => {
                                  const newProjects = [...localContent.projects];
                                  if (!newProjects[index].gallery) newProjects[index].gallery = [];
                                  newProjects[index].gallery.push(url);
                                  setLocalContent({...localContent, projects: newProjects});
                                  // Reset input
                                  e.target.value = '';
                                })}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <Button variant="default" size="sm" className="w-full">
                                <Plus className="w-4 h-4 mr-2" /> Upload File
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full h-16 border-dashed" onClick={() => {
                const newId = Math.max(0, ...localContent.projects.map(p => p.id)) + 1;
                setLocalContent({
                  ...localContent, 
                  projects: [...localContent.projects, {
                    id: newId, title: "", description: "", longDescription: "", image: "", mainimage: "", technologies: [], githubUrl: "", liveUrl: ""
                  }]
                });
              }}>
                <Plus className="mr-2" /> Add New Project
              </Button>
            </div>
          </TabsContent>
          {/* Popup Section */}
          <TabsContent value="popup">
            <Card className="bg-surface/30 border-border/20">
              <CardHeader><CardTitle>Attractive Popup CTA</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Title" value={localContent.popup?.title || ''} onChange={(e) => setLocalContent({...localContent, popup: {...localContent.popup, title: e.target.value}})} className="bg-black/20" />
                <Textarea placeholder="Description" value={localContent.popup?.description || ''} onChange={(e) => setLocalContent({...localContent, popup: {...localContent.popup, description: e.target.value}})} className="bg-black/20" />
                <Input placeholder="Button Text" value={localContent.popup?.buttonText || ''} onChange={(e) => setLocalContent({...localContent, popup: {...localContent.popup, buttonText: e.target.value}})} className="bg-black/20" />
                <Input placeholder="Button URL" value={localContent.popup?.buttonUrl || ''} onChange={(e) => setLocalContent({...localContent, popup: {...localContent.popup, buttonUrl: e.target.value}})} className="bg-black/20" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Header/Footer Section */}
          <TabsContent value="headerfooter">
            <Card className="bg-surface/30 border-border/20 mb-6">
              <CardHeader><CardTitle>SEO Settings (Meta Title & Description)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Meta Title</Label><Input value={localContent.seo?.title || ''} onChange={(e) => setLocalContent({...localContent, seo: {...localContent.seo, title: e.target.value}})} className="bg-black/20" /></div>
                <div className="space-y-2"><Label>Meta Description</Label><Textarea value={localContent.seo?.description || ''} onChange={(e) => setLocalContent({...localContent, seo: {...localContent.seo, description: e.target.value}})} className="bg-black/20" /></div>
              </CardContent>
            </Card>

            <Card className="bg-surface/30 border-border/20">
              <CardHeader><CardTitle>Header & Footer</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Header Logo Text</Label><Input value={localContent.header?.logoText || ''} onChange={(e) => setLocalContent({...localContent, header: {...localContent.header, logoText: e.target.value}})} className="bg-black/20" /></div>
                <div className="space-y-2"><Label>Header Hire Me URL</Label><Input value={localContent.header?.hireMeUrl || ''} onChange={(e) => setLocalContent({...localContent, header: {...localContent.header, hireMeUrl: e.target.value}})} className="bg-black/20" /></div>
                <div className="space-y-2"><Label>Footer Brand Name</Label><Input value={localContent.footer?.brandName || ''} onChange={(e) => setLocalContent({...localContent, footer: {...localContent.footer, brandName: e.target.value}})} className="bg-black/20" /></div>
                <div className="space-y-2"><Label>Footer Description</Label><Textarea value={localContent.footer?.description || ''} onChange={(e) => setLocalContent({...localContent, footer: {...localContent.footer, description: e.target.value}})} className="bg-black/20" /></div>
                
                <div className="space-y-2">
                  <Label>Footer Expertise (One per line)</Label>
                  <Textarea 
                    value={(localContent.footer?.expertise || []).join('\n')} 
                    onChange={(e) => {
                      const newExpertise = e.target.value.split('\n').filter(p => p.trim() !== '');
                      setLocalContent({...localContent, footer: {...localContent.footer, expertise: newExpertise}} as any);
                    }} 
                    className="bg-black/20" 
                    rows={4}
                  />
                </div>

                <div className="space-y-2"><Label>Footer Copyright Text</Label><Input value={localContent.footer?.copyrightText || ''} onChange={(e) => setLocalContent({...localContent, footer: {...localContent.footer, copyrightText: e.target.value}})} className="bg-black/20" /></div>
                
                <div className="pt-4 border-t border-border/20 space-y-4">
                  <Label>Useful Links</Label>
                  {(localContent.footer?.usefulLinks || []).map((link, idx) => (
                    <div key={`usefullink-${idx}`} className="flex gap-2">
                      <Input value={link.label} onChange={(e) => {
                        const newLinks = [...(localContent.footer?.usefulLinks || [])];
                        newLinks[idx].label = e.target.value;
                        setLocalContent({...localContent, footer: {...localContent.footer, usefulLinks: newLinks}} as any);
                      }} placeholder="Label (e.g. About)" className="bg-black/20" />
                      <Input value={link.url} onChange={(e) => {
                        const newLinks = [...(localContent.footer?.usefulLinks || [])];
                        newLinks[idx].url = e.target.value;
                        setLocalContent({...localContent, footer: {...localContent.footer, usefulLinks: newLinks}} as any);
                      }} placeholder="URL (e.g. #about)" className="bg-black/20" />
                      <Button variant="ghost" size="icon" className="text-rose-500 shrink-0" onClick={() => {
                        const newLinks = [...(localContent.footer?.usefulLinks || [])];
                        newLinks.splice(idx, 1);
                        setLocalContent({...localContent, footer: {...localContent.footer, usefulLinks: newLinks}} as any);
                      }}><Trash2 size={16} /></Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-dashed" onClick={() => {
                    const newLinks = [...(localContent.footer?.usefulLinks || []), { label: '', url: '' }];
                    setLocalContent({...localContent, footer: {...localContent.footer, usefulLinks: newLinks}} as any);
                  }}>
                    <Plus className="mr-2" /> Add Useful Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact">
            <Card className="bg-surface/30 border-border/20">
              <CardHeader><CardTitle>Contact Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Email" value={localContent.contact?.email || ''} onChange={(e) => setLocalContent({...localContent, contact: {...localContent.contact, email: e.target.value}})} className="bg-black/20" />
                <Input placeholder="Phone" value={localContent.contact?.phone || ''} onChange={(e) => setLocalContent({...localContent, contact: {...localContent.contact, phone: e.target.value}})} className="bg-black/20" />
                <Input placeholder="Location" value={localContent.contact?.location || ''} onChange={(e) => setLocalContent({...localContent, contact: {...localContent.contact, location: e.target.value}})} className="bg-black/20" />
                <Textarea placeholder="Description" value={localContent.contact?.description || ''} onChange={(e) => setLocalContent({...localContent, contact: {...localContent.contact, description: e.target.value}})} className="bg-black/20" />
                <div className="pt-4 border-t border-border/20 space-y-4">
                  <Label>Social Links</Label>
                  {(localContent.contact?.socialLinks || []).map((link, idx) => (
                    <div key={`social-${idx}`} className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-start">
                      <Input value={link.platform} onChange={(e) => {
                        const newLinks = [...(localContent.contact?.socialLinks || [])];
                        newLinks[idx].platform = e.target.value;
                        setLocalContent({...localContent, contact: {...localContent.contact, socialLinks: newLinks}} as any);
                      }} placeholder="Platform (e.g. GitHub)" className="bg-black/20" />
                      <Input value={link.url} onChange={(e) => {
                        const newLinks = [...(localContent.contact?.socialLinks || [])];
                        newLinks[idx].url = e.target.value;
                        setLocalContent({...localContent, contact: {...localContent.contact, socialLinks: newLinks}} as any);
                      }} placeholder="URL" className="bg-black/20" />
                      <div className="flex gap-2">
                        <Input value={link.iconUrl} onChange={(e) => {
                          const newLinks = [...(localContent.contact?.socialLinks || [])];
                          newLinks[idx].iconUrl = e.target.value;
                          setLocalContent({...localContent, contact: {...localContent.contact, socialLinks: newLinks}} as any);
                        }} placeholder="Icon URL (optional)" className="bg-black/20" />
                        <Input type="file" onChange={(e) => handleFileUpload(e, (url) => {
                          const newLinks = [...(localContent.contact?.socialLinks || [])];
                          newLinks[idx].iconUrl = url;
                          setLocalContent({...localContent, contact: {...localContent.contact, socialLinks: newLinks}} as any);
                        })} className="bg-black/20 w-8 flex-shrink-0 opacity-0 absolute overflow-hidden" title="Upload Icon" />
                        <Button variant="secondary" className="shrink-0 relative overflow-hidden" onClick={(e) => {
                          (e.currentTarget.previousSibling as HTMLInputElement)?.click();
                        }} title="Upload Icon File">
                           Upload
                        </Button>
                        <Button variant="ghost" size="icon" className="text-rose-500 shrink-0" onClick={() => {
                          const newLinks = [...(localContent.contact?.socialLinks || [])];
                          newLinks.splice(idx, 1);
                          setLocalContent({...localContent, contact: {...localContent.contact, socialLinks: newLinks}} as any);
                        }}><Trash2 size={16} /></Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-dashed" onClick={() => {
                    const newLinks = [...(localContent.contact?.socialLinks || []), { platform: '', url: '', iconUrl: '' }];
                    setLocalContent({...localContent, contact: {...localContent.contact, socialLinks: newLinks}} as any);
                  }}>
                    <Plus className="mr-2" /> Add Social Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Section */}
          <TabsContent value="experience">
            <div className="space-y-6">
              <Card className="bg-surface/30 border-border/20 mb-6">
                <CardHeader><CardTitle>Experience Section Header</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Badge Text</Label>
                    <Input value={localContent.experienceHeader?.badgeText || ''} onChange={(e) => setLocalContent({...localContent, experienceHeader: {...localContent.experienceHeader, badgeText: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. ✨ Career Odyssey" />
                  </div>
                  <div className="space-y-2">
                    <Label>Main Title</Label>
                    <Input value={localContent.experienceHeader?.titleMain || ''} onChange={(e) => setLocalContent({...localContent, experienceHeader: {...localContent.experienceHeader, titleMain: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. Professional" />
                  </div>
                  <div className="space-y-2">
                    <Label>Highlighted Title</Label>
                    <Input value={localContent.experienceHeader?.titleHighlight || ''} onChange={(e) => setLocalContent({...localContent, experienceHeader: {...localContent.experienceHeader, titleHighlight: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. Journey" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={localContent.experienceHeader?.description || ''} onChange={(e) => setLocalContent({...localContent, experienceHeader: {...localContent.experienceHeader, description: e.target.value}} as any)} className="bg-black/20" />
                  </div>
                </CardContent>
              </Card>

              {(localContent.experience || []).map((exp, index) => (
                <Card key={index} className="bg-surface/30 border-border/20">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between">
                      <Label>Experience #{index + 1}</Label>
                      <Button variant="ghost" size="icon" className="text-rose-500" onClick={() => {
                        const newExp = [...localContent.experience];
                        newExp.splice(index, 1);
                        setLocalContent({...localContent, experience: newExp});
                      }}><Trash2 size={14} /></Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Company" value={exp.company} onChange={(e) => {
                        const newExp = [...localContent.experience];
                        newExp[index].company = e.target.value;
                        setLocalContent({...localContent, experience: newExp});
                      }} className="bg-black/20" />
                      <Input placeholder="Role" value={exp.role} onChange={(e) => {
                        const newExp = [...localContent.experience];
                        newExp[index].role = e.target.value;
                        setLocalContent({...localContent, experience: newExp});
                      }} className="bg-black/20" />
                      <Input placeholder="Duration" value={exp.duration} onChange={(e) => {
                        const newExp = [...localContent.experience];
                        newExp[index].duration = e.target.value;
                        setLocalContent({...localContent, experience: newExp});
                      }} className="bg-black/20" />
                    </div>
                    <Textarea placeholder="Description" value={exp.description} onChange={(e) => {
                      const newExp = [...localContent.experience];
                      newExp[index].description = e.target.value;
                      setLocalContent({...localContent, experience: newExp});
                    }} className="bg-black/20" />
                    <div className="space-y-3">
                      <Label>Points / Achievements</Label>
                      {(exp.achievements || []).map((point, pointIdx) => (
                        <div key={pointIdx} className="flex gap-2">
                          <Input 
                            value={point}
                            onChange={(e) => {
                              const newExp = [...localContent.experience];
                              newExp[index].achievements[pointIdx] = e.target.value;
                              setLocalContent({...localContent, experience: newExp});
                            }}
                            className="bg-black/20"
                            placeholder={`Point ${pointIdx + 1}`}
                          />
                          <Button variant="ghost" size="icon" className="text-rose-500 shrink-0" onClick={() => {
                            const newExp = [...localContent.experience];
                            newExp[index].achievements.splice(pointIdx, 1);
                            setLocalContent({...localContent, experience: newExp});
                          }}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full border-dashed mt-2" onClick={() => {
                        const newExp = [...localContent.experience];
                        if (!newExp[index].achievements) newExp[index].achievements = [];
                        newExp[index].achievements.push('');
                        setLocalContent({...localContent, experience: newExp});
                      }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Point
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={() => {
                setLocalContent({...localContent, experience: [...(localContent.experience || []), { company: '', role: '', duration: '', description: '', achievements: [] }]});
              }}>
                <Plus className="mr-2" /> Add Experience
              </Button>
            </div>
          </TabsContent>

          {/* Collaborations Section */}
          <TabsContent value="collaborations">
            <Card className="bg-surface/30 border-border/20 mb-6">
              <CardHeader><CardTitle>Collaborations Banner & CTA</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Badge Text</Label>
                  <Input value={localContent.collaborationsCta?.badgeText || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, badgeText: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. ✨ COLLABORATIONS" />
                </div>
                <div className="space-y-2">
                  <Label>Main Title</Label>
                  <Input value={localContent.collaborationsCta?.titleMain || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, titleMain: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. Let's Create the" />
                </div>
                <div className="space-y-2">
                  <Label>Highlighted Title</Label>
                  <Input value={localContent.collaborationsCta?.titleHighlight || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, titleHighlight: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. Future Together" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={localContent.collaborationsCta?.description || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, description: e.target.value}} as any)} className="bg-black/20" />
                </div>
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h4 className="text-sm font-medium text-white/70">Primary Button (Left)</h4>
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input value={localContent.collaborationsCta?.primaryButtonText || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, primaryButtonText: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. Download Resume" />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link URL / File Upload</Label>
                    <div className="flex gap-2">
                      <Input value={localContent.collaborationsCta?.primaryButtonLink || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, primaryButtonLink: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. /resume.pdf" />
                      <Input type="file" onChange={(e) => handleFileUpload(e, (url) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, primaryButtonLink: url}} as any))} className="bg-black/20 w-auto file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h4 className="text-sm font-medium text-white/70">Secondary Button (Right)</h4>
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input value={localContent.collaborationsCta?.secondaryButtonText || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, secondaryButtonText: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. Contact Me" />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link URL</Label>
                    <Input value={localContent.collaborationsCta?.secondaryButtonLink || ''} onChange={(e) => setLocalContent({...localContent, collaborationsCta: {...localContent.collaborationsCta, secondaryButtonLink: e.target.value}} as any)} className="bg-black/20" placeholder="e.g. #contact" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </main>
    </div>
  );
}
