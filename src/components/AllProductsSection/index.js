import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    categoryOptionId: '',
    search: '',
    ratingOptionId: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      categoryOptionId,
      search,
      ratingOptionId,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryOptionId}&title_search=${search}&rating=${ratingOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  categoryChange = categoryId => {
    this.setState({categoryOptionId: categoryId}, this.getProducts)
  }

  onChangeproductsList = searched => {
    this.setState({search: searched}, this.getProducts)
  }

  onChangerating = ratingId => {
    this.setState({ratingOptionId: ratingId}, this.getProducts)
  }

  onChangefilter = () => {
    this.setState(
      {search: '', categoryOptionId: '', ratingOptionId: ''},
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    if (productsList.length === 0) {
      return (
        <div className="failureview">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png "
            alt="no products"
            className="productfailureimage"
          />
          <p className="oops">No Products Found</p>
          <p className="oopstext">
            We could not found any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureview = () => (
    <div className="failureview">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="productfailureimage"
      />

      <p className="oops">Opps Something Went Wrong</p>
      <p className="oopstext">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  // TODO: Add failure view

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureview()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {categoryOptionId, ratingOptionId} = this.state
    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          categoryChange={this.categoryChange}
          onChangeproductsList={this.onChangeproductsList}
          onChangerating={this.onChangerating}
          onChangefilter={this.onChangefilter}
          categoryOptionId={categoryOptionId}
          ratingOptionId={ratingOptionId}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
