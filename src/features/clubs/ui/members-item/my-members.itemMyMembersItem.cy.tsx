import React from 'react';
import MyMembersItem from './my-members.item';

describe('<MyMembersItem />', () => {
  let mockMember: any;

  before(() => {
    cy.fixture('members-item.fixture.json').then((mockData) => {
      mockMember = mockData;
    });
  });

  it('should render online member', () => {
    cy.mount(<MyMembersItem data={mockMember} isOnline={true} />);
    cy.checkTestIdsExistAndVisible([
      'member-item-avatar',
      'member-item-avatar-online',
      'member-item-name',
      'member-item-username',
    ]);
    cy.checkByTestIdHasText('member-item-name', mockMember.displayName);
    cy.checkByTestIdHasText(
      'member-item-username',
      `@${mockMember.username}`,
    );
  });

  it('should render offline member', () => {
    cy.mount(<MyMembersItem data={mockMember} isOnline={false} />);
    cy.checkTestIdsExistAndVisible([
      'member-item-avatar',
      'member-item-name',
      'member-item-username',
    ]);
    cy.checkByTestIdHasText('member-item-name', mockMember.displayName);
    cy.checkByTestIdHasText(
      'member-item-username',
      `@${mockMember.username}`,
    );
    cy.checkTestIdNotExist('member-item-avatar-online');
  });
});
