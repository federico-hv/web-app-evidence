import {
  Box,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
} from '@holdr-ui/react';
import countries, { Country } from './data/countries';
function CountryPicker({ onChange }: any) {
  //   const [countryField, , countryFieldHelpers] = useField('country');

  return (
    <Box radius={2} overflow='hidden'>
      <Select
        //   value={countryField.value}
        onValueChange={(value) => {
          onChange();
          //   countryFieldHelpers.setValue(value);
        }}
      >
        <SelectTrigger
          css={{
            border: '2px solid rgba(152, 152, 255, 0.35)',
            background: 'rgba(152, 152, 255, 0.15)',
            height: '34px',
          }}
          _open={{ borderRadius: '8px' }}
          placeholder='Country'
        />
        <SelectContent position='item-aligned'>
          <SelectItemList
            w='130px'
            css={{
              background: 'rgba(152, 152, 255, 0.15)',
              blur: '50px',
            }}
          >
            {countries.map((country: Country) => (
              <SelectItem
                color='white100'
                _highlighted={{ backgroundColor: '$purple400' }}
                value={country.code}
                label={country.name}
                key={country.code}
              />
            ))}
          </SelectItemList>
        </SelectContent>
      </Select>
    </Box>
  );
}

export default CountryPicker;
