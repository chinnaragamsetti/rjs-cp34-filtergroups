import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    categoryChange,
    onChangeproductsList,
    onChangerating,
    onChangefilter,
    categoryOptionId,
    ratingOptionId,
  } = props

  //  const activeId = {Activestatus: 0}

  const onChangeSearch = event => {
    if (event.key === 'Enter') {
      onChangeproductsList(event.target.value)
    }
  }

  const onClickcategory = categoryId => {
    categoryChange(categoryId)
  }

  const onClickrating = ratingId => {
    onChangerating(ratingId)
  }

  const onClickFilter = () => {
    onChangefilter()
  }

  return (
    <div className="filters-group-container">
      <div className="searchcontainer">
        <input
          type="search"
          className="search"
          placeholder="Search"
          onKeyDown={onChangeSearch}
        />
        <BsSearch className="searchicon" />
      </div>
      <h1 className="category">Category</h1>
      <ul className="categorylist">
        {categoryOptions.map(each => (
          <button
            type="button"
            className="button"
            onClick={() => onClickcategory(each.categoryId)}
          >
            <li
              className={
                categoryOptionId === each.categoryId
                  ? 'selectedcategoryeachlist'
                  : 'categoryeachlist'
              }
              key={each.categoryId}
            >
              <p>{each.name}</p>
            </li>
          </button>
        ))}
      </ul>
      <h1 className="category">Rating</h1>
      <ul className="ratinglist">
        {ratingsList.map(each => (
          <button
            type="button"
            className="button"
            onClick={() => onClickrating(each.ratingId)}
          >
            <li className="ratingeachlist" key={each.ratingId}>
              <img
                src={each.imageUrl}
                alt={`rating ${each.ratingId}`}
                className="ratingimage"
              />
              <p
                className={
                  ratingOptionId === each.ratingId
                    ? 'selectedratingtext'
                    : 'ratingtext'
                }
              >
                &up
              </p>
            </li>
          </button>
        ))}
      </ul>
      <button className="clearbutton" type="button" onClick={onClickFilter}>
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
