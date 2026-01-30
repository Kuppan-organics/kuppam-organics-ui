import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/kuppam_organics-logo.png";
import guestPhoto from "@/assets/541-5415351_chandrababu-naidu-photos-download-hd-png-download.png";

export default function Inauguration() {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate("/home", { state: { fromLaunch: true } });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[hsl(24,53%,12%)] via-[hsl(28,44%,22%)] to-[hsl(24,53%,8%)] flex flex-col items-center justify-center relative">
      {/* Guest photo as 2nd layer background – right side */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute right-0 top-0 bottom-0 w-full max-w-[55%] min-w-[280px] flex justify-end items-center">
          <img
            src={guestPhoto}
            alt=""
            className="h-full max-h-[90vh] w-auto object-contain object-right opacity-80"
          />
        </div>
      </div>

      {/* Decorative ribbon – top diagonal */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-20">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] max-w-[800px] h-20 bg-gradient-to-r from-[hsl(40,54%,38%)] via-[hsl(40,54%,51%)] to-[hsl(40,54%,38%)] opacity-95 shadow-lg border-y-2 border-[hsl(40,54%,60%)]/50"
          style={{ transform: "translateX(-50%) rotate(-2deg)" }}
        />
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 text-[hsl(24,53%,12%)] font-heading font-bold text-lg sm:text-xl tracking-widest uppercase whitespace-nowrap drop-shadow-sm"
        >
          Grand Inauguration
        </div>
      </div>

      {/* Ribbon banner – center curved */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4"
      >
        <div className="relative py-6 px-8 rounded-2xl bg-gradient-to-r from-[hsl(40,54%,45%)] via-[hsl(40,54%,51%)] to-[hsl(40,54%,45%)] shadow-2xl border border-[hsl(40,54%,60%)]/50">
          {/* Ribbon fold effect – left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 bg-[hsl(40,54%,38%)] rounded-l-xl"
            style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }}
          />
          {/* Ribbon fold effect – right */}
          <div
            className="absolute right-0 top-0 bottom-0 w-8 bg-[hsl(40,54%,38%)] rounded-r-xl"
            style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)" }}
          />
          <p className="text-center text-[hsl(24,53%,12%)] font-heading font-bold text-xl sm:text-2xl tracking-wide">
            Kuppam Organics
          </p>
          <p className="text-center text-[hsl(24,53%,20%)] font-body text-sm sm:text-base mt-1">
            From Kuppam&apos;s Soil to Your Soul
          </p>
        </div>
      </motion.div>

      {/* Welcome message – highlighted */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 w-full max-w-3xl mx-auto px-4 mt-6"
      >
        <div className="text-center px-6 py-5 rounded-2xl bg-gradient-to-r from-[hsl(40,54%,35%)] via-[hsl(40,54%,48%)] to-[hsl(40,54%,35%)] shadow-xl border-2 border-[hsl(40,54%,65%)]/80 ring-2 ring-[hsl(40,54%,60%)]/40">
          <p className="text-[hsl(24,53%,8%)] font-heading font-bold text-lg sm:text-xl md:text-2xl leading-relaxed">
            We heartily welcome <span className="text-[hsl(24,53%,5%)] font-extrabold underline decoration-2 decoration-[hsl(24,53%,12%)]/50 underline-offset-2">Hon&apos;ble Chief Minister Shri Nara Chandra Babu Naidu Garu</span> to inaugurate <span className="font-extrabold">Kuppam Organics</span> — a proud step from Kuppam&apos;s soil to your table.
          </p>
        </div>
      </motion.div>

      {/* Logo – foreground, entirely left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 w-full flex items-center justify-start  pl-4 sm:pl-6 md:pl-8"
      >
        <div className="flex-shrink-0">
          {/* Outer circle – fixed size; inner logo fills it */}
          <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-0 bg-[hsl(40,54%,51%)]/20 border-2 border-[hsl(40,54%,51%)]/50 shadow-xl overflow-hidden flex items-center justify-center">
            <img
              src={logoImg}
              alt="Kuppam Organics"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Launch button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 mt-10 px-4"
      >
        <Button
          size="lg"
          onClick={handleLaunch}
          className="bg-[hsl(40,54%,51%)] hover:bg-[hsl(40,54%,45%)] text-[hsl(24,53%,12%)] font-heading font-bold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[hsl(40,54%,60%)]/50"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Launch
        </Button>
      </motion.div>

      {/* Bottom ribbon accent */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -bottom-16 -right-24 w-[80%] h-24 bg-gradient-to-r from-transparent via-[hsl(40,54%,51%)]/70 to-transparent"
          style={{ transform: "rotate(2deg) scaleX(1.1)" }}
        />
      </div>
    </div>
  );
}
