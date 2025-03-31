
import Navbar from "@/components/Navbar";
import SignUpForm from "@/components/SignUpForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <SignUpForm />
      </main>
    </div>
  );
};

export default Signup;
