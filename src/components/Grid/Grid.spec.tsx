import { render } from '@testing-library/react';
import { Grid } from './Grid';
import type { Radar } from '../../types';

const mockRings: Radar['rings'] = [
  {
    radius: 1,
    label: 'mock ring 1',
    color: '#0F1',
  },
  {
    radius: 2,
    label: 'mock ring 2',
    color: '#0F2',
  },
  {
    radius: 3,
    label: 'mock ring 3',
    color: '#0F3',
  },
  {
    radius: 4,
    label: 'mock ring 4',
    color: '#0F4',
  },
];

describe('Grid', () => {
  it('should render the four ring labels', () => {
    const { getByText } = render(
      <svg>
        <Grid color="#F00" rings={mockRings} />
      </svg>,
    );

    expect(getByText('mock ring 1')).not.toBe(null);
    expect(getByText('mock ring 2')).not.toBe(null);
    expect(getByText('mock ring 3')).not.toBe(null);
    expect(getByText('mock ring 4')).not.toBe(null);
  });

  it('should render the grid', () => {
    const { container } = render(
      <svg>
        <Grid color="#F00" rings={mockRings} />
      </svg>,
    );

    // In stead of querying all the elements,
    // a Snapshot is used since it is mostly a visual component
    expect(container).toMatchInlineSnapshot(`
      <div>
        <svg>
          <g>
            <line
              stroke="#F00"
              stroke-width="1"
              x1="0"
              x2="0"
              y1="-400"
              y2="400"
            />
            <line
              stroke="#F00"
              stroke-width="1"
              x1="-400"
              x2="400"
              y1="0"
              y2="0"
            />
            <defs>
              <filter
                height="1"
                id="solid"
                width="1"
                x="0"
                y="0"
              >
                <feflood
                  flood-color="rgb(0, 0, 0, 0.8)"
                />
                <fecomposite
                  in="SourceGraphic"
                />
              </filter>
            </defs>
            <g>
              <circle
                cx="0"
                cy="0"
                fill="none"
                r="1"
                stroke="#F00"
                stroke-width="1"
              />
              <text
                class="Label RingLabel"
                fill="#0F1"
                text-anchor="middle"
                y="61"
              >
                mock ring 1
              </text>
            </g>
            <g>
              <circle
                cx="0"
                cy="0"
                fill="none"
                r="2"
                stroke="#F00"
                stroke-width="1"
              />
              <text
                class="Label RingLabel"
                fill="#0F2"
                text-anchor="middle"
                y="60"
              >
                mock ring 2
              </text>
            </g>
            <g>
              <circle
                cx="0"
                cy="0"
                fill="none"
                r="3"
                stroke="#F00"
                stroke-width="1"
              />
              <text
                class="Label RingLabel"
                fill="#0F3"
                text-anchor="middle"
                y="59"
              >
                mock ring 3
              </text>
            </g>
            <g>
              <circle
                cx="0"
                cy="0"
                fill="none"
                r="4"
                stroke="#F00"
                stroke-width="1"
              />
              <text
                class="Label RingLabel"
                fill="#0F4"
                text-anchor="middle"
                y="58"
              >
                mock ring 4
              </text>
            </g>
          </g>
        </svg>
      </div>
    `);
  });
});
