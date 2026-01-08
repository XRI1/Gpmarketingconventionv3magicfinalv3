import { useState } from 'react';
import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { Check, Beef, Drumstick, Fish, Leaf, Wheat } from 'lucide-react';

interface FoodPreferencePageProps {
  onBack: () => void;
  onHome: () => void;
}

export function FoodPreferencePage({ onBack, onHome }: FoodPreferencePageProps) {
  const [selectedMeat, setSelectedMeat] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const meatOptions = [
    { id: 'beef', label: 'Beef', icon: Beef },
    { id: 'chicken', label: 'Chicken', icon: Drumstick },
    { id: 'fish', label: 'Fish', icon: Fish },
    { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
    { id: 'vegan', label: 'Vegan', icon: Wheat },
  ];

  const allergyOptions = [
    'Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy'
  ];

  const toggleAllergy = (allergy: string) => {
    setAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="max-w-3xl mx-auto z-10 relative">
        <PageHeader 
          title="Food Preferences" 
          onBack={onBack}
          onHome={onHome}
        />

        {!submitted ? (
          <>
            {/* Meat Preference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <GlassCard neonBorder>
                <h2 className="text-white mb-4">Select Your Preference</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {meatOptions.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setSelectedMeat(option.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedMeat === option.id
                          ? 'border-[#0092E4] bg-[#0092E4]/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <option.icon className={`w-12 h-12 mx-auto mb-2 ${
                        selectedMeat === option.id ? 'text-[#0092E4]' : 'text-blue-200'
                      }`} />
                      <p className={`text-sm ${
                        selectedMeat === option.id ? 'text-white' : 'text-blue-200'
                      }`}>
                        {option.label}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Allergies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <GlassCard>
                <h2 className="text-white mb-4">Allergies (Optional)</h2>
                <div className="flex flex-wrap gap-3">
                  {allergyOptions.map((allergy, index) => (
                    <motion.button
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        allergies.includes(allergy)
                          ? 'bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white'
                          : 'bg-white/10 border border-white/30 text-blue-200 hover:bg-white/20'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {allergy}
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={handleSubmit}
                disabled={!selectedMeat}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Submit Food Preference
                  <Check className="w-5 h-5" />
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
              <h2 className="text-white mb-2">Preference Saved!</h2>
              <p className="text-blue-200">Your food preferences have been recorded successfully</p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
