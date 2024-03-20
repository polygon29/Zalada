import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductModal from '../pages/Public/ProductModal';

const mockProduct = {
  attributes: {
    name: 'Test Product',
    linkimage: 'test-image.jpg',
    description: 'Test description',
    price: 100,
    quantity: 5,
  },
};

describe('ProductModal component', () => {
  it('displays the exact text "รายละเอียดสินค้า"', () => {
    render(<ProductModal show={true} onHide={() => {}} product={mockProduct} />);

    // Assert that the exact text "รายละเอียดสินค้า" is present
    expect(screen.getByText('รายละเอียดสินค้า')).toBeInTheDocument();
  });

});

describe('ProductModal component', () => {
    it('displays the exact text "จำนวนที่เหลือ"', () => {
      render(<ProductModal show={true} onHide={() => {}} product={mockProduct} />);
  
      // Assert that the exact text "จำนวนที่เหลือ" is present
      expect(screen.getByText('จำนวนที่เหลือ')).toBeInTheDocument();
    });
  
  });

  describe('ProductModal component', () => {
    it('displays the exact text "ราคา"', () => {
      render(<ProductModal show={true} onHide={() => {}} product={mockProduct} />);
  
      // Assert that the exact text "จำนวนที่เหลือ" is present
      expect(screen.getByText('ราคา')).toBeInTheDocument();
    });
  
  });

  describe('ProductModal component', () => {
    it('displays the exact text "บาท"', () => {
      render(<ProductModal show={true} onHide={() => {}} product={mockProduct} />);
  
      // Assert that the exact text "จำนวนที่เหลือ" is present
      expect(screen.getByText('บาท')).toBeInTheDocument();
    });
  
  });
