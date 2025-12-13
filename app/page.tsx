import RunningLine from "@/components/RunningLine";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-emerald-900 flex-1 flex-row relative">
        <div className="p-3 space-y-2">
          <h1 className="font-extrabold text-3xl text-white mb-1">
            Just a Sample Heading
          </h1>
          <p className="text-justify">
            An example of a short article about weight loss under conditions of
            endless bulking while maintaining a cheese-based diet, combined with
            living on the 15th floor of that very apartment building.
          </p>
        </div>
        <div className="text-white p-1 bg-green-950 absolute bottom-0 w-dvw">
          <RunningLine>
            <p>Lol, such a funny meme-absolutely hilarious!</p>
          </RunningLine>
        </div>
      </main>
    </div>
  );
}
