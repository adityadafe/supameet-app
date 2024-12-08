import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa' // Importing a heart icon

export default function Footer() {
  return (
    <footer id="contact" className="mt-[-10vh] py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="text-center text-white">
        Built with <FaHeart className="inline text-green-500" /> by 
        <a href="https://github.com/adityadafe" target="_blank" rel="noopener noreferrer" className="ml-1 underline">
          Kakashi
        </a>
      </div>
    </footer>
  )
}