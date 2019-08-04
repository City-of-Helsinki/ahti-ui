import styled from 'styled-components';

/**
 * A <button> element with the base styles reset.
 * Useful for cases where you want an action onClick, but want
 * to style on your own, without browser defaults.
 *
 * @example
 * const RoundButton = styled(BaseButton)`
 *  padding: 1rem;
 *  border-radius: 100%;
 *  background-color: white;
 * `
 */
const BaseButton = styled.button`
  width: auto;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;

  /* Inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize line-height. Cannot be changed from normal in Firefox. */
  line-height: normal;

  overflow: visible;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable input types in iOS 
   * NOTE: appearance is not yet unprefixed in browsers, and is unclear
   * whether it will ever be so. Thus, we include the prefixed versions manually.
  */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Remove excess padding and border in Firefox */
  &::-moz-focus-inner {
    padding: 0;
    border: none;
  }
`;

export default BaseButton;
