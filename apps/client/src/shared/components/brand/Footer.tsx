import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <div className="text-center text-sm text-balance text-muted-foreground">
      &copy; {new Date().getFullYear()}{' '}
      <span className="tracking-tighter text-foreground">Memoroom</span> -
      powered by{' '}
      <a href="https://github.com/bossnare">
        <Button className="p-0 text-foreground" variant="link">
          Christo Razafimanga
        </Button>
      </a>
    </div>
  );
};
