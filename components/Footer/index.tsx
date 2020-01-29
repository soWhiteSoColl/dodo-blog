import React from 'react'
import Link from 'next/link'
import './index.scss'

export default function Footer() {
  return (
    <footer className="main-footer">
      <div>
        <div className="main-footer-links">
          <span>github </span>
          <a target="_new" href="https://github.com/hanruto">
            soWhiteSoColl
          </a>
        </div>

        <div>
          <span className="main-footer-item">&copy;2018 dodo </span>
          <span className="main-footer-item">
            <Link href="/blog?id=5c2c8bf7e71e1855ab4d18f0">
              <a>关于小寒</a>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
