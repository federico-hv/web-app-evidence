import { Center, Heading, HStack, Icon, theme } from '@holdr-ui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitleProps } from './types';

function SectionTitle({ label, to }: SectionTitleProps) {
  const Content = () => (
    <HStack
      _hover={{
        '.section-title__caret': {
          transform: 'translateX(2px)',
          scale: '1.05',
        },
      }}
      items='center'
      gap={1}
      css={{
        userSelect: 'none',
      }}
    >
      <Heading as='h2' size={3} weight={400} casing='capitalize'>
        {label}
      </Heading>
      {to && (
        <Center
          css={{
            transitionDuration: theme.transitions['duration-normal'],
            transitionProperty: 'all',
            transitionTimingFunction: 'linear',
          }}
        >
          <Icon
            className='section-title__caret'
            size='lg'
            name='caret-right-outline'
          />
        </Center>
      )}
    </HStack>
  );
  return (
    <Fragment>
      {to ? (
        <Link style={{ width: 'fit-content' }} to={to}>
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </Fragment>
  );
}
SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;
