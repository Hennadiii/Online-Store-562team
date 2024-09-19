import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import LoginPage from '../pages/loginPage';

describe('render', () => {
  it('renders Login page', () => {
    render(<LoginPage />);
    expect(true).toBeTruthy();
  });
});
