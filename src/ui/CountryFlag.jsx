import * as Flags from "country-flag-icons/react/3x2";

function CountryFlag({ countryCode }) {
  const Flag = Flags[countryCode?.toUpperCase()];

  if (!Flag) return null;

  return (
    <Flag
      title={countryCode}
      style={{
        width: "24px",
        height: "16px",
        borderRadius: "2px",
        objectFit: "cover",
      }}
    />
  );
}

export default CountryFlag;
