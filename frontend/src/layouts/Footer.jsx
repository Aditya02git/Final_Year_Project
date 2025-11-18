import React from 'react'
import { MessageCircle, Phone, Mail, MapPin, Shield, Heart } from "lucide-react"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t bg-card/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl">MindCare</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Digital Mental Health Support System providing confidential, accessible mental health resources for
              students.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Supporting student wellness since 2024</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold">Quick Access</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                AI Assistant
              </Link>
              <Link
                href="/appointments"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                href="/resources"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Mental Health Resources
              </Link>
              <Link
                href="/admin"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Crisis Resources */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold">Crisis Support</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-destructive" />
                <div>
                  <div className="text-sm font-medium">Suicide & Crisis Lifeline</div>
                  <div className="text-sm text-muted-foreground font-mono">988</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-sm font-medium">Campus Emergency</div>
                  <div className="text-sm text-muted-foreground font-mono">(555) 123-4567</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Available 24/7 for immediate support</div>
            </div>
          </div>

          {/* Contact & Privacy */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold">Contact & Privacy</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@mindcare.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Student Health Center</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-medium">HIPAA Compliant</div>
                  <div className="text-xs text-muted-foreground">Your privacy is protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 MindCare Digital Mental Health Support. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer