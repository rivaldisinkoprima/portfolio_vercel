import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Mail, Send, Phone } from "lucide-react";

export const metadata = {
  title: "Contact | Polyglot Engineer Portfolio",
  description: "Get in touch for collaborations and opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-zinc-400">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </header>

<Card className="bg-zinc-900/80 border-zinc-800">
          <CardContent className="p-8">
            <div className="space-y-6">
              <a
                href="mailto:rivaldiekaputr@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-zinc-400">rivaldiekaputr@gmail.com</p>
                </div>
              </a>

              <a
                href="https://instagram.com/rivaldiekaptr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="font-semibold">Instagram</p>
                  <p className="text-sm text-zinc-400">@rivaldiekaptr</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/rivaldiekaputr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-sm text-zinc-400">linkedin.com/in/rivaldiekaputr</p>
                </div>
              </a>

              <a
                href="https://wa.me/62895616181056"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-zinc-400">+62 895 616 181056</p>
                </div>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-800">
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black" asChild>
                <a href="mailto:rivaldiekaputr@gmail.com">
                  <Send className="w-4 h-4 mr-2" />
                  Send Me a Message
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
