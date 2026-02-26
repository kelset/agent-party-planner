import { expect, test } from 'bun:test';
import { render, fireEvent } from '@testing-library/preact';
import { TavernUI } from './TavernUI';

test('TavernUI renders the default preset and handles member removal via editor', async () => {
  const { getByText, getAllByText, queryByText, getByRole } = render(
    <TavernUI />
  );

  // Should render the title
  expect(getByText('Assemble Your Party')).toBeTruthy();

  // Should render all 5 default party members
  expect(getAllByText('Ranger').length).toBeGreaterThan(0);
  expect(getAllByText('Wizard').length).toBeGreaterThan(0);
  expect(getAllByText('Warrior').length).toBeGreaterThan(0);
  expect(getAllByText('Warlock').length).toBeGreaterThan(0);
  expect(getAllByText('Healer').length).toBeGreaterThan(0);

  // Click the edit button on the Ranger
  const rangerEditBtn = getByRole('button', { name: 'Edit Ranger' });
  fireEvent.click(rangerEditBtn);

  // Editor should be open, find "Dismiss Agent" button
  const dismissBtn = getByRole('button', { name: 'Dismiss Agent' });
  fireEvent.click(dismissBtn);

  // Ranger should be gone
  expect(
    queryByText('The scout who maps the terrain and tracks the quarry.')
  ).toBeNull();
});
