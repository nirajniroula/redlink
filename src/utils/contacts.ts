import parsePhoneNumber from 'libphonenumber-js';
import { getMultipleContactsByNumber } from '../firebase';
import { RLContactType } from '../context/types';
const normalizePhoneNumber = async (phoneNumber: string) => {
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber, 'NP'); // Adjust region code if needed
    const formattedNumber = parsedNumber?.format('E.164');
    return formattedNumber;
  } catch (error) {
    console.error('Error normalizing phone number:', error);
    // Handle invalid phone numbers gracefully, e.g., return original number or null
    return phoneNumber; // Or consider returning null for invalid numbers
  }
};

const getSortedConatcts = (phoneContacts: RLContactType[]) => {
  const sortedContacts = phoneContacts.sort((a, b) => {
    const nameA = a.displayName.toUpperCase(); // ignore case
    const nameB = b.displayName.toUpperCase(); // ignore case

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0; // names must be equal
  });
  return sortedContacts;
};

const mapContactsWithBloodGroups = async (contacts: RLContactType[]) => {
  // 1. Normalize device contacts
  const normalizedContacts = (await Promise.all(
    contacts.map(async (contact) => ({
      ...contact,
      phoneNumbers: await Promise.all(
        contact.phoneNumbers.map(async (number: { number: string }) => ({
          ...number,
          normalizedNumber: await normalizePhoneNumber(number.number),
        })),
      ),
    })),
  )) as RLContactType[];

  // 2. Collect normalized phone numbers
  const normalizedPhoneNumbers = normalizedContacts.flatMap((contact) =>
    contact.phoneNumbers.map((number) => number.normalizedNumber),
  );

  const userMap = await getMultipleContactsByNumber(normalizedPhoneNumbers) as Map<any, any>;
  const updatedContacts = userMap ? normalizedContacts.map((contact) => {
    return {
      ...contact,
      bloodGroup: userMap?.get(
        contact.phoneNumbers.find((number) => {
          return userMap.has(number.normalizedNumber);
        })?.normalizedNumber,
      ),
    };
  }):[];
  const sortedContacts = getSortedConatcts(updatedContacts);
  return sortedContacts;
};

export { getSortedConatcts, normalizePhoneNumber, mapContactsWithBloodGroups };
