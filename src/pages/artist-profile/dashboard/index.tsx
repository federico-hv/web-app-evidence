import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  Text,
  VStack,
} from '@holdr-ui/react';
import { RadialSurface2 } from '../../../shared';
import { ArtistProfileStatistic } from './ui';

function ArtistProfileDashboardPage() {
  return (
    <VStack gap={4}>
      <HStack gap={4}>
        <RadialSurface2 shrink={0} w={227} p={4} radius={3}>
          <VStack>
            <Heading mb={4} size={2} weight={400}>
              Your Club Progress
            </Heading>
            <VStack gap={3}>
              <Box>
                <Heading size={6} weight={600}>
                  20% Complete
                </Heading>
              </Box>
              <Box>
                <Heading size='14px' weight={400}>
                  Level 2
                </Heading>
              </Box>
              <VStack gap={1}>
                <Progress value={20} colorTheme='purple500' size='xl' />
                <Text size={1} color='white700'>
                  100 / 10,000 members
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </RadialSurface2>
        <Grid w='100%' gap={3} templateColumns='repeat(3 , 1fr)'>
          <GridItem>
            <ArtistProfileStatistic
              label='current value'
              value='$0.00'
              percentage={1.2}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='average value'
              value={400}
              percentage={-1.2}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='club views'
              value={0}
              percentage={0}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='average bidders'
              value={201}
              percentage={1.9}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='memberships sold'
              value='100/250'
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='peak engagement time'
              value='8:00PM PST'
            />
          </GridItem>
        </Grid>
      </HStack>
      <RadialSurface2 w='100%' p={4} radius={3}>
        <HStack
          pb={2}
          items='center'
          justify='space-between'
          w='100%'
          borderBottom={1}
          borderColor='#9898FF1A'
        >
          <Heading size={5} weight={400}>
            Membership Value
          </Heading>
          <Select defaultValue='3 months'>
            <SelectTrigger
              radius={2}
              css={{
                border: '1px solid rgba(152, 152, 255, 0.1)',
                background: 'rgba(152, 152, 255, 0.15)',
              }}
            />
            <SelectContent>
              <SelectItemList
                _active={{ color: '$purple200' }}
                _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
                _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
                divider={
                  <Box
                    h='1px'
                    w='100%'
                    css={{
                      background: 'rgba(152, 152, 255, 0.1)',
                    }}
                  />
                }
                position='relative'
                bgColor='rgba(49, 49, 73, 0.85)'
                borderColor='rgba(152, 152, 255, 0.1)'
                border={1}
                borderTop={0}
                fontSize={2}
                css={{
                  boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
                  backdropFilter: 'blur(40px)',
                }}
              >
                <SelectItem
                  py={2}
                  radius={1}
                  value='3 months'
                  label='3 months'
                />
                <SelectItem
                  py={2}
                  radius={1}
                  value='6 months'
                  label='6 months'
                />
                <SelectItem
                  py={2}
                  radius={1}
                  value='9 months'
                  label='9 months'
                />
                <SelectItem
                  py={2}
                  radius={1}
                  value='12 months'
                  label='12 months'
                />
              </SelectItemList>
            </SelectContent>
          </Select>
        </HStack>
        <Box mt={6} h={176} />
      </RadialSurface2>
      <HStack gap={4}>
        <RadialSurface2 w='100%' p={4} radius={3}>
          <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
            <Heading size={5} weight={400}>
              Visits by Country
            </Heading>
          </Box>
          <Box mt={6} h={176} />
        </RadialSurface2>
        <RadialSurface2 w='100%' p={4} radius={3}>
          <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
            <Heading size={5} weight={400}>
              Engagement
            </Heading>
          </Box>
          <Box mt={6} h={176} />
        </RadialSurface2>
      </HStack>
      <RadialSurface2 w='100%' p={4} radius={3}>
        <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
          <Heading size={5} weight={400}>
            Membership Activity
          </Heading>
        </Box>
        <VStack mt={6} minHeight={300}>
          <HStack></HStack>
        </VStack>
      </RadialSurface2>
    </VStack>
  );
}
ArtistProfileDashboardPage.displayName = 'ArtistProfileDashboardPage';

export default ArtistProfileDashboardPage;
