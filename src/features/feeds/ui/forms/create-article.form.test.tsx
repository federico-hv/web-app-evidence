import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateArticleForm from './create-article.form';
import {
  GeneralContextProvider,
  StepperContextProvider,
  useCounter,
} from 'shared';
import { ReactElement, useState } from 'react';

describe('[CreateArticleForm', () => {
  beforeEach(() => {
    render(
      <CreateArticleFormWrapper>
        <CreateArticleForm />
      </CreateArticleFormWrapper>,
    );
  });
  describe('Structural', () => {
    it('should correctly render', () => {
      screen.getByText('Title');
    });

    it('should contain title input', () => {
      screen.getByText('Title');
    });

    it('should contain Website URL input', () => {
      screen.getByText('Website URL');
    });

    it('should contain Image URL input', () => {
      screen.getByText('Image URL');
    });

    it('should contain Description input', () => {
      screen.getByText('Description');
    });

    it('should contain Submit Button', () => {
      screen.getByText('Submit');
    });
  });

  describe('Behavioural', () => {
    it('should not allow a user to submit an empty form', () => {
      expect(screen.getByText('Submit')).to.have.property(
        'disabled',
        true,
      );
    });

    it('should not allow a user to submit the form if any field is empty', () => {
      expect(screen.getByText('Submit')).to.have.property(
        'disabled',
        true,
      );
      userEvent.type(screen.getByLabelText('Title'), 'test article');
      expect(screen.getByText('Submit')).to.have.property(
        'disabled',
        true,
      );
      userEvent.type(
        screen.getByLabelText('Website URL'),
        'https://www.google.com',
      );
      expect(screen.getByText('Submit')).to.have.property(
        'disabled',
        true,
      );
      userEvent.type(
        screen.getByLabelText('Image URL'),
        'https://www.image.com',
      );
      expect(screen.getByText('Submit')).to.have.property(
        'disabled',
        true,
      );
      userEvent.type(screen.getByLabelText('Description'), 'description');
      expect(screen.getByText('Submit')).to.have.property(
        'disabled',
        false,
      );
    });

    it('should allow a user to submit the form', () => {
      userEvent.type(screen.getByLabelText('Title'), 'test article');
      userEvent.type(
        screen.getByLabelText('Website URL'),
        'https://www.google.com',
      );
      userEvent.type(
        screen.getByLabelText('Image URL'),
        'https://www.image.com',
      );
      userEvent.type(screen.getByLabelText('Description'), 'description');
      expect(screen.getByText('Submit')).to.have.property(
        'disabled',
        false,
      );
      screen.getByText('Submit').click();
    });
  });
});

function CreateArticleFormWrapper({
  children,
}: {
  children: ReactElement;
}) {
  const {
    increment,
    decrement,
    reset,
    current: currentStep,
  } = useCounter(0);

  const [state, update] = useState({});

  return (
    <StepperContextProvider
      value={{ increment, decrement, currentStep, reset }}
    >
      <GeneralContextProvider
        value={{
          state,
          update,
        }}
      >
        {children}
      </GeneralContextProvider>
    </StepperContextProvider>
  );
}
