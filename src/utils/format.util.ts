import { decodeAddress } from "dedot/utils";

/**
 * Format on=chain balance
 *
 * @param balance
 * @param decimal
 */
export const formatBalance = (
  balance: bigint,
  decimal: number = 12
): string => {
  return (parseFloat(balance.toString()) / Math.pow(10, decimal)).toString();
};

/**
 * Validate a Polkadot address
 *
 * @param addressToCheck
 */
export const validateAddress = (addressToCheck: string) => {
  try {
    return !!decodeAddress(addressToCheck);
  } catch (e) {
    return false;
  }
};

export const trimTrailingSlash = (input: string): string => {
  return input.endsWith("/") ? trimTrailingSlash(input.slice(0, -1)) : input;
};

export const shortenAddress = (address?: string): string => {
  if (!address) return "";

  const length = address.length;
  if (length <= 15) return address;
  return `${address.substring(0, 6)}...${address.substring(length - 6, length)}`;
};
