import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export function WhatsappButton() {
  return (
    <a
      href={whatsappHref("Hi Jose Graphics, I'd like to discuss a project.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <MessageCircle size={20} />
      <span className="hidden text-sm font-medium sm:inline">WhatsApp</span>
    </a>
  );
}
