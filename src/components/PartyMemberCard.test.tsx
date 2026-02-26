import { expect, test, mock } from 'bun:test';
import { render, fireEvent } from '@testing-library/preact';
import { PartyMemberCard } from './PartyMemberCard';
import type { PartyMember } from '../core/types';

test('PartyMemberCard renders correctly and handles edit click', () => {
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

  const handleEdit = mock();

  const { getByText, getByRole } = render(
    <PartyMemberCard
      member={member}
      onEdit={handleEdit}
      hasAvailableResponsibilities={true}
    />
  );

  expect(getByText('Test Agent')).toBeTruthy();
  expect(getByText('"A test fantasy"')).toBeTruthy();
  expect(getByText('Test Task')).toBeTruthy();

  const editButton = getByRole('button', { name: 'Edit Test Agent' });
  fireEvent.click(editButton);

  expect(handleEdit).toHaveBeenCalledWith('test-1');
});
