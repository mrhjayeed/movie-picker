import MoodSelector from '@/components/MoodSelector';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-100 mb-4">
              What&apos;s your mood?
            </h1>
            <p className="text-neutral-400">
              Skip the endless scrolling. Tell us how you feel, 
              and we&apos;ll find the perfect movie.
            </p>
          </div>

          {/* Mood Selector */}
          <MoodSelector />
        </div>
      </section>

      {/* How it works section */}
      <section className="py-12 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-neutral-100 text-center mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4">
              <div className="text-2xl font-semibold text-purple-400 mb-2">1</div>
              <h3 className="font-medium text-neutral-100 mb-1">Pick Your Mood</h3>
              <p className="text-sm text-neutral-500">
                Select how you&apos;re feeling right now.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-semibold text-purple-400 mb-2">2</div>
              <h3 className="font-medium text-neutral-100 mb-1">Get Recommendations</h3>
              <p className="text-sm text-neutral-500">
                We&apos;ll curate movies that match your vibe.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-semibold text-purple-400 mb-2">3</div>
              <h3 className="font-medium text-neutral-100 mb-1">Watch & Enjoy</h3>
              <p className="text-sm text-neutral-500">
                Find your movie and enjoy the perfect watch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
