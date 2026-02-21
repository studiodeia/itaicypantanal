import * as migration_20260220_212811 from './20260220_212811';
import * as migration_20260220_234506 from './20260220_234506';

export const migrations = [
  {
    up: migration_20260220_212811.up,
    down: migration_20260220_212811.down,
    name: '20260220_212811',
  },
  {
    up: migration_20260220_234506.up,
    down: migration_20260220_234506.down,
    name: '20260220_234506'
  },
];
