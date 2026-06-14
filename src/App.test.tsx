import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('shows validation feedback when required content is removed', async () => {
  const user = userEvent.setup();
  render(<App />);

  const headlineInput = screen.getByLabelText('Headline');
  await user.clear(headlineInput);

  expect(screen.getByText('Add a clear campaign headline.')).toBeInTheDocument();
  expect(screen.getByText('Draft needs a few required fields before it is campaign-ready.')).toBeInTheDocument();
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

test('saves and loads a draft from local storage', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: 'New campaign' }));
  await user.clear(screen.getByLabelText('Campaign name'));
  await user.type(screen.getByLabelText('Campaign name'), 'Library access drive');
  await user.clear(screen.getByLabelText('Headline'));
  await user.type(screen.getByLabelText('Headline'), 'Open the reading room seven days a week');
  await user.click(screen.getByRole('button', { name: 'Save draft' }));

  expect(screen.getByText('Library access drive')).toBeInTheDocument();

  await user.clear(screen.getByLabelText('Headline'));
  await user.type(screen.getByLabelText('Headline'), 'Temporary headline');
  await user.click(screen.getAllByRole('button', { name: 'Load' })[0]);

  expect(screen.getByLabelText('Headline')).toHaveValue('Open the reading room seven days a week');
});
