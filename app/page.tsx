import MoodSelector from '@/components/MoodSelector';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,50,200,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                What&apos;s your mood?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-4">
              Skip the endless scrolling. Tell us how you feel, 
              and we&apos;ll find the perfect movie for your mood.
            </p>
            <p className="text-sm text-gray-500">
              No genres. No algorithms. Just vibes. 🎬
            </p>
          </div>

          {/* Mood Selector */}
          <MoodSelector />
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 border-t border-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Pick Your Mood</h3>
              <p className="text-gray-400 text-sm">
                Select how you&apos;re feeling right now from our expressive mood options.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ll curate a list of movies that match your current vibe.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Watch & Enjoy</h3>
              <p className="text-gray-400 text-sm">
                Find your movie, grab some popcorn, and enjoy the perfect watch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
