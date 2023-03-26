import './App.css';
import { Radar } from './components/Radar';
import type { RadarConfig } from './types';
import { createRadar } from './utils/createRadar';

export const radarConfig: RadarConfig = {
  title: 'Tech Radar',
  date: new Date().toISOString(),
  colors: {
    background: '#FFF',
    grid: '#CCC',
  },
  quadrants: [
    { label: 'Languages' },
    { label: 'Infrastructure' },
    { label: 'Tools' },
    { label: 'Frameworks' },
  ],
  rings: [
    { label: 'Adopt', color: '#5ba300' },
    { label: 'Trial', color: '#009eb0' },
    { label: 'Assess', color: '#c7ba00' },
    { label: 'Hold', color: '#e09b96' },
  ],
  entries: Array.from({ length: Math.round(Math.random() * 100) }).map(
    (_, entryIndex) => ({
      label: `Entry-${entryIndex}`,
      quadrant: Math.round(Math.random() * 3) as 0 | 1 | 2 | 3,
      ring: Math.round(Math.random() * 3) as 0 | 1 | 2 | 3,
      moved: false,
      link: `https://entry.com/${entryIndex}`,
    }),
  ),
};

const radar = createRadar(radarConfig);

function App(): JSX.Element {
  return (
    <div className="App">
      <Radar radar={radar} />
    </div>
  );
}

export default App;
