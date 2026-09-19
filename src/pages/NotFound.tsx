import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Add noindex meta tag for 404 page
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      if (document.head.contains(meta)) {
        document.head.removeChild(meta);
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-page)] text-[var(--text-primary)] px-4">
      <div className="max-w-md w-full text-center card-surface">
        <h1 className="text-6xl font-bold text-[var(--accent)] mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Page Not Found</h2>
        <p className="text-[var(--text-secondary)] mb-6 text-sm">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
