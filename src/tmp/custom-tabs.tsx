import {
  GeneralContextProvider,
  getSubComponent,
  useGeneralContext,
  useRecordState,
} from '../shared';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { Box, HStack, Stack } from '@holdr-ui/react';
import {
  HStackProps,
  StackProps,
} from '@holdr-ui/react/dist/components/stack/src/stack.types';

interface CustomTabsState {
  currentValue: string;
}

function CustomTabs({
  children,
  defaultValue,
  ...props
}: BoxProps & { defaultValue?: string }) {
  const [state, update] = useRecordState<CustomTabsState>({
    currentValue: defaultValue || '',
  });

  const TabsHeader = getSubComponent(children, 'CustomTabsHeader');
  const TabsContent = getSubComponent(children, 'CustomTabsContent');

  return (
    <GeneralContextProvider value={{ state, update }}>
      <Box {...props}>
        {TabsHeader}
        {TabsContent}
      </Box>
    </GeneralContextProvider>
  );
}
CustomTabs.displayName = 'CustomTabs';

function CustomTabsHeader({ children, ...props }: HStackProps) {
  return (
    <HStack placeholder='' w='100%' h='100%' {...props}>
      {children}
    </HStack>
  );
}
CustomTabsHeader.displayName = 'CustomTabsHeader';

function CustomTabsList({ children, ...props }: HStackProps) {
  const TabsTrigger = getSubComponent(children, 'CustomTabsTrigger');

  return (
    <HStack h='100%' w='100%' {...props}>
      {TabsTrigger}
    </HStack>
  );
}
CustomTabsList.displayName = 'CustomTabsList';

function CustomTabsTrigger({
  children,
  value,
  css,
  ...props
}: StackProps & { value: string }) {
  const { update } = useGeneralContext<CustomTabsState>();
  const { state } = useGeneralContext<CustomTabsState>();

  return (
    <Stack
      onClick={() => update({ currentValue: value })}
      flex={1}
      justify='center'
      items='center'
      cursor='pointer'
      overflow='hidden'
      borderBottom={2}
      borderColor={
        value === state.currentValue ? 'secondary400' : 'transparent'
      }
      {...props}
      css={{
        userSelect: 'none',
        fontWeight: value === state.currentValue ? 500 : 400,
        ...css,
      }}
    >
      {children}
    </Stack>
  );
}
CustomTabsTrigger.displayName = 'CustomTabsTrigger';

function CustomTabsContent({
  value,
  ...props
}: BoxProps & { value: string }) {
  const { state } = useGeneralContext<CustomTabsState>();
  return (
    <Box
      display={state.currentValue !== value ? 'none' : undefined}
      {...props}
    />
  );
}
CustomTabsContent.displayName = 'CustomTabsContent';

CustomTabs.Header = CustomTabsHeader;
CustomTabs.List = CustomTabsList;
CustomTabs.Trigger = CustomTabsTrigger;
CustomTabs.Content = CustomTabsContent;

export {
  CustomTabsContent,
  CustomTabsTrigger,
  CustomTabsList,
  CustomTabsHeader,
};
export default CustomTabs;
