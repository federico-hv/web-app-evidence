import { Box, HStack, Tabs } from '@holdr-ui/react';

function Content() {
  return (
    <Box
      w={{ '@bp4': '100%', '@bp5': 'calc(100% - 160px)' }}
      borderRight={2}
      borderColor='base100'
      minHeight='100%'
    >
      <Tabs defaultValue='all'>
        <Tabs.List
          css={{
            position: 'sticky',
            backgroundColor: '$clearTint500',
            blur: '14px',
            zIndex: 11,
            p: '$4',
            '& button:not(:last-child)': {
              marginRight: '$4',
            },
          }}
        >
          <HStack>
            <Tabs.Trigger value='all'>All</Tabs.Trigger>
            <Tabs.Trigger value='holdr'>Holdr</Tabs.Trigger>
            <Tabs.Trigger value='news'>News</Tabs.Trigger>
          </HStack>
        </Tabs.List>
        <Tabs.Content value='all'>
          <Box p={4}>All</Box>
        </Tabs.Content>
        <Tabs.Content value='holdr'>
          <Box p={4}>Holdr</Box>
        </Tabs.Content>
        <Tabs.Content value='news'>
          <Box p={4}>News</Box>
        </Tabs.Content>
      </Tabs>
    </Box>
  );
}
Content.displayName = 'Content';

export default Content;
