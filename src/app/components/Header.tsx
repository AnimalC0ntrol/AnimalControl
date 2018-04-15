import * as React from 'react'
import Link from 'next/link'

export default () => (
  <header>
    <Link href="/">
      <h1>
        Animal<span>Control</span>
      </h1>
    </Link>
    <nav>
      <Link href="/units">
        <a>Units</a>
      </Link>
      <Link href="/map">
        <a>Map</a>
      </Link>
    </nav>
    <style jsx>{`
      header {
        padding: 15px 0px;
        display: flex;
        align-items: baseline;
      }

      h1 {
        color: #010101;
        margin: 0;
        padding: 0;
        margin-right: 30px;
        transition: color 0.3s;
        cursor: pointer;
      }

      h1:hover > span {
        color: #010101;
      }

      h1 span {
        color: #a1a1a1;
        transition: color 0.3s;
      }

      nav {
        display: flex;
      }

      nav a {
        color: #a1a1a1;
        text-decoration: none;
        margin-right: 15px;
      }

      nav a:hover {
        color: #010101;
      }

      nav a.is-active {
        color: pink;
      }
    `}</style>
  </header>
)
