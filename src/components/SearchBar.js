import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import './SearchBar.css';

const SearchBar = () => {
    const context = useContext(noteContext);
    const { searchTerm, setSearchTerm, filterTag, setFilterTag, getUniqueTags } = context;
    const uniqueTags = getUniqueTags();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTagFilterChange = (e) => {
        setFilterTag(e.target.value);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilterTag('');
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar-header">
                <h3><i className="fa-solid fa-filter"></i> Filter Blogs</h3>
            </div>
            
            <div className="search-bar-content">
                <div className="search-group">
                    <label htmlFor="search-input" className="search-label">
                        <i className="fa-solid fa-magnifying-glass"></i> Search
                    </label>
                    <input
                        id="search-input"
                        type="text"
                        className="form-control search-input"
                        placeholder="Search by title or content..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="tag-group">
                    <label htmlFor="tag-filter" className="tag-label">
                        <i className="fa-solid fa-tag"></i> Category
                    </label>
                    <select
                        id="tag-filter"
                        className="form-control tag-filter"
                        value={filterTag}
                        onChange={handleTagFilterChange}
                    >
                        <option value="">All Categories</option>
                        {uniqueTags.map((tag, index) => (
                            <option key={index} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="btn btn-secondary clear-btn"
                    onClick={clearFilters}
                    disabled={!searchTerm && !filterTag}
                    title="Clear all filters"
                >
                    <i className="fa-solid fa-times"></i> Clear
                </button>
            </div>

            {(searchTerm || filterTag) && (
                <div className="filter-status">
                    <p>
                        {searchTerm && (
                            <span className="filter-badge">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                {searchTerm}
                            </span>
                        )}
                        {filterTag && (
                            <span className="filter-badge">
                                <i className="fa-solid fa-tag"></i>
                                {filterTag}
                            </span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
