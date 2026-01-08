import { useState } from 'react';
import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { ArrowLeft, Star, Send, Check } from 'lucide-react';

interface FeedbackPageProps {
  onBack: () => void;
}

export function FeedbackPage({ onBack }: FeedbackPageProps) {
  const [ratings, setRatings] = useState({
    sessions: 0,
    venue: 0,
    food: 0,
    transportation: 0,
  });
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'sessions', label: 'Sessions & Content' },
    { id: 'venue', label: 'Venue & Facilities' },
    { id: 'food', label: 'Food & Catering' },
    { id: 'transportation', label: 'Transportation' },
  ];

  const handleRating = (category: string, rating: number) => {
    setRatings({ ...ratings, [category]: rating });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const allRated = Object.values(ratings).every(r => r > 0);

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-3xl mx-auto py-6 z-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <GlassCard>
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-white">Event Feedback</h1>
            </div>
          </GlassCard>
        </motion.div>

        {!submitted ? (
          <>
            {/* Rating Categories */}
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="mb-4"
              >
                <GlassCard>
                  <h3 className="text-white mb-3">{category.label}</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onClick={() => handleRating(category.id, star)}
                        className="focus:outline-none"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= ratings[category.id as keyof typeof ratings]
                              ? 'fill-[#0092E4] text-[#0092E4]'
                              : 'text-blue-200/30'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Comment Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <GlassCard>
                <h3 className="text-white mb-3">Additional Comments</h3>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts and suggestions..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-blue-200/50 focus:outline-none focus:border-[#0092E4] focus:ring-2 focus:ring-[#0092E4]/50 transition-all resize-none"
                />
              </GlassCard>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={handleSubmit}
                disabled={!allRated}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Submit Feedback
                  <Send className="w-5 h-5" />
                </span>
              </motion.button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard neonBorder className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-white mb-2">Thank You!</h2>
              <p className="text-blue-200">
                Your feedback has been submitted successfully
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
