import React from 'react'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className="page-common-logo">
      <Link href="/home">
        <img src="/static/logo.png" alt="" />
      </Link>
    </div>
  )
}
