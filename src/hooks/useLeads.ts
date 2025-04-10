
import { toast } from "sonner";

type User = {
  email: string;
  name: string;
  company?: string;
  leadsRemaining: number;
  isPremium: boolean;
  fullName?: string;
  companyName?: string;
  contactInfo?: string;
};

export const useLeads = (user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const checkLeadLimit = () => {
    if (!user) return false;
    
    if (user.isPremium) return true;
    
    if (user.leadsRemaining <= 0) {
      toast.error("Free trial limit reached. Please upgrade to continue.");
      return false;
    }
    
    return true;
  };

  const decrementLeadCount = () => {
    if (!user || user.isPremium) return;
    
    const newLeadsRemaining = Math.max(0, user.leadsRemaining - 1);
    const updatedUser = { ...user, leadsRemaining: newLeadsRemaining };
    
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    
    if (newLeadsRemaining === 0) {
      toast.warning("You've used all your free trial leads. Upgrade to continue.");
    } else if (newLeadsRemaining <= 3) {
      toast.info(`Only ${newLeadsRemaining} free leads remaining.`);
    }
  };

  return {
    checkLeadLimit,
    decrementLeadCount,
  };
};
