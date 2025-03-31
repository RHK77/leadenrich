
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
