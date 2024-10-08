"use client"

import { useEffect, useState } from 'react';
import './FilterMenu.scss';
import CloseIcon from '../CloseIcon/CloseIcon';
import { readProperty } from './properties';
import FilterMenuSection from '../FilterMenuSection/FilterMenuSection';
import Button from '../Button/Button';
import { checkForSuccess } from '@/app/_libs/ApiClient';

const FilterMenu = ({ filterProps }) => {
  /* 
  This content of this menu is dynamic: It is based on data from the database.
  There are a few exercise properties that can be used for filtering exercises.
  Each of these properties has a few possible options. 
  More than 1 option can be selected.

  Properties for additional filters for later on:
    // 'environment', 
    // 'focus',
    // 'discreetness',
  */
  const { filterRef, onSubmit, checkboxValues, setCheckboxValues } = filterProps;

  const [filterOptions, setFilterOptions] = useState({
    'context': null, 
  });

  const [isLoading, setIsLoading] = useState(true);
  const [formContent, setFormContent] = useState('placeholder')
  const properties = [ // Properties for filtering exercises
    'context',
  ]

  async function getProperties() {
    const filterOptionsResults = {};
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const result = await readProperty(property);
      if (checkForSuccess(result)) {
        filterOptionsResults[property] = result;
      } 
    }
    if (Object.keys(filterOptionsResults).length > 0) {
      setFilterOptions(filterOptionsResults);
      setIsLoading(false);
      console.log('filter options set')
    }
  }

  useEffect(() => {
    getProperties();

  }, [isLoading])

  useEffect(() => {
    if (!isLoading) {
      const sections = properties.map(property => {
        const optionsArray = filterOptions[property];
        return (
          <FilterMenuSection
            key={`${property}-section`}
            property={property}
            optionsArray={optionsArray}
            checkboxValues={checkboxValues}
            setCheckboxValues={setCheckboxValues}
          />
        )
      })
      setFormContent(
        <form
          className='filter-form'
          id='filter-form'
        >
          <Button buttonProps={saveButtonProps} />
          {sections}
        </form>
      )
    }
  }, [filterOptions, checkboxValues]);

  function handleCloseDialog() {
    filterRef.current.close();
  }

  const closeIconProps = {
    onClick: handleCloseDialog
  }

  const saveButtonProps = {
    text: 'Update Program',
    onClick: onSubmit,
    className: 'filter-menu__button'
  }

  return (
    <dialog
      ref={filterRef}
      className="filter-menu"
    >
      <h2 className='modal-heading'>Filters</h2>
      <CloseIcon closeIconProps={closeIconProps} />
      {formContent}
      
    </dialog>
  )
}

export default FilterMenu
