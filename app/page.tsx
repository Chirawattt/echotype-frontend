import VocabGame from "./components/VocabGame";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "English Vocabulary Game",
  description: "Learn English vocabulary with this interactive game"
};

export default function Home() {
  return (
    <VocabGame />
  );
}
