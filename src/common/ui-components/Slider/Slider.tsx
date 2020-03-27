import React, { Component } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import Slide from '../Slide/Slide';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      arrows: true,
      initialSlide: 0,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    return (
      <Slider {...settings} className={cx(styles.container)}>
        <Slide>
          <h3>1</h3>
        </Slide>
        <Slide>
          <h3>2</h3>
        </Slide>
        <Slide>
          <h3>3</h3>
        </Slide>
        <Slide>
          <h3>4</h3>
        </Slide>
      </Slider>
    );
  }
}
