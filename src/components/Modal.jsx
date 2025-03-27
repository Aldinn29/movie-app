import { React, useEffect, useState } from 'react'

export default function Modal(props) {
    const { modal, setModal, genres } = props
    const [videoKey, setVideoKey] = useState(null)

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    const getGenres = (genreIds) => {
        return genreIds.map(genreId => {
            const genre = genres.find(g => g.id === genreId)
            return genre ? genre.name : null
        }).filter(Boolean).join(', ')
    }

    const fetchTrailer = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${modal.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
            const data = await response.json()
            if (data.results && data.results.length > 0) {
                setVideoKey(data.results[0].key)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTrailer()
    }, [modal])

    return (
        <div className='modal d-flex position-fixed top-0 left-0'
            style={{
                backgroundColor: '#282c39', marginTop: '9rem', marginLeft: '7.95rem', width: 'calc(100vw - 7.95rem)', height: 'calc(100vh - 9rem)',
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${modal.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
            <div className='overlay position-fixed top-0 left-0 w-100 h-100 z-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', marginTop: '9rem' }}></div>
            <div className='d-flex flex-column text-light gap-5 p-4 z-2'>
                <div className='d-flex gap-5'>
                    <button className='btn btn-secondary position-absolute top-0 end-0 m-3 px-2 py-0 fs-5' onClick={() => setModal(null)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${modal.poster_path}`} alt={modal.title} style={{ width: '20rem' }} />
                    </div>
                    <div className='d-flex flex-column my-auto gap-4'>
                        <h1>{modal.title || modal.name}</h1>
                        <p className='fs-5'>{modal.overview}</p>
                        <p className='fs-5'><strong>Release Date:</strong> {formatDate(modal.release_date)}</p>
                        <p className='fs-5'><strong>Rating:</strong> {modal.vote_average ? modal.vote_average.toFixed(1) : 'N/A'} <i className="fa-solid fa-star text-warning"></i></p>
                        <p className='fs-5'><strong>Genres:</strong> {getGenres(modal.genre_ids)}</p>
                    </div>
                </div>
                <div className='d-flex flex-column gap-3'>
                    {videoKey && (
                        <>
                            <h2 className='ms-5 ps-4'>Trailer</h2>
                            <iframe src={`https://www.youtube.com/embed/${videoKey}`} title='Trailer' width='90%' height='600' frameBorder='0'
                                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen className='mb-5 mx-auto'
                            ></iframe>
                        </>
                    )}
                </div>
            </div>
        </div>

    )
}
