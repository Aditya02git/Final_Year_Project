import { useState } from "react";
import {
  BookOpen,
  Play,
  Download,
  Search,
  Clock,
  Users,
  Star,
  Video,
} from "lucide-react";

const resources = [
  {
    id: "1",
    title: "Understanding Anxiety: A Student's Guide",
    description:
      "Comprehensive guide to recognizing and managing anxiety symptoms in academic settings.",
    type: "guide",
    category: "Anxiety",
    language: "English",
    duration: "15 min read",
    rating: 4.8,
    downloads: 1247,
    tags: ["anxiety", "coping", "academic"],
    content:
      "This guide covers the basics of anxiety, common triggers for students, and practical coping strategies...",
  },
  {
    id: "2",
    title: "Breathing Exercises for Stress Relief",
    description:
      "Guided audio session with breathing techniques to reduce stress and promote relaxation.",
    type: "audio",
    category: "Stress Management",
    language: "English",
    duration: "10 min",
    rating: 4.9,
    downloads: 892,
    tags: ["breathing", "relaxation", "stress"],
    audioUrl: "/audio/breathing-exercises.mp3",
  },
  {
    id: "3",
    title: "মানসিক স্বাস্থ্য এবং চাপ ব্যবস্থাপনা",
    description:
      "বিশ্ববিদ্যালয়ের ছাত্রছাত্রীদের জন্য মানসিক স্বাস্থ্য এবং চাপ নিয়ন্ত্রণের গাইড।",
    type: "guide",
    category: "Stress Management",
    language: "Bengali",
    duration: "12 min read",
    rating: 4.7,
    downloads: 634,
    tags: ["চাপ", "মানসিক স্বাস্থ্য", "ছাত্র"],
    content: "এই গাইডে মানসিক চাপ নিয়ন্ত্রণের কার্যকর কৌশল রয়েছে...",
  },
  {
    id: "4",
    title: "Building Healthy Sleep Habits",
    description:
      "Evidence-based strategies for improving sleep quality and establishing consistent sleep routines.",
    type: "article",
    category: "Wellness",
    language: "English",
    duration: "8 min read",
    rating: 4.6,
    downloads: 1156,
    tags: ["sleep", "habits", "wellness"],
    content:
      "Good sleep is fundamental to mental health. This article explores...",
  },
  {
    id: "5",
    title: "Mindfulness Meditation for Beginners",
    description:
      "Gentle introduction to mindfulness practices with guided meditation sessions.",
    type: "audio",
    category: "Mindfulness",
    language: "English",
    duration: "20 min",
    rating: 4.8,
    downloads: 2103,
    tags: ["mindfulness", "meditation", "beginner"],
    audioUrl: "/audio/mindfulness-intro.mp3",
  },
  {
    id: "6",
    title: "मानसिक स्वास्थ्य की देखभाल",
    description:
      "छात्रों के लिए मानसिक स्वास्थ्य की बुनियादी जानकारी और सुझाव।",
    type: "guide",
    category: "General Wellness",
    language: "Hindi",
    duration: "10 min read",
    rating: 4.5,
    downloads: 423,
    tags: ["मानसिक स्वास्थ्य", "छात्र", "देखभाल"],
    content: "यह गाइड मानसिक स्वास्थ्य की बुनियादी बातों को कवर करता है...",
  },
  {
    id: "7",
    title: "Coping with Academic Pressure",
    description:
      "Video guide on managing academic stress and maintaining work-life balance.",
    type: "video",
    category: "Stress Management",
    language: "English",
    duration: "15 min",
    rating: 4.9,
    downloads: 1567,
    tags: ["academic", "pressure", "balance"],
    videoUrl: "/videos/academic-pressure.mp4",
  },
  {
    id: "8",
    title: "শিক্ষার্থীদের জন্য মানসিক স্বাস্থ্য",
    description:
      "শিক্ষার্থীদের মানসিক স্বাস্থ্য রক্ষার উপায় নিয়ে ভিডিয়ো গাইড।",
    type: "video",
    category: "General Wellness",
    language: "Bengali",
    duration: "12 min",
    rating: 4.6,
    downloads: 789,
    tags: ["মানসিক স্বাস্থ্য", "শিক্ষার্থী", "গাইড"],
    videoUrl: "/videos/mental-health-bengali.mp4",
  },
  {
    id: "9",
    title: "तनाव प्रबंधन तकनीकें",
    description:
      "तनाव को कम करने और मानसिक शांति पाने के लिए व्यावहारिक तकनीकों का वीडियो।",
    type: "video",
    category: "Stress Management",
    language: "Hindi",
    duration: "18 min",
    rating: 4.7,
    downloads: 1234,
    tags: ["तनाव", "प्रबंधन", "तकनीक"],
    videoUrl: "/videos/stress-management-hindi.mp4",
  },
];

const categories = [
  "All",
  "Anxiety",
  "Stress Management",
  "Wellness",
  "Mindfulness",
  "General Wellness",
];
const languages = ["All", "English", "Hindi", "Bengali"];

export function Resource() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesLanguage =
      selectedLanguage === "All" || resource.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "article":
      case "guide":
        return <BookOpen className="h-4 w-4" />;
      case "audio":
        return <Play className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "article":
        return "badge-info";
      case "guide":
        return "badge-success";
      case "audio":
        return "badge-secondary";
      case "video":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  const getGradientClass = (type) => {
    switch (type) {
      case "guide":
        return "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
      case "audio":
        return "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700";
      case "video":
        return "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700";
      default:
        return "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700";
    }
  };

  const getFilteredByTab = () => {
    if (activeTab === "all") return filteredResources;
    if (activeTab === "guides") return filteredResources.filter((r) => r.type === "guide");
    if (activeTab === "audio") return filteredResources.filter((r) => r.type === "audio");
    if (activeTab === "articles") return filteredResources.filter((r) => r.type === "article");
    if (activeTab === "videos") return filteredResources.filter((r) => r.type === "video");
    return filteredResources;
  };

  if (selectedResource) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <button
          className="btn btn-outline mb-6"
          onClick={() => setSelectedResource(null)}
        >
          ← Back to Resources
        </button>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title font-serif text-2xl mb-2">
                  {selectedResource.title}
                </h2>
                <p className="text-base-content/70 mb-4">
                  {selectedResource.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-base-content/70">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedResource.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {selectedResource.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {selectedResource.downloads} downloads
                  </div>
                </div>
              </div>
              <div className={`badge ${getTypeColor(selectedResource.type)} gap-1`}>
                {getTypeIcon(selectedResource.type)}
                <span className="capitalize">{selectedResource.type}</span>
              </div>
            </div>

            {selectedResource.type === "audio" && selectedResource.audioUrl && (
              <div className="mt-6 p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <button className="btn btn-sm btn-primary gap-2">
                    <Play className="h-4 w-4" />
                    Play Audio
                  </button>
                  <div className="flex-1 h-2 bg-base-300 rounded-full">
                    <div className="bg-primary h-2 rounded-full w-0" />
                  </div>
                  <span className="text-sm text-base-content/70">
                    0:00 / {selectedResource.duration}
                  </span>
                </div>
              </div>
            )}

            {selectedResource.type === "video" && selectedResource.videoUrl && (
              <div className="mt-6 p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <button className="btn btn-sm btn-primary gap-2">
                    <Video className="h-4 w-4" />
                    Watch Video
                  </button>
                  <div className="flex-1 h-2 bg-base-300 rounded-full">
                    <div className="bg-primary h-2 rounded-full w-0" />
                  </div>
                  <span className="text-sm text-base-content/70">
                    0:00 / {selectedResource.duration}
                  </span>
                </div>
              </div>
            )}

            {selectedResource.content && (
              <div className="mt-6 prose max-w-none">
                <p>{selectedResource.content}</p>
                <p className="text-base-content/60 italic">
                  [This is a preview. The full content would be displayed here
                  in a real implementation.]
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-base-300">
              <div className="flex flex-wrap gap-2">
                {selectedResource.tags.map((tag) => (
                  <div key={tag} className="badge badge-outline text-xs">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Search and Filters */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Search resources, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
            <select
              className="select select-bordered w-full md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-full md:w-48"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-2">
        <button
          className={`tab ${activeTab === "all" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Resources
        </button>
        <button
          className={`tab ${activeTab === "guides" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("guides")}
        >
          Guides
        </button>
        <button
          className={`tab ${activeTab === "audio" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("audio")}
        >
          Audio
        </button>
        <button
          className={`tab ${activeTab === "articles" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("articles")}
        >
          Articles
        </button>
        <button
          className={`tab ${activeTab === "videos" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
      </div>

      {/* Resource Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {getFilteredByTab().map((resource) => (
          <div
            key={resource.id}
            className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl hover:from-white/90 hover:via-white/70 hover:to-white/50 transition-all duration-500 cursor-pointer hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-3 hover:scale-[1.02] rounded-2xl card"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 100%)`,
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            {/* Animated background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Type indicator with glow effect */}
            <div className="absolute top-6 right-6 z-10">
              <div
                className={`w-4 h-4 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${
                  resource.type === "guide"
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 shadow-blue-500/50"
                    : resource.type === "audio"
                    ? "bg-gradient-to-r from-green-400 to-green-600 shadow-green-500/50"
                    : resource.type === "video"
                    ? "bg-gradient-to-r from-purple-400 to-purple-600 shadow-purple-500/50"
                    : "bg-gradient-to-r from-orange-400 to-orange-600 shadow-orange-500/50"
                }`}
              />
            </div>

            <div className="card-body pb-4 px-8 pt-8 relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`badge text-xs font-bold border-0 px-4 py-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 gap-2 ${
                    resource.type === "guide"
                      ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-800 border-blue-300/30"
                      : resource.type === "audio"
                      ? "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-800 border-green-300/30"
                      : resource.type === "video"
                      ? "bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-800 border-purple-300/30"
                      : "bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-800 border-orange-300/30"
                  }`}
                >
                  {getTypeIcon(resource.type)}
                  <span className="capitalize">{resource.type}</span>
                </div>
                <div className="badge badge-outline text-xs font-semibold text-gray-700 border-gray-300/40 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                  {resource.language}
                </div>
              </div>
              <h2 className="card-title font-serif text-2xl leading-tight text-gray-900 group-hover:text-gray-800 transition-colors line-clamp-2 mb-2">
                {resource.title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors">
                {resource.description}
              </p>

              {/* Enhanced Stats with glassmorphism */}
              <div className="flex items-center justify-between text-xs text-gray-600 mb-6 p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{resource.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-current text-amber-400" />
                  <span className="font-semibold">{resource.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{resource.downloads}</span>
                </div>
              </div>

              {/* Enhanced Tags with glassmorphism */}
              <div className="flex flex-wrap gap-2 mb-6">
                {resource.tags.slice(0, 2).map((tag) => (
                  <div
                    key={tag}
                    className="badge badge-secondary text-xs font-medium bg-white/60 text-gray-700 hover:bg-white/80 transition-all duration-300 px-3 py-2 rounded-full backdrop-blur-sm border border-white/30 hover:scale-105"
                  >
                    {tag}
                  </div>
                ))}
                {resource.tags.length > 2 && (
                  <div className="badge text-xs font-medium bg-white/40 text-gray-600 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    +{resource.tags.length - 2}
                  </div>
                )}
              </div>

              {/* Enhanced Action Button with gradient and glow */}
              <button
                onClick={() => setSelectedResource(resource)}
                className={`btn w-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 rounded-xl border-0 text-white bg-gradient-to-r ${getGradientClass(
                  resource.type
                )}`}
              >
                {resource.type === "audio"
                  ? "🎵 Listen"
                  : resource.type === "video"
                  ? "▶️ Watch"
                  : "📖 Read"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {getFilteredByTab().length === 0 && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-12 text-center">
            <BookOpen className="h-12 w-12 text-base-content/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-base-content/70">
              Try adjusting your search terms or filters to find relevant
              resources.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}