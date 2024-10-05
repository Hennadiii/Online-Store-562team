import { Button } from '../ui/button';
import { Input } from '../ui/input';

const LoginForm: React.FC = () => {
  return (
    <form className="flex flex-col gap-y-5">
      <h1 className="text-center text-[32px] font-medium">
        Login to your personal account
      </h1>
      <Input placeholder="email" />
      <Input placeholder="password" />
      <a className="text-axcent cursor-pointer underline">Forgot password?</a>
      <Button>Sign in</Button>
      <hr className="h-[2px] w-full bg-black" />
      <Button className="flex items-center justify-center gap-x-3">
        <img src="google.svg" /> Login With Google
      </Button>
      <hr className="h-[2px] w-full bg-black" />
      <div className="flex items-center gap-x-5">
        <span>Have no account?</span>
        <a className="cursor-pointer font-bold underline">Register</a>
      </div>
    </form>
  );
};

export default LoginForm;
