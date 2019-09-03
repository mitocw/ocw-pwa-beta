import React from 'react';
import { render } from '@testing-library/react';
import SimpleComponent from '../simple-component';

describe('Simple Component', () => {
  it('renders its header correctly', () => {
    const { getByText } = render(<SimpleComponent />);
    const headerContent = getByText('Simple component');

    expect(headerContent).toBeInTheDocument();
  });
});
