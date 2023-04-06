import { LoginWrapper, LoginWrapperBox } from './layout.style';
import { LayoutProps } from './layout.type';

export function Layout(props: LayoutProps) {
  return (
    <>
      <LoginWrapper>
        <LoginWrapperBox>{props.children}</LoginWrapperBox>
      </LoginWrapper>
    </>
  );
}
