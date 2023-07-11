import { Link, NavLink, useLocation } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
    const location = useLocation()
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li
                    className={ location.pathname === "/" ? 'active' : '' }
                >
                    <NavLink to="/">Home</NavLink>
                </li>
                <li
                    className={ location.pathname === "/post" ? 'active' : '' }
                >
                    <NavLink to="post">Post</NavLink>
                </li>
                <li
                    className={ location.pathname === "/about" ? 'active' : '' }
                >
                    <NavLink to="about">About</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
