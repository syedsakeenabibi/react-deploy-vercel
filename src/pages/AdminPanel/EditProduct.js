import React from 'react';
import { 
    ArrayInput, 
    BooleanInput, 
    Edit, 
    ImageField, 
    ImageInput, 
    NumberInput, 
    required, 
    SelectInput, 
    SimpleForm, 
    SimpleFormIterator, 
    TextInput 
} from 'react-admin';

import { colorSelector } from '../../components/Filter/ColorsFilter'; // Ensure correct path to `ColorsFilter.js`
import { sizeSelector } from './CreateProduct';

const EditProduct = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput label="Name" source="name" />
        <TextInput label="Description" source="description" />
        <TextInput label="Price" source="price" type="number" />
        <TextInput label="Brand" source="brand" />

        <ImageField source="thumbnail" src="thumbnail" />
        <ImageInput source="thumbnail" label="Select Thumbnail">
          <ImageField source="src" title="title" />
        </ImageInput>

        {/* Variants Section */}
        <ArrayInput source="variants" label="Edit Variants">
          <SimpleFormIterator inline>
            <SelectInput 
              source="color" 
              choices={Object.keys(colorSelector).map(color => ({ id: color, name: color }))} 
              resettable 
            />
            <SelectInput 
              source="size" 
              choices={sizeSelector.map(size => ({ id: size, name: size }))} 
            />
            <NumberInput source="stockQuantity" />
          </SimpleFormIterator>
        </ArrayInput>

        {/* Product Resources Section */}
        <ArrayInput source="productResources">
          <SimpleFormIterator inline>
            <TextInput source="name" validate={[required()]} />
            <ImageField source="url" src="url" />
            <ImageInput source="url" label="Product Image">
              <ImageField source="src" title="title" />
            </ImageInput>
            <SelectInput source="type" choices={[{ id: 'image', name: 'image' }]} />
            <BooleanInput source="isPrimary" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default EditProduct;
