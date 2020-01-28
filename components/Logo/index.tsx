import React from 'react'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className="page-common-logo">
      <Link href="/">
        <img src="/static/logo.png" alt="" />
      </Link>
    </div>
  )
}
