"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="container max-w-3xl py-6 md:py-10 space-y-10">
      <Breadcrumbs items={[{ name: "Contact" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Contact {siteConfig.name}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          We welcome bug reports, tool requests, math inquiries, and partnership proposals.
        </p>
      </div>

      <Card className="bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <span>Send Us a Direct Message</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Thank You for Reaching Out!</h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Your message has been received. Our engineering and editorial team reviews feedback daily and will reply within 24–48 hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setSubject("");
                  setMessage("");
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                />
              </div>

              <Input
                label="Subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Feature request: Add APR comparison to Loan Calculator"
              />

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Message Details
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your question, bug report, or idea..."
                  className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full gap-2">
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground space-y-1">
        <div className="font-semibold text-foreground">Direct Inquiries:</div>
        <div>General & Editorial: <span className="font-mono text-foreground">contact@nexustools.io</span></div>
        <div>Security Disclosures: <span className="font-mono text-foreground">security@nexustools.io</span></div>
      </div>
    </div>
  );
}
