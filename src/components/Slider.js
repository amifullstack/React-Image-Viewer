import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import axios from 'axios'

import Slide from './Slide'
import Dots from './Dots'
import SliderLeftArrow from './SliderLeftArrow'
import SliderRightArrow from './SliderRightArrow'

class Slider extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => this.props.getSliderImages()
  renderSlides = () => this.props.images.map((curr, i) => <Slide key={i} image={images[i]} />)

  render() {
    const { images, index, translateValue } = this.props

    return (
      <div className="slider">
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          { this.renderSlides() }
        </div>

        <Dots
          index={index}
          quantity={images.length}
          dotClick={this.handleDotClick} />

        <SliderLeftArrow prevSlide={this.goToPreviousSlide} />
        <SliderRightArrow nextSlide={this.goToNextSlide} />
      </div>
    )
  }

  /**
  * Below section handles arrow and dot click events, and getting the current width of the slide.
  */
  goToPreviousSlide = () => {
    const { index, translateValue, setTranslateValue, setIndex } = this.props

    if(index === 0)
      return

    setTranslateValue(translateValue + this.slideWidth())
    setIndex(index - 1)
  }

  goToNextSlide = () => {
    const { images, index, translateValue, setTranslateValue, setIndex } = this.props

    if(index === images.length - 1) {
      setTranslateValue(0)
      setIndex(0)
      return
    }
    setTranslateValue(translateValue - this.slideWidth())
    setIndex(index + 1)
  }

  handleDotClick = i => {
    const { index, translateValue, setTranslateValue, setIndex } = this.props
    if(i === index)
      return

    if(i > index)
      setTranslateValue(-(i * this.slideWidth()))
    else
      setTranslateValue(translateValue + ((index - i) * (this.slideWidth())))

    setIndex(i)
  }

  slideWidth = () => {
    const slide = document.querySelector('.slide')
    return slide.clientWidth
  }

} // End Class

const mapStateToProps = ({ slider }) => {
  return {
    images: slider.images,
    index: slider.index,
    translateValue: slider.translateValue
  }
}

export default connect(mapStateToProps, actions)(Slider)
