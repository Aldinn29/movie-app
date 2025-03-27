import React from 'react'

export default function Sidebar(props) {
    const { navElements, active, setActive, setModal, setSearchValue, setGenre, setTitle } = props

    return (
        <nav className="d-flex flex-column vh-100 text-white position-fixed z-2" style={{ background: '#0f1319', width: '8%' }}>
            <h4 className="text-center mb-4 mt-5">Menu</h4>
            <ul className="nav flex-column">
                {navElements.map((item, index) => (
                    <li key={index} className="nav-item ">
                        <button className={`btn text-white rounded-0 w-100 d-flex flex-column gap-1 py-3 fs-5 ${active === item.title ? 'btn-primary' : ''}`}
                            onClick={() => { setActive(item.title), setModal(null), setSearchValue(''), setGenre(''), setTitle('Genre') }}>
                            <i className={item.icon}></i> {item.title}
                        </button>
                    </li>
                ))}
            </ul>
        </nav >
    )
}
