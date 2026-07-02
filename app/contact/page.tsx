"use client";

import { useState } from "react";
import Container from "@/components/layout/container";
import { Breadcrumb } from "@/components/tools/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Contact" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendMessage = async () => {
    if (!form.name || !form.email || !form.message) {
      setResult("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully 🎉");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch {
      setResult("Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white pb-12 pt-24 dark:from-zinc-950 dark:to-zinc-900">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Contact Us
            </h1>

            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Have a question, suggestion, or found a bug? We'd love to hear
              from you.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            {/* Contact Form */}

            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <MessageSquare className="size-6 text-blue-600 dark:text-blue-400" />

                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Send us a Message
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Name
                    </label>

                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Email
                    </label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      className="w-full resize-y rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                    />
                  </div>

                  <Button
                    onClick={sendMessage}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {result && (
                    <div
                      className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
                        result.includes("Successfully")
                          ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      }`}
                    >
                      {result.includes("Successfully") ? (
                        <CheckCircle className="size-4 shrink-0" />
                      ) : (
                        <AlertCircle className="size-4 shrink-0" />
                      )}

                      {result}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right Side */}

            <div className="space-y-6">
              {/* <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Mail className="size-6 text-blue-600 dark:text-blue-400" />

                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                        Email Us
                      </h3>

                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        support@toolhub.app
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              <div className="rounded-xl border border-zinc-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Frequently Asked
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Before reaching out, check our FAQ section on the homepage.
                  Many common questions are answered there.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Report a Bug
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  If you've found a bug or something isn't working correctly,
                  please include the tool name and explain what went wrong.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}