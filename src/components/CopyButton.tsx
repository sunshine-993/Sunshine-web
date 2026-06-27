import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, MessageCircle, Send } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  text: string;
  subText?: string;
  type?: 'wechat' | 'qq';
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ 
  value, 
  text, 
  subText, 
  type = 'wechat',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for browsers that do not support navigator.clipboard in sandboxed iframe
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getThemeClasses = () => {
    if (type === 'wechat') {
      return 'bg-sage-50 text-moss-800 border-sage-200 hover:bg-sage-100 hover:border-sage-400 focus:ring-sage-200';
    }
    return 'bg-cream-100 text-moss-800 border-cream-300 hover:bg-cream-200 hover:border-sage-400 focus:ring-sage-200';
  };

  return (
    <div className={`relative inline-flex flex-col gap-1 w-full sm:w-auto ${className}`}>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-between gap-3 px-5 py-3 rounded-xl border text-sm font-semibold tracking-wide shadow-sm transition-all duration-300 outline-none focus:ring-2 cursor-pointer ${getThemeClasses()}`}
      >
        <span className="flex items-center gap-2">
          {type === 'wechat' ? (
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <Send className="w-4 h-4 text-blue-600 shrink-0" />
          )}
          <span className="font-display">{text}</span>
        </span>

        <span className="flex items-center justify-center bg-white/80 p-1.5 rounded-lg border border-cream-300 shrink-0">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <Check className={`w-3.5 h-3.5 ${type === 'wechat' ? 'text-emerald-600' : 'text-blue-600'}`} />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Copy className="w-3.5 h-3.5 text-charcoal-500 hover:text-charcoal-800" />
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      {/* Action subtitle */}
      {subText && (
        <span className="text-[10px] font-mono text-charcoal-500 mt-1 pl-1 text-left uppercase tracking-wider block">
          ⚡️ {subText}
        </span>
      )}

      {/* Floating success notification badge */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-moss-800 text-cream-50 text-[11px] px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 z-40 whitespace-nowrap border border-sage-700 font-sans"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse" />
            已成功复制 {type === 'wechat' ? '微信' : 'QQ'} 号「{value}」
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
