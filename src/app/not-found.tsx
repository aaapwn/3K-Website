import Link from 'next/link';
// import { Button } from "@heroui/button"
import { ArrowLeft, BellIcon as Whistle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#E35205] flex flex-col items-center justify-center text-white p-4">
      <div className="text-center">
        <Whistle className="w-24 h-24 mx-auto mb-8 animate-bounce" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-6">ออกนอกสนาม!</h2>
        <p className="text-xl mb-8 max-w-md mx-auto">
          โอ๊ะ! ดูเหมือนว่าคุณจะหลุดออกนอกสนามแล้ว, กรุณาตรวจสอบ URL อีกครั้ง
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-white opacity-20 blur-lg rounded-full"></div>
          <Link
            href="/"
            className="px-24 rounded-full py-2 inline-flex items-center relative bg-[#FFC72C] text-[#E35205] hover:bg-[#FFD700]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
      <div className="mt-16 flex space-x-4">
        {['⚽', '🏀', '🏈', '⚾', '🏒', '🎾'].map((emoji, index) => (
          <span key={index} className="text-4xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
