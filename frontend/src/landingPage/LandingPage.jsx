import React from 'react'
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Shield,
  Users,
  Clock,
  Heart,
  ClipboardList,
} from "lucide-react";
import { AppWrapper } from '../layouts/AppWrapper';

const LandingPage = () => {
  return (
    <AppWrapper>
      <div className="bg-background min-h-screen">
        <section className="hero-gradient py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold mb-6 text-balance text-foreground">
                Your Mental Health Journey Starts Here
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Professional, confidential, and accessible mental health support
                designed for your unique needs. Connect with licensed
                counselors, access resources, and join a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary text-lg px-8 py-3">
                  Get Started Today
                </button>
                <button className="btn btn-outline text-lg px-8 py-3">
                  Learn More
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <img
                src="/professional-mental-health-counseling-session-with.jpg"
                alt="Professional mental health support"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold mb-6">
                Comprehensive Mental Health Support
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Our platform provides multiple pathways to mental wellness,
                ensuring you get the right support when you need it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-20">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="card-title text-xl font-serif">
                    AI Assistant
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Get immediate support and coping strategies from our AI
                    chatbot, available 24/7
                  </p>
                  <div className="card-actions w-full">
                    <a href="#chatbot" className="btn btn-primary w-full">Start Chat</a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 hover:bg-secondary/20 transition-colors">
                    <Calendar className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="card-title text-xl font-serif">
                    Book Appointment
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Schedule confidential sessions with licensed counselors who
                    understand your needs
                  </p>
                  <div className="card-actions w-full">
                    <a href="/appointments" className="btn btn-primary w-full">Book Now</a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 hover:bg-accent/20 transition-colors">
                    <BookOpen className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="card-title text-xl font-serif">
                    Resources
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Access guides, articles, and audio content in multiple
                    languages for mental wellness
                  </p>
                  <div className="card-actions w-full">
                    <a href="/resources" className="btn btn-outline w-full">Explore</a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 hover:bg-blue-100 transition-colors">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="card-title text-xl font-serif">
                    Peer Support
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Connect with others in a safe community space with
                    AI-moderated discussions
                  </p>
                  <div className="card-actions w-full">
                    <a href="/peer-support" className="btn btn-outline w-full">Join Community</a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 hover:bg-green-100 transition-colors">
                    <ClipboardList className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="card-title text-xl font-serif">
                    Assessment Tests
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Take depression, anxiety, and general health assessments to
                    understand your mental health
                  </p>
                  <div className="card-actions w-full">
                    <a href="/assessments" className="btn btn-outline w-full">Take Assessment</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  Completely Confidential
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  HIPAA compliant platform with end-to-end encryption protecting
                  your privacy and personal information
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  Available 24/7
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI support and crisis resources accessible anytime you need
                  help, day or night
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  Community Support
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with peers and volunteers in a safe, moderated
                  environment designed for healing
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" id="chatbot">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-bold mb-6">
                  AI Mental Health Assistant
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Get immediate support and coping strategies. Our AI assistant
                  provides evidence-based guidance and can connect you with
                  crisis resources when needed.
                </p>
              </div>

              {/* <div className="bg-card rounded-3xl shadow-2xl p-8">
                <AIChatbot />
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </AppWrapper>
  )
}

export default LandingPage