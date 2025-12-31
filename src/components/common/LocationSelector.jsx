import React, { useEffect, useState } from "react";
import Select from "react-select";
import useLocationData from "../../hooks/useLocationData";

const toSelectOptions = (data) =>
  data?.map((item) => ({ value: item.value, label: item.label })) || [];

const LocationSelector = ({
  onLocationChange = () => {},
  initialCountry,
  initialState,
  initialCity,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    initialCountry || null
  );
  const [selectedState, setSelectedState] = useState(initialState || null);
  const [selectedCity, setSelectedCity] = useState(initialCity || null);

  const { data: countries, loading: loadingCountries } =
    useLocationData("countries");

  const { data: states, loading: loadingStates } = useLocationData("states", {
    country: selectedCountry?.label,
  });
  const { data: cities, loading: loadingCities } = useLocationData("cities", {
    state: selectedState?.label,
    country: selectedCountry?.label,
  });

  // console.log("selectedCountry", selectedCountry);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    onLocationChange({ country, state: null, city: null });
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
    onLocationChange({ country: selectedCountry, state, city: null });
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    onLocationChange({ country: selectedCountry, state: selectedState, city });
  };

  // Set selectedCountry when countries load or initialCountry changes
  // useEffect(() => {
  //   if (countries && initialCountry) {
  //     const found = countries.find((c) => c.value === initialCountry.value);
  //     setSelectedCountry(found || null);
  //   }
  // }, [countries, initialCountry]);

  useEffect(() => {
    if (initialCountry) {
      setSelectedCountry(initialCountry);
    }
  }, [initialCountry]);

  // Set selectedState when states load or initialState changes
  useEffect(() => {
    if (initialState) {
      setSelectedState(initialState);
    }
  }, [initialState]);

  // Set selectedCity when cities load or initialCity changes
  useEffect(() => {
    if (initialCity) {
      setSelectedCity(initialCity);
    }
  }, [initialCity]);

  // Set selectedCountry when countries load or initialCountry changes
  // useEffect(() => {
  //   // console.log("countries", countries);

  //   // console.log("initialCountry", initialCountry);

  //   if (countries && initialCountry) {
  //     const found = countries.find((c) => c.label === initialCountry);
  //     setSelectedCountry(
  //       found ? { value: found.value, label: found.label } : null
  //     );
  //     // console.log("found", found);
  //   }
  // }, [countries, initialCountry]);

  // // Set selectedState when states load or initialState changes
  // useEffect(() => {
  //   if (states && initialState) {
  //     const found = states.find((s) => s.label === initialState);
  //     setSelectedState(
  //       found ? { value: found.value, label: found.label } : null
  //     );
  //   }
  // }, [states, initialState]);

  // // Set selectedCity when cities load or initialCity changes
  // useEffect(() => {
  //   if (cities && initialCity) {
  //     const found = cities.find((c) => c.value === initialCity);
  //     setSelectedCity(
  //       found ? { value: found.value, label: found.label } : null
  //     );
  //   }
  // }, [cities, initialCity]);

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Country</label>
        <Select
          isLoading={loadingCountries}
          options={toSelectOptions(countries)}
          value={selectedCountry}
          onChange={handleCountryChange}
          isClearable
          placeholder="Select Country"
          menuShouldScrollIntoView
          isDisabled={loadingCountries || !countries.length}
        />
      </div>

      <div className="col-6 mb-3">
        <label className="form-label">State</label>
        <Select
          isDisabled={!selectedCountry}
          isLoading={loadingStates}
          options={toSelectOptions(states)}
          value={selectedState}
          onChange={handleStateChange}
          placeholder="Select State"
        />
      </div>
      <div className="col-6 mb-3">
        <label className="form-label">City</label>
        <Select
          isDisabled={!selectedState}
          isLoading={loadingCities}
          options={toSelectOptions(cities)}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Select City"
        />
      </div>
    </>
  );
};

export default LocationSelector;
