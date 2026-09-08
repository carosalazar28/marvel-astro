export interface PrDescriptionValidationResult {
  errors: string[];
  valid: boolean;
}

const requiredSections = [
  '## Description',
  '## Changes',
  '## Testing',
  '## Additional Information',
] as const;

const templatePlaceholders = [
  '<Provide a brief description of what this PR does.>',
  '<List the changes made in this PR.>',
  '<Describe how these changes were tested.>',
  '<Any additional information or context required.>',
  '- Change 1',
  '- Change 2',
];

export function validatePrDescription(description: string): PrDescriptionValidationResult {
  const positions = requiredSections.map((section) => description.indexOf(section));
  const missingSectionIndex = positions.findIndex((position) => position === -1);

  if (missingSectionIndex !== -1) {
    return invalid(`Missing required section: ${requiredSections[missingSectionIndex]}`);
  }

  if (!isInRequiredOrder(positions)) {
    return invalid('Required sections must appear in this order: Description, Changes, Testing, Additional Information');
  }

  const emptySectionIndex = positions.findIndex((position, index) => {
    const contentStart = position + requiredSections[index].length;
    const contentEnd = index === requiredSections.length - 1 ? description.length : positions[index + 1];
    return description.slice(contentStart, contentEnd).trim().length === 0;
  });

  if (emptySectionIndex !== -1) {
    return invalid(`Section must contain concrete content: ${requiredSections[emptySectionIndex]}`);
  }

  const placeholder = templatePlaceholders.find((candidate) => description.includes(candidate));

  if (placeholder) {
    return invalid(`Template placeholder found: ${placeholder}`);
  }

  return { valid: true, errors: [] };
}

function invalid(error: string): PrDescriptionValidationResult {
  return { valid: false, errors: [error] };
}

function isInRequiredOrder(positions: number[]): boolean {
  return positions.every((position, index) => index === 0 || position > positions[index - 1]);
}
