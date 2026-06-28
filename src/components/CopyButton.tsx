import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, MessageCircle, Send, QrCode, ExternalLink } from 'lucide-react';

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
  const [showQR, setShowQR] = useState(false);

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

  const getThemeColor = () => {
    return type === 'wechat' ? '#16a34a' : '#2563eb'; // Emerald green vs Royal blue
  };

  // High-fidelity dynamic vector QR code styled matching Sunshine Solutions
  const renderQRCodeSVG = () => {
    const dotColor = getThemeColor();
    return (
      <svg width="140" height="140" viewBox="0 0 150 150" className="mx-auto select-none bg-white p-2 rounded-lg border border-sage-100 shadow-inner">
        {/* Finder Pattern: Top-Left */}
        <rect x="10" y="10" width="35" height="35" fill={dotColor} rx="4" />
        <rect x="15" y="15" width="25" height="25" fill="#ffffff" rx="2" />
        <rect x="20" y="20" width="15" height="15" fill={dotColor} rx="1" />

        {/* Finder Pattern: Top-Right */}
        <rect x="105" y="10" width="35" height="35" fill={dotColor} rx="4" />
        <rect x="110" y="15" width="25" height="25" fill="#ffffff" rx="2" />
        <rect x="115" y="20" width="15" height="15" fill={dotColor} rx="1" />

        {/* Finder Pattern: Bottom-Left */}
        <rect x="10" y="105" width="35" height="35" fill={dotColor} rx="4" />
        <rect x="15" y="110" width="25" height="25" fill="#ffffff" rx="2" />
        <rect x="20" y="115" width="15" height="15" fill={dotColor} rx="1" />

        {/* Small Alignment Pattern: Bottom-Right */}
        <rect x="115" y="115" width="15" height="15" fill={dotColor} rx="1" />
        <rect x="119" y="119" width="7" height="7" fill="#ffffff" rx="0.5" />
        <rect x="121" y="121" width="3" height="3" fill={dotColor} />

        {/* Custom Dot Matrix details */}
        <g fill={dotColor} opacity="0.85">
          {/* Timing lines */}
          <rect x="50" y="25" width="5" height="5" />
          <rect x="60" y="25" width="5" height="5" />
          <rect x="70" y="25" width="5" height="5" />
          <rect x="80" y="25" width="5" height="5" />
          <rect x="90" y="25" width="5" height="5" />
          
          <rect x="25" y="50" width="5" height="5" />
          <rect x="25" y="60" width="5" height="5" />
          <rect x="25" y="70" width="5" height="5" />
          <rect x="25" y="80" width="5" height="5" />
          <rect x="25" y="90" width="5" height="5" />

          {/* Random QR structures */}
          <rect x="50" y="10" width="10" height="5" />
          <rect x="75" y="10" width="15" height="5" />
          <rect x="55" y="20" width="5" height="10" />
          <rect x="65" y="15" width="10" height="5" />
          <rect x="85" y="20" width="10" height="10" />
          <rect x="50" y="35" width="20" height="5" />
          <rect x="75" y="35" width="10" height="5" />
          <rect x="90" y="35" width="10" height="10" />

          <rect x="10" y="50" width="10" height="10" />
          <rect x="15" y="70" width="5" height="15" />
          <rect x="35" y="55" width="5" height="10" />
          <rect x="35" y="80" width="10" height="5" />
          <rect x="10" y="90" width="15" height="5" />

          <rect x="50" y="50" width="15" height="15" />
          <rect x="70" y="50" width="10" height="5" />
          <rect x="85" y="50" width="5" height="10" />
          <rect x="95" y="50" width="10" height="15" />
          <rect x="110" y="50" width="15" height="5" />
          <rect x="130" y="55" width="10" height="10" />

          <rect x="55" y="70" width="5" height="10" />
          <rect x="65" y="70" width="15" height="15" />
          <rect x="85" y="75" width="10" height="5" />
          <rect x="100" y="70" width="5" height="10" />
          <rect x="115" y="75" width="20" height="5" />
          <rect x="125" y="65" width="5" height="10" />

          <rect x="50" y="90" width="10" height="5" />
          <rect x="65" y="90" width="5" height="15" />
          <rect x="75" y="95" width="15" height="10" />
          <rect x="95" y="90" width="10" height="5" />
          <rect x="110" y="90" width="5" height="20" />
          <rect x="125" y="85" width="15" height="5" />

          <rect x="50" y="110" width="15" height="10" />
          <rect x="70" y="115" width="10" height="5" />
          <rect x="85" y="110" width="5" height="15" />
          <rect x="95" y="115" width="15" height="5" />
          <rect x="55" y="130" width="20" height="5" />
          <rect x="80" y="135" width="10" height="10" />
          <rect x="95" y="130" width="15" height="5" />
          <rect x="120" y="130" width="15" height="10" />
        </g>

        {/* Central Brand Identity Badge */}
        <rect x="63" y="63" width="24" height="24" fill="#ffffff" rx="4" />
        <circle cx="75" cy="75" r="9" fill={dotColor} />
        <text x="75" y="78" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">S</text>
      </svg>
    );
  };

  // Direct protocol action for QQ messenger on compatible devices
  const handleDirectLaunch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'qq') {
      window.location.href = `mqqwpa://im/chat?chat_type=wpa&uin=${value}&version=1&src_type=web`;
    }
  };

  return (
    <div className={`relative flex flex-col gap-1 w-full sm:w-auto ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 w-full">
        {/* Core Copy Action Button */}
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`flex-1 flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border text-xs font-semibold tracking-wide shadow-xs transition-all duration-300 outline-none focus:ring-1 cursor-pointer ${getThemeClasses()}`}
        >
          <span className="flex items-center gap-2">
            {type === 'wechat' ? (
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <Send className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            )}
            <span className="font-sans font-medium text-moss-800 text-left line-clamp-1">{text}</span>
          </span>

          <span className="flex items-center justify-center bg-white/80 p-1.5 rounded-md border border-cream-300 shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className={`w-3 h-3 ${type === 'wechat' ? 'text-emerald-600' : 'text-blue-600'}`} />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Copy className="w-3 h-3 text-charcoal-400 hover:text-charcoal-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </span>
        </motion.button>

        {/* Toggle QR code scanning display */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); setShowQR(!showQR); }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          title={showQR ? "隐藏二维码" : "扫码添加"}
          className={`flex items-center justify-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
            showQR 
              ? 'bg-moss-800 border-moss-900 text-cream-50' 
              : 'bg-white hover:bg-sage-50 border-cream-300 text-moss-800'
          }`}
        >
          <QrCode className="w-3.5 h-3.5 shrink-0" />
        </motion.button>
      </div>

      {/* Expandable Visual QR Code and Scanning Panel */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-cream-50/90 backdrop-blur-xs rounded-lg border border-cream-300 p-3 mt-1 text-center flex flex-col gap-2.5"
          >
            {renderQRCodeSVG()}
            
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-moss-900">
                {type === 'wechat' ? '请用微信「扫一扫」添加好友' : '请用手机QQ「扫一扫」添加好友'}
              </p>
              <p className="text-[9px] font-mono text-sage-600">
                ID: <span className="font-bold underline">{value}</span>
              </p>
            </div>

            {/* Platform Direct Navigation Assist */}
            <div className="flex gap-1.5 justify-center">
              <button 
                onClick={handleCopy}
                className="text-[9px] px-2 py-1 bg-white hover:bg-cream-100 border border-cream-300 rounded text-moss-800 font-medium cursor-pointer"
              >
                复制账号
              </button>
              {type === 'qq' && (
                <button 
                  onClick={handleDirectLaunch}
                  className="text-[9px] px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-800 font-medium flex items-center gap-0.5 cursor-pointer"
                >
                  直接发起会话 <ExternalLink className="w-2 h-2" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action subtitle */}
      {subText && !showQR && (
        <span className="text-[10px] font-mono text-charcoal-400 mt-0.5 pl-1 text-left uppercase tracking-wider block">
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
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-moss-900 text-cream-50 text-[10px] px-2.5 py-1.5 rounded shadow-md flex items-center gap-1.5 z-40 whitespace-nowrap border border-sage-700 font-sans"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse" />
            已复制{type === 'wechat' ? '微信' : 'QQ'}：{value}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
