import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Resume | Polyglot Engineer Portfolio",
  description: "View and download my resume",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">My Resume</h1>
          <p className="text-muted-foreground mb-6">
            Download my resume or view the details below.
          </p>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <a
              href="https://drive.google.com/uc?export=view&id=1o0RckJ89aXKlGuSaIJ1WJHEdhblAS3wA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume (PDF)
            </a>
          </Button>
        </header>

        <div className="space-y-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Page 1</h2>
              </div>
              <div className="relative w-full aspect-[8.5/11] rounded-lg overflow-hidden border border-border">
                <Image
                  src="/resume1.jpg"
                  alt="Resume Page 1 - Rivaldi Eka Putra Professional Experience"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Page 2</h2>
              </div>
              <div className="relative w-full aspect-[8.5/11] rounded-lg overflow-hidden border border-border">
                <Image
                  src="/resume2.jpg"
                  alt="Resume Page 2 - Rivaldi Eka Putra Skills and Education"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
