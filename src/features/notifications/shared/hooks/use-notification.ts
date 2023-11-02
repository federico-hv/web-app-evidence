import { Notification, NotificationType } from '../types';

/* TODO: Replace this hook with a GraphQL Query
 */
export function useNotification(type: NotificationType) {
  let data: Notification[] = mockNotifications;
  data = data.sort(
    (a: Notification, b: Notification) =>
      a.createdAt.getTime() - b.createdAt.getTime(),
  );
  const error = false;
  const loading = false;
  return { data, error, loading };
}

function getRandomTimeInCurrentDay() {
  const startOfDay = new Date();
  return new Date(startOfDay.getTime() + Math.random() * 23);
}

const mockNotifications: Notification[] = [
  {
    createdAt: getRandomTimeInCurrentDay(),
    actor: {
      username: 'user1',
      id: 'user1Id',
      displayName: 'User 1',
      avatar: 'user1-avatar.jpg',
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
    createdAt: getRandomTimeInCurrentDay(),
    actor: {
      username: 'user3',
      id: 'user3Id',
      displayName: 'User 3',
      avatar: 'user3-avatar.jpg',
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
    createdAt: getRandomTimeInCurrentDay(),
    actor: {
      username: 'user2',
      id: 'user2Id',
      displayName: 'User 2',
      avatar: 'user2-avatar.jpg',
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
    createdAt: getRandomTimeInCurrentDay(),
    actor: {
      username: 'user4',
      id: 'user4Id',
      displayName: 'User 4',
      avatar: 'user4-avatar.jpg',
    },
    type: 'feed',
    entity: {
      imageSrc: 'Your-Image-URL-Here-1',
      id: 'fake-id1',
      owner: {
        username: 'user1',
        id: 'user1Id',
        displayName: 'User 1',
        avatar: 'user1-avatar.jpg',
      },
      action: 'created',
    },
  },
  {
    createdAt: getRandomTimeInCurrentDay(),
    actor: {
      username: 'user5',
      id: 'user5Id',
      displayName: 'User 5',
      avatar: 'user5-avatar.jpg',
    },
    type: 'feed',
    entity: {
      imageSrc: 'Your-Image-URL-Here-2',
      id: 'fake-id2',
      owner: {
        username: 'user2',
        id: 'user2Id',
        displayName: 'User 2',
        avatar: 'user2-avatar.jpg',
      },
      action: 'liked',
    },
  },
  {
    createdAt: getRandomTimeInCurrentDay(),
    actor: {
      username: 'user6',
      id: 'user6Id',
      displayName: 'User 6',
      avatar: 'user6-avatar.jpg',
    },
    type: 'feed',
    entity: {
      imageSrc: 'Your-Image-URL-Here-3',
      id: 'fake-id3',
      owner: {
        username: 'user3',
        id: 'user3Id',
        displayName: 'User 3',
        avatar: 'user3-avatar.jpg',
      },
      action: 'shared',
    },
  },
];
