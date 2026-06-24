import type { CareerOpeningItem } from './cmsSections';

export function careerOpeningPath(opening: Pick<CareerOpeningItem, 'slug'>): string {
  return `/careers/${opening.slug}`;
}

export function isGeneralCareerOpening(
  opening: Pick<CareerOpeningItem, 'slug' | 'employmentType' | 'generalApplication'>
): boolean {
  return opening.generalApplication === true
    || opening.slug === 'talent-network'
    || opening.employmentType?.toLowerCase() === 'general application';
}

export function isCareerOpeningAcceptingApplications(
  opening: Pick<CareerOpeningItem, 'acceptingApplications' | 'closingDate'>,
  now = new Date()
): boolean {
  if (opening.acceptingApplications === false) return false;
  if (!opening.closingDate) return true;
  const closingDate = new Date(`${opening.closingDate}T23:59:59.999`);
  return !Number.isNaN(closingDate.getTime()) && closingDate >= now;
}
