import { React, useState } from 'react'

export default function Navbar(props) {
    const { genres, setGenre, searchValue, setSearchValue, title, setTitle, active } = props

    const years = []
    for (let year = 2025; year >= 1980; year--) {
        years.push(year);
    }

    return (
        <nav className='container-fluid position-fixed z-1 d-flex gap-4 align-items-center ms-5 px-5 text-light'
            style={{ marginTop: '5.5rem', height: '8%', background: '#2f3444' }}>
            <div className='dropdown ms-5'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='genresDropdown' data-bs-toggle='dropdown' aria-expanded='false'
                    disabled={active !== 'Home'}>
                    {title}
                </button>
                <ul className='dropdown-menu' aria-labelledby='genresDropdown'>
                    {genres.map((genre) => (
                        <li key={genre.id}>
                            <a className='dropdown-item' href='#' onClick={() => { setGenre(genre.id), setTitle(genre.name) }}>
                                {genre.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <form className='d-flex w-25'>
                <input className='form-control' type='search' placeholder='Search' aria-label='Search' value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} disabled={active !== 'Home'} />
            </form>
            <h4 className='ms-auto mb-0 me-3'>Watch movies and series online for free</h4>
        </nav>
    )
}
