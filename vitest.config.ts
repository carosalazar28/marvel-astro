import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    environmentMatchGlobs: [['tests/**/*.test.tsx', 'jsdom']],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: [
        'scripts/**/*.ts',
        'src/components/SliderCountdown.tsx',
        'src/utils/countdown-time.ts',
        'src/components/CountdownTimer.tsx',
        'src/utils/progress/viewing-status.ts',
        'src/services/viewing-status-storage.ts',
        'src/hooks/useViewingStatus.ts',
      ],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
