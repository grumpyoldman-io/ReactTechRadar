import { render } from '@testing-library/react';
import type { Entry as EntryType } from '../../types';
import { createSegment } from '../../utils/segment';
import { Entry } from './Entry';

const mockEntry: EntryType = {
  id: 1,
  label: 'Mock Entry',
  quadrant: 1,
  ring: 2,
  moved: false,
  x: 10,
  y: 15,
  segment: createSegment(1, 2),
  color: '#F00',
  link: 'https://test-link',
};

describe('Entries:Entry', () => {
  it('should render a link with an ID as label', () => {
    const { getByRole, getByText } = render(
      <svg>
        <Entry entry={mockEntry} />
      </svg>,
    );

    expect(getByRole('link').getAttribute('href')).toBe(mockEntry.link);
    expect(getByText(mockEntry.id).tagName).toBe('text');
  });

  it('should render an unmoved Entry', () => {
    const { getByRole } = render(
      <svg>
        <Entry entry={mockEntry} />
      </svg>,
    );

    expect(getByRole('link').firstElementChild?.tagName).toBe('circle');
  });

  it('should render an Entry moved up', () => {
    const { getByRole } = render(
      <svg>
        <Entry entry={{ ...mockEntry, moved: 'up' }} />
      </svg>,
    );

    expect(getByRole('link').firstElementChild?.tagName).toBe('path');
    expect(getByRole('link').firstElementChild?.getAttribute('d')).toBe(
      'M -11,5 11,5 0,-13 z',
    );
  });

  it('should render an Entry moved down', () => {
    const { getByRole } = render(
      <svg>
        <Entry entry={{ ...mockEntry, moved: 'down' }} />
      </svg>,
    );

    expect(getByRole('link').firstElementChild?.tagName).toBe('path');
    expect(getByRole('link').firstElementChild?.getAttribute('d')).toBe(
      'M -11,-5 11,-5 0,13 z',
    );
  });
});
