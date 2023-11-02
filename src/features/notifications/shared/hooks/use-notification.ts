import { Notification, NotificationType } from '../types';

/* TODO: Replace this hook with a GraphQL Query
 */
export function useNotification(type: NotificationType) {
  const data: Notification[] = mockNotifications.sort(() =>
    Math.random() > 0.5 ? 1 : -1,
  );

  const error = false;
  const loading = false;
  return { data, error, loading };
}

const mockNotifications: Notification[] = [
  {
    createdAt: new Date(),
    actor: {
      username: 'user1',
      id: 'user1Id',
      displayName: 'John Doe',
      avatar: 'https://picsum.photos/200',
    },
    type: 'relationship',
    entity: {
      username: 'user2',
      id: 'user2Id',
      type: 'FollowRequest',
      action: 'created',
    },
  },
  {
    createdAt: new Date(),
    actor: {
      username: 'user3',
      id: 'user3Id',
      displayName: 'Alice Johnson',
      avatar: 'https://picsum.photos/200',
    },
    type: 'relationship',
    entity: {
      username: 'user1',
      id: 'user1Id',
      type: 'Follow',
      action: 'created',
    },
  },
  {
    createdAt: new Date(),
    actor: {
      username: 'user2',
      id: 'user2Id',
      displayName: 'Bob Smith',
      avatar: 'https://picsum.photos/200',
    },
    type: 'relationship',
    entity: {
      username: 'user3',
      id: 'user3Id',
      type: 'AcceptedFollowRequest',
      action: 'accepted',
    },
  },
  {
    createdAt: new Date(),
    actor: {
      username: 'user4',
      id: 'user4Id',
      displayName: 'Emma Brown',
      avatar: 'https://picsum.photos/200',
    },
    type: 'feed',
    entity: {
      imageSrc: 'https://picsum.photos/200',
      id: '123',
      owner: {
        username: 'user1',
        id: 'user1Id',
        displayName: 'John Doe',
        avatar: 'https://picsum.photos/200',
      },
      action: 'created',
    },
  },
  {
    createdAt: new Date(),
    actor: {
      username: 'user5',
      id: 'user5Id',
      displayName: 'Chris Wilson',
      avatar: 'https://picsum.photos/200',
    },
    type: 'feed',
    entity: {
      imageSrc: 'https://picsum.photos/200',
      id: '123',
      owner: {
        username: 'user2',
        id: 'user2Id',
        displayName: 'Bob Smith',
        avatar: 'https://picsum.photos/200',
      },
      action: 'liked',
    },
  },
  {
    createdAt: new Date(),
    actor: {
      username: 'user6',
      id: 'user6Id',
      displayName: 'Ella Davis',
      avatar: 'https://picsum.photos/200',
    },
    type: 'feed',
    entity: {
      imageSrc: 'https://picsum.photos/200',
      id: '123',
      owner: {
        username: 'user3',
        id: 'user3Id',
        displayName: 'Alice Johnson',
        avatar: 'https://picsum.photos/200',
      },
      action: 'shared',
    },
  },
];
