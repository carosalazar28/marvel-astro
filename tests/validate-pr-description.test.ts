import { describe, expect, it } from 'vitest';
import { validatePrDescription } from '../scripts/validate-pr-description';

const validDescription = `## Description

Adds a versioned engineering harness.

## Changes

- Adds validation rules.

## Testing

- Ran unit tests and coverage.

## Additional Information

- Base branch: main.
- Closes #42.`;

describe('validatePrDescription', () => {
  it('accepts a complete description with the required sections in order', () => {
    expect(validatePrDescription(validDescription)).toEqual({ valid: true, errors: [] });
  });

  it('reports a missing required section', () => {
    expect(validatePrDescription(validDescription.replace('## Testing\n\n- Ran unit tests and coverage.\n\n', ''))).toEqual({
      valid: false,
      errors: ['Missing required section: ## Testing'],
    });
  });

  it('reports required sections that are out of order', () => {
    expect(validatePrDescription(validDescription.replace('## Changes', '## Testing').replace('## Testing\n\n- Ran unit tests and coverage.', '## Changes\n\n- Adds validation rules.'))).toEqual({
      valid: false,
      errors: ['Required sections must appear in this order: Description, Changes, Testing, Additional Information'],
    });
  });

  it('reports an empty section', () => {
    expect(validatePrDescription(validDescription.replace('- Adds validation rules.', ''))).toEqual({
      valid: false,
      errors: ['Section must contain concrete content: ## Changes'],
    });
  });

  it('reports template placeholders', () => {
    expect(validatePrDescription(validDescription.replace('Adds a versioned engineering harness.', '<Provide a brief description of what this PR does.>'))).toEqual({
      valid: false,
      errors: ['Template placeholder found: <Provide a brief description of what this PR does.>'],
    });
  });

  it('requires a closing reference for the issue delivered by the pull request', () => {
    expect(validatePrDescription(validDescription.replace('- Closes #42.', ''))).toEqual({
      valid: false,
      errors: ['Missing issue closing reference: use Closes #<issue-number>'],
    });
  });
});
