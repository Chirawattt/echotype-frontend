import VocabGame from "./components/VocabGame";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "English Vocabulary Game",
  description: "Learn English vocabulary with this interactive game"
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            English Vocabulary Game
          </span>
        </h1>
        <div className="mb-8 max-w-2xl mx-auto">
          <p className="text-center text-gray-700 text-lg">
            ฝึกทักษะภาษาอังกฤษด้วยการฟังและพิมพ์คำศัพท์ให้ถูกต้อง<br />
            เกมนี้จะช่วยให้คุณจดจำคำศัพท์ได้ดียิ่งขึ้น
          </p>
        </div>
        <VocabGame />
      </div>
    </div>
  );
}
