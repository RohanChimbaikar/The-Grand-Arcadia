import styled from "styled-components";

const StyledFlag = styled.img`
  width: 2.4rem;
  height: 1.6rem;
  object-fit: cover;
  border-radius: var(--border-radius-tiny);
  border: 1px solid var(--color-grey-100);
  display: block;
`;

function emojiToCountryCode(emoji) {
  return [...emoji]
    .map((char) => String.fromCharCode(char.codePointAt(0) - 127397))
    .join("")
    .toLowerCase();
}

function Flag({ countryCode }) {
  if (!countryCode) return null;

  const code = countryCode.includes("🇦🇧") ? countryCode : countryCode;

  const isoCode =
    [...countryCode].length === 2 &&
    [...countryCode].every((char) => char.codePointAt(0) >= 127462)
      ? emojiToCountryCode(countryCode)
      : countryCode.toLowerCase();

  return (
    <StyledFlag
      src={`https://flagcdn.com/${isoCode}.svg`}
      alt={`${isoCode} flag`}
    />
  );
}

export default Flag;
