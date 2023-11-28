import { fireEvent, render, screen } from '@testing-library/react';
import Slider, {
  SliderContent,
  SliderControls,
  SliderIndicator,
  SliderNextButton,
  SliderPreviousButton,
  SliderSlide,
} from '..';

describe('[Slider]', () => {
  describe('Structural', () => {
    it('should display a single slide', () => {
      render(
        <Slider>
          <SliderIndicator />
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
          </SliderContent>
          <SliderControls>
            <SliderPreviousButton />
            <SliderNextButton />
          </SliderControls>
        </Slider>,
      );
      expect(screen.getByText('test slide')).to.exist;
    });

    it('should display no buttons when a single slide is present', () => {
      render(
        <Slider>
          <SliderIndicator />
          <SliderControls>
            <SliderPreviousButton />
            <SliderNextButton />
          </SliderControls>
          <SliderContent>
            <SliderSlide>slide 1</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.queryByLabelText('go to previous slide')).to.not.exist;
      expect(screen.queryByLabelText('go to next slide')).to.not.exist;
    });

    it('should display next button only when two slides are present and loop is false', () => {
      render(
        <Slider>
          <SliderIndicator />
          <SliderControls>
            <SliderPreviousButton />
            <SliderNextButton />
          </SliderControls>
          <SliderContent>
            <SliderSlide>slide 1</SliderSlide>
            <SliderSlide>slide 2</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.queryByLabelText('go to previous slide')).to.not.exist;
      expect(screen.queryByLabelText('go to next slide')).to.exist;
    });

    it('should display next and previous buttons with two slides and loop is true', () => {
      render(
        <Slider loop>
          <SliderIndicator />
          <SliderControls>
            <SliderPreviousButton />
            <SliderNextButton />
          </SliderControls>
          <SliderContent>
            <SliderSlide>slide 1</SliderSlide>
            <SliderSlide>slide 2</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.queryByLabelText('go to previous slide')).to.exist;
      expect(screen.queryByLabelText('go to next slide')).to.exist;
    });

    it('should display one indicator with one slide', () => {
      render(
        <Slider>
          <SliderIndicator />
          <SliderControls>
            <SliderPreviousButton />
            <SliderNextButton />
          </SliderControls>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.getByLabelText('change slide')).to.exist;
    });

    it('should display two indicators with two slides', () => {
      render(
        <Slider>
          <SliderIndicator> </SliderIndicator>
          <SliderControls>
            <SliderPreviousButton />
            <SliderNextButton />
          </SliderControls>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.getAllByLabelText('change slide').length).to.equal(2);
    });
  });

  describe('Behavioural', () => {
    it('should change to next slide when button is clicked', () => {
      render(
        <Slider>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      fireEvent.click(screen.getByLabelText('go to next slide'));
      expect(screen.getByText('test slide 2')).to.exist;
    });

    it('should change to last slide when previous button is clicked and loop is true', () => {
      render(
        <Slider loop={true}>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      fireEvent.click(screen.getByLabelText('go to previous slide'));
      expect(screen.getByText('test slide 4')).to.exist;
    });

    it('should change to first slide when next button is clicked and loop is true', () => {
      render(
        <Slider loop={true}>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      fireEvent.click(screen.getAllByLabelText('change slide')[3]);
      fireEvent.click(screen.getByLabelText('go to next slide'));
      expect(screen.getByText('test slide')).to.exist;
    });

    it('should change to the third slide when third indicator is clicked', () => {
      render(
        <Slider loop={true}>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      fireEvent.click(screen.getAllByLabelText('change slide')[2]);
      screen.getByText('test slide 3');
    });

    it('should not change the slide when current indicator is clicked', () => {
      render(
        <Slider loop={true}>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      fireEvent.click(screen.getAllByLabelText('change slide')[0]);
      screen.getByText('test slide');
    });

    it('should show previous button when current slide is not the first', () => {
      render(
        <Slider>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.queryByLabelText('go to previous slide')).to.not.exist;
      fireEvent.click(screen.getByLabelText('go to next slide'));
      expect(screen.queryByLabelText('go to previous slide')).to.exist;
    });

    it('should not show next button when slide last slide is visible and loop is false', () => {
      render(
        <Slider>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.queryByLabelText('go to next slide')).to.exist;
      fireEvent.click(screen.getAllByLabelText('change slide')[3]);
      expect(screen.queryByLabelText('go to next slide')).to.not.exist;
    });

    it('should change to next slide when autoplay is true', () => {
      render(
        <Slider delay={10} autoPlay>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.getByText('test slide')).to.exist;
      setTimeout(() => {
        expect(screen.getByText('test slide 2')).to.exist;
      }, 1100);
    });

    it('should not change to next slide when autoplay is false', () => {
      render(
        <Slider delay={10} autoPlay={false}>
          <SliderControls>
            <SliderNextButton />
            <SliderPreviousButton />
          </SliderControls>
          <SliderIndicator></SliderIndicator>
          <SliderContent>
            <SliderSlide>test slide</SliderSlide>
            <SliderSlide>test slide 2</SliderSlide>
            <SliderSlide>test slide 3</SliderSlide>
            <SliderSlide>test slide 4</SliderSlide>
          </SliderContent>
        </Slider>,
      );
      expect(screen.getByText('test slide')).to.exist;
      setTimeout(() => {
        expect(screen.getByText('test slide')).to.exist;
        expect(screen.getByText('test slide 2')).to.not.exist;
      }, 1100);
    });
  });
});
