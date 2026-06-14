import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('loads a realistic sample campaign by default', () => {
  render(<App />);

  expect(screen.getByLabelText('Campaign name')).toHaveValue('Community Kitchen Spring Drive');
  expect(screen.getByLabelText('Headline')).toHaveValue('Help serve 4,000 fresh meals this spring');
  expect(screen.getByLabelText('Donation amounts')).toHaveValue('10, 25, 50, 100');
  expect(screen.getByLabelText('CTA button text')).toHaveValue('Give a meal today');
  expect(screen.getAllByText('Ready for review').length).toBeGreaterThan(0);
});

test('shows validation feedback when required content is removed', async () => {
  const user = userEvent.setup();
  render(<App />);

  const headlineInput = screen.getByLabelText('Headline');
  await user.clear(headlineInput);

  expect(screen.getByText('Add a clear campaign headline.')).toBeInTheDocument();
  expect(screen.getByText('Needs headline')).toBeInTheDocument();
  expect(screen.getAllByText('Needs review').length).toBeGreaterThan(0);
});

test('updates the live preview as headline changes', async () => {
  const user = userEvent.setup();
  render(<App />);

  const headlineInput = screen.getByLabelText('Headline');
  await user.clear(headlineInput);
  await user.type(headlineInput, 'Fund the winter shelter hotline');

  const preview = screen.getByLabelText('Suggested donation amounts').closest('.campaign-card');
  expect(preview).toBeInTheDocument();
  expect(within(preview as HTMLElement).getByText('Fund the winter shelter hotline')).toBeInTheDocument();
});

test('auto-saves the current draft locally', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.clear(screen.getByLabelText('Campaign name'));
  await user.type(screen.getByLabelText('Campaign name'), 'Library access drive');
  await user.clear(screen.getByLabelText('Headline'));
  await user.type(screen.getByLabelText('Headline'), 'Open the reading room seven days a week');

  await waitFor(() => {
    const stored = localStorage.getItem('donation-campaign-builder:current-draft');
    expect(stored).toContain('Library access drive');
    expect(stored).toContain('Open the reading room seven days a week');
  });
});

test('updates campaign variant label when preview mode changes', async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getAllByText('Primary variant').length).toBeGreaterThan(0);

  await user.click(screen.getByRole('button', { name: 'Mobile' }));

  expect(screen.getAllByText('Mobile variant').length).toBeGreaterThan(0);
});
