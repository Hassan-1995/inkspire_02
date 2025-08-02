"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const pathName = usePathname();

  if (pathName === "/api/auth/localAuth") return null;

  const contactLinks = [
    {
      label: "C8 Dr Israr Ahmed Road, K.A.E.C.H.S, Karachi",
      icon: LuMapPin,
    },
    { label: "+92-324-2886139", icon: LuPhone },
    { label: "support@inkspire.com", icon: LuMail },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaTiktok, href: "#" },
  ];

  return (
    <footer className="bg-slate-100 border-t text-zinc-700">
      <div className="container mx-auto px-6 py-5">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Logo + Slogan + Social (1/3 on lg) */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/mascots/mascot_thumbsUp.png"
                alt="Inkspire Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                InkSpire
              </span>
            </div>
            <p className="text-sm">
              Bring your ideas to life with precision and flair.
              <br /> High-quality custom prints delivered at top speed. <br />
              From bold designs to subtle styles, we do it all. <br />
              InkSpire — printing your vision, your way.
            </p>
            <div className="flex gap-4 mt-4">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-zinc-500 hover:text-zinc-800"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info (2/3 on lg) */}
          <div className="lg:w-2/3">
            <h4 className="font-semibold mb-4 text-pink-700">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              {contactLinks.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-start gap-2">
                  <Icon className="mt-0.5 w-5 h-5 text-zinc-500" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-4 py-4 text-center text-sm text-muted-foreground bg-slate-50">
        © {new Date().getFullYear()} InkSpire. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
