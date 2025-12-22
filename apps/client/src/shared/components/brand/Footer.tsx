import { Button } from '@/components/ui/button';

export const Footer = ({
  content = 'haveContent',
}: {
  content?: 'haveContent' | 'noContent';
}) => {
  return (
    <div className="text-sm text-center text-balance text-muted-foreground">
      &copy; {new Date().getFullYear()}{' '}
      <span className="tracking-tighter text-foreground">Memoroom</span> -
      powered by{' '}
      <a href="https://github.com/bossnare">
        <Button className="p-0 text-foreground" variant="link">
          Christo Razafimanga
        </Button>
      </a>
      {/*  */}
      {content === 'haveContent' && (
        <ul className="flex flex-wrap items-center justify-center mx-auto space-x-4">
          <li>Madagascar - Madagascar</li>
          <span>|</span>
          <li>
            <a href="#">
              <Button className="p-0 text-muted-foreground" variant="link">
                How use it ?
              </Button>
            </a>
          </li>
          <span>|</span>
          <li>
            <a href="#">
              <Button className="p-0 text-muted-foreground" variant="link">
                More different
              </Button>
            </a>
          </li>
          <span>|</span>
          <li>
            <a href="#">
              <Button className="p-0 text-muted-foreground" variant="link">
                Does not work ?
              </Button>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};
