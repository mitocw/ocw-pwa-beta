import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CoursewareHeader from '../courseware-header';

const props = {
  className: 'div-class',
  url: 'An url',
  title: 'Header text',
};

afterEach(cleanup);

describe('Courseware Header', () => {
  it('attaches the correct class name to it\'s outer div', () => {
    const { container } = render(<CoursewareHeader {...props} />);
    const divNode = container.firstChild;
    
    expect(divNode.tagName).toBe('DIV');
    expect(divNode.className).toBe('div-class');
  });

  it('renders it\'s child header correctly', () => {
    const { getByText } = render(<CoursewareHeader {...props} />);
    const headerNode = getByText('Header text');

    expect(headerNode.tagName).toBe('H3');
    expect(headerNode.className).toBe('title');
  });
});
