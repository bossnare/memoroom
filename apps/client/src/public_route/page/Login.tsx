import logo from '@/assets/icon_32x32_mono.svg';
import github from '@/assets/providers/github.svg';
import google from '@/assets/providers/google.svg';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/services/auth-client.service';

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-6">
      <span className="flex items-center gap-2 text-xl font-bold">
        <img src={logo} className="size-7" alt="Logo" loading="lazy" />{' '}
        <h2>Sign in</h2>{' '}
      </span>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button variant="secondary" onClick={() => AuthService.googleSign()}>
          <img
            src={google}
            className="size-5"
            alt="google-logo"
            loading="lazy"
          />{' '}
          Continue with Google
        </Button>
        <Button variant="secondary" onClick={() => AuthService.githubSign()}>
          <img
            src={github}
            className="size-5 text-blue-400"
            alt="github-logo"
            loading="lazy"
          />{' '}
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
};
