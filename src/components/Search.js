import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const Search = ({address,setAddress,handleSelect}) => {
  return  <div className="search">
  <PlacesAutocomplete
    value={address}
    onChange={setAddress}
    onSelect={handleSelect}
  >
    {({
      getInputProps,
      suggestions,
      getSuggestionItemProps,
      loading,
    }) => (
      <>
        <div className="input-item">
          <input
            {...getInputProps({ placeholder: "Type City" })}
            required
          />
          <div>
            {
              // loading ? (
              //   <div>Loading...</div>
              // ) :
              suggestions.map((suggestion, idx) => {
                const style = {
                  backgroundColor: suggestion.active
                    ? "#999"
                    : "#fff",
                };
                return (
                  <div
                    className="suggestion"
                    key={idx}
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    {" "}
                    {suggestion.description}{" "}
                  </div>
                );
              })
            }
          </div>
        </div>
      </>
    )}
  </PlacesAutocomplete>
</div>;
};

export default Search;
