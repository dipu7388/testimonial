import * as React from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { Experiment, Variant, emitter } from '@marvelapp/react-ab-test';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Header() {
  const countries: { key: number; value: string }[] = [
    {
      key: 1,
      value: 'India',
    },
    {
      key: 2,
      value: 'US',
    },
  ];
  let cid = useQuery().get('country') || 1;
  let selectedCountry = countries.find(e => e.key == cid);
  console.log(selectedCountry);
  // experimentDebugger.enable();
  emitter.defineVariants(
    'countryDropDownExperiment',
    countries.map(e => e.value),
    [50, 50],
  );
  function onButtonClick(e) {
    emitter.emitWin('countryDropDownExperiment');
  }
  emitter.addPlayListener(function (experimentName, variantName) {
    console.log(
      `Displaying experiment ${experimentName} variant ${variantName}`,
    );
  });
  emitter.addWinListener(function (experimentName, variantName) {
    console.log(
      `Variant ${variantName} of experiment ${experimentName} was clicked`,
    );
  });
  return (
    <>
      <header>
        <Route
          path="/"
          render={() => (
            <Link to="/" className="logo">
              <span>DK</span>
            </Link>
          )}
        ></Route>
        {['Primary'].map(variant => (
          <DropdownButton
            as={ButtonGroup}
            key="country"
            id={`dropdown-variants-${variant}`}
            variant={variant.toLowerCase()}
            title={selectedCountry?.value}
            onClick={onButtonClick}
          >
            <Experiment name="countryDropDownExperiment" key="country-test">
              {countries.map(country => (
                <Variant name={country?.value} key={country?.key + 'test'}>
                  <Dropdown.Item
                    href={`?country=${country?.key}`}
                    key={country?.key}
                    onClick={onButtonClick}
                  >
                    {country?.value}
                  </Dropdown.Item>
                </Variant>
              ))}
            </Experiment>
          </DropdownButton>
        ))}
      </header>
    </>
  );
}
