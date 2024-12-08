import { FaHeart } from 'react-icons/fa' // Importing a heart icon

export default function Footer() {
  return (
    <footer id="contact" className="fixed bottom-0 w-full py-5 bg-gradient-to-r from-green-100 to-blue-200">
      <div className="text-center text-black font-sans">
        Built with <FaHeart className="inline text-green-500" /> by
        <a href="https://github.com/adityadafe" target="_blank" rel="noopener noreferrer" className="ml-1 underline">
          Kakashi
        </a>
      </div>
    </footer>
  )
}
