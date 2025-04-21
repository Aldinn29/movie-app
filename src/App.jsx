import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Modal from './components/Modal'

function App() {

  const navElements = [
    { title: 'Home', icon: 'fa-solid fa-house' },
    { title: 'Movies', icon: 'fa-solid fa-film' },
    { title: 'TV Series', icon: 'fa-solid fa-desktop' },
    { title: 'Trending', icon: 'fa-solid fa-fire' },
    { title: 'Top', icon: 'fa-solid fa-trophy' },
    { title: 'Upcoming', icon: 'fa-solid fa-calendar-check' },
  ]

  const [active, setActive] = useState('Home')
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [topSeries, setTopSeries] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingSeries, setTrendingSeries] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [upcomingSeries, setUpcomingSeries] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [modal, setModal] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  const [title, setTitle] = useState('Genre')

  const fetchGenres = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    return data.genres
  }

  const renderMovies = (data) => {
    return data.map((item) => (
      <div key={item.id} className='col-2' onMouseEnter={() => setHoveredItem(item)} onMouseLeave={() => setHoveredItem(null)}>
        {hoveredItem && hoveredItem.id === item.id ? (
          <div className='card text-start text-light rounded-0' style={{ width: '12rem', background: '#1d1b24', height: '288px', cursor: 'pointer' }}
            data-aos='zoom-in' onClick={() => setModal(item)}>
            <div className='card-body'>
              <h5 className='card-title mb-3' style={{
                overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2, textOverflow: 'ellipsis', whiteSpace: 'normal'
              }}>{item.title || item.name}</h5>
              <p className='card-text text-secondary' style={{
                overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 6, textOverflow: 'ellipsis', whiteSpace: 'normal'
              }}>{item.overview}</p>
              <div className='card-footer d-flex justify-content-between position-absolute bottom-0 start-0 w-100'>
                <p className='card-text fw-bold'><i className="fa-solid fa-star text-warning"></i>{item.vote_average.toFixed(1)}</p>
                <p className='card-text'>{item.release_date ? item.release_date.split('-')[0] : 'N/A'}</p>
              </div>
            </div>
          </div>
        ) : (
          <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className='mb-5' style={{ width: '12rem' }} />
        )}
      </div>
    ))
  }

  const handlePage = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1
      } else if (direction === 'next') {
        return prevPage + 1
      }
      return prevPage
    })
  }

  const handleMovieUrl = (searchValue, genre, currentPage) => {
    if (searchValue) {
      return `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}&query=${searchValue}`
    } else if (genre) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}&with_genres=${genre}`
    } else {
      return `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
    }
  }

  const handleTvUrl = (searchValue, genre, currentPage) => {
    if (searchValue) {
      return `https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}&query=${searchValue}`
    } else if (genre) {
      return `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}&with_genres=${genre}`
    } else {
      return `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
    }
  }

  useEffect(() => {
    AOS.init({ duration: 600, once: true })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const genresData = await fetchGenres()
        setGenres(genresData)

        let url = ''
        if (active === "Home") {
          url = handleMovieUrl(searchValue, genre, currentPage)
          const movieResponse = await fetch(url)
          const movieData = await movieResponse.json()
          setMovies(movieData.results)

          url = handleTvUrl(searchValue, genre, currentPage)
          const seriesResponse = await fetch(url)
          const seriesData = await seriesResponse.json()
          setSeries(seriesData.results)

        } else if (active === "Movies") {
          url = handleMovieUrl(searchValue, genre, currentPage)
          const moviesResponse = await fetch(url);
          const moviesData = await moviesResponse.json()
          setMovies(moviesData.results)

        } else if (active === "TV Series") {
          url = handleTvUrl(searchValue, genre, currentPage)
          const seriesResponse = await fetch(url);
          const seriesData = await seriesResponse.json()
          setSeries(seriesData.results)
        }
        else if (active === "Trending") {
          url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
          const trendingMoviesResponse = await fetch(url);
          const trendingMoviesData = await trendingMoviesResponse.json();
          setTrendingMovies(trendingMoviesData.results);

          url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
          const trendingSeriesResponse = await fetch(url);
          const trendingSeriesData = await trendingSeriesResponse.json();
          setTrendingSeries(trendingSeriesData.results);

        } else if (active === "Top") {
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
          const topMoviesResponse = await fetch(url);
          const topMoviesData = await topMoviesResponse.json()
          setTopMovies(topMoviesData.results)

          url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
          const topSeriesResponse = await fetch(url);
          const topSeriesData = await topSeriesResponse.json()
          setTopSeries(topSeriesData.results)

        } else if (active === "Upcoming") {
          url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
          const upcomingMoviesResponse = await fetch(url);
          const upcomingMoviesData = await upcomingMoviesResponse.json();
          setUpcomingMovies(upcomingMoviesData.results);

          url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
          const airingTodaySeriesResponse = await fetch(url);
          const airingTodaySeriesData = await airingTodaySeriesResponse.json();
          setUpcomingSeries(airingTodaySeriesData.results);
        }
      } catch (error) {
        console.error(error)
      } finally { setLoading(false) }
    }
    fetchData()
  }, [active, searchValue, genre, currentPage])

  return (
    <>
      <div className='container-fluid text-white py-3 px-5 position-fixed z-3' style={{ background: '#282c39' }}>
        <h1>Movies<span className='text-primary'>TMDB</span></h1>
      </div>
      <Navbar genres={genres} setGenre={setGenre} searchValue={searchValue} setSearchValue={setSearchValue} title={title} setTitle={setTitle} active={active} />
      <Sidebar navElements={navElements} active={active} setActive={setActive} setModal={setModal} setSearchValue={setSearchValue}
        setGenre={setGenre} setTitle={setTitle} setCurrentPage={setCurrentPage} />
      {!modal ? (<Main movies={movies} series={series} topMovies={topMovies} topSeries={topSeries} trendingMovies={trendingMovies} trendingSeries={trendingSeries}
        upcomingMovies={upcomingMovies} upcomingSeries={upcomingSeries} loading={loading} active={active} renderMovies={renderMovies} handlePage={handlePage} />)
        : (<Modal modal={modal} setModal={setModal} genres={genres} />)}
    </>
  )
}

export default App
