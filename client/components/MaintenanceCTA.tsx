import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaintenanceCTA() {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-black dark:bg-slate-900 p-2 sm:pr-2 rounded-3xl sm:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 dark:border-slate-800 max-w-4xl w-full transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Icon */}
        <div className="flex-shrink-0 bg-[#f0f7fd] dark:bg-sky-900/30 p-4 rounded-full sm:ml-2 mt-2 sm:mt-0">
          <Shield className="w-7 h-7 text-[#0284c7]" strokeWidth={2} />
        </div>
        
        {/* Text */}
        <div className="flex-1 text-center sm:text-left py-2 sm:py-3">
          <h3 className="text-[#0f3750] dark:text-white font-bold text-xl mb-1">
            Need immediate maintenance?
          </h3>
          <p className="text-[#5e7282] dark:text-slate-400 text-base">
            Get a custom Swiss-quality quote today.
          </p>
        </div>
        
        {/* Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0 mb-2 sm:mb-0 sm:mr-1">
          <Button className="w-full sm:w-auto bg-[#04334f] hover:bg-[#032338] text-white rounded-full px-8 py-7 text-lg font-medium group transition-all">
            Request Proposal
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
