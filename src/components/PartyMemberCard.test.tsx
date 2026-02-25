import { expect, test, mock } from 'bun:test';
import { render, fireEvent } from '@testing-library/preact';
import { PartyMemberCard } from './PartyMemberCard';
import type { PartyMember } from '../core/types';

test('PartyMemberCard renders correctly and handles removal', () => {
  const member: PartyMember = {
    id: 'test-1',
    name: 'Test Agent',
    agentClass: 'Wizard',
    classFantasy: 'A test fantasy',
    personality: 'Test personality',
    responsibilities: [{ name: 'Test Task', description: 'Testing' }],
    restrictions: [],
    spawnTriggers: [],
    tools: [],
    relationships: [],
  };

  const handleRemove = mock();

  const { getByText, getByRole } = render(
    <PartyMemberCard member={member} onRemove={handleRemove} />
  );

  expect(getByText('Test Agent')).toBeTruthy();
  expect(getByText('"A test fantasy"')).toBeTruthy();
  expect(getByText('Test Task')).toBeTruthy();

  const removeButton = getByRole('button', { name: 'Remove Test Agent' });
  fireEvent.click(removeButton);

  expect(handleRemove).toHaveBeenCalledWith('test-1');
});
