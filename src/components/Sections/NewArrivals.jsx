import React from 'react';
import SeactionHeading from './SectionsHeading/SeactionHeading';
import Card from '../Card/Card';
import dresses from '../../assets/fonts/img/dresses.jpg';
import Jeans from '../../assets/fonts/img/jeans.jpg';
import Shirts from '../../assets/fonts/img/shirts.jpg';
import Tshirt from '../../assets/fonts/img/tshirts.jpg';
import Kurtis from '../../assets/fonts/img/Kurtis.jpg';
import Joggers from '../../assets/fonts/img/joggers.jpg';
import Carousel from 'react-multi-carousel';
import { responsive } from '../../utils/Section.constants'; 
import './NewArrivals.css';

const items = [
  { 'title': 'Jeans', imagePath: Jeans },
  { 'title': 'Shirts', imagePath: Shirts },
  { 'title': 'T-Shirts', imagePath: Tshirt },
  { 'title': 'Dresses', imagePath: dresses },
  { 'title': 'Joggers', imagePath: Joggers },
  { 'title': 'Kurtis', imagePath: Kurtis },
];

const NewArrivals = () => {
  return (
    <section className='py-8 '>
      <SeactionHeading title='Our Products' />
      <Carousel  
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        partialVisbile={false}
        itemClass={'react-slider-custom-item'}
        className='px-8'
      > 
        {items && items.map((item, index) => (
          <Card key={item.title + index} title={item.title} imagepath={item.imagePath} />
        ))}
      </Carousel> 
    </section>
  );
}

export default NewArrivals;
