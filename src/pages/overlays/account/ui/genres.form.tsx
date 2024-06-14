import { Fragment, useState } from 'react';
import { Button } from '@holdr-ui/react';
import GenresList from './genres.list';

interface GenresFormProps {
  loading?: boolean;
  data: number[];
  onSubmit: (selected: number[]) => Promise<void>;
}

function GenresForm({ loading, data, onSubmit }: GenresFormProps) {
  const [selected, setSelected] = useState<number[]>(data);

  const handleSelectItem = (id: number) => {
    const idx = selected.findIndex((curr) => curr === id);

    if (idx === -1) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((curr) => curr !== id));
    }
  };

  return (
    <Fragment>
      <GenresList selected={selected} onSelectItem={handleSelectItem} />

      <Button
        isLoading={loading}
        loadingText='Continue'
        onClick={() => onSubmit(selected)}
        fullWidth
        colorTheme='purple500'
        radius={2}
        css={{
          minHeight: '2.75rem',
        }}
      >
        Continue
      </Button>
    </Fragment>
  );
}

export default GenresForm;
