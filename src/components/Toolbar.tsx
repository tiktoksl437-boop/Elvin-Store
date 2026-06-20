import { Home, Gamepad2, Megaphone, Star, Landmark } from 'lucide-react';
import { ActiveTab } from '../types';
import { motion } from 'motion/react';

interface ToolbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  theme: 'light' | 'kuning-biru';
}

export default function Toolbar({ activeTab, setActiveTab, theme }: ToolbarProps) {
  const isKuningBiru = theme === 'kuning-biru';

  const menuItems = [
    { id: 'beranda' as ActiveTab, label: 'Beranda', icon: Home },
    { id: 'stok' as ActiveTab, label: 'Stok Akun', icon: Gamepad2 },
    { id: 'jasapost' as ActiveTab, label: 'Jasa Post', icon: Megaphone },
    { id: 'testimoni' as ActiveTab, label: 'Testimoni', icon: Star },
    { id: 'bio' as ActiveTab, label: 'Admin Bio', icon: Landmark },
  ];

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-all duration-300 backdrop-blur-md pb-safe-bottom ${
        isKuningBiru 
          ? 'bg-slate-900/95 border-slate-800 text-slate-400 shadow-[0_-10px_25px_rgba(0,0,0,0.3)]' 
          : 'bg-white/95 border-slate-200 text-slate-500 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="max-w-md mx-auto px-4 py-2 flex justify-between items-center relative">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1.5 px-1 relative focus:outline-none transition-all group"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Sliding dynamic background indicator utilizing spring physics */}
              {isActive && (
                <motion.div 
                  layoutId="bottomTabBgPill"
                  className={`absolute rounded-xl -z-10 ${
                    isKuningBiru 
                      ? 'bg-blue-600/30 border border-blue-500/20' 
                      : 'bg-blue-100/80 border border-blue-205 border-blue-100/90'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  style={{ width: '45px', height: '38px', top: '4px' }}
                />
              )}

              {/* Icon */}
              <Icon 
                size={20} 
                className={`transition-all duration-200 ${
                  isActive 
                    ? isKuningBiru 
                      ? 'text-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' 
                      : 'text-blue-600 scale-110'
                    : 'group-hover:scale-105'
                }`}
              />

              {/* Text label */}
              <span 
                className={`text-[10px] font-semibold tracking-tight mt-1 transition-all duration-200 ${
                  isActive 
                    ? isKuningBiru 
                      ? 'text-yellow-400 font-bold' 
                      : 'text-blue-600 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
