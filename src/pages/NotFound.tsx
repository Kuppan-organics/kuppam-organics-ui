import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import illustration from "@/assets/Illustration.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <img
        src={illustration}
        alt="404 - Page not found"
        className="max-h-[70vh] w-auto max-w-full object-contain px-4"
      />
      <Link
        to="/"
        className="mt-6 rounded-md bg-primary px-6 py-2.5 text-primary-foreground no-underline transition-colors hover:bg-primary/90"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
