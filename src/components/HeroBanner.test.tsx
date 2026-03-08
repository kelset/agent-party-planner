import { describe, it, expect } from 'bun:test';
import { render } from '@testing-library/preact';
import { HeroBanner } from './HeroBanner';

describe('HeroBanner', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HeroBanner />);
    expect(getByText('Assemble Your Party')).toBeTruthy();
  });
});
