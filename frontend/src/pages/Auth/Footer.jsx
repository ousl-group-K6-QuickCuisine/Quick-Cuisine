import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#716a68] py-6 text-white">
      <div className="container mx-auto text-center">
        {/* Contact Info */}
        <p className="text-sm">
          Need help? Contact us at{' '}
          <a
            href="mailto:support@yourcompany.com"
            className="text-orange-500 hover:underline"
          >
            support@yourcompany.com
          </a>
        </p>

        {/* Social Media */}
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
