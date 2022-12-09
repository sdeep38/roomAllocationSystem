import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function ScrollMenu() {
  return (
    <div className="scroll-menu">
        <div className="container">
          <div className="row">
            <div className="bottom-nav">
              <ul className="nav-tabs">
                <li className="slide-menu-item"><Link className="item-link active">Dashboard</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Allocate Room</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Room Details</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Free</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Resources</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}
