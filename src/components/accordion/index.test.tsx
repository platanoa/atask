import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import { Accordion } from './index';

describe('Accordion', () => {
  it('renders the component with the given props', () => {
    const props = {
      avatar_url: 'https://example.com/image.png',
      title: 'Accordion Title',
      children: <p>Accordion Content</p>,
    };
    render(<Accordion {...props} />);
    const avatarElement = screen.getByAltText('');
    expect(avatarElement).toHaveAttribute('src', props.avatar_url);
    expect(screen.getByText('Accordion Title')).toBeInTheDocument();
    expect(screen.queryByText('Accordion Content')).not.toBeInTheDocument();
  });

  it('should toggle content when clicked', async () => {
    const props = {
      avatar_url: 'https://example.com/image.png',
      title: 'Accordion Title',
      children: <p>Accordion Content</p>,
    };
    render(<Accordion {...props} />);
    expect(screen.queryByText('Accordion Content')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(screen.queryByText('Accordion Content')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(screen.queryByText('Accordion Content')).not.toBeInTheDocument();
  });
});