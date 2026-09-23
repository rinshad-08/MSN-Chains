import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1rem' }}>MSN CHAINS</h4>
            <p className="footer-about">
              Crafting timeless elegance. Discover the finest selection of premium jewelry chains, designed for those who appreciate true luxury.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/service">Our Services</Link></li>
              <li><Link href="/blog">Jewelry Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Jewelry Care</a></li>
              <li><a href="#">Warranty</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=11.2488425%2C75.783921"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kozhikode, Kerala
                  <br />
                  India
                </a>
              </li>
              <li><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
              <li><a href="mailto:info@msnchains.com">info@msnchains.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MSN CHAINS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
