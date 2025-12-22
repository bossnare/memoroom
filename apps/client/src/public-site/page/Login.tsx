import logo from '@/assets/icon_32x32_mono.svg';
import github from '@/assets/providers/github.svg';
import google from '@/assets/providers/google.svg';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/services/supabase.service';

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-6">
      <span className="flex items-center gap-2 text-xl font-bold">
        <img src={logo} className="size-7" alt="Logo" loading="lazy" />{' '}
        <h2>Sign in</h2>{' '}
      </span>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button
          size="lg"
          variant="secondary"
          onClick={() => AuthService.googleSign()}
        >
          <img src={google} className="size-5" alt="google-logo" /> Continue
          with Google
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => AuthService.githubSign()}
        >
          <img
            src={github}
            className="text-blue-400 size-5"
            alt="github-logo"
          />{' '}
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
};
