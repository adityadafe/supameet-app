import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-white bg-opacity-80 backdrop-blur-md' : 'bg-transparent'
                }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-gray-900">
                    NextGen
                </a>
                <nav>
                    <ul className="flex space-x-8">
                        <li><a href="#features" className="text-gray-900 hover:text-gray-600">Features</a></li>
                        <li><a href="#testimonials" className="text-gray-900 hover:text-gray-600">Testimonials</a></li>
                        <li><a href="#contact" className="text-gray-900 hover:text-gray-600">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    )
}
