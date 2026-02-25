import { expect, test } from 'bun:test';
import { render, fireEvent } from '@testing-library/preact';
import { TavernUI } from './TavernUI';
import { defaultPartyPreset } from '../core/presets/defaultParty';

test('TavernUI renders the default preset and handles member removal', () => {
  const { getByText, getAllByText, queryByText, getByRole } = render(
    <TavernUI />
  );

  // Should render the title and quest name
  expect(getByText('The Party')).toBeTruthy();
  expect(getByText(defaultPartyPreset.questName)).toBeTruthy();

  // Should render all 5 default party members (using getAllByText because name and class are identical)
  expect(getAllByText('Ranger').length).toBeGreaterThan(0);
  expect(getAllByText('Wizard').length).toBeGreaterThan(0);
  expect(getAllByText('Warrior').length).toBeGreaterThan(0);
  expect(getAllByText('Warlock').length).toBeGreaterThan(0);
  expect(getAllByText('Healer').length).toBeGreaterThan(0);

  // Click the remove button on the Ranger
  const rangerRemoveBtn = getByRole('button', { name: 'Remove Ranger' });
  fireEvent.click(rangerRemoveBtn);

  // Ranger should be gone
  expect(
    queryByText('The scout who maps the terrain and tracks the quarry.')
  ).toBeNull();

  // If we remove more members, the constraint warning should appear
  const wizardRemoveBtn = getByRole('button', { name: 'Remove Wizard' });
  const warriorRemoveBtn = getByRole('button', { name: 'Remove Warrior' });
  const warlockRemoveBtn = getByRole('button', { name: 'Remove Warlock' });

  fireEvent.click(wizardRemoveBtn);
  fireEvent.click(warriorRemoveBtn);
  fireEvent.click(warlockRemoveBtn);

  // Now we only have 1 member (Healer), which is less than minPartyMembers (2)
  expect(
    getByText(/Warning: Your party must have at least 2 members/)
  ).toBeTruthy();
});
