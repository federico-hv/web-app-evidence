import {
  GeneralContextProvider,
  getSubComponent,
  useGeneralContext,
  useRecordState,
} from '../shared';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import { Box, CSSTheme, HStack, Stack } from '@holdr-ui/react';
import {
  HStackProps,
  StackProps,
} from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { Fragment, useEffect } from 'react';

interface CustomTabsState {
  currentValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function CustomTabs({
  children,
  defaultValue,
  value = '',
  onValueChange,
  ...props
}: BoxProps & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const [state, update] = useRecordState<CustomTabsState>({
    currentValue: defaultValue || value,
    onValueChange,
  });

  const TabsHeader = getSubComponent(children, 'CustomTabsHeader');
  const TabsContent = getSubComponent(children, 'CustomTabsContent');

  useEffect(() => {
    if (value) update({ currentValue: value });
  }, [value]);

  return (
    <GeneralContextProvider value={{ state, update }}>
      <Box
        css={{
          transition: 'all 0.3s ease-in-out',
        }}
        {...props}
      >
        {TabsHeader}
        {TabsContent}
      </Box>
    </GeneralContextProvider>
  );
}
CustomTabs.displayName = 'CustomTabs';

function CustomTabsHeader({ children, ...props }: HStackProps) {
  return (
    <HStack zIndex={10} w='100%' h='100%' {...props}>
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
  onClick,
  _inactive = {
    borderBottom: 'none',
    fontWeight: 500,
  },
  _active = {
    borderBottom: '2px solid $purple500',
    fontWeight: 500,
  },
  ...props
}: StackProps & {
  value: string;
  _inactive?: CSSTheme;
  _active?: CSSTheme;
}) {
  const { update } = useGeneralContext<CustomTabsState>();
  const { state } = useGeneralContext<CustomTabsState>();

  const active = state.currentValue === value;

  return (
    <Stack
      onClick={(e) => {
        update({ currentValue: value });

        if (state.onValueChange) {
          state.onValueChange(value);
        }
        if (onClick) onClick(e);
      }}
      data-state={active ? 'active' : 'inactive'}
      w='100%'
      justify='center'
      items='center'
      cursor='pointer'
      overflow='hidden'
      {...props}
      css={{
        '&[data-state="active"]': {
          ..._active,
        },
        '&[data-state="inactive"]': {
          ..._inactive,
        },
        userSelect: 'none',
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
    <Fragment>
      {value === state.currentValue && (
        <Box
          display={state.currentValue !== value ? 'none' : undefined}
          {...props}
        />
      )}
    </Fragment>
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
