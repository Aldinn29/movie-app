import { React, use, useEffect, useState } from 'react'

export default function Main(props) {
    const { movies, series, upcomingMovies, upcomingSeries, topMovies, topSeries, trendingMovies, trendingSeries, loading, active, renderMovies, handlePage } = props

    const [activeButton, setActiveButton] = useState('movies')

    function MoviesSeries(props) {
        const { moviesData, seriesData } = props

        return (
            <div className=' p-2'>
                <div className='d-flex justify-content-between py-2'>
                    <div className='d-flex gap-4'>
                        <button className={`btn ${activeButton === 'movies' ? 'text-white' : 'text-secondary'}`}
                            onClick={() => setActiveButton('movies')}>
                            <h1>Movies</h1>
                        </button>
                        <button className={`btn ${activeButton === 'series' ? 'text-white' : 'text-secondary'}`}
                            onClick={() => setActiveButton('series')}>
                            <h1>TV Series</h1>
                        </button>
                    </div>
                    <div className='d-flex gap-4 align-items-center me-3'>
                        <button className='btn btn-outline-light' onClick={() => handlePage('prev')}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button className='btn btn-outline-light' onClick={() => handlePage('next')}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div className="row text-center">
                    {activeButton === 'movies' ? renderMovies(moviesData) : renderMovies(seriesData)}
                </div>
            </div>
        )
    }

    return (
        <div className='container-fluid min-vh-100 text-white' style={{ background: '#585263', paddingTop: '9rem', paddingLeft: '8rem' }}>
            {loading ? (
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 'calc(100vh - 9rem)' }}>
                    <div className='spinner-border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {active === 'Home' && (
                        <MoviesSeries moviesData={movies} seriesData={series} />
                    )}

                    {active === 'Movies' && (
                        <div className='text-center p-2'>
                            <div className='d-flex justify-content-between py-3 mx-3'>
                                <h1>Movies</h1>
                                <div className='d-flex gap-4 align-items-center'>
                                    <button className='btn btn-outline-light' onClick={() => handlePage('prev')}>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </button>
                                    <button className='btn btn-outline-light' onClick={() => handlePage('next')}>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                {renderMovies(movies)}
                            </div>
                        </div>
                    )}

                    {active === 'TV Series' && (
                        <div className='text-center p-2'>
                            <div className='d-flex justify-content-between py-3 mx-3'>
                                <h1>Series</h1>
                                <div className='d-flex gap-4 align-items-center'>
                                    <button className='btn btn-outline-light' onClick={() => handlePage('prev')}>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </button>
                                    <button className='btn btn-outline-light' onClick={() => handlePage('next')}>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                {renderMovies(series)}
                            </div>
                        </div>
                    )}

                    {active === 'Trending' && (
                        <MoviesSeries moviesData={trendingMovies} seriesData={trendingSeries} />
                    )}

                    {active === 'Top' && (
                        <MoviesSeries moviesData={topMovies} seriesData={topSeries} />
                    )}

                    {active === 'Upcoming' && (
                        <MoviesSeries moviesData={upcomingMovies} seriesData={upcomingSeries} />
                    )}
                </>
            )}
        </div>
    )
}
