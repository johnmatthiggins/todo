import { Button } from './components/ui/button.tsx';

function Home() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col justify-center items-start h-full">
        <div>
          <Button variant="link" asChild className="flex gap-2 text-lg">
            <a href="/todo/" className="flex">
              <img className="w-5" src="/static/wave.svg" /> Current Tasks
            </a>
          </Button>
        </div>
        <div>
          <Button variant="link" asChild className="flex gap-2 text-lg">
            <a href="/upcoming/" className="flex">
              <img className="w-5" src="/static/upcoming.svg" /> Upcoming Tasks
            </a>
          </Button>
        </div>
        <div>
          <Button variant="link" asChild className="flex gap-2 text-lg">
            <a href="/completed/" className="flex">
              <img className="w-5" src="/static/checkmark.svg" /> Completed Tasks
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
