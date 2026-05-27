import { Toaster } from "@src/components/ui/sonner";
import { toast } from "sonner";
import { Link } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Go to Home
      </Link>
      <button onClick={() => toast.success("Hello")}>Reload</button>
    </div>
  );
};

export default NotFoundPage;
