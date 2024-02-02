import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const {categoryOptions,ratingsList, categoryChange, onChangeproductsList,onChangerating,onChangefilter} = props

  const onChangeSearch = event => {
    onChangeproductsList(event.target.value)
  }
  const onClickcategory = categoryId => {
    categoryChange(categoryId)
  }

  const onClickrating=(ratingId)=>{
      onChangerating(ratingId)
  }

  const onClickFilter=()=>{
      onChangefilter()
  } 
  return (
    <div className="filters-group-container">
      <div className="searchcontainer">
        <input
          type="search"
          className="search"
          placeholder="Search"
          onChange={onChangeSearch}
        />
        <BsSearch className="searchicon" />
      </div>
      <h1 className="category">Category</h1>
      <ul className="categorylist">
        {categoryOptions.map(each => (
          <button
            type="button"
            className="button"
            onClick={onClickcategory(each.categoryId)}
          >
            <li className="categoryeachlist" key={each.categoryId}>
              {each.name}
            </li>
          </button>
        ))}
      </ul>
      <h1 className="category">Rating</h1>
      <ul className='ratinglist'>
          {ratingsList.map(each=>(
                <button type="button" className="button" onClick={onClickrating(each.ratingId)}>
                    <li className="ratingeachlist" key={each.ratingId}>
                        <img src={each.imageUrl} alt='rating' className='ratingimage'/>
                        <p className='ratingtext'>&up</p>
                    </li>
            </button>
            )}
      </ul>
      <button className='clearbutton' type='button' onClick={onClickFilter}>Clear Filters</button>
    </div>
  )
}
export default FiltersGroup
