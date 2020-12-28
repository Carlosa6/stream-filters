import React from 'react'

export default function SidebarItem({ name, active, handleClick }) {
    return (
        <button 
            // href="!#" 
            className={`list-group-item list-group-item-action bg-dark text-white ${active ? 'bg-primary active' : ''}`}
            onClick={handleClick}
        >
            {name}
        </button>
    )
}
