
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="max-w-3xl w-full text-center space-y-6 animate-scale-in">
        <div className="inline-block mb-4 px-4 py-1.5 bg-admin-accent rounded-full">
          <p className="text-sm font-medium text-admin-primary">Admin Portal</p>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-admin-text">
          Welcome to the Admin Portal
        </h1>
        
        <p className="text-lg text-admin-secondary max-w-2xl mx-auto">
          Access the powerful admin dashboard to manage users, monitor activity, and handle account requests with a beautifully designed interface.
        </p>
        
        <div className="pt-4">
          <Link to="/admin">
            <Button className="rounded-full h-12 px-6 bg-admin-primary hover:bg-admin-primary/90 gap-2 premium-transition">
              Enter Admin Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-20 relative w-full max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10 h-20 bottom-0 top-auto"></div>
        <img 
          src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=1000&auto=format&fit=crop"
          alt="Admin Dashboard Preview" 
          className="w-full h-auto rounded-t-xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Index;
